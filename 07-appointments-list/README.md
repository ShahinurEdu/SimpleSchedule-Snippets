# Step 7: The Appointments List (Arrays of Objects)

**Goal:** The Appointments page from the prototype: filter tabs (Upcoming / Cancelled / All), a "New appointment" form, and a list with **Cancel** buttons.

**Files:** `appointments.js` (**new**). `dashboard.html` is changed (the Appointments page). `style.css` adds the "Appointments page" section.

> The data lives in a JavaScript **array**, so a refresh brings the sample data back. In Step 12 the same list is saved in MongoDB.

## Steps (match the numbers in `appointments.js`)

1. **Date helpers.**
   - `toDateString(date)` makes `"2026-12-03"`, the same format as `<input type="date">`.
   - `formatTime("14:30")` makes `"2:30 PM"`.
   - `splitDate("2026-12-03")` makes `{ month: "DEC", day: "3" }`.
2. **The data:** an array of objects. Each appointment has `id`, `guestName`, `guestEmail`, `date`, `time`, `type`, and `status` (`"upcoming"` or `"cancelled"`).
3. **Find the elements.**
4. **`renderAppointments()`:**
   - `filter()` keeps only the appointments for the chosen tab.
   - `sort()` puts them in date and time order.
   - For each one, create a row. **Safety rule:** the row's *shape* comes from `innerHTML`, but anything the user typed goes in with `textContent`. That way nobody can sneak HTML or JavaScript into your page.
5. **`cancelAppointment(id)`:** `find()` the appointment, set `status = "cancelled"`, and draw again.
6. **Filter tabs:** save the tab's `data-filter` and draw again.
7. **Show or hide the form** by adding or removing the `hidden` class.
8. **Add an appointment:** read the form, check it, `push()` it into the array, and draw again.
9. **Draw once** when the page opens.

> **Two script files, one page:** `appointments.js` calls `showPage()`, which lives in `dashboard.js`. That works because both are loaded on the same page, in that order.

## Run it

Open `dashboard.html` and click **Appointments**.

## Try it yourself

- Add a **Past** tab for appointments whose date is before today. Tip: compare `appointment.date < toDateString(new Date())`.
- Show "No appointments here" in a nicer way (an icon, or a button that opens the form).
- Make the Dashboard's numbers (Today / This week) count from the array instead of being typed by hand.
