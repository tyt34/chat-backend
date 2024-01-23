# Chat Backend

![](https://shields.io/badge/-JavaScript-yellow)
![](https://shields.io/badge/-Node.js-3E863D)
![](https://shields.io/badge/-Socket.io-010101)

## Описание
* Данное приложение это backend однокомнатного чата. Frontend приложение, которое написано на JS доступно по [этой ссылке](https://github.com/tyt34/chat-vanilla-js). Которое написано на ReactJS доступно по [этой ссылке](https://github.com/tyt34/chat-react-js).

## Функциональность
* Авторизация в чате. И получение случайного имени и случайного изображения в качестве аватара. Случайное имя состоит из прилагательного и существительного. Список возможных слов заранее сформирован. Пример случайного имени: *Ежовый Урюпинец*. Для случайного изображения используется [стороннее API](https://random.imagecdn.app).
* Отправка / получение сообщений и изображений.
* Получение информации о пользователе, который отключился от чата.

## API

### Подключение к чату

* Все последующие функции необходимо реализовывать на клиенте для взаимодействия с серверной частью. Для подключения к чату необходимо реализовать функцию, которая отправит запрос:

```
socket.emit('give a name')
```

* Для получения данных о новом пользователе чата, необходимо реализовать функцию, которая получит ответ:

```
socket.on('give a name', (user) => {
  /**
    * Пример ответа: объект - user
    */
  {
    name: Ежовый Урюпинец,
    id: id,
    avatar: ссылка на картинку
  }
})
```

### Получение информации о том, что другой пользователь подключился/отключился

* Для получения данных о том, что подключился новый пользователь необходимо реализовать данную функцию:

```
socket.on('add new user', (user) => {
  /**
    * Пример ответа: объект - user
    */
  {
    name: Ежовый Урюпинец,
    id: id,
    avatar: ссылка на картинку
  }
})
```

* Для получения данных о том, что пользователь отключился необходимо реализовать данную функцию:

```
socket.on('remove user', (id) => {
  /**
    * Пример ответа: строка - id  
    */
})
```

### Отправка сообщения

* Для отправки сообщения необходимо реализовать функцию, которая отправит запрос:

```
socket.emit('chat message', {
  message: Текст сообщения
  imageFile: пустая строка или картинка в формате base64
})
```

### Получение сообщения

* Для получения сообщения от любого пользователя, в том числе и от самого отправителя, необходимо реализовать функцию, которая принимает ответ:

```
socket.on('message for all', (message) => {
  /**
    * Пример ответа: объект - message
    */
  {
    name: Ежовый Урюпинец,
    id: id,
    avatar: ссылка на картинку
    message: Текст сообщения,
    imageFile: пустая строка или картинка в формате base64
  }
})
```

<tr>
    <hr>
</tr>

## Запуск приложения
1. npm i
2. npm run start

- Не забудьте запустить frontend часть. Приложение, которое написано на JS доступно по [этой ссылке](https://github.com/tyt34/chat-vanilla-js). Которое написано на ReactJS доступно по [этой ссылке](https://github.com/tyt34/chat-react-js).



