# React Hook: `useState` — Complete Theoretical Review

---

## 1️⃣ What Is `useState`?

`useState` is a **React Hook** that allows a functional component to:

* Store **stateful data**
* Update that data
* Automatically **re-render the UI** when the state changes

> State represents **data that changes over time** and affects what is rendered.

---

## 2️⃣ Why `useState` Exists

Before hooks, only **class components** could manage state.

Problems with classes:

* `this` binding confusion
* Verbose syntax
* Hard-to-reuse logic

Hooks solved this by allowing **state in functions**.

---

## 3️⃣ Basic Syntax

```tsx
const [state, setState] = useState(initialValue);
```

### Example

```tsx
const [count, setCount] = useState(0);
```

* `count` → current state value
* `setCount` → function to update it

---

## 4️⃣ Destructuring Explained

```tsx
const result = useState(0);
// result = [0, function]

const [count, setCount] = result;
```

`useState` returns a **tuple**:

```ts
[state, setterFunction]
```

---

## 5️⃣ How State Updates Work (Mental Model)

```
setState()
 → React schedules update
 → Virtual DOM recalculated
 → Differences detected
 → Real DOM updated
```

⚠️ State updates are **asynchronous**

---

## 6️⃣ Updating State Correctly

### ❌ Wrong (mutating state)

```tsx
count++;
```

### ✅ Correct

```tsx
setCount(count + 1);
```

---

## 7️⃣ Functional Updates (VERY IMPORTANT)

When new state depends on previous state:

```tsx
setCount(prevCount => prevCount + 1);
```

### Why?

Because state updates may be **batched**.

---

### Example: Bug Without Functional Update

```tsx
setCount(count + 1);
setCount(count + 1); // still increments once
```

### Correct Version

```tsx
setCount(c => c + 1);
setCount(c => c + 1); // increments twice
```

---

## 8️⃣ useState with Different Data Types

### Number

```tsx
const [count, setCount] = useState(0);
```

---

### String

```tsx
const [name, setName] = useState("John");
```

---

### Boolean

```tsx
const [isOpen, setIsOpen] = useState(false);
```

---

### Object

```tsx
const [user, setUser] = useState({ name: "Ana", age: 25 });
```

⚠️ Must create a new object when updating:

```tsx
setUser(prev => ({ ...prev, age: 26 }));
```

---

### Array

```tsx
const [items, setItems] = useState<string[]>([]);
```

Add item:

```tsx
setItems(prev => [...prev, "New Item"]);
```

Remove item:

```tsx
setItems(prev => prev.filter(i => i !== "Old"));
```

---

## 9️⃣ Lazy Initialization

When the initial state is expensive:

```tsx
const [data, setData] = useState(() => {
  return expensiveCalculation();
});
```

✔ Runs only once
❌ Not on every render

---

## 🔟 Controlled Components (Forms)

### Example

```tsx
const [value, setValue] = useState("");

<input
  value={value}
  onChange={e => setValue(e.target.value)}
/>
```

✔ React controls the input
✔ Single source of truth

---

## 1️⃣1️⃣ Multiple State Variables

```tsx
const [name, setName] = useState("");
const [age, setAge] = useState(0);
```

✔ Prefer multiple states over large objects
✔ More predictable updates

---

## 1️⃣2️⃣ When NOT to Use `useState`

❌ For derived values:

```tsx
const fullName = firstName + " " + lastName;
```

❌ For constants:

```tsx
const PI = 3.14;
```

---

## 1️⃣3️⃣ `useState` vs Props

| Aspect          | State     | Props  |
| --------------- | --------- | ------ |
| Mutable         | ✅ Yes     | ❌ No   |
| Owned by        | Component | Parent |
| Triggers render | ✅ Yes     | Yes    |

---

## 1️⃣4️⃣ Common Mistakes

❌ Mutating objects/arrays
❌ Using state for everything
❌ Forgetting functional updates
❌ Expecting immediate state change

---

## 1️⃣5️⃣ TypeScript with `useState`

### Type Inference

```tsx
const [count, setCount] = useState(0); // number inferred
```

---

### Explicit Typing

```tsx
const [user, setUser] = useState<{ name: string; age: number } | null>(null);
```

---

## 1️⃣6️⃣ `useState` and Re-rendering

* State change → re-render
* Same value → no re-render
* State is local to component

---

## 🧠 Final Mental Model

> UI = function(state)
> Change state → React updates UI

---

## 📌 `useState` Cheat Sheet

| Topic          | Rule                |
| -------------- | ------------------- |
| Create state   | `useState(initial)` |
| Update         | Use setter          |
| Based on prev  | Functional update   |
| Objects/arrays | Immutable updates   |
| Expensive init | Lazy initializer    |
| Forms          | Controlled inputs   |

---

## ✅ Final Summary

* `useState` is React’s core hook
* Provides state + updater
* Triggers re-renders
* Must follow immutability rules
* Fundamental to React thinking

---
