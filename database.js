const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const database = {};

database.connect = async () => {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB client');
  } catch (error) {
    console.log(error);
  }

  database.db = client.db(process.env.DB_NAME);
};

module.exports = database;
