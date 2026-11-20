// =========================================================
// STEP 11 — Sign in, sign out, and pages only for signed-in users
// Built with ONLY Node.js built-in modules + the MongoDB driver.
// Run it with:  npm install  (first time only)  then  npm start
// =========================================================

// ---------- 1. Modules ----------
const http = require("http");     // built in: the web server
const fs = require("fs");         // built in: read files
const path = require("path");     // built in: build file paths
const crypto = require("crypto"); // built in: scramble (hash) passwords, make random tokens
const { connectToDatabase } = require("./database"); // our own file

const PORT = process.env.PORT || 3000;
const PUBLIC_FOLDER = path.join(__dirname, "public");

let db; // the database. It is filled in by start() at the bottom of this file.

const contentTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

// =========================================================
// ---------- 2. Helper functions ----------
// =========================================================

// Send data back to the browser as JSON
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Send a file from the public folder (same as Step 8)
function sendFile(res, urlPath) {
  if (urlPath === "/") {
    urlPath = "/index.html";
  }
  const filePath = path.join(PUBLIC_FOLDER, urlPath);
  if (!filePath.startsWith(PUBLIC_FOLDER)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, function (error, content) {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found");
      return;
    }
    const type = contentTypes[path.extname(filePath)] || "text/plain";
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  });
}

// Read the JSON the browser sent in a POST request.
// The data arrives in small pieces ("chunks"), so we collect them first.
function readBody(req) {
  return new Promise(function (resolve) {
    let body = "";
    req.on("data", function (chunk) {
      body = body + chunk;
    });
    req.on("end", function () {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        resolve({}); // the body was not valid JSON
      }
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Scramble a password so we NEVER store the real one.
// The same password + the same "salt" always gives the same hash,
// but nobody can turn the hash back into the password.
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

// Who is signed in? The browser sends:  Authorization: Bearer <token>
// We look the token up in the "sessions" collection.
async function getLoggedInUser(req) {
  const header = req.headers["authorization"] || "";
  const token = header.replace("Bearer ", "");
  if (token === "") {
    return null;
  }
  const session = await db.collection("sessions").findOne({ token: token });
  if (!session) {
    return null;
  }
  return await db.collection("users").findOne({ _id: session.userId });
}

// =========================================================
// ---------- 3. Route handlers (one function per API route) ----------
// =========================================================

// POST /api/register  — create a new user
async function handleRegister(req, res) {
  const body = await readBody(req);
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  // a) Check the data AGAIN on the server. Never trust the browser!
  if (name.length < 2) {
    sendJson(res, 400, { error: "Please enter your full name." });
    return;
  }
  if (!isValidEmail(email)) {
    sendJson(res, 400, { error: "Please enter a valid email address." });
    return;
  }
  if (password.length < 6) {
    sendJson(res, 400, { error: "Password must be at least 6 characters." });
    return;
  }

  // b) Is this email already used?
  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    sendJson(res, 409, { error: "An account with this email already exists." });
    return;
  }

  // c) Save the new user with a hashed password
  const salt = crypto.randomBytes(16).toString("hex"); // random text, different for every user
  await db.collection("users").insertOne({
    name: name,
    email: email,
    salt: salt,
    passwordHash: hashPassword(password, salt),
    createdAt: new Date()
  });

  sendJson(res, 201, { message: "Account created! You can sign in now." });
}

// POST /api/login  — check the password, then give the browser a token
async function handleLogin(req, res) {
  const body = await readBody(req);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  // a) Find the user, then hash the typed password the same way and compare
  const user = await db.collection("users").findOne({ email: email });
  if (!user || hashPassword(password, user.salt) !== user.passwordHash) {
    // Same message for both cases, so strangers can't learn which emails exist
    sendJson(res, 401, { error: "Wrong email or password." });
    return;
  }

  // b) Make a long random "token" and remember it in the sessions collection
  const token = crypto.randomBytes(32).toString("hex");
  await db.collection("sessions").insertOne({
    token: token,
    userId: user._id,
    createdAt: new Date()
  });

  // c) Send the token to the browser. It will send it back with every request.
  sendJson(res, 200, { token: token, name: user.name, email: user.email });
}

// GET /api/me  — who am I?
async function handleMe(req, res) {
  const user = await getLoggedInUser(req);
  if (!user) {
    sendJson(res, 401, { error: "Please sign in first." });
    return;
  }
  // Only send safe fields. NEVER send salt or passwordHash to the browser.
  sendJson(res, 200, { name: user.name, email: user.email });
}

// POST /api/logout  — forget this token
async function handleLogout(req, res) {
  const header = req.headers["authorization"] || "";
  const token = header.replace("Bearer ", "");
  await db.collection("sessions").deleteOne({ token: token });
  sendJson(res, 200, { message: "Signed out." });
}

// =========================================================
// ---------- 4. The router: which handler runs for which URL ----------
// =========================================================
const server = http.createServer(async function (req, res) {
  const urlPath = req.url.split("?")[0];
  console.log(req.method + " " + urlPath);

  try {
    if (req.method === "POST" && urlPath === "/api/register") {
      await handleRegister(req, res);
      return;
    }
    if (req.method === "POST" && urlPath === "/api/login") {
      await handleLogin(req, res);
      return;
    }
    if (req.method === "GET" && urlPath === "/api/me") {
      await handleMe(req, res);
      return;
    }
    if (req.method === "POST" && urlPath === "/api/logout") {
      await handleLogout(req, res);
      return;
    }

    // An /api/ address we don't know
    if (urlPath.startsWith("/api/")) {
      sendJson(res, 404, { error: "API route not found." });
      return;
    }

    // Anything else is a file: index.html, style.css, ...
    sendFile(res, urlPath);
  } catch (error) {
    console.log("Server error:", error);
    sendJson(res, 500, { error: "Something went wrong on the server." });
  }
});

// =========================================================
// ---------- 5. Connect to MongoDB, THEN start the server ----------
// =========================================================
async function start() {
  try {
    db = await connectToDatabase();
    server.listen(PORT, function () {
      console.log("Server running at http://localhost:" + PORT);
    });
  } catch (error) {
    console.log("❌ Could not connect to MongoDB:", error.message);
    console.log("Start MongoDB first (see the README), then run npm start again.");
    process.exit(1);
  }
}

start();
