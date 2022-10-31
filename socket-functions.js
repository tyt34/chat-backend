const fetch = require('node-fetch')
const {
  getRandomInt
} = require('./utils.js')
const {
  arrFirstName, 
  arrSecondName, 
  urlApiImage, 
  beginTextForEr, 
  socketOptions
} = require('./constants.js')
const fs = require('fs')
const defAvaImg = fs.readFileSync('./default-avatar.png')
const defAvaBase64 = 'data:image/png;base64,'+Buffer.from(defAvaImg).toString('base64')

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
     * заметил, что может возникнуть редкая ошибка 
     * с получением изображения с помощью данного api
     */
    console.log(beginTextForEr, er)
    let obj = {
      name: firstName + ' ' + secondtName,
      id: socket.id,
      avatar: defAvaBase64
    }
    users.set(socket.id, obj)
    socket.emit(socketOptions.giveName, obj)
    io.emit(socketOptions.getNewUser, obj)
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