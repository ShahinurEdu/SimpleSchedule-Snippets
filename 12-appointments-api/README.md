# Step 12: Save Appointments in MongoDB

**Goal:** The Appointments page from Step 7, but the data now lives in MongoDB. Refresh the page and everything is still there. The Dashboard numbers and "Today's appointments" are now real too.

**Files:**

- `server.js` (**changed**): 3 appointment routes.
- `public/appointments.js` (**changed**): uses `apiRequest()` instead of changing an array.

## The API

| Method | URL | What it does |
|---|---|---|
| GET | `/api/appointments` | List **my** appointments |
| POST | `/api/appointments` | Add one: `{ guestName, guestEmail, date, time, type }` |
| POST | `/api/appointments/<id>/cancel` | Cancel one |

All three need a signed-in user. Without a token, the answer is **401**.

## Steps

**Server (`server.js`):**

1. **One check for all three routes:** every URL that starts with `/api/appointments` first runs `getLoggedInUser()`.
2. **List:** `find({ userId: user._id })`. Users only ever see **their own** appointments. `.sort({ date: 1, time: 1 })` sorts them by date, then time.
3. **Add:** check the data, then `insertOne({ userId, guestName, ..., status: "upcoming" })`.
4. **Cancel:**
   - Split the URL to get the id: `"/api/appointments/abc/cancel".split("/")`.
   - `new ObjectId(id)` turns the text into a MongoDB id.
   - `updateOne({ _id, userId }, { $set: { status: "cancelled" } })`. Matching `userId` too means **you can't cancel someone else's appointment**.

**Browser (`public/appointments.js`):** compare it with Step 7's file!

5. `let appointments = []`: the list starts empty, then **`loadAppointments()`** fills it from the server.
6. Adding and cancelling call the server, then `loadAppointments()` again.
7. **`renderDashboard()`:** counts today's and this week's appointments for the number boxes.
8. MongoDB ids are called **`_id`**, not `id`.

## Run it

```bash
cd 12-appointments-api
npm install
npm start
```

Sign in, add a few appointments for **today**, and check the Dashboard numbers. Then refresh. Nothing is lost!

## Try it yourself

- Add `DELETE /api/appointments/<id>` that really deletes (`deleteOne`).
- Add an **Edit** button (change the time). You will need a new route with `$set: { time: ... }`.
- Save the **Settings** page: make a `POST /api/settings` route that updates the user's name.
