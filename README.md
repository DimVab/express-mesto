# Проект Mesto: бэкенд

## Обзор
Данный проект выполнен как практическое задание в курсе освоения основ бэкэнда профессии Веб-разработчик.

Проект представляет из себя сервер, написанный на платформе Node.js c помощью фреймворка Express и базы данных MongoDB. Реализованы следующие возможности:
* /users POST добавление пользователя в базу данных
* /users GET просмотр коллекции с пользователями users
* /users/:userId GET просмотр пользователя по его _id
* /users/me PATCH редактирование профиля пользователя
* /users/me/avatar PATCH редактирование аватара пользователя
* /cards POST добавление карточки в базу данных
* /cards GET просмотр коллекции с карточками cards
* /cards/:cardId GET просмотр карточки по её _id
* /cards/:cardId DELETE удаление карточки по её _id
* /cards/:cardId/likes PUT постановка лайка карточке
* /cards/:cardId/likes DELETE снятие лайка у карточки

## Используемые технологии
Для запуска проекта нужно установить:
* Node.js;
* Express.js;
* MongoDB;
* Mongoose
* nodemon - для запуска в режиме разработки

## Запуск проекта

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload

## Планы по доработке

В дальнейшем планируется добавить возможность регистрации и авторизации пользователя, а также подключить сервер к фронтэнду
