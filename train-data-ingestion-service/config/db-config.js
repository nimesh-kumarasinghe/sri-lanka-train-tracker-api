const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("trainLocationData");

  // Create a TTL index on the timestamp field
  await collection.createIndex(
    { timestamp: 1 },
    { expireAfterSeconds: 90 * 24 * 60 * 60 }
  ); // 90 days
  console.log("TTL index created on 'timestamp' field");

  return db;
}

module.exports = { connectToDatabase };
