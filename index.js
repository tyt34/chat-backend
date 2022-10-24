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
const users = new Map()

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
      users.set(socket.id, obj)
      socket.emit(giveName, obj)
      io.emit(getNewUser, obj)
      socket.emit(giveAllUsers, [...users.values()])
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
      users.set(socket.id, obj)
      socket.emit(giveName, obj)
      io.emit(getNewUser, obj)
      socket.emit(giveAllUsers, [...users.values()])
    })
  })

  /**
   * Отправка сообщения о пользователе, который отключился
   */
  socket.on(disconnect, () => {
    if (users.get(socket.id)) {
      io.emit(getOldUser, users.get(socket.id).id)
      users.delete(socket.id)
    }
  })

  /**
   * Получение сообщений
   */
  socket.on(sendChatMessage, (msg) => {
    io.emit(getNewMessage, {
      id: socket.id,
      message: msg.message,
      avatar: users.get(socket.id).avatar,
      imageFile: msg.imageFile,
      name: users.get(socket.id).name
    })
  })
})
 
server.listen(3000)