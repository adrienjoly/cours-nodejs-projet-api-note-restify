const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config();

const Notes = require('../models/notes');

const NotesController = {};

NotesController.getNotes = (token, callback) => {
  if (!token) {
    return callback(401, 'Utilisateur non connecté');
  }

  jwt.verify(token, process.env.JWT_KEY, (error, authUser) => {
    if (error || !authUser) {
      return callback(401, 'Utilisateur non connecté');
    }

    let userID = authUser._id;

    Notes.getAll(userID, (error, notes) => {
      if (error) {
        return callback(500, 'Impossible de récupérer la liste de notes');
      }
      return callback(200, null, notes);
    });
  });
};

NotesController.addNote = (token, noteContent, callback) => {
  if (!token) {
    return callback(401, 'Utilisateur non connecté');
  }

  jwt.verify(token, process.env.JWT_KEY, (error, authUser) => {
    if (error || !authUser) {
      return callback(401, 'Utilisateur non connecté');
    }

    const userID = authUser._id;

    Notes.add(noteContent, userID, (error, note) => {
      if (error) {
        return callback(500, 'Impossible de créer la note');
      }
      if (note) {
        return callback(200, null, note);
      }
    });
  });
};

NotesController.modifyNote = (token, noteID, noteContent, callback) => {
  if (!token) {
    return callback(401, 'Utilisateur non connecté');
  }

  jwt.verify(token, process.env.JWT_KEY, async (error, authUser) => {
    if (error || !authUser) {
      return callback(401, 'Utilisateur non connecté');
    }

    let formattedNoteID;
    try {
      formattedNoteID = new ObjectID(noteID);
    } catch (error) {
      return callback(404, 'Cet identifiant est inconnu');
    }

    Notes.get(formattedNoteID, (error, note) => {
      if (error || !note) {
        return callback(404, 'Cet identifiant est inconnu');
      }
      if (note.userId !== authUser._id) {
        return callback(403, 'Accès non autorisé à cette note');
      }

      Notes.patch(note._id, noteContent, (error, note) => {
        if (error || !note) {
          return callback(500, 'Impossible de modifier la note');
        }
        return callback(200, null, note.value);
      });
    });
  });
};

NotesController.deleteNote = (token, noteID, callback) => {
  if (!token) {
    return callback(401, 'Utilisateur non connecté');
  }

  jwt.verify(token, process.env.JWT_KEY, async (error, authUser) => {
    if (error || !authUser) {
      return callback(401, 'Utilisateur non connecté');
    }

    let formattedNoteID;
    try {
      formattedNoteID = new ObjectID(noteID);
    } catch (error) {
      return callback(404, 'Cet identifiant est inconnu');
    }

    Notes.get(formattedNoteID, (error, note) => {
      if (error || !note) {
        return callback(404, 'Cet identifiant est inconnu');
      }
      if (note.userId !== authUser._id) {
        return callback(403, 'Accès non autorisé à cette note');
      }

      Notes.delete(note._id, (error) => {
        if (error) {
          return callback(500, 'Impossible de supprimer la note.');
        }
        return callback(200);
      });
    });
  });
};

module.exports = NotesController;
