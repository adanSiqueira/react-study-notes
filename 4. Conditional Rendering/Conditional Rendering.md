# Conditional Rendering in React

**Theory + Practical Examples**

## 1. What Is Conditional Rendering?

**Conditional rendering** means:

> **Deciding what React renders based on a condition**

The condition can be:

* A boolean
* A value (`null`, `undefined`, string, number)
* Application state
* Props
* API data
* Authentication status

React itself has **no special syntax** for conditional rendering —
you use **plain JavaScript** inside JSX.

---

## 2. Core Mental Model

> React does not “hide” elements.
> It either **renders them** or **doesn’t render them at all**.

If a component:

* Is not returned → it does not exist in the DOM
* Returns `null` → nothing is rendered

---

## 3. The Most Basic Pattern: `if / else`

### Example

```tsx
interface UserProps {
  isLoggedIn: boolean;
}

function UserStatus({ isLoggedIn }: UserProps) {
  if (isLoggedIn) {
    return <h2>Welcome back!</h2>;
  } else {
    return <h2>Please log in</h2>;
  }
}
```

### When to use

* Large branches
* Complex logic
* Early exits

---

## 4. Returning `null` (Very Important)

```tsx
function Notification({ show }: { show: boolean }) {
  if (!show) {
    return null;
  }

  return <div>You have a new message</div>;
}
```

This:

* Renders nothing
* Does not create empty elements
* Is better than CSS `display: none`

---

## 5. Ternary Operator (`condition ? A : B`)

### Example

```tsx
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <h2>
      {isLoggedIn ? "Welcome back!" : "Please log in"}
    </h2>
  );
}
```

### When to use

* Simple yes/no rendering
* Inline JSX

### Avoid when:

* Logic becomes hard to read

---

## 6. Logical AND (`&&`) — Show or Hide

### Example

```tsx
function Warning({ hasError }: { hasError: boolean }) {
  return (
    <div>
      {hasError && <p>Error occurred!</p>}
    </div>
  );
}
```

### How it works

* If `hasError` is `true` → JSX renders
* If `false` → React ignores it

⚠️ **Be careful with numbers**

```tsx
{count && <p>{count}</p>} // ❌ 0 won't render
```

Safer:

```tsx
{count > 0 && <p>{count}</p>}
```

---

## 7. Conditional Rendering with State

### Example

```tsx
function Toggle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(v => !v)}>
        Toggle
      </button>

      {isVisible && <p>Now you see me</p>}
    </div>
  );
}
```

This is one of the **most common patterns in React**.

---

## 8. Conditional Rendering with Props

```tsx
function Card({ isPremium }: { isPremium: boolean }) {
  return (
    <div>
      <h3>Account</h3>
      {isPremium && <span>⭐ Premium</span>}
    </div>
  );
}
```

---

## 9. Rendering Different Components

### Example

```tsx
function Status({ online }: { online: boolean }) {
  return online ? <Online /> : <Offline />;
}
```

---

## 10. Switch Pattern (Multiple Conditions)

### Example

```tsx
function Status({ state }: { state: "loading" | "success" | "error" }) {
  switch (state) {
    case "loading":
      return <Loading />;
    case "success":
      return <Success />;
    case "error":
      return <Error />;
    default:
      return null;
  }
}
```

### When to use

* Many states
* Clear readability
* State machines

---

## 11. Conditional Rendering with Objects (Advanced Pattern)

```tsx
const views = {
  loading: <Loading />,
  success: <Success />,
  error: <Error />,
};

function View({ status }: { status: keyof typeof views }) {
  return views[status];
}
```

Used in:

* Dashboards
* Complex flows
* UI state management

---

## 12. Conditional Classes (Very Common)

```tsx
<div className={isActive ? "active" : "inactive"} />
```

Or:

```tsx
<div className={isActive && "active"} />
```

With CSS Modules:

```tsx
<div className={isActive ? styles.active : styles.inactive} />
```

---

## 13. Conditional Rendering vs CSS Visibility

| Approach              | Behavior                  |
| --------------------- | ------------------------- |
| Conditional rendering | Element does not exist    |
| `display: none`       | Element exists but hidden |
| `visibility: hidden`  | Element occupies space    |

Prefer conditional rendering when:

* Component is heavy
* Performance matters
* Logic-driven UI

---

## 14. Common Mistakes

❌ Overusing ternaries
❌ Nesting ternaries deeply
❌ Using `&&` with numbers
❌ Mixing rendering and business logic

---

## 15. Best Practices Cheat Sheet

✅ Keep conditions simple
✅ Extract complex logic outside JSX
✅ Prefer `if` for readability
✅ Return `null` when appropriate
✅ Make rendering explicit

---

## 16. Senior-Level Insight

> Conditional rendering is **UI state management** at its core.

Good conditional rendering:

* Reflects the real state of the app
* Makes UI predictable
* Prevents edge-case bugs

Bad conditional rendering:

* Hides bugs
* Creates unreadable JSX
* Couples logic and UI too tightly

---

## Final Summary

* React uses **plain JavaScript** for conditional rendering
* You decide **what exists**, not what is hidden
* Multiple patterns exist — choose for clarity, not cleverness
* Mastering this leads to clean, scalable UI

---