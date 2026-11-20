# Step 6: Display a Month Calendar

**Goal:** Build the booking calendar from the prototype: pick a date, then pick a time. Weekends and past days are greyed out.

**Files:** `booking.html`, `calendar.js`, `style.css`. This step works on its own; Step 13 connects it to the server.

## Key idea

The HTML has an **empty** `<div id="days-grid">`. JavaScript creates one `<button>` for each day of the month. CSS Grid with **7 columns** (`repeat(7, 1fr)`) puts them under SUN, MON, ... SAT.

## Steps (match the numbers in `calendar.js`)

1. **Fixed data:** month names and the list of times.
2. **Today at midnight:** `today.setHours(0, 0, 0, 0)` lets us compare dates without the clock time.
3. **State variables:** `shownYear`, `shownMonth` (careful: **0 = January**), `selectedDate`, `selectedTime`.
4. **Find the elements.**
5. **`isAvailable(date)`:** not in the past and not on a weekend. `getDay()` gives 0 for Sunday and 6 for Saturday.
6. **`formatLongDate(date)`:** `toLocaleDateString` makes "Tuesday, December 1".
7. **`drawCalendar()`:** the important part.
   - Which weekday is the 1st? `new Date(year, month, 1).getDay()`
   - How many days? `new Date(year, month + 1, 0).getDate()`. Day **0** of next month is the **last day** of this month.
   - Add empty boxes first, so the 1st lands under the right weekday.
   - Then add one button per day: available days are clickable, the others are `disabled`.
8. **`selectDate(date)`:** save the date and redraw.
9. **`drawTimes()`:** one button per time. Clicking one saves it and redraws.
10. **‹ › buttons:** go back or forward one month. Going below January (0) wraps to December (11) of the previous year.
11. **`drawCalendar()`** runs once when the page opens.

## Run it

Open `booking.html`.

## Try it yourself

- Make Saturdays available too.
- Draw a small dot under **today's** date.
- Don't allow going back before the current month (disable the ‹ button).
