// const MongoClient = require("mongodb").MongoClient;
// require("dotenv").config();

// const url = process.env.MONGO_URI;
// const dbName = process.env.DB_NAME;

// const client = new MongoClient(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function connectToDatabase() {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("trainLocationData");

//   // Create a TTL index on the timestamp field
//   // await collection.createIndex(
//   //   { timestamp: 1 },
//   //   { expireAfterSeconds: 90 * 24 * 60 * 60 }
//   // ); // 90 days
//   // console.log("TTL index created on 'timestamp' field");

//   return db;
// }

// module.exports = { connectToDatabase };

const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
