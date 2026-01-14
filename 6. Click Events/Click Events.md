# Click Events in React (`onClick`)

## 1️⃣ What Is a Click Event?

A **click event** is a **user interaction** that occurs when the user clicks (or taps) an element such as:

* Buttons
* Links
* Divs
* Icons
* Custom components

In React, click events are handled using the **`onClick`** prop.

```tsx
<button onClick={handleClick}>Click me</button>
```

👉 React does **not** use HTML’s `onclick=""`.
Instead, it uses **camelCase event handlers**.

---

## 2️⃣ Basic Syntax

### HTML (❌ Not React)

```html
<button onclick="doSomething()">Click</button>
```

### React (✅ Correct)

```tsx
<button onClick={doSomething}>Click</button>
```

Key differences:

* `onClick` (camelCase)
* Pass a **function reference**, not a string

---

## 3️⃣ Handling Clicks with Functions

### Example: Basic Click Handler

```tsx
function App() {
  function handleClick() {
    console.log("Button clicked!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
```

✔ The function runs **only when clicked**, not when rendered.

---

## 4️⃣ Arrow Functions in `onClick`

### When You Need Logic Inline

```tsx
<button onClick={() => console.log("Clicked!")}>
  Click Me
</button>
```

⚠️ Use this when:

* You need to pass arguments
* The logic is very small

---

## 5️⃣ Passing Arguments to Click Handlers

### ❌ Incorrect (executes immediately)

```tsx
<button onClick={handleClick(5)}>Click</button>
```

### ✅ Correct

```tsx
<button onClick={() => handleClick(5)}>Click</button>
```

### Full Example

```tsx
function App() {
  function handleClick(count: number) {
    console.log(`Clicked ${count} times`);
  }

  return <button onClick={() => handleClick(5)}>Click</button>;
}
```

---

## 6️⃣ Click Events and State (`useState`)

### Example: Counter

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </>
  );
}
```

✔ Click triggers a **state update**
✔ State update causes **re-render**

---

## 7️⃣ Event Object (`MouseEvent`)

React passes an **event object** automatically.

```tsx
function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
  console.log(event);
}
```

### Example

```tsx
<button onClick={(e) => console.log(e.target)}>
  Click
</button>
```

Common uses:

* Prevent default behavior
* Stop propagation
* Read mouse position

---

## 8️⃣ Prevent Default Behavior

### Example: Prevent Link Navigation

```tsx
function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  console.log("Link click prevented");
}

return <a href="#" onClick={handleClick}>Click</a>;
```

---

## 9️⃣ Click Events on Custom Components

### Parent Component

```tsx
<Button onClick={handleClick} />
```

### Child Component

```tsx
interface ButtonProps {
  onClick: () => void;
}

function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Click</button>;
}
```

✔ Events can be **passed via props**
✔ This enables **component reuse**

---

## 🔟 Conditional Click Handling

```tsx
<button onClick={isLoggedIn ? logout : login}>
  {isLoggedIn ? "Logout" : "Login"}
</button>
```

---

## 1️⃣1️⃣ Disabling Click Events

```tsx
<button disabled={!isValid} onClick={submit}>
  Submit
</button>
```

✔ Disabled buttons **do not fire clicks**

---

## 1️⃣2️⃣ Click vs Function Call (Very Important)

| Code                            | Behavior               |
| ------------------------------- | ---------------------- |
| `onClick={handleClick}`         | ✅ Correct              |
| `onClick={handleClick()}`       | ❌ Executes immediately |
| `onClick={() => handleClick()}` | ✅ Correct              |

---

## 1️⃣3️⃣ Performance Considerations

### Avoid This in Large Lists

```tsx
items.map(item => (
  <button onClick={() => handleClick(item.id)}>Click</button>
));
```

✔ Acceptable for small apps
⚠️ For large lists, memoize or extract handlers

---

## 1️⃣4️⃣ Click Events vs Native DOM

React click events are:

* **Synthetic events**
* Normalized across browsers
* Safer and more consistent

But behave **almost exactly like native events**.

---

## 1️⃣5️⃣ Common Mistakes

❌ Calling the function immediately
❌ Using `onclick` instead of `onClick`
❌ Forgetting arrow functions when passing arguments
❌ Mutating state directly inside click handlers

---

## 🧠 Mental Model (Important)

> **Click → Event handler → State update → Re-render**

---

## ✅ Summary Cheat Sheet

| Concept           | Rule                          |
| ----------------- | ----------------------------- |
| Event name        | `onClick`                     |
| Function call     | Pass reference, not execution |
| Arguments         | Use arrow function            |
| State update      | Use setters (`setState`)      |
| Custom components | Pass `onClick` as prop        |
| Default behavior  | Use `preventDefault()`        |

---
