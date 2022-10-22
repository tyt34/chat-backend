/**
 * socket io
 */
const sendChatMessage = 'chat message'
const giveName = 'give a name'
const giveAllUsers = 'now list users'
const getNewUser = 'add new user'
const getOldUser = 'remove user'
const getNewMessage = 'message for all'
const disconnect = 'disconnect'
const connect = 'connection'

/**
 * Other
 */
const defaultAvatar = 'default'
const arrFirstName = ['Радиоактивный', 'Непомнящий', 'Большой', 'Средний', 'Маленький', 'Оранжевый', 'Ежовый', 'Ёжовый']
const arrSecondName = ['Медведь', 'Человек', 'Паук', 'Томат', 'Кетчуп', 'Урюпинец', 'Еж', 'Ёж']
const urlApiImage = 'https://random.imagecdn.app/100/100'
const beginTextForEr = ' Erorr in get image: '

module.exports = {
  sendChatMessage,
  giveName,
  giveAllUsers,
  getNewUser,
  getOldUser,
  getNewMessage,
  disconnect,
  defaultAvatar,
  arrFirstName,
  arrSecondName,
  connect,
  urlApiImage,
  beginTextForEr
}