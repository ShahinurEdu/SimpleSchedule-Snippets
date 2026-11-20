# Step 5: A Working Menu (and a Phone Menu)

**Goal:** Clicking a sidebar item shows that page, all inside **one** HTML file. On phones, the sidebar hides and a dropdown menu appears instead (just like the prototype).

**Files:** `dashboard.js` (**new**). `dashboard.html` is changed. `style.css` adds the "Menu" section.

## Steps

1. **Four page sections** in `dashboard.html`, each with an id that ends in `-page`:
   `dashboard-page`, `appointments-page`, `availability-page`, `settings-page`.
2. **CSS hides them all**, except the one with the class `active`:
   ```css
   .page { display: none; }
   .page.active { display: block; }
   ```
3. **Menu items become `<button>`s with a `data-page` attribute**, for example `<button class="nav-link" data-page="settings">`. In JavaScript, `button.dataset.page` gives `"settings"`.
4. **In `dashboard.js`, write `showPage(pageName)`.** It:
   1. removes `active` from every page,
   2. adds `active` to `pageName + "-page"`,
   3. highlights the matching menu button,
   4. changes the title and subtitle (stored in the `pageInfo` object).
5. **Connect the clicks:** `forEach` over the buttons and call `showPage(...)` on `click`.
6. **Phone menu:**
   - `.mobile-bar` (logo, Sign out, and a `<select>`) is hidden on big screens.
   - `@media (max-width: 800px) { ... }` hides the sidebar and shows the mobile bar.
   - The `<select>`'s `change` event also calls `showPage(...)`.

## Run it

Open `dashboard.html`. Click the menu items. Then make the window narrow (or press F12 and use the phone view) and use the dropdown.

## Try it yourself

- Remember the last page: save `pageName` with `localStorage.setItem("lastPage", pageName)` and open that page when the dashboard loads.
- Make the "Save settings" button show a "Settings saved" message for 2 seconds (`setTimeout`).
