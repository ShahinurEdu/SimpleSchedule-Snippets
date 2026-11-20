# Step 9: Connect to MongoDB

**Goal:** Prove that Node.js can talk to MongoDB: save one document and read it back.

**Files:** `test-connection.js`, `package.json`

## Before you start

MongoDB must be running. See "What you need to install" in the main README.

- **Local MongoDB:** nothing to change. The code uses `mongodb://127.0.0.1:27017`.
- **Atlas:** set `MONGODB_URI` to your connection string (see the main README).

## MongoDB words

| MongoDB | Is like... |
|---|---|
| **database** (`simpleschedule`) | a whole spreadsheet file |
| **collection** (`users`, `appointments`) | one sheet in it |
| **document** (`{ name: "Alex", ... }`) | one row, written as a JavaScript object |
| `_id` | the unique id MongoDB gives every document |

## Steps (match the numbers in `test-connection.js`)

1. `require("mongodb")` loads the MongoDB **driver**. It is the only package we install in this whole project.
2. Choose the connection string.
3. `async function main()` lets us use `await`. Database work takes time, so we wait for each answer.
4. `client.db("simpleschedule").collection("test")` picks the database and the collection. MongoDB creates them automatically the first time you save something.
5. **Create:** `insertOne({ ... })`
6. **Read:** `find().toArray()`
7. **Always** `client.close()` (inside `finally`).

## Run it

```bash
cd 09-mongodb-connect
npm install      # downloads the mongodb driver into node_modules/ (first time only)
npm start        # same as: node test-connection.js
```

Run it 3 times. The number of documents grows each time, because the data is **saved**.

## Try it yourself

- Use `find({ message: "Hello MongoDB!" })` to search.
- Delete all test documents with `deleteMany({})`.
- Open **MongoDB Compass**, connect, and find your `simpleschedule` database.
