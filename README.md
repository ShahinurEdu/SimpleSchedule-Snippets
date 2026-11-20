# SimpleSchedule: Step-by-Step Code Snippets

**CS 219 · Fall 2026 · Hood College**

These snippets show how to build the **SimpleSchedule** prototype from Figma, one small piece at a time.

**Prototype:** https://violet-surly-41566398.figma.site

Each folder is one step. **Every folder works on its own**, so you can open any step, run it, and compare it with the step before it.

## Tools used (nothing else!)

| Tool | Used for |
|---|---|
| HTML | The pages |
| CSS | The look (colors from the Figma prototype) |
| JavaScript | Clicks, forms, the calendar, talking to the server |
| Node.js | The web server (only built-in modules: `http`, `fs`, `path`, `crypto`) |
| MongoDB | Saving users and appointments (with the official `mongodb` driver) |

No frameworks. No Express, React, Bootstrap, or bcrypt. The only thing `npm install` downloads is the `mongodb` driver, because Node.js needs it to talk to MongoDB.

## The steps

| Step | Folder | What you learn | How to run |
|---|---|---|---|
| 1 | `01-login-page` | HTML form + CSS card layout | Open `index.html` in a browser |
| 2 | `02-registration-page` | A second page and links between pages | Open `index.html` |
| 3 | `03-form-validation` | JavaScript: read inputs, check them, show errors | Open `index.html` |
| 4 | `04-sidebar-layout` | The app layout: sidebar + main area | Open `index.html`, then sign in |
| 5 | `05-menu-navigation` | A menu that switches pages + a phone menu | Open `dashboard.html` |
| 6 | `06-calendar` | Draw a month calendar with JavaScript `Date` | Open `booking.html` |
| 7 | `07-appointments-list` | Arrays of objects: show, filter, add, cancel | Open `dashboard.html` |
| 8 | `08-node-server` | A Node.js web server that serves your pages | `node server.js` |
| 9 | `09-mongodb-connect` | Connect to MongoDB, save a document, read it | `npm install` then `npm start` |
| 10 | `10-register-api` | `POST /api/register`: save users with hashed passwords | `npm install` then `npm start` |
| 11 | `11-login-api` | Sign in, sign out, pages only for signed-in users | `npm install` then `npm start` |
| 12 | `12-appointments-api` | Appointments saved in MongoDB | `npm install` then `npm start` |
| 13 | `13-booking-page` | **The complete app** with a public booking calendar | `npm install` then `npm start` |

Steps 1–7 run in the browser only. Steps 8–13 need Node.js. Steps 9–13 also need MongoDB.

## What you need to install (before Step 8)

1. **Node.js 18 or newer**: https://nodejs.org (choose "LTS"). Check it works by typing `node -v` in a terminal.
2. **MongoDB**, one of these two:
   - **On your computer:** install *MongoDB Community Server* (https://www.mongodb.com/try/download/community). It runs at `mongodb://127.0.0.1:27017`, which is what the code uses by default.
   - **In the cloud:** create a free *MongoDB Atlas* cluster (https://www.mongodb.com/atlas). Copy its connection string, then start the server like this:
     - Mac / Linux: `MONGODB_URI="your-atlas-string" npm start`
     - Windows PowerShell: `$env:MONGODB_URI="your-atlas-string"; npm start`
3. Optional: **MongoDB Compass** (a free app) lets you *see* the data in your database.

## How to read a step

1. Read the step's `README.md` first.
2. Open the code. Comments like `// 1.`, `// 2.` match the numbered steps in the README.
3. Look for **`NEW in Step X`** and **`CHANGED`** comments. They show what is different from the step before.
4. Run it, then do the "Try it yourself" tasks.

## Tip: compare two steps

In VS Code, select two files (Ctrl/Cmd + click), then right-click and choose **Compare Selected**. For example, compare `07-appointments-list/appointments.js` with `12-appointments-api/public/appointments.js` to see exactly what changed when the data moved into MongoDB.
