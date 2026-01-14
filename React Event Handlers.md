# Event Handlers in React — Full Theoretical Review with Practical Examples

---

## 1. What Is an Event Handler in React?

An **event handler** is a **function** that is executed in response to a **user interaction** or **browser event**, such as:

* Clicking a button
* Typing in an input
* Submitting a form
* Hovering over an element
* Pressing a key

In React, event handlers allow components to **respond to user actions and update state or trigger side effects**.

---

## 2. React Events vs Native DOM Events

React does **not** attach events directly to DOM nodes.

Instead, it uses a **Synthetic Event System**.

### Synthetic Events

* Wrapper around native browser events
* Cross-browser consistent behavior
* Automatically optimized with event delegation

```tsx
function handleClick(event: React.MouseEvent) {
  console.log(event.type); // "click"
}
```

---

## 3. Basic Event Handler Syntax

### JSX Pattern

```tsx
<button onClick={handleClick}>Click me</button>
```

### Key Rules

| Rule                      | Explanation                       |
| ------------------------- | --------------------------------- |
| camelCase                 | `onClick`, `onChange`, `onSubmit` |
| pass a function reference | NOT `handleClick()`               |
| JSX expression            | `{handleClick}`                   |

---

## 4. Defining Event Handlers

### 4.1 Named Function (Recommended)

```tsx
function handleClick() {
  console.log("Button clicked");
}
```

```tsx
<button onClick={handleClick}>Click</button>
```

✔ Reusable
✔ Readable
✔ Easy to test

---

### 4.2 Arrow Function Inside JSX

```tsx
<button onClick={() => console.log("Clicked")}>
  Click
</button>
```

✔ Useful for inline logic
❌ Recreated on every render

---

### 4.3 Callback with Parameters

```tsx
function greet(name: string) {
  alert(`Hello ${name}`);
}

<button onClick={() => greet("Spongebob")}>
  Greet
</button>
```

Why arrow function?
Because:

```tsx
onClick={greet("Spongebob")} // ❌ executes immediately
```

---

## 5. Common React Event Types

| Event          | Trigger              |
| -------------- | -------------------- |
| `onClick`      | Mouse click          |
| `onChange`     | Input value change   |
| `onSubmit`     | Form submission      |
| `onKeyDown`    | Key pressed          |
| `onFocus`      | Element focused      |
| `onBlur`       | Element loses focus  |
| `onMouseEnter` | Mouse enters element |
| `onMouseLeave` | Mouse leaves element |

---

## 6. Accessing the Event Object

React automatically passes the event object.

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}
```

```tsx
<input onChange={handleChange} />
```

---

## 7. Event Handler + State Update

### Example: Button Counter

```tsx
const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
}

<button onClick={increment}>+</button>
```

### ⚠️ Better (Functional Update)

```tsx
setCount(prev => prev + 1);
```

Why?

* Avoids stale state
* Safe for batched updates

---

## 8. Handling Forms

### Submit Event

```tsx
function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  console.log("Form submitted");
}
```

```tsx
<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

---

## 9. Controlled Inputs

React uses **controlled components**:

```tsx
const [email, setEmail] = useState("");

<input
  value={email}
  onChange={e => setEmail(e.target.value)}
/>
```

✔ React controls the input
✔ Single source of truth

---

## 10. Preventing Default Behavior

```tsx
function handleClick(event: React.MouseEvent) {
  event.preventDefault();
}
```

Used for:

* Forms
* Anchor tags
* Context menus

---

## 11. Event Handler Binding (No `this` Needed)

In functional components:

✔ No `.bind(this)`
✔ No class context issues

```tsx
function handleClick() {
  console.log("Safe context");
}
```

---

## 12. Passing Event Handlers as Props

### Parent Component

```tsx
function App() {
  const handleClick = () => console.log("Clicked");

  return <Button onClick={handleClick} />;
}
```

### Child Component

```tsx
type Props = {
  onClick: () => void;
};

function Button({ onClick }: Props) {
  return <button onClick={onClick}>Click</button>;
}
```

This is **core to React composition**.

---

## 13. Inline Logic vs Callback Function

### Inline (Simple)

```tsx
<button onClick={() => setOpen(!open)}>Toggle</button>
```

### Callback (Complex)

```tsx
function toggle() {
  setOpen(prev => !prev);
}
```

Rule of thumb:

* Inline → simple, one-liners
* Callback → complex logic

---

## 14. Event Handler Performance Considerations

### Problem

```tsx
<button onClick={() => doSomething(id)}>Click</button>
```

* New function on every render

### Optimization

```tsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

Used when:

* Passing to memoized children
* Large lists
* Performance-sensitive apps

---

## 15. Event Bubbling in React

React events **bubble up** like DOM events.

```tsx
<div onClick={() => console.log("Parent")}>
  <button onClick={() => console.log("Child")}>
    Click
  </button>
</div>
```

Clicking button logs:

```
Child
Parent
```

---

## 16. Stopping Propagation

```tsx
function handleClick(event: React.MouseEvent) {
  event.stopPropagation();
}
```

Used when:

* Nested clickable components
* Modals
* Dropdowns

---

## 17. Synthetic Event Pooling (Modern React)

Before React 17:

* Events were pooled and reused

Now:

* Event pooling removed
* Safe to access event asynchronously

---

## 18. Best Practices Summary

✔ Prefer named handlers
✔ Use functional updates for state
✔ Type events in TypeScript
✔ Avoid inline handlers in large lists
✔ Use `useCallback` when passing handlers
✔ Do not read state immediately after setting it

---

## 19. Mental Model

> **Event handlers are the bridge between user intent and application state**

User clicks → Event fires → Handler runs → State updates → UI re-renders

---

## 20. Quick Cheat Sheet

| Scenario       | Pattern                                    |
| -------------- | ------------------------------------------ |
| Simple click   | `onClick={handleClick}`                    |
| Pass argument  | `onClick={() => fn(arg)}`                  |
| Form submit    | `onSubmit={handleSubmit}`                  |
| Input value    | `onChange={e => setValue(e.target.value)}` |
| Prevent reload | `event.preventDefault()`                   |
| Stop bubbling  | `event.stopPropagation()`                  |

---
