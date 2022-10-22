const fetch = require('node-fetch')
const {
  sendChatMessage, giveName, giveAllUsers, getNewUser, getOldUser,
  getNewMessage, disconnect, defaultAvatar, arrFirstName, arrSecondName,
  connect, urlApiImage, beginTextForEr
} = require('./constants.js')
const {
  getRandomInt
} = require('./utils.js')
const server = require('http').createServer()
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
}) 

/**
 * Список пользователей, которые сейчас online
 */
const users = []

io.on(connect, (socket) => {
  /**
   * Присваивание имени пользователю
   */
  socket.on(giveName, () => {
    let firstName = arrFirstName[getRandomInt(arrFirstName.length)]
    let secondtName = arrSecondName[getRandomInt(arrSecondName.length)]
    fetch(urlApiImage)
    .then((res) => {
      let obj = {
        name: firstName + ' ' + secondtName,
        id: socket.id,
        avatar: res.url
      }
      users.push(obj)
      socket.emit(giveName, obj)
      io.emit(getNewUser, obj)
      socket.emit(giveAllUsers, users)
    })
    .catch((er) => {
      /**
       * заметил, что может быть какая то редка и непонятная ошибка с данным api
       */
      console.log(beginTextForEr, er)
      let obj = {
        name: firstName + ' ' + secondtName,
        id: socket.id,
        avatar: defaultAvatar
      }
      users.push(obj)
      socket.emit(giveName, obj)
      io.emit(getNewUser, obj)
      socket.emit(giveAllUsers, users)
    })
  })

  /**
   * Отправка сообщения о пользователе, который отключился
   */
  socket.on(disconnect, () => {
    let indexElRemove
    let idElRemove
    users.map((el, num) => {
      if (el.id === socket.id) {
        indexElRemove = num
        idElRemove = socket.id 
      }
    })
    users.splice(indexElRemove, 1)
    io.emit(getOldUser, idElRemove)
  })

  /**
   * Получение сообщений
   */
  socket.on(sendChatMessage, (msg) => {
    let nameUser 
    let imgUser
    users.map((user) => {
      if (user.id === socket.id) {
        nameUser = user.name
        imgUser = user.avatar
      }
    })
    io.emit(getNewMessage, {
      id: socket.id,
      message: msg.message,
      avatar: imgUser,
      imageFile: msg.imageFile,
      name: nameUser
    })
  })
})
 
server.listen(3000)