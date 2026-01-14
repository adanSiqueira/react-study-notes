# CSS Modules — Theoretical Explanation + Cheat Sheet

---

## 1. What Is a CSS Module?

A **CSS Module** is a CSS file where:

* Class names are **scoped locally** to the component
* No global CSS pollution
* Styles are imported as a **JavaScript object**

Instead of this:

```css
.button { ... }
```

Being global…

CSS Modules turn it into something like:

```css
.Button_button__a1b2c
```

But you **never write or care about that name**.

---

## 2. The Problem CSS Modules Solve

### ❌ Traditional CSS problems

* Global namespace collisions
* `.button` in one file overwrites another
* Hard to scale in large apps
* Tight coupling between unrelated components

---

### ❌ Example of the problem

```css
/* Header.css */
.button { background: red; }

/* Footer.css */
.button { background: blue; }
```

💥 Only one wins.

---

### ✅ CSS Modules fix this

Each component gets **its own private CSS namespace**.

---

## 3. How CSS Modules Work Internally

### Your file

```css
.button {
  background-color: red;
}
```

### Build step (Vite)

Transforms into:

```css
.Button_button__Xk92A {
  background-color: red;
}
```

### JS import

```ts
import styles from './Button.module.css';
```

Becomes:

```ts
styles = {
  button: 'Button_button__Xk92A'
}
```

---

## 4. Why `.module.css` Matters

This filename tells the bundler:

> “Treat this CSS file as a **module**, not global CSS.”

| File name            | Behavior      |
| -------------------- | ------------- |
| `styles.css`         | Global        |
| `Button.module.css`  | Scoped        |
| `Button.module.scss` | Scoped (Sass) |

---

## 5. Breaking Down Your Example

### Button.tsx

```tsx
import styles from './Button.module.css';

function Button() {
  return (
    <button className={styles.button}>
      Click Me!
    </button>
  );
}

export default Button;
```

### Button.module.css

```css
.button {
  background-color: hsl(0, 78%, 52%);
  color: white;
}
```

### Key ideas

* `styles` is an **object**
* `styles.button` resolves to a **unique class name**
* No chance of collision with other components

---

## 6. Accessing Class Names

### Standard

```tsx
className={styles.button}
```

---

### Multiple classes

```tsx
className={`${styles.button} ${styles.primary}`}
```

Or better (recommended):

```ts
import clsx from 'clsx';

className={clsx(styles.button, styles.primary)}
```

---

## 7. Conditional Classes

### Example

```tsx
<button
  className={isActive ? styles.active : styles.inactive}
>
```

Or with `clsx`:

```tsx
className={clsx(styles.button, {
  [styles.active]: isActive
})}
```

---

## 8. CSS Modules + TypeScript

Vite already supports this out of the box.

`styles` is typed as:

```ts
Record<string, string>
```

Meaning:

* Keys → class names
* Values → generated class strings

---

## 9. Naming Conventions (Best Practice)

### Component-based

```text
Button.tsx
Button.module.css
```

### Class naming

```css
.button {}
.icon {}
.label {}
```

❌ Avoid BEM inside modules:

```css
.button__icon--active /* unnecessary */
```

Because:

* Modules already isolate scope

---

## 10. Global Styles vs CSS Modules

### Global CSS (use sparingly)

* Reset
* Typography
* CSS variables
* Base layout

```css
:root {
  --primary-color: red;
}
```

---

### CSS Modules (default choice)

* Component styles
* UI elements
* Layout pieces

---

## 11. Sharing Variables with CSS Modules

### CSS Variables (recommended)

```css
:root {
  --primary: hsl(0, 78%, 52%);
}
```

```css
.button {
  background-color: var(--primary);
}
```

---

## 12. CSS Modules vs Alternatives

| Approach          | Scope         | Best For         |
| ----------------- | ------------- | ---------------- |
| Global CSS        | Global        | Resets, themes   |
| CSS Modules       | Local         | Most components  |
| Styled-components | Local         | JS-heavy styling |
| Tailwind          | Utility-based | Rapid UI         |
| Inline styles     | Inline        | Dynamic styles   |

---

## 13. Common Mistakes

❌ Forgetting `.module.css`

```ts
import styles from './Button.css'; // styles = undefined
```

---

❌ Using `class` instead of `className`

```tsx
<button class={styles.button} /> // ❌
```

---

❌ Typo in class name

```tsx
styles.buttn // undefined
```

---

## 14. Mental Model (Backend-Friendly)

Think of CSS Modules like:

```python
# button_styles.py
styles = {
  "button": "Button_button__Xk92A"
}
```

You import it and reference keys safely.

---

## 🔥 CSS Modules Cheat Sheet

### Import

```ts
import styles from './Component.module.css';
```

---

### Use

```tsx
className={styles.className}
```

---

### Multiple classes

```tsx
className={`${styles.a} ${styles.b}`}
```

---

### Conditional

```tsx
className={isOn ? styles.on : styles.off}
```

---

### File naming

```text
Component.tsx
Component.module.css
```

---

## Final Takeaway

* CSS Modules give **local scope**
* Prevent style conflicts
* Scale cleanly in React apps
* Default choice for Vite + React + TS
* Simple mental model, powerful result

---

If you want next, I can:

* Compare CSS Modules vs Tailwind
* Show real-world folder structures
* Explain CSS Modules + animations
* Show testing implications

Just say 👍
