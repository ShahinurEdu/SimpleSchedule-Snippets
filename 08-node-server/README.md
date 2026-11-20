# Step 8: Your First Node.js Server

**Goal:** Serve the app from a real web server instead of opening files by double-clicking. We use **only Node.js built-in modules**, so there is nothing to install.

**Files:** `server.js` (**new**), `package.json` (**new**), and `public/`, which holds the finished Step 7 frontend.

## Why do we need a server?

Later steps save data in MongoDB. The browser can't talk to a database directly. It asks **our server**, and our server talks to the database:

```
Browser  --->  Node.js server (server.js)  --->  MongoDB
```

## Steps (match the numbers in `server.js`)

1. **Load the built-in modules:** `http` (the server), `fs` (read files), and `path` (join folder names safely).
2. **`contentTypes`:** tells the browser what kind of file it is getting (HTML, CSS, JS...).
3. **`sendJson()`:** sends data back as JSON. This is what an **API** answers with.
4. **`sendFile()`:**
   - `"/"` becomes `"/index.html"`.
   - It finds the file inside `public/` and sends it, or sends **404** if it doesn't exist.
   - A **safety check** makes sure nobody can read files outside `public/`.
5. **`http.createServer(...)`:** this function runs for **every** request.
   - `GET /api/hello` answers with JSON.
   - Everything else is treated as a file.
6. **`server.listen(3000)`** starts it.

## Run it

```bash
cd 08-node-server
node server.js
```

Then open:

- http://localhost:3000 for the app
- http://localhost:3000/api/hello for JSON from your server

Watch the terminal: every request is printed. Press **Ctrl + C** to stop the server.

## Try it yourself

- Add a route `GET /api/time` that returns `{ "time": "..." }`.
- Make a nicer 404 page: create `public/404.html` and send it instead of the plain text.
