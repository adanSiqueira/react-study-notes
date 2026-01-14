# Callback Function vs Arrow Function in `onClick`

In React, these two are **both valid**, but they are used for **different reasons**.

---

## 1️⃣ Callback Function (Named Handler)

### Example

```tsx
function Button() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return <button onClick={handleClick}>Click</button>;
}
```

### What this is

* A **named callback function**
* Passed **by reference** to `onClick`
* Executed only when the click happens

---

### When to Use a Callback Function ✅

Use a callback when:

✔ The logic is **non-trivial**
✔ The handler is **reused**
✔ The function contains **business logic**
✔ You want **clean JSX**
✔ You care about **readability & maintainability**

---

### Real Example

```tsx
const handleDelete = () => {
  confirmDelete();
  logAnalytics();
  resetForm();
};
```

✔ Clear
✔ Testable
✔ Scales well

---

## 2️⃣ Arrow Function Inline in `onClick`

### Example

```tsx
<button onClick={() => console.log("Clicked")}>
  Click
</button>
```

### What this is

* An **anonymous function**
* Created **during render**
* Used for **small, inline logic**

---

### When to Use Inline Arrow Functions ✅

Use an inline arrow function when:

✔ You need to **pass arguments**
✔ The logic is **one line**
✔ The handler is **not reused**
✔ Readability remains high

---

### Passing Arguments (Most Common Case)

```tsx
<button onClick={() => handleClick(id)}>
  Delete
</button>
```

This is the **main reason inline arrows exist**.

---

## 3️⃣ What NOT to Do ❌

### ❌ Calling the function immediately

```tsx
<button onClick={handleClick()}>
```

This executes **during render**, not on click.

---

### ❌ Large logic inline

```tsx
<button onClick={() => {
  validate();
  sendRequest();
  updateState();
  notifyUser();
}}>
```

Hard to read, hard to debug, bad practice.

---

## 4️⃣ Performance Considerations (Important)

### Inline arrow functions:

* Create a **new function on every render**
* Usually **not a problem**
* Can matter in **large lists or high-frequency renders**

### Callback functions:

* Reused across renders
* Easier to optimize with `useCallback`

---

### Example with Lists

```tsx
items.map(item => (
  <button onClick={() => handleClick(item.id)}>Click</button>
));
```

✔ Acceptable
⚠️ Optimize if list is large or app is complex

---

## 5️⃣ Clean JSX Rule 🧠

> JSX should describe **what happens**, not **how it happens**

Bad:

```tsx
<button onClick={() => doA(); doB(); doC();}>
```

Good:

```tsx
<button onClick={handleSubmit}>
```

---

## 6️⃣ Decision Table (Cheat Sheet)

| Situation             | Use          |
| --------------------- | ------------ |
| Simple log / toggle   | Inline arrow |
| Passing arguments     | Inline arrow |
| Complex logic         | Callback     |
| Reused handler        | Callback     |
| Clean JSX needed      | Callback     |
| Performance sensitive | Callback     |

---

## 7️⃣ Real-World Pattern (Best Practice)

```tsx
function TodoItem({ id, onDelete }) {
  return (
    <button onClick={() => onDelete(id)}>
      Delete
    </button>
  );
}
```

✔ Inline arrow for argument passing
✔ Logic handled elsewhere
✔ Clean and scalable

---

## 8️⃣ Mental Model Summary

> **Inline arrow = glue code**
> **Callback function = business logic**

---

### Final Rule ⭐

> If your click handler has a **name**, it probably deserves to be a **callback**.
> If it’s a **one-liner with arguments**, inline arrow is fine.

---
