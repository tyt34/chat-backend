import { socketOptions } from './constants'
import {
  socketAddOldUser,
  socketDisconnect,
  socketGiveName,
  socketSendAllUsers,
  socketSendChatMessage,
} from './socket-functions'
import { MessageType } from './types'
const server = require('http').createServer()
const { Server } = require('socket.io')

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

// const port = 3000 // deploy port
const port = 3001 // test port

console.info(' Work on port: ', port)

/**
 * Список пользователей, которые сейчас online
 */
const users = new Map()

io.on(socketOptions.connect, (socket) => {
  /**
   * Присваивание имени пользователю
   */
  socket.on(socketOptions.giveName, () => {
    socketGiveName(socket, users, io)
  })

  /**
   * Отправка сообщения о пользователе, который отключился
   */
  socket.on(socketOptions.disconnect, () => {
    socketDisconnect(socket, users, io)
  })

  /**
   * Получение сообщения и отправка его всем пользователям чата
   */
  socket.on(socketOptions.sendChatMessage, (msg: MessageType) => {
    socketSendChatMessage(socket, users, io, msg)
  })

  socket.on(socketOptions.addOldUser, (user) => {
    socketAddOldUser(socket, users, io, user)
  })

  socket.on(socketOptions.giveAllUsers, () => {
    socketSendAllUsers(users, io)
  })
})

server.listen(port)
