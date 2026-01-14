# React Hooks — Complete Theoretical Review with Practical Examples

---

## 1️⃣ What Are React Hooks?

**React Hooks** are **special functions** that allow **functional components** to use React features that were previously available **only in class components**, such as:

* State
* Lifecycle methods
* Context
* Memoization
* Side effects

### Before Hooks (Class Components)

```tsx
class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}
```

### With Hooks (Functional Components)

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

✔ Simpler
✔ More readable
✔ Less boilerplate

---

## 2️⃣ Why Hooks Exist

Hooks solve major problems with classes:

| Problem with Classes | Hook Solution    |
| -------------------- | ---------------- |
| `this` confusion     | No `this`        |
| Hard to reuse logic  | Custom hooks     |
| Lifecycle complexity | `useEffect`      |
| Large components     | Composable hooks |

---

## 3️⃣ Rules of Hooks (CRITICAL)

1️⃣ **Only call hooks at the top level**
2️⃣ **Only call hooks inside React functions**

❌ Wrong

```tsx
if (condition) {
  useState(0);
}
```

✅ Correct

```tsx
const [count, setCount] = useState(0);
```

---

## 4️⃣ `useState` — Stateful Variables

### Definition

> `useState` allows you to create a **stateful variable** and a **setter function** that updates the Virtual DOM.

### Syntax

```tsx
const [state, setState] = useState(initialValue);
```

### Example

```tsx
const [name, setName] = useState("John");
```

* `name` → current state
* `setName` → updates state and triggers re-render

---

### Updating State

```tsx
setName("Alice");
```

### Functional Update (Best Practice)

```tsx
setCount(prev => prev + 1);
```

---

## 5️⃣ `useEffect` — Side Effects

### Definition

> Runs side effects after rendering.

### Common Side Effects

* Fetching data
* Subscriptions
* Timers
* DOM updates

---

### Syntax

```tsx
useEffect(() => {
  // side effect
  return () => {
    // cleanup
  };
}, [dependencies]);
```

---

### Examples

#### Run once (componentDidMount)

```tsx
useEffect(() => {
  console.log("Mounted");
}, []);
```

#### Run on state change

```tsx
useEffect(() => {
  document.title = count.toString();
}, [count]);
```

---

## 6️⃣ `useContext` — Global State Access

### Definition

> Allows components to consume context without prop drilling.

---

### Example

```tsx
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}
```

---

## 7️⃣ `useReducer` — Complex State Logic

### Definition

> Manages state transitions using reducers (Redux-like).

---

### Example

```tsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
```

Use when:
✔ State logic is complex
✔ Multiple actions exist

---

## 8️⃣ `useCallback` — Memoizing Functions

### Definition

> Returns a memoized function to avoid unnecessary re-creations.

---

### Example

```tsx
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

Used to:

* Optimize performance
* Prevent unnecessary re-renders
* Stabilize props

---

## 9️⃣ `useMemo` — Memoizing Values

### Definition

> Memoizes expensive calculations.

---

### Example

```tsx
const total = useMemo(() => {
  return items.reduce((a, b) => a + b.price, 0);
}, [items]);
```

---

## 🔟 `useRef` — Persistent References

### Definition

> Stores mutable values without triggering re-renders.

---

### Example

```tsx
const inputRef = useRef<HTMLInputElement>(null);

inputRef.current?.focus();
```

---

## 1️⃣1️⃣ Custom Hooks — Reusable Logic

### Definition

> Functions that use hooks and start with `use`.

---

### Example

```tsx
function useCounter() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount(c => c + 1) };
}
```

---

## 1️⃣2️⃣ Virtual DOM and Hooks

State changes:

```
setState →
 Virtual DOM update →
 Diffing →
 Minimal DOM update
```

Hooks **trigger re-render**, not DOM mutation.

---

## 1️⃣3️⃣ Hook Cheat Sheet 📌

| Hook          | Purpose            |
| ------------- | ------------------ |
| `useState`    | Stateful variables |
| `useEffect`   | Side effects       |
| `useContext`  | Global state       |
| `useReducer`  | Complex logic      |
| `useCallback` | Memoize functions  |
| `useMemo`     | Memoize values     |
| `useRef`      | DOM access         |

---

## 🧠 Mental Model (Final)

> Hooks = React features without classes
> State = source of truth
> UI = function of state

---

## ✅ Final Summary

* Hooks replace class components
* `useState` creates state + setter
* Hooks must follow strict rules
* State updates cause re-renders
* Hooks compose clean, reusable logic

---