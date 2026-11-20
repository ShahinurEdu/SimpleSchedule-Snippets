// =========================================================
// STEP 5 — Make the sidebar menu switch between pages
// =========================================================

// 1. Find the elements we need
const navButtons = document.querySelectorAll(".nav-link");     // the 4 menu buttons
const pages = document.querySelectorAll(".page");              // the 4 <section class="page">
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");
const mobileMenu = document.getElementById("mobile-menu");
const signOutButtons = document.querySelectorAll(".signout-button");

// 2. The title and subtitle for each page (text from the Figma prototype)
const pageInfo = {
  dashboard: { title: "Dashboard", subtitle: "Here is your schedule for today." },
  appointments: { title: "Appointments", subtitle: "View and manage your scheduled meetings." },
  availability: { title: "Availability", subtitle: "Set the days and times when people can book you." },
  settings: { title: "Settings", subtitle: "Update your basic account information." }
};

// 3. Show one page and hide the others
function showPage(pageName) {
  // a) Hide every page...
  pages.forEach(function (page) {
    page.classList.remove("active");
  });

  // b) ...then show only the one we want. Example: "settings" -> id "settings-page"
  document.getElementById(pageName + "-page").classList.add("active");

  // c) Highlight the matching menu button
  navButtons.forEach(function (button) {
    if (button.dataset.page === pageName) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  // d) Change the heading at the top
  pageTitle.textContent = pageInfo[pageName].title;
  pageSubtitle.textContent = pageInfo[pageName].subtitle;

  // e) Keep the phone dropdown showing the same page
  mobileMenu.value = pageName;
}

// 4. When a sidebar button is clicked, show its page
navButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    showPage(button.dataset.page);
  });
});

// 5. When the phone dropdown changes, show that page
mobileMenu.addEventListener("change", function () {
  showPage(mobileMenu.value);
});

// 6. "Sign out" goes back to the sign in page
signOutButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    window.location.href = "index.html";
  });
});

// 7. Start on the Dashboard page
showPage("dashboard");
