const fetch = require('node-fetch')
const {
  getRandomInt
} = require('./utils.js')
const {
  defaultAvatar, arrFirstName, arrSecondName, urlApiImage, 
  beginTextForEr, socketOptions
} = require('./constants.js')

const socketGiveName = (socket, users, io) => {
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
    socket.emit(socketOptions.giveName, obj)
    io.emit(socketOptions.getNewUser, obj)
    socket.emit(socketOptions.giveAllUsers, [...users.values()])
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
    socket.emit(socketOptions.giveName, obj)
    io.emit(getNewUser, obj)
    socket.emit(socketOptions.giveAllUsers, [...users.values()])
  })
}

const socketDisconnect = (socket, users, io) => {
  if (users.get(socket.id)) {
    io.emit(socketOptions.getOldUser, users.get(socket.id).id)
    users.delete(socket.id)
  }
}

const socketSendChatMessage = (socket, users, io, msg) => {
  io.emit(socketOptions.getNewMessage, {
    id: socket.id,
    message: msg.message,
    avatar: users.get(socket.id).avatar,
    imageFile: msg.imageFile,
    name: users.get(socket.id).name
  })
}

module.exports = {
  socketGiveName,
  socketDisconnect,
  socketSendChatMessage
}