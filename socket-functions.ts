import {
  arrFirstName,
  arrSecondName,
  beginTextForEr,
  socketOptions,
  textBase64,
  urlApiImageFirst,
  urlApiImageSecond,
} from './constants'
import { getImgFromFetch, getRandomInt } from './utils'
const fs = require('fs')
const defAvaImg = fs.readFileSync('./default-avatar.png') // test img
// deploy img
/*
const defAvaImg =
  'https://cdn.glitch.global/82cd4e3d-c82e-43a6-b002-a39a52ee0763/default-avatar.png?v=1667393767117'
*/

const defAvaBase64 = textBase64 + Buffer.from(defAvaImg).toString('base64')

export const socketGiveName = async (socket, users, io) => {
  let firstName = arrFirstName[getRandomInt(arrFirstName.length)]
  let secondtName = arrSecondName[getRandomInt(arrSecondName.length)]

  let obj = {
    name: firstName + ' ' + secondtName,
    id: socket.id,
    avatar: defAvaBase64,
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

  const usersArray = Array.from(users.values())

  socket.emit(socketOptions.giveAllUsers, usersArray)
}

export const socketDisconnect = (socket, users, io) => {
  if (users.get(socket.id)) {
    io.emit(socketOptions.getOldUser, users.get(socket.id).id)
    users.delete(socket.id)
  }
}

export const socketSendChatMessage = (socket, users, io, msg) => {
  const userSending = users.get(socket.id)

  const message = {
    id: userSending.id,
    message: msg.message,
    avatar: userSending.avatar,
    imageFile: msg.imageFile,
    name: userSending.name,
  }

  console.info({ message })

  io.emit(socketOptions.getNewMessage, message)
}

export const socketAddOldUser = (socket, users, io, user) => {
  const { id } = socket
  users.set(id, user)
  io.emit(socketOptions.addOldUser, id)
  io.emit(socketOptions.getNewUser, user)
}

export const socketSendAllUsers = (users, io) => {
  const usersArray = Array.from(users.values())

  io.emit(socketOptions.giveAllUsers, usersArray)
}
