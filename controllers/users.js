const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err}`);
      res.status(500).send({ message: 'Error!' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
        return;
      }
      res.status(404).send({ message: 'Not found' });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err}`);
      res.status(500).send({ message: 'Error!' });
    });
};

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err}`);
      res.status(500).send({ message: 'Error!' });
    });
};

module.exports = { getUsers, getUser, createUser };
