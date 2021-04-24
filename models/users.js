const database = require('../database');

const Users = {};

// Get users
Users.getAll = async () => {
  const usersCollection = database.db.collection('users');
  return await usersCollection.find().toArray();
};

// Insert user
Users.insert = (user) => {
  const usersCollection = database.db.collection('users');
  usersCollection.insertOne(user);
};

module.exports = Users;
