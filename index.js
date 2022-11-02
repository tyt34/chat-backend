const {
  socketOptions
} = require('./constants.js')
const {
  socketGiveName, socketDisconnect, socketSendChatMessage
} = require('./socket-functions.js')
const server = require('http').createServer()
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
}) 

const port = 3001

console.log(' work on port: ', port)

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
  socket.on(socketOptions.sendChatMessage, (msg) => {
    socketSendChatMessage(socket, users, io, msg)
  })
})
 
server.listen(port)