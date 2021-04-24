const fetch = require('node-fetch');

const notes = {};

notes.getAll = async (token) => {
  return await fetch('http://localhost:8080/notes', {
    method: 'GET',
    headers: token ? { 'x-access-token': token } : ''
  });
};

notes.add = async (token) => {
  return await fetch('http://localhost:8080/notes', {
    method: 'PUT',
    body: { content: 'Contenu test' },
    headers: token ? { 'x-access-token': token } : ''
  });
};

notes.patch = async (id, token) => {
  return await fetch(`http://localhost:8080/notes/${id}`, {
    method: 'PATCH',
    body: { content: 'Contenu test' },
    headers: token ? { 'x-access-token': token } : ''
  });
};

notes.delete = async (id, token) => {
  return await fetch(`http://localhost:8080/notes/${id}`, {
    method: 'DELETE',
    headers: token ? { 'x-access-token': token } : ''
  });
};

module.exports = notes;
