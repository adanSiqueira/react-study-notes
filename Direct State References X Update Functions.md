## The two versions

### Version A (direct state reference)

```ts
setTasks([...tasks, newTask.trim()]);
```

### Version B (updater function – best practice)

```ts
setTasks(t => [...t, newTask.trim()]);
```

They often **produce the same result**, but they are **not equally safe**.

---

## The key difference (in one sentence)

> **Updater functions guarantee you are working with the latest state.**

---

## Why the updater function is better practice

### 1️⃣ React state updates are **asynchronous**

React does **not** update state immediately.

```ts
setTasks([...tasks, newTask]);
setTasks([...tasks, anotherTask]);
```

Both lines may read the **same old value of `tasks`**, causing bugs.

---

### 2️⃣ Updater functions always receive the **latest state**

```ts
setTasks(t => [...t, newTask]);
```

Here:

* `t` is **guaranteed** to be the most recent value
* Even if React batches updates
* Even if updates happen quickly or in parallel

---

## Real bug example (important)

### ❌ Bug-prone version

```ts
function addTwoTasks() {
    setTasks([...tasks, "Task A"]);
    setTasks([...tasks, "Task B"]);
}
```

Expected:

```ts
["Wake up", "Brush Teeth", "Eat Breakfast", "Task A", "Task B"]
```

Actual result:

```ts
["Wake up", "Brush Teeth", "Eat Breakfast", "Task B"]
```

Why?

* Both updates read the **same stale `tasks` value**

---

### ✅ Safe version using updater function

```ts
function addTwoTasks() {
    setTasks(t => [...t, "Task A"]);
    setTasks(t => [...t, "Task B"]);
}
```

Now:

* Each update uses the **previous result**
* No state loss

---

## Why this matters even if your code “works now”

Your original code:

```ts
setTasks([...tasks, newTask.trim()]);
```

✔ Works today
❌ Can break later when:

* You add more updates
* You use async logic
* React batches updates (which it does aggressively)

---

## Why React recommends updater functions

React’s own documentation states:

> Use the functional update form when the new state depends on the previous state.

Your case:

```ts
newState = previousState + newTask
```

That is **exactly** when updater functions should be used.

---

## Mental model (memorize this)

> If your new state depends on the old state → **always use an updater function**

---

## Comparing both approaches

| Feature                 | Direct State | Updater Function |
| ----------------------- | ------------ | ---------------- |
| Simpler syntax          | ✅            | ❌                |
| Safe with async updates | ❌            | ✅                |
| Safe with batching      | ❌            | ✅                |
| React-recommended       | ❌            | ✅                |
| Scales well             | ❌            | ✅                |

---

## Your final version (best practice)

```ts
function handleAddTask(): void {
    if (newTask.trim() !== "") {
        setTasks(t => [...t, newTask.trim()]);
        setNewTask("");
    }
}
```

✔ Safe
✔ Predictable
✔ Scalable
✔ Idiomatic React

---

## TL;DR

* Both versions often work
* Only **one** is safe in all scenarios
* Updater functions prevent stale state bugs
* Always use them when state depends on previous state

---
