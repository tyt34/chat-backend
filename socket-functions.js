const {
  arrFirstName,
  arrSecondName,
  beginTextForEr,
  socketOptions,
  textBase64,
  urlApiImageFirst,
  urlApiImageSecond
} = require('./constants.js')
const { getRandomInt, getImgFromFetch } = require('./utils.js')
const fs = require('fs')
const defAvaImg = fs.readFileSync('./default-avatar.png') // test img
// deploy img
/*
const defAvaImg =
  'https://cdn.glitch.global/82cd4e3d-c82e-43a6-b002-a39a52ee0763/default-avatar.png?v=1667393767117'
*/

const defAvaBase64 =
  textBase64 + Buffer.from(defAvaImg).toString('base64')

const socketGiveName = async (socket, users, io) => {
  let firstName = arrFirstName[getRandomInt(arrFirstName.length)]
  let secondtName = arrSecondName[getRandomInt(arrSecondName.length)]

  let obj = {
    name: firstName + ' ' + secondtName,
    id: socket.id,
    avatar: defAvaBase64
  }

  try {
    const result = await getImgFromFetch(urlApiImageFirst)
    obj.avatar = result
  } catch (error) {
    console.error(beginTextForEr, error)
    try {
      const result = await getImgFromFetch(urlApiImageSecond)
      obj.avatar = result
    } catch (error) {
      console.error(beginTextForEr, error)
    }
  }

  users.set(socket.id, obj)
  socket.emit(socketOptions.giveName, obj)
  io.emit(socketOptions.getNewUser, obj)
  socket.emit(socketOptions.giveAllUsers, [...users.values()])
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

const socketAddOldUser = (socket, users, io, user) => {
  users.set(socket.id, user)
  io.emit(socketOptions.addOldUser, socket.id)
  io.emit(socketOptions.getNewUser, user)
}

const socketSendAllUsers = (users, io) => {
  io.emit(socketOptions.giveAllUsers, [...users.values()])
}

module.exports = {
  socketAddOldUser,
  socketDisconnect,
  socketGiveName,
  socketSendAllUsers,
  socketSendChatMessage
}
