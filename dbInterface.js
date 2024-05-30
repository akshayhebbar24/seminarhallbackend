const { MongoClient } = require("mongodb");
const MONGO_URI =  "mongodb://127.0.0.1:27017";
const DB_NAME = "admin";

const connectToDb = async (collectionName) => {
  const client = new MongoClient(MONGO_URI);
  const db = client.db(DB_NAME);
  const collectionObj =  db.collection(collectionName);
  return collectionObj;
};


const insertRecords = async (collectionName, document) => {
  const db = await connectToDb(collectionName);
  return await db.insertOne(document);
};

const getRecords = async (collectionName, query) => {
  const db = await connectToDb(collectionName);
  return await db.find(query).toArray();
};

const updateRecords = async(collectionName, query, records) => {
  const db = await connectToDb(collectionName);
  return await db.updateOne(query, records);
};


const deleteRecords = async(collectionName, query) => {
  const db = await connectToDb(collectionName);
  console.log(query);
  return await db.deleteOne(query);
};
module.exports = {insertRecords, getRecords, updateRecords, deleteRecords};