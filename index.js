// Создание сервера
const server = require('http').createServer()
// Берём API socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
}) 

const arrFirstName = ['Радиоактивный', 'Непомнящий', 'Большой', 'Средний', 'Маленький', 'Оранжевый', 'Ежовый', 'Ёжовый']
const arrSecondName = ['Медведь', 'Человек', 'Паук', 'Томат', 'Кетчуп', 'Урюпинец', 'Еж', 'Ёж']

const users = []

/**
 * Получить псевдо рандомное число от 0 до max.
 * max в результат не входит
 * @param max 
 * @returns 
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Подключаем клиенты
io.on('connection', (socket) => {
  console.log('connection ', socket.id)

  socket.on("give a name", () => {
    let firstName = arrFirstName[getRandomInt(arrFirstName.length)]
    let secondtName = arrSecondName[getRandomInt(arrSecondName.length)]
    console.log(' f: ', firstName)
    console.log(' s: ', secondtName)
    users.push({
      name: firstName + ' ' + secondtName,
      id: socket.id
    })
    console.log(' users: ', users)

    socket.emit("give a name", firstName + ' ' + secondtName)
    io.emit('add new user', {
      name: firstName + ' ' + secondtName,
      id: socket.id
    })
    socket.emit("now list users", users)
  })

  socket.on('disconnect', () => {
    console.log('disconnected - ', socket.id)
    let indexElRemove
    let idElRemove
    users.map( (el, num) => {
      if (el.id === socket.id) {
        indexElRemove = num
        idElRemove = socket.id 
      }
    })
    users.splice(indexElRemove, 1)

    io.emit('remove user', idElRemove)
    console.log(' users: ', users)
  })
})
 
// Назначаем порт для сервера
server.listen(3000)