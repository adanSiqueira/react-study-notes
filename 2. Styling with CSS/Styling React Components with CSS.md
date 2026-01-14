Below is a **complete, theory-first cheat sheet** on **how to style React components with CSS**, covering **External CSS, CSS Modules, and Inline Styles**, with **real examples**, **internal mechanics**, **trade-offs**, and **best practices**.

---

# Styling React Components with CSS

## Theoretical Guide + Practical Cheat Sheet

---

## 0. The Big Picture (Mental Model)

Styling in React is **not about React itself**.
React just renders DOM elements.

The difference between styling approaches is:

* **Scope**
* **Encapsulation**
* **Dynamic capability**
* **Maintainability**

---

## 1. External (Global) CSS

### 1.1 What Is External CSS?

External CSS is **traditional global CSS**, imported into your application.

```css
/* styles.css */
.button {
  background: red;
  color: white;
}
```

```tsx
import "./styles.css";

function Button() {
  return <button className="button">Click</button>;
}
```

---

### 1.2 How It Works Internally

* CSS is loaded **once**
* Classes exist in the **global namespace**
* Any component can use them

```text
CSS → Browser → Global stylesheet
```

---

### 1.3 Advantages ✅

* Familiar (HTML/CSS standard)
* Great for:

  * Resets
  * Typography
  * Themes
  * CSS variables

---

### 1.4 Disadvantages ❌

* Global namespace pollution
* Class name collisions
* Poor scalability
* Hard to refactor safely

---

### 1.5 When to Use External CSS

✅ App-wide styles
✅ CSS variables / themes
✅ Normalize / reset
❌ Component-specific styles

---

### 1.6 Example: Global Theme

```css
/* index.css */
:root {
  --primary: hsl(0, 78%, 52%);
}

body {
  font-family: Arial, sans-serif;
}
```

---

## 2. CSS Modules (Recommended Default)

---

### 2.1 What Are CSS Modules?

CSS Modules scope CSS **locally to a component**.

File naming:

```text
Button.module.css
```

---

### 2.2 Example

```css
/* Button.module.css */
.button {
  background-color: var(--primary);
  color: white;
}
```

```tsx
import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>Click</button>;
}
```

---

### 2.3 How CSS Modules Work Internally

```css
.button { ... }
```

⬇ build step ⬇

```css
.Button_button__X9sdf { ... }
```

```ts
styles = {
  button: "Button_button__X9sdf"
};
```

---

### 2.4 Advantages ✅

* No class collisions
* Component-level encapsulation
* Works with pure CSS
* Fully static → fast

---

### 2.5 Disadvantages ❌

* Slightly more verbose
* Limited runtime styling
* Needs tooling support (Vite, Webpack)

---

### 2.6 When to Use CSS Modules

✅ Default for components
✅ Buttons, cards, layouts
✅ Medium & large projects

---

### 2.7 Best Practices

```text
Component.tsx
Component.module.css
```

* Avoid BEM
* Keep class names simple
* Combine with CSS variables

---

## 3. Inline Styles (JavaScript Object Styles)

---

### 3.1 What Are Inline Styles?

Inline styles are **JavaScript objects** passed to the `style` prop.

```tsx
function Button() {
  return (
    <button style={{ backgroundColor: "red" }}>
      Click
    </button>
  );
}
```

---

### 3.2 Syntax Rules (Critical)

* CamelCase keys
* Numbers default to `px`

```ts
borderRadius: 5
fontFamily: "Arial"
```

---

### 3.3 How Inline Styles Work Internally

```tsx
style={{ color: "red" }}
```

⬇

```html
<button style="color: red;"></button>
```

---

### 3.4 Advantages ✅

* Dynamic styling
* Tied directly to state/props
* No CSS file needed

---

### 3.5 Disadvantages ❌

* No `:hover`, `:focus`
* No media queries
* No animations
* Poor separation of concerns

---

### 3.6 When to Use Inline Styles

✅ Dynamic values
✅ Runtime calculations
❌ Full component styling

---

### 3.7 Example: Dynamic Style

```tsx
<button
  style={{
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  }}
>
  Click
</button>
```

---

## 4. Mixing Approaches (Industry Best Practice)

### CSS Modules + Inline Styles

```tsx
<button
  className={styles.button}
  style={{ opacity: disabled ? 0.5 : 1 }}
>
  Click
</button>
```

* Structure → CSS Module
* Dynamic → Inline style

---

## 5. Comparison Table

| Feature         | External | Modules | Inline  |
| --------------- | -------- | ------- | ------- |
| Scope           | Global   | Local   | Element |
| Dynamic         | ❌        | ❌       | ✅       |
| Pseudo-classes  | ✅        | ✅       | ❌       |
| Media queries   | ✅        | ✅       | ❌       |
| Maintainability | ❌        | ✅       | ❌       |
| Performance     | ✅        | ✅       | ⚠️      |

---

## 6. Decision Guide (Rule of Thumb)

* **Global layout / theme** → External CSS
* **Component styling** → CSS Modules
* **Dynamic values** → Inline styles

---

## 7. Common Mistakes

❌ Styling entire components inline
❌ Global CSS for everything
❌ Mixing kebab-case in JS styles

---

## 8. Mental Model (Backend-Friendly)

| Concept       | Analogy             |
| ------------- | ------------------- |
| External CSS  | Global config       |
| CSS Modules   | Encapsulated module |
| Inline styles | Runtime logic       |

---

## 🔥 Ultimate Styling Cheat Sheet

### External CSS

```tsx
import "./global.css";
className="button"
```

---

### CSS Modules

```tsx
import styles from "./Comp.module.css";
className={styles.button}
```

---

### Inline

```tsx
style={{ opacity: isActive ? 1 : 0.5 }}
```

---

## Final Takeaway

* React does **not enforce** a styling method
* CSS Modules are the **best default**
* Inline styles are **exceptions**
* External CSS is for **global concerns**
* Mixing approaches is normal and healthy

---
