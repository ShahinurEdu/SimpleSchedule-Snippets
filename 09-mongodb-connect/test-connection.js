// =========================================================
// STEP 9 — Connect to MongoDB, save one document, read it back
// Run it with:  node test-connection.js
// =========================================================

// 1. The official MongoDB driver (installed with "npm install")
const { MongoClient } = require("mongodb");

// 2. Where is MongoDB running?
//    - On your own computer: mongodb://127.0.0.1:27017  (the default below)
//    - On MongoDB Atlas: set the MONGODB_URI environment variable to your Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

const client = new MongoClient(MONGODB_URI);

// 3. "async" lets us use "await" to wait for the database
async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // 4. Pick a database and a collection (MongoDB creates them the first time you save)
    const db = client.db("simpleschedule");
    const testCollection = db.collection("test");

    // 5. CREATE: save one document (a JavaScript object)
    const result = await testCollection.insertOne({
      message: "Hello MongoDB!",
      createdAt: new Date()
    });
    console.log("Saved a document with _id:", result.insertedId);

    // 6. READ: get every document in the collection
    const allDocuments = await testCollection.find().toArray();
    console.log("There are " + allDocuments.length + " documents in the 'test' collection:");
    console.log(allDocuments);
  } catch (error) {
    console.log("❌ Something went wrong:", error.message);
    console.log("Is MongoDB running? Check the README for help.");
  } finally {
    // 7. Always close the connection when we are done
    await client.close();
  }
}

main();
