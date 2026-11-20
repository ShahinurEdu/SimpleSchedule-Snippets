# Step 10: Registration API (Save Users in MongoDB)

**Goal:** The Create account page now really creates an account: the browser sends the form to `POST /api/register`, and the server saves the user in MongoDB with a **hashed** password.

**Files:**

- `database.js` (**new**): connects to MongoDB once and shares the connection.
- `server.js` (**changed**): new helpers and the register route.
- `public/register.js` (**changed**): uses `fetch()`.

> Sign in is still fake in this step (Step 11 makes it real).

## The flow

```
register.html  --fetch POST /api/register {name, email, password}-->  server.js
                                                                        | checks the data
                                                                        | checks the email isn't used
                                                                        | hashes the password
                                                                        v
                                                              MongoDB "users" collection
```

## Steps

**Server (`server.js`):**

1. **`readBody(req)`:** POST data arrives in pieces. We collect them, then `JSON.parse` them.
2. **`hashPassword(password, salt)`:** uses Node's built-in `crypto.scryptSync`. **We never save the real password.** Each user gets a random `salt`, so two users with the same password still get different hashes.
3. **`handleRegister()`:**
   1. Check the data **again**. The browser can be skipped, so the server must check too.
   2. `findOne({ email })`: is this email already used? If yes, answer **409**.
   3. `insertOne({ name, email, salt, passwordHash, createdAt })`, then answer **201**.
4. **Router:** `POST /api/register` goes to `handleRegister`.
5. **`start()`:** connect to MongoDB **first**, then `listen`.

**Browser (`public/register.js`):**

6. `fetch("/api/register", { method: "POST", headers: {...}, body: JSON.stringify({...}) })`
7. `response.ok` is `true` for 200–299. If it's not OK, show `data.error` from the server.

## Status codes we use

| Code | Meaning |
|---|---|
| 200 / 201 | OK / Created |
| 400 | Bad data (for example, password too short) |
| 409 | Conflict (email already used) |
| 500 | Our server had a problem |

## Run it

```bash
cd 10-register-api
npm install
npm start
```

Open http://localhost:3000/register.html and create an account. Then look in MongoDB Compass: `simpleschedule` → `users`. You will see `passwordHash`, **not** the password.

> **Tip:** `npm run dev` restarts the server automatically every time you save a file.

## Try it yourself

- Try registering the same email twice.
- Use the browser's DevTools → **Network** tab to see the request and the JSON answer.
