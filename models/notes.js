const database = require('../database');

const Notes = {};

// Get notes
Notes.getAll = (userID, callback) => {
  const notesCollection = database.db.collection('notes');

  notesCollection
    .find({
      userId: userID
    })
    .toArray(callback);
};

// Get note
Notes.get = (noteID, callback) => {
  const notesCollection = database.db.collection('notes');

  notesCollection
    .find({
      _id: noteID
    })
    .sort({
      createdAt: -1
    })
    .toArray((error, notes) => {
      return callback(error, notes[0]);
    });
};

// Add note
Notes.add = (content, userID, callback) => {
  const notesCollection = database.db.collection('notes');

  const note = {
    content: content,
    userId: userID,
    createdAt: new Date(),
    lastUpdatedAt: null
  };

  notesCollection.insertOne(note, (error, addedNote) => {
    callback(error, {
      _id: addedNote.insertedId,
      ...note
    });
  });
};

// Patch note
Notes.patch = (noteID, noteContent, callback) => {
  const notesCollection = database.db.collection('notes');

  notesCollection.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        content: noteContent,
        lastUpdatedAt: new Date()
      }
    },
    {
      returnOriginal: false
    },
    callback
  );
};

// Delete note
Notes.delete = (noteID, callback) => {
  const notesCollection = database.db.collection('notes');

  notesCollection.deleteOne(
    {
      _id: noteID
    },
    callback
  );
};

module.exports = Notes;
