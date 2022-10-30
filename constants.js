/**
 * socket io
 */
const socketOptions = {
  sendChatMessage: 'chat message',
  giveName: 'give a name',
  giveAllUsers: 'now list users',
  getNewUser: 'add new user',
  getOldUser: 'remove user',
  getNewMessage: 'message for all',
  disconnect: 'disconnect',
  connect: 'connection'
}

/**
 * Other
 */
const arrFirstName = ['Радиоактивный', 'Непомнящий', 'Большой', 'Средний', 'Маленький', 'Оранжевый', 'Ежовый', 'Ёжовый']
const arrSecondName = ['Медведь', 'Человек', 'Паук', 'Томат', 'Кетчуп', 'Урюпинец', 'Еж', 'Ёж']
const urlApiImage = 'https://random.imagecdn.app/100/100'
const beginTextForEr = ' Erorr in get image: '

module.exports = {
  arrFirstName,
  arrSecondName,
  urlApiImage,
  beginTextForEr,
  socketOptions
}