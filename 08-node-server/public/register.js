// =========================================================
// STEP 3 — Check the Create account form with JavaScript
// =========================================================

// 1. Find the elements we need on the page
const form = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorBox = document.getElementById("error-message");
const successBox = document.getElementById("success-message");

// 2. Helpers to show and hide messages
function showError(message) {
  successBox.classList.add("hidden");
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function showSuccess(message) {
  errorBox.classList.add("hidden");
  successBox.textContent = message;
  successBox.classList.remove("hidden");
}

// 3. Helper: is this a real-looking email?
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// 4. Check every field when the user clicks "Create account"
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // The same rules (and messages) as the Figma prototype
  if (name.length < 2) {
    showError("Please enter your full name.");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters.");
    return;
  }

  // All good. In Step 10 we will send this data to our Node.js server.
  showSuccess("Looks good, " + name + "! (Nothing is saved yet.)");
  form.reset(); // empty the form
});
