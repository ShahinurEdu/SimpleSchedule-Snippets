# Step 13: The Complete App with a Public Booking Page

**Goal:** Connect the Step 6 calendar to the server. Every user gets a **public link** to share. Guests open it, pick a date and time, enter their name, and the appointment shows up in the user's dashboard.

**Files:**

- `server.js` (**changed**): 2 public routes.
- `public/booking.html` and `public/booking.js` (**new**): the Step 6 calendar plus a details form.
- `public/dashboard.html` and `public/dashboard.js` (**changed**): show your booking link.

## The public API (no sign in needed)

| Method | URL | What it does |
|---|---|---|
| GET | `/api/booking-info?host=EMAIL&date=YYYY-MM-DD` | Host's name, plus the times already taken that day |
| POST | `/api/book` | `{ hostEmail, date, time, guestName, guestEmail, notes }` creates an appointment for the host |

## Steps

**Server:**

1. **`handleBookingInfo()`:** `new URL(req.url, "http://localhost")` lets us read `?host=...&date=...`. It finds the host and lists the taken times with `map()`.
2. **`handleBook()`:** checks the data, finds the host, and **refuses double bookings** (`findOne` with the same date, time, and `"upcoming"`), then `insertOne`.

**Browser (`booking.js`), compared with Step 6's `calendar.js`:**

3. `new URLSearchParams(window.location.search).get("host")` reads the host's email from the address bar.
4. Times are now stored as `"09:00"` (like the database) and shown as `"9:00 AM"` with `formatTime()`.
5. Picking a day asks the server for the taken times, and only the **free** times are shown.
6. Picking a time shows the **Enter your details** form. Confirm sends `POST /api/book`.
7. On success, the calendar hides and "You're booked, NAME!" appears.

**Dashboard:** `loadUser()` builds the link `booking.html?host=<your email>` and shows it in "Your booking page".

## Run it

```bash
cd 13-booking-page
npm install
npm start
```

1. Create an account and sign in.
2. On the Dashboard, open the link under **Your booking page** (it opens a new tab).
3. Book a time as a guest.
4. Go back to the dashboard tab and refresh: the booking is in **Appointments**.
5. Open the booking page again: that time is gone for that day.

## Ideas to finish the project

- **Availability page:** save the weekly hours in MongoDB and use them in `booking.js` instead of `allTimes` and "no weekends".
- **Settings page:** save name, time zone, and meeting link.
- **Forgot password** page (from the prototype). Just show "Check your email". No real email is needed for the demo.
- **Past** tab on Appointments.
- **Deploy it:** any host that runs Node.js plus a free MongoDB Atlas database (set `MONGODB_URI` and `PORT`).
