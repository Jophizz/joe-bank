const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
let client;

const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  console.log('MongoDB Connected...');
  return client;
};

const getDB = async () => {
  if (!client) {
    await connectDB();
  }
  return client.db('bankApp');
};

module.exports = { connectDB, getDB };
