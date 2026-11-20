// =========================================================
// STEP 6 — Draw a month calendar with JavaScript
// =========================================================

// 1. Fixed data
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// The same times are offered on every weekday (from the Figma prototype)
const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

// 2. "Today" at midnight, so we can compare dates fairly
const today = new Date();
today.setHours(0, 0, 0, 0);

// 3. Variables that change while the user clicks around
let shownYear = today.getFullYear();
let shownMonth = today.getMonth();   // careful: 0 = January, 11 = December
let selectedDate = null;             // a Date, or null if nothing is picked
let selectedTime = null;             // a string like "10:00 AM", or null

// 4. Find the elements we need
const monthLabel = document.getElementById("month-label");
const daysGrid = document.getElementById("days-grid");
const prevButton = document.getElementById("prev-month");
const nextButton = document.getElementById("next-month");
const chosenDateText = document.getElementById("chosen-date");
const timeList = document.getElementById("time-list");
const summary = document.getElementById("selected-summary");

// 5. Can this day be booked? (not in the past, and not Saturday/Sunday)
function isAvailable(date) {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  return date >= today && !isWeekend;
}

// 6. Turn a Date into nice text, e.g. "Tuesday, December 1"
function formatLongDate(date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

// 7. Draw the whole month
function drawCalendar() {
  monthLabel.textContent = monthNames[shownMonth] + " " + shownYear;
  daysGrid.innerHTML = ""; // remove the old days first

  // Which weekday is the 1st of the month? (0 = Sunday)
  const firstWeekday = new Date(shownYear, shownMonth, 1).getDay();

  // How many days in this month? Trick: "day 0" of NEXT month = last day of THIS month
  const daysInMonth = new Date(shownYear, shownMonth + 1, 0).getDate();

  // a) Empty boxes so the 1st lands under the right weekday
  for (let i = 0; i < firstWeekday; i++) {
    const emptyBox = document.createElement("div");
    daysGrid.appendChild(emptyBox);
  }

  // b) One button for every day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(shownYear, shownMonth, day);

    const button = document.createElement("button");
    button.textContent = day;
    button.className = "day";

    if (isAvailable(date)) {
      button.classList.add("available");
      button.addEventListener("click", function () {
        selectDate(date);
      });
    } else {
      button.disabled = true; // grey and not clickable
    }

    // Highlight the day the user picked
    if (selectedDate !== null && date.getTime() === selectedDate.getTime()) {
      button.classList.add("selected");
    }

    daysGrid.appendChild(button);
  }
}

// 8. The user clicked a day
function selectDate(date) {
  selectedDate = date;
  selectedTime = null; // a new day means pick a time again
  drawCalendar();      // redraw so the new day is highlighted
  drawTimes();
}

// 9. Show the time buttons for the chosen day
function drawTimes() {
  chosenDateText.textContent = formatLongDate(selectedDate);
  timeList.innerHTML = "";

  availableTimes.forEach(function (time) {
    const button = document.createElement("button");
    button.textContent = time;
    button.className = "time-button";

    if (time === selectedTime) {
      button.classList.add("selected");
    }

    button.addEventListener("click", function () {
      selectedTime = time;
      drawTimes(); // redraw so the new time is highlighted
    });

    timeList.appendChild(button);
  });

  // Show what the user picked
  if (selectedTime !== null) {
    summary.textContent = "You picked " + formatLongDate(selectedDate) + " at " + selectedTime + ".";
  } else {
    summary.textContent = "";
  }
}

// 10. Previous / next month buttons
prevButton.addEventListener("click", function () {
  shownMonth = shownMonth - 1;
  if (shownMonth < 0) {        // before January -> December of last year
    shownMonth = 11;
    shownYear = shownYear - 1;
  }
  drawCalendar();
});

nextButton.addEventListener("click", function () {
  shownMonth = shownMonth + 1;
  if (shownMonth > 11) {       // after December -> January of next year
    shownMonth = 0;
    shownYear = shownYear + 1;
  }
  drawCalendar();
});

// 11. Draw the calendar when the page first opens
drawCalendar();
