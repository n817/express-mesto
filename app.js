const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorsHandler = require('./errors/errorsHandler');

const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json()); // подключаем body-парсер

// временное решение авторизации
app.use((req, res, next) => {
  req.user = { _id: '616c63f2bcc039b925bf9774' };
  next();
});

app.use(routes); // подключаем маршруты
app.use(errorsHandler); // подключаем обработчик ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is running on port ${PORT}...`);
});
