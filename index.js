// Создание сервера
const server = require('http').createServer();
// Берём API socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
}); 
// Подключаем клиенты
io.on('connection', (a) => {
    // Выводим в консоль 'connection'
    console.log('connection ', a.id)
    // Отправляем всем кто подключился сообщение привет
    io.emit('hello', 'Привет')
    // Что делать при случае дисконнекта
    io.on('disconnect', () => {
        // Выводи 'disconnected'
        console.log('disconnected');
    });
});
 
// Назначаем порт для сервера
server.listen(3000);