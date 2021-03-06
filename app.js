const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json()); // подключаем body-парсер
app.use(routes); // подключаем маршруты
app.use(errorHandler); // подключаем обработчик ошибок по умолчанию (код 500)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is running on port ${PORT}...`);
});
