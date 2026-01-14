# 🔄 Updater Functions in React — Theoretical Review with Practical Examples

---

## 1. What Is an Updater Function?

An **updater function** is a function passed to a state setter (like `setState`, `setCount`, `setYear`) that receives the **previous state value** and returns the **next state**.

### Basic form

```tsx
setState(prevState => newState);
```

---

## 2. Why Updater Functions Exist

React state updates are:

* **Asynchronous**
* **Batched**
* **Not immediately reflected**

Because of this, reading state directly when updating it can produce **incorrect results**.

Updater functions solve this by:

* Always using the **latest state**
* Avoiding stale closures
* Ensuring predictable updates

---

## 3. The Problem with Direct State Updates

### ❌ Unsafe pattern

```tsx
setYear(year + 1);
```

This looks correct — but it can break in real scenarios.

### Why?

React may batch multiple updates:

```tsx
setYear(year + 1);
setYear(year + 1);
```

❌ Result: `year + 1`
✔ Expected: `year + 2`

Both updates read the **same stale value** of `year`.

---

## 4. The Safe Solution: Updater Function

### ✔ Correct pattern

```tsx
setYear(prevYear => prevYear + 1);
```

Now:

```tsx
setYear(prev => prev + 1);
setYear(prev => prev + 1);
```

✔ Result: `year + 2`

Each update receives the **latest updated value**.

---

## 5. Mental Model (Very Important)

> React does NOT update state immediately
>
> React **queues updates**
>
> Updater functions ensure each update uses the correct state snapshot

---

## 6. When You MUST Use Updater Functions

### ✔ Increment / decrement

```tsx
setCount(prev => prev + 1);
```

### ✔ Toggle boolean state

```tsx
setIsOpen(prev => !prev);
```

### ✔ Update based on previous array

```tsx
setItems(prev => [...prev, newItem]);
```

### ✔ Update object fields safely

```tsx
setUser(prev => ({
  ...prev,
  age: prev.age + 1
}));
```

---

## 7. Practical Example: Counter Component

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prev => prev + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

---

## 8. Multiple State Updates in One Function

### ❌ Wrong

```tsx
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
}
```

### ✔ Correct

```tsx
function handleClick() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}
```

---

## 9. Updater Functions with Asynchronous Code

### ❌ Bug-prone

```tsx
setTimeout(() => {
  setCount(count + 1);
}, 1000);
```

The `count` value may be outdated.

---

### ✔ Correct

```tsx
setTimeout(() => {
  setCount(prev => prev + 1);
}, 1000);
```

---

## 10. Arrays and Updater Functions

### Adding items

```tsx
setItems(prevItems => [...prevItems, item]);
```

### Removing items

```tsx
setItems(prevItems =>
  prevItems.filter(i => i.id !== id)
);
```

---

## 11. Objects and Updater Functions

### Updating one property

```tsx
setUser(prevUser => ({
  ...prevUser,
  name: "Alice"
}));
```

Without updater functions, you risk:

* Overwriting other properties
* Using stale object snapshots

---

## 12. TypeScript and Updater Functions

Type inference works automatically:

```tsx
const [year, setYear] = useState<number>(2024);

setYear(prev => prev + 1);
```

No extra typing needed.

---

## 13. Functional Updates vs Direct Updates

| Pattern                  | Safe?    | When to Use                |
| ------------------------ | -------- | -------------------------- |
| `setX(x + 1)`            | ⚠️ Risky | Only if update is isolated |
| `setX(prev => prev + 1)` | ✅ Safe   | Default choice             |

---

## 14. React Docs Recommendation

> **If the new state depends on the previous state, use a function.**

This is not optional — it’s a best practice.

---

## 15. Common Mistakes

### ❌ Mixing patterns

```tsx
setCount(prev => count + 1); // ❌ wrong
```

You must use `prev`, not `count`.

---

### ❌ Mutating previous state

```tsx
setItems(prev => {
  prev.push(item); // ❌ mutation
  return prev;
});
```

Always return a **new value**.

---

## 16. When You DON’T Need an Updater Function

If the new state does **not depend** on the old one:

```tsx
setName("John");
setIsLoggedIn(true);
```

Updater functions are unnecessary here.

---

## 17. Cheat Sheet

### Increment

```tsx
setCount(prev => prev + 1);
```

### Toggle

```tsx
setOpen(prev => !prev);
```

### Add to array

```tsx
setList(prev => [...prev, item]);
```

### Update object

```tsx
setObj(prev => ({ ...prev, key: value }));
```

---

## 18. Final Rule (Memorize This)

> **If your update depends on the previous state — always use an updater function.**

This single rule prevents:

* Race conditions
* Stale state bugs
* Inconsistent UI

---

## 19. Why This Matters in Real Projects

Updater functions are essential in:

* Event handlers
* Async requests
* Animations
* Counters
* Toggles
* Forms
* Concurrent React rendering

They are **not optional** — they are **foundational**.

---
