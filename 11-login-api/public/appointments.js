// =========================================================
// STEP 7 — Show, filter, add and cancel appointments
// The data lives in a JavaScript array for now.
// (It disappears when you refresh. Step 12 saves it in MongoDB.)
// =========================================================

// ---------- 1. Date helpers ----------

// Turn a Date into text like "2026-12-03" (the same format as <input type="date">)
function toDateString(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 3 -> "03"
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

// The date that is "days" days after today, as text
function daysFromToday(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

// Turn "14:30" into "2:30 PM"
function formatTime(timeText) {
  const parts = timeText.split(":");   // "14:30" -> ["14", "30"]
  let hour = Number(parts[0]);
  const minutes = parts[1];
  const amPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }
  return hour + ":" + minutes + " " + amPm;
}

// Turn "2026-12-03" into { month: "DEC", day: "3" }
// (We split the text ourselves. new Date("2026-12-03") can show the wrong day in US time zones.)
function splitDate(dateText) {
  const parts = dateText.split("-");   // ["2026", "12", "03"]
  const monthShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return {
    month: monthShort[Number(parts[1]) - 1],
    day: String(Number(parts[2]))
  };
}

// ---------- 2. Our data ----------

let appointments = [
  { id: 1, guestName: "Jordan Miller", guestEmail: "jordan@example.com", date: daysFromToday(0), time: "10:00", type: "Project discussion", status: "upcoming" },
  { id: 2, guestName: "Avery Kim", guestEmail: "avery@example.com", date: daysFromToday(0), time: "11:30", type: "Quick meeting", status: "upcoming" },
  { id: 3, guestName: "Riley Smith", guestEmail: "riley@example.com", date: daysFromToday(1), time: "14:00", type: "Project discussion", status: "upcoming" },
  { id: 4, guestName: "Sam Lee", guestEmail: "sam@example.com", date: daysFromToday(2), time: "09:00", type: "Check-in", status: "cancelled" }
];
let nextId = 5;                 // the id for the next new appointment
let currentFilter = "upcoming"; // which tab is selected

// ---------- 3. Find the elements we need ----------

const appointmentList = document.getElementById("appointment-list");
const recordsHeading = document.getElementById("records-heading");
const filterButtons = document.querySelectorAll(".filter-button");
const appointmentForm = document.getElementById("appointment-form");
const toggleFormButton = document.getElementById("toggle-form-button");
const topbarNewButton = document.getElementById("topbar-new-button");
const appointmentError = document.getElementById("appointment-error");
const appointmentNotice = document.getElementById("appointment-notice");

// ---------- 4. Draw the list ----------

function renderAppointments() {
  // a) Keep only the appointments that match the selected tab
  const visible = appointments.filter(function (appointment) {
    if (currentFilter === "all") {
      return true;
    }
    return appointment.status === currentFilter;
  });

  // b) Sort by date, then time. "2026-12-03 10:00" text sorts correctly as text!
  visible.sort(function (a, b) {
    return (a.date + " " + a.time).localeCompare(b.date + " " + b.time);
  });

  // c) Update the heading, e.g. "3 appointments"
  recordsHeading.textContent = visible.length + " appointments";

  // d) Empty the list, then add one row per appointment
  appointmentList.innerHTML = "";

  if (visible.length === 0) {
    appointmentList.innerHTML = '<p class="empty-state">No appointments here.</p>';
    return;
  }

  visible.forEach(function (appointment) {
    const dateParts = splitDate(appointment.date);

    // Build the HTML "shape" of one row...
    const row = document.createElement("div");
    row.className = "appointment-row";
    row.innerHTML = `
      <div class="date-block">
        <span class="month"></span>
        <span class="day-number"></span>
      </div>
      <div class="appointment-info">
        <p class="appointment-name"></p>
        <p class="appointment-meta"></p>
      </div>
      <div class="row-action"></div>
    `;

    // ...then fill in the text with textContent.
    // We never put user-typed text into innerHTML, so nobody can sneak HTML/JS into our page.
    row.querySelector(".month").textContent = dateParts.month;
    row.querySelector(".day-number").textContent = dateParts.day;
    row.querySelector(".appointment-name").textContent = appointment.guestName;
    row.querySelector(".appointment-meta").textContent =
      formatTime(appointment.time) + " · " + appointment.type + " · " + appointment.guestEmail;

    // Upcoming -> "Cancel" button. Cancelled -> red label.
    const actionArea = row.querySelector(".row-action");
    if (appointment.status === "upcoming") {
      const cancelButton = document.createElement("button");
      cancelButton.className = "text-button danger";
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", function () {
        cancelAppointment(appointment.id);
      });
      actionArea.appendChild(cancelButton);
    } else {
      actionArea.innerHTML = '<span class="badge-cancelled">Cancelled</span>';
    }

    appointmentList.appendChild(row);
  });
}

// ---------- 5. Cancel ----------

function cancelAppointment(id) {
  if (!confirm("Cancel this appointment?")) {
    return;
  }
  const appointment = appointments.find(function (item) {
    return item.id === id;
  });
  appointment.status = "cancelled";
  renderAppointments();
}

// ---------- 6. Filter tabs ----------

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (otherButton) {
      otherButton.classList.remove("active");
    });
    button.classList.add("active");

    renderAppointments();
  });
});

// ---------- 7. Show / hide the form ----------

function openForm() {
  appointmentForm.classList.remove("hidden");
  toggleFormButton.textContent = "Close form";
}

function closeForm() {
  appointmentForm.classList.add("hidden");
  toggleFormButton.textContent = "+ New appointment";
}

toggleFormButton.addEventListener("click", function () {
  if (appointmentForm.classList.contains("hidden")) {
    openForm();
  } else {
    closeForm();
  }
});

// The blue button at the top of every page: go to Appointments and open the form.
// showPage() was written in dashboard.js — both files share the same page, so we can use it here.
topbarNewButton.addEventListener("click", function () {
  showPage("appointments");
  openForm();
});

// ---------- 8. Add a new appointment ----------

appointmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // a) Read the form
  const newAppointment = {
    id: nextId,
    guestName: document.getElementById("guest-name").value.trim(),
    guestEmail: document.getElementById("guest-email").value.trim(),
    date: document.getElementById("appointment-date").value,   // "2026-12-03"
    time: document.getElementById("appointment-time").value,   // "14:30"
    type: document.getElementById("meeting-type").value,
    status: "upcoming"
  };

  // b) Check it
  if (newAppointment.guestName.length < 2) {
    appointmentError.textContent = "Please enter the guest's name.";
    appointmentError.classList.remove("hidden");
    return;
  }
  if (newAppointment.date === "" || newAppointment.time === "") {
    appointmentError.textContent = "Please choose a date and a time.";
    appointmentError.classList.remove("hidden");
    return;
  }

  // c) Save it in our array and redraw
  appointmentError.classList.add("hidden");
  appointments.push(newAppointment);
  nextId = nextId + 1;

  appointmentForm.reset();
  closeForm();
  appointmentNotice.textContent = "Appointment added.";
  appointmentNotice.classList.remove("hidden");
  renderAppointments();
});

// ---------- 9. Draw the list when the page opens ----------
renderAppointments();
