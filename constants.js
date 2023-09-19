/**
 * socket io
 */
const socketOptions = {
  addOldUser: 'add old user',
  connect: 'connection',
  disconnect: 'disconnect',
  getNewMessage: 'message for all',
  getNewUser: 'add new user',
  getOldUser: 'remove user',
  giveAllUsers: 'now list users',
  giveName: 'give a name',
  sendChatMessage: 'chat message'
}

/**
 * Other
 */
const arrFirstName = [
  'Ёжовый',
  'Большой',
  'Ежовый',
  'Маленький',
  'Непомнящий',
  'Оранжевый',
  'Радиоактивный',
  'Средний'
]
const arrSecondName = [
  'Ёж',
  'Еж',
  'Кетчуп',
  'Медведь',
  'Паук',
  'Томат',
  'Урюпинец',
  'Человек'
]

const beginTextForEr = ' Erorr in get image: '
const textBase64 = 'data:image/png;base64,'
const urlApiImageFirst = 'https://loremflickr.com/100/100'
const urlApiImageSecond = 'https://random.imagecdn.app/100/100'

module.exports = {
  arrFirstName,
  arrSecondName,
  beginTextForEr,
  socketOptions,
  textBase64,
  urlApiImageFirst,
  urlApiImageSecond
}
