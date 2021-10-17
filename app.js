const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json()); // подключаем body-парсер
app.use(routes); // подключаем маршруты

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is running on port ${PORT}...`);
});
