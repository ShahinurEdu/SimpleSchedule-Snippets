// =========================================================
// STEP 8 — A tiny web server using ONLY Node.js built-in modules
// Run it with:  node server.js   then open http://localhost:3000
// =========================================================

// 1. Built-in Node.js modules (nothing to install)
const http = require("http"); // makes the web server
const fs = require("fs");     // reads files from the disk
const path = require("path"); // builds file paths safely

const PORT = 3000;
const PUBLIC_FOLDER = path.join(__dirname, "public"); // our HTML, CSS and JS live here

// 2. The browser needs to know what kind of file it is getting
const contentTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

// 3. Helper: send data back as JSON
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// 4. Helper: send a file from the public folder
function sendFile(res, urlPath) {
  // "/" means the home page
  if (urlPath === "/") {
    urlPath = "/index.html";
  }

  const filePath = path.join(PUBLIC_FOLDER, urlPath);

  // Safety check: never send files from outside the public folder
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
    const extension = path.extname(filePath);             // ".html", ".css", ...
    const type = contentTypes[extension] || "text/plain";
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  });
}

// 5. The server: this function runs for EVERY request the browser makes
const server = http.createServer(function (req, res) {
  const urlPath = req.url.split("?")[0]; // ignore anything after "?"
  console.log(req.method + " " + urlPath);  // see every request in the terminal

  // Our first API route: it answers with JSON instead of a file
  if (req.method === "GET" && urlPath === "/api/hello") {
    sendJson(res, 200, { message: "Hello from your Node.js server!", time: new Date() });
    return;
  }

  // Everything else: try to send a file from /public
  sendFile(res, urlPath);
});

// 6. Start listening
server.listen(PORT, function () {
  console.log("Server running at http://localhost:" + PORT);
  console.log("Press Ctrl + C to stop it.");
});
