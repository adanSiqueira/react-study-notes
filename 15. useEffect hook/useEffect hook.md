# 1. Why `useEffect` exists (theory first)

React components are **pure functions of state and props**.

That means:

* They describe **what the UI should look like**
* They should **not** directly cause side effects during rendering

But real applications **need side effects**, such as:

* Fetching data
* Subscribing to events
* Manipulating the DOM
* Talking to external systems

👉 **`useEffect` is React’s official escape hatch for side effects.**

> It tells React:
> **“After rendering, run this code if certain conditions are met.”**

---

# 2. What is a “side effect”?

A **side effect** is any code that:

* Interacts with the outside world
* Affects something other than the returned JSX

Examples:

* `fetch()`
* `setInterval`
* `addEventListener`
* `document.title = ...`
* WebSocket connections

These **must not** run during render — they run **after render**, inside `useEffect`.

---

# 3. The mental model of `useEffect`

```ts
useEffect(effectFunction, dependencyArray)
```

Think of it as:

> “Run `effectFunction` **after React commits the render**,
> but only when dependencies change.”

### Lifecycle mapping (important)

| React concept      | `useEffect` equivalent |
| ------------------ | ---------------------- |
| Component mounts   | Effect runs            |
| Component updates  | Effect may re-run      |
| Component unmounts | Cleanup runs           |

---

# 4. The three core dependency patterns

## 4.1 `useEffect(() => {})`

### Runs **after every render**

```ts
useEffect(() => {
  console.log("Component rendered");
});
```

### Why?

* No dependency array = React assumes **everything is a dependency**
* Runs after:

  * Initial mount
  * Every state change
  * Every prop change

### Practical example: debugging renders

```ts
useEffect(() => {
  console.log("Tasks updated:", tasks);
});
```

⚠️ **Rarely recommended** in production — easy to cause infinite loops.

---

## 4.2 `useEffect(() => {}, [])`

### Runs **only once (on mount)**

```ts
useEffect(() => {
  console.log("Component mounted");
}, []);
```

### Why?

* Empty array = “this effect does not depend on anything”
* Equivalent to `componentDidMount`

### Practical example: initial data fetch

```ts
useEffect(() => {
  fetch("/api/tasks")
    .then(res => res.json())
    .then(data => setTasks(data));
}, []);
```

✅ Runs once
✅ Safe
✅ Very common

---

## 4.3 `useEffect(() => {}, [value])`

### Runs on mount **and when `value` changes**

```ts
useEffect(() => {
  console.log("Task count changed:", tasks.length);
}, [tasks]);
```

### Why?

* React tracks `value`
* If it changes → re-run effect

### Practical example: reacting to state

```ts
useEffect(() => {
  document.title = `Tasks: ${tasks.length}`;
}, [tasks.length]);
```

---

# 5. Why dependency arrays matter (theory)

React uses **reference equality** to detect changes.

```ts
prevValue === nextValue
```

If it’s different → effect runs again.

This is why:

* Objects and arrays often trigger effects
* Primitives are safer dependencies
* Missing dependencies cause bugs

---

# 6. Common real-world uses (with examples)

---

## #1 Event listeners

### Problem

You need to listen to a browser event.

### Solution

```ts
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

### Theory

* Effect sets up the listener
* Cleanup removes it on unmount
* Prevents memory leaks

---

## #2 DOM manipulation

### Problem

You need to modify the DOM directly.

```ts
useEffect(() => {
  const input = document.getElementById("my-input");
  input?.focus();
}, []);
```

### Why `useEffect`?

* DOM exists **only after render**
* Manipulating it during render would break React’s model

---

## #3 Subscriptions (real-time updates)

### Example: WebSocket or Firebase

```ts
useEffect(() => {
  const socket = new WebSocket("ws://example.com");

  socket.onmessage = event => {
    setTasks(prev => [...prev, event.data]);
  };

  return () => socket.close();
}, []);
```

### Theory

* Subscribe on mount
* Unsubscribe on unmount
* Keeps UI in sync with external systems

---

## #4 Fetching data from an API

### Most common use case

```ts
useEffect(() => {
  async function fetchData() {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  }

  fetchData();
}, []);
```

### Why not fetch during render?

* Rendering must stay pure
* Fetching is asynchronous and impure

---

## #5 Cleanup when a component unmounts

### Cleanup function

```ts
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running...");
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, []);
```

### Theory

* The returned function is the **cleanup**
* Runs:

  * Before re-running the effect
  * When the component unmounts

---

# 7. `useEffect` execution order (important)

1. React renders the component
2. DOM is updated
3. `useEffect` runs
4. Cleanup runs **before next effect or unmount**

This guarantees:

* DOM is ready
* Side effects don’t block rendering

---

# 8. Common mistakes (and why they’re wrong)

### ❌ Updating state without dependencies

```ts
useEffect(() => {
  setCount(count + 1);
});
```

➡ Infinite loop
Because:

* Effect updates state
* State triggers re-render
* Effect runs again

---

### ❌ Missing dependencies

```ts
useEffect(() => {
  console.log(task);
}, []);
```

➡ Stale values
React captures the initial `task` only.

---

### ❌ Overusing `useEffect`

If something can be derived from state:

```ts
const completedCount = tasks.filter(t => t.done).length;
```

👉 **No effect needed**

---

# 9. Conceptual summary

### Think of `useEffect` as:

> “Synchronize my component with something outside React.”

| UseEffect role  | Description              |
| --------------- | ------------------------ |
| Side effects    | External interactions    |
| Lifecycle       | Mount, update, unmount   |
| Synchronization | State ↔ external systems |
| Cleanup         | Prevent memory leaks     |

---

# 10. Final mental model (memorize this)

```
Render → Commit DOM → useEffect runs
            ↑
        Cleanup before next effect
```

---

## Final takeaway

`useEffect` is **not about lifecycle methods** —
it’s about **synchronization**.

If you ask:

> “Does this code interact with something outside React?”

If yes → `useEffect`.

If no → it probably belongs in render or event handlers.

---
