# Step 11: Sign In, Sign Out, and Protected Pages

**Goal:** Real sign in. The server checks the password and gives the browser a **token** (like a wristband at a concert). The browser shows the token on every request so the server knows who it is.

**Files:**

- `server.js` (**changed**): `getLoggedInUser()` plus 3 new routes.
- `public/login.js` (**changed**): uses `fetch()` and saves the token.
- `public/dashboard.js` (**changed**): only signed-in users can stay, it shows the real name and email, and Sign out really works.

## The flow

```
1. Sign in:   POST /api/login {email, password}
              server: find user -> hash the typed password -> compare
              server: make a random token, save it in "sessions" -> send it back
              browser: localStorage.setItem("token", token)

2. Later:     GET /api/me    with header  Authorization: Bearer <token>
              server: find the token in "sessions" -> find the user -> send name + email

3. Sign out:  POST /api/logout  -> server deletes the token
              browser: localStorage.removeItem("token")
```

## Steps

**Server (`server.js`):**

1. **`handleLogin()`:** hash the typed password with the user's `salt` and compare it with `passwordHash`. If it's wrong, answer **401** with "Wrong email or password." (the same message even when the email doesn't exist, so strangers can't learn who has an account).
2. Make a token with `crypto.randomBytes(32)`, then save `{ token, userId }` in the `sessions` collection.
3. **`getLoggedInUser(req)`:** read the `Authorization` header, find the session, then find the user.
4. **`handleMe()`:** sends only `name` and `email`. **Never send `passwordHash` or `salt`.**
5. **`handleLogout()`:** deletes the session.

**Browser:**

6. **`login.js`:** on success, `localStorage.setItem("token", data.token)`, then go to the dashboard. If a token already exists, skip the sign in page.
7. **`dashboard.js`:**
   - No token? Go back to `index.html`.
   - **`apiRequest(method, url, data)`:** one helper that adds the token to every `fetch`. If the server answers 401, it signs out.
   - **`loadUser()`:** shows the name, email, and initials.
   - **Sign out** calls `/api/logout`, then removes the token.

## Run it

```bash
cd 11-login-api
npm install
npm start
```

Create an account at http://localhost:3000/register.html, then sign in.

Try opening http://localhost:3000/dashboard.html in a **private window**. You are sent back to sign in.

## Try it yourself

- Show "Good morning, Alex" in the title using the real first name.
- Make sessions expire after 7 days. Tip: compare `session.createdAt` with today's date in `getLoggedInUser`.
