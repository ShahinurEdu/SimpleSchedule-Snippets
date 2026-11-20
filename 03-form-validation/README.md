# Step 3: Check the Forms with JavaScript

**Goal:** Show friendly error messages when the user types something wrong. The rules come from the prototype:

- Full name: at least 2 characters
- Email: must look like an email
- Password: at least 6 characters

**Files:** `login.js` (**new**), `register.js` (**new**). `index.html` and `register.html` are changed. `style.css` adds `.error-message`, `.success-message`, and `.hidden`.

## Steps

1. **Add an empty message box** to each page: `<p class="error-message hidden" id="error-message"></p>`. The class `hidden` keeps it invisible.
2. **Add `novalidate`** to the `<form>`. This turns off the browser's own pop-up bubbles, so our JavaScript decides what to show.
3. **Load the script** at the bottom of the page: `<script src="login.js"></script>`.
4. **In the JavaScript** (follow the numbered comments):
   1. Find the elements with `document.getElementById(...)`.
   2. Write `showError(message)`. It puts text in the box and removes the `hidden` class.
   3. Write `isValidEmail(email)`. It uses a **regular expression** (Module 7).
   4. Listen for the form's `submit` event. Call `event.preventDefault()` so the page does not reload.
   5. Read the values with `.value`, and use `.trim()` to remove extra spaces.
   6. Check each rule. If one fails, show an error and `return` (stop).

## Run it

Open `index.html`. Try an email without `@`, or a 3-letter password.

## Try it yourself

- Make the input with the error get a red border (add or remove a class like `input-error`).
- Show the error as soon as the user leaves the field (the `blur` event), not only on submit.
- Add a "Show password" checkbox that changes the input's `type` from `"password"` to `"text"`.
