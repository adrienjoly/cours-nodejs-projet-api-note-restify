const fetch = require('node-fetch');

const user = {};

user.signin = async (username, password) => {
  return await fetch('http://localhost:8080/signin', {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
    headers: { 'Content-Type': 'application/json' }
  });
};

user.signup = async (username, password) => {
  return await fetch('http://localhost:8080/signup', {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
    headers: { 'Content-Type': 'application/json' }
  });
};

module.exports = user;
