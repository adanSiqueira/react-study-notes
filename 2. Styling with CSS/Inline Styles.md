# React Inline Styles — Theoretical Explanation + Cheat Sheet

---

## 1. What Are Inline Styles in React?

**Inline styles in React** are styles defined as **JavaScript objects** and passed to the `style` prop.

```tsx
const styles = {
  backgroundColor: "red",
  padding: "10px",
};

<button style={styles} />
```

They are **not CSS files**
They are **not classes**
They are **runtime JavaScript objects**

---

## 2. Why Inline Styles Exist in React

React allows inline styles because:

* UI state is **dynamic**
* Styles sometimes depend on **runtime values**
* JavaScript can calculate values easily

Example:

```tsx
<button style={{ opacity: disabled ? 0.5 : 1 }} />
```

This would be awkward or verbose with pure CSS.

---

## 3. How Inline Styles Work Internally

### JSX

```tsx
<button style={{ color: "red" }} />
```

### Compiles to

```js
React.createElement("button", {
  style: { color: "red" }
});
```

### Browser behavior

* React sets styles directly on the DOM node:

```html
<button style="color: red;"></button>
```

---

## 4. Syntax Rules (CRITICAL)

### 4.1 Styles are JavaScript objects

```ts
const styles = { key: value };
```

---

### 4.2 CSS properties use camelCase

| CSS                | React inline style |
| ------------------ | ------------------ |
| `background-color` | `backgroundColor`  |
| `border-radius`    | `borderRadius`     |
| `font-family`      | `fontFamily`       |

---

### 4.3 Values are strings or numbers

```tsx
padding: 10        // px by default
padding: "10px"   // explicit unit
```

---

## 5. Why TypeScript Catches Errors Early

```ts
border-radius: "5px" // ❌
```

JS parses this as:

```ts
border - radius
```

TypeScript reports a **math type error**, not a CSS error.

This happens **before React runs**.

---

## 6. What Inline Styles CANNOT Do (Very Important)

Inline styles **do not support**:

❌ `:hover`, `:focus`, `:active`
❌ Media queries
❌ Keyframes / animations
❌ CSS selectors
❌ Pseudo-elements (`::before`)

---

## 7. Separation of Concerns (Theoretical Perspective)

Inline styles mix:

* Presentation
* Logic
* Behavior

In the same file.

This violates classic UI architecture principles:

* Harder to read
* Harder to scale
* Harder for teams

---

## 8. Performance Characteristics

Each render:

```tsx
const styles = { ... };
```

Creates a **new object**.

React compares props shallowly:

* New object → new reference
* Prevents some optimizations

Usually minor, but relevant in large apps.

---

## 9. When Inline Styles ARE a Good Practice ✅

### ✅ 1. Runtime-dependent styles

```tsx
<div style={{ width: `${progress}%` }} />
```

---

### ✅ 2. Simple conditional styles

```tsx
<button style={{ opacity: disabled ? 0.5 : 1 }} />
```

---

### ✅ 3. One-off layout tweaks

```tsx
<div style={{ marginTop: 8 }} />
```

---

## 10. When Inline Styles Are NOT a Good Practice ❌

### ❌ Component styling

```tsx
// ❌ Avoid
const styles = { padding: 10 };
```

---

### ❌ Design systems

* Themes
* Variants
* Tokens

Inline styles scale poorly here.

---

## 11. Best Practice Pattern (Industry Standard)

### Use CSS Modules for structure

```css
/* Button.module.css */
.button {
  padding: 10px;
}
```

### Use inline styles only for dynamic values

```tsx
<button
  className={styles.button}
  style={{ opacity: disabled ? 0.5 : 1 }}
/>
```

This balances:

* Maintainability
* Performance
* Flexibility

---

## 12. Typing Inline Styles in TypeScript

```ts
import { CSSProperties } from "react";

const styles: CSSProperties = {
  backgroundColor: "red",
};
```

This gives:

* Autocomplete
* Type safety
* Error detection

---

## 13. Inline Styles vs CSS Modules vs Others

| Approach          | Scope       | Best Use       |
| ----------------- | ----------- | -------------- |
| Inline styles     | Per element | Dynamic values |
| CSS Modules       | Component   | Default choice |
| Tailwind          | Utility     | Rapid UI       |
| Styled-components | Component   | Theming        |

---

## 14. Mental Model (Backend-Friendly)

Inline styles are like:

```python
value = 10 if condition else 5
```

CSS Modules are like:

* Config files
* Declarative rules
* Externalized behavior

---

## 🔥 Inline Styles Cheat Sheet

### Define

```ts
const styles = { color: "red" };
```

---

### Use

```tsx
<div style={styles} />
```

---

### Dynamic

```tsx
style={{ opacity: isActive ? 1 : 0.5 }}
```

---

### Units

```ts
width: 10      // px
width: "10%"   // %
```

---

### Avoid for

* Hover effects
* Layout systems
* Reusable components

---

## Final Takeaway

* Inline styles are **valid**
* Powerful for **dynamic runtime styling**
* Bad default for component styling
* Best when **combined** with CSS Modules
* Think “exception tool”, not “standard tool”

---

If you want next, I can:

* Compare inline styles vs Tailwind deeply
* Show performance benchmarks
* Explain how React diffs style objects
* Show enterprise-level styling strategies

Just say 👍
