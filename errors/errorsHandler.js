module.exports = (err, req, res, next) => {
  res
    .status(500)
    .send({ message: `Произошла ошибка ${err.name} c текстом ${err.message}` });
  next();
};
