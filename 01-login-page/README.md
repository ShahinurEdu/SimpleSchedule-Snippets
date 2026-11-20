# Step 1: The Sign In Page (HTML + CSS)

**Goal:** Build the "Sign in to your account" screen from the Figma prototype.

**Files:** `index.html`, `style.css`

## Steps

1. **Make the page skeleton.** In `index.html`, add `<!DOCTYPE html>`, `<head>`, and `<body>`. Link the CSS file with `<link rel="stylesheet" href="style.css">`.
2. **Add the logo.** A `<div class="brand">` holds a blue "S" box (`.logo`) and the app name.
3. **Add the white card.** `<section class="auth-card">` holds the small blue "Welcome back" text, the heading, and the subtitle.
4. **Add the form.** Each `<label for="...">` matches an `<input id="...">`. Clicking the label then puts the cursor in the input.
   - `type="email"` and `type="password"` give the right keyboard and hide the password.
   - `placeholder` shows the grey example text.
5. **Add the link** to the Create account page: `<a href="register.html">`. That page does not exist yet. We build it in Step 2.
6. **Style it** in `style.css`:
   - `:root { --blue: ... }` stores the colors **once**, then we use `var(--blue)` everywhere.
   - `.auth-page` uses **Flexbox** (`display: flex; align-items: center; justify-content: center;`) to center the card on the screen.
   - `max-width: 380px` keeps the card narrow on big screens, and it still shrinks on phones.

## Run it

Double-click `index.html`, or right-click it and open it with your browser.

## Try it yourself

- Change `--blue` in `style.css` to another color. Every blue thing changes!
- Make the card corners rounder (`border-radius`).
- Add a "Remember me" checkbox under the password.
