# Step 4: The Dashboard Layout with a Sidebar

**Goal:** Build the main app screen: a fixed sidebar on the left and the content on the right.

**Files:** `dashboard.html` (**new**). `login.js` is changed so a valid form now opens the dashboard. `style.css` adds the "App layout" section.

> This is a **fake** sign in. Any valid email and a 6+ character password opens the dashboard. Real sign in comes in Step 11.

## Steps

1. **Sidebar** (`<aside class="sidebar">`):
   - The logo at the top.
   - A `<nav>` with 4 links: Dashboard, Appointments, Availability, Settings. The current page gets the class `active`.
   - A `.sidebar-footer` with the avatar (initials), name, email, and **Sign out**.
2. **Sidebar CSS:**
   - `position: fixed; height: 100vh; width: 240px;` keeps it on the left, full height, even when you scroll.
   - `display: flex; flex-direction: column;` stacks the items, and `margin-top: auto` on the footer pushes it to the bottom.
3. **Main area** (`<main class="main">`): `margin-left: 240px` leaves room for the sidebar.
4. **Top bar:** the heading on the left and the blue "+ New appointment" button on the right (`justify-content: space-between`).
5. **Number boxes:** `.stats-grid` uses **CSS Grid**: `grid-template-columns: repeat(3, 1fr)` makes 3 equal columns.
6. **Today's appointments:** each `.appointment-row` is a Flexbox row: avatar | name and type | time. `flex: 1` on the middle part makes it take the free space.

## Run it

Open `index.html`, type any valid email and a 6+ character password, and click **Sign in**.

## Try it yourself

- Make the window narrow. The layout breaks on small screens! We fix that in Step 5.
- Add a 4th number box ("Cancelled this week") and change the grid to 4 columns.
