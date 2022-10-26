const {
  socketOptions
} = require('./constants.js')
const {
  socketGiveName, socketDisconnect
} = require('./socket-functions.js')
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
   * Получение сообщений
   */
  socket.on(socketOptions.sendChatMessage, (msg) => {
    socketSendChatMessage(socket, users, io, msg)
  })
})
 
server.listen(3000)