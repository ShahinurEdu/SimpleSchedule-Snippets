// =========================================================
// STEP 4 — Check the sign in form, then open the dashboard
// (This is a FAKE sign in. In Step 11 the server checks the password.)
// =========================================================

// 1. Find the elements we need on the page
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("error-message");

// 2. Helper: show a red error message
function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

// 3. Helper: hide the error message
function hideError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

// 4. Helper: is this a real-looking email? (a regular expression from Module 7)
//    It means: some text, then @, then some text, then a dot, then some text.
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// 5. Run our checks when the user clicks "Sign in"
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the browser from reloading the page

  const email = emailInput.value.trim(); // trim() removes extra spaces
  const password = passwordInput.value;

  if (!isValidEmail(email)) {
    showError("Please enter a valid email address.");
    return; // stop here
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  // Everything is OK, so go to the dashboard page
  hideError();
  window.location.href = "dashboard.html";
});
