# React Props — Theoretical Explanation + Cheat Sheet

---

## 1. What Are Props?

**Props (properties)** are **read-only inputs** passed to a React component.

> Props allow components to receive data **from the outside** and render dynamically.

They are the **main communication mechanism** between components.

---

## 2. Core Definition (Very Important)

> **Props are immutable**
> A component **cannot modify** its own props.

Props represent:

* Configuration
* Data
* Behavior

---

## 3. Parent → Child Data Flow

React uses **one-way (unidirectional) data flow**.

```text
Parent Component
     ↓ props
Child Component
```

---

## 4. Basic Example

### Parent component

```tsx
function App() {
  return <Greeting name="Adan" />;
}
```

### Child component

```tsx
type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <h1>Hello, {name}!</h1>;
}
```

---

## 5. JSX Syntax: `<Component key=value />`

### String prop

```tsx
<User name="Adan" />
```

---

### Number prop

```tsx
<User age={30} />
```

---

### Boolean prop

```tsx
<Button disabled />
```

Equivalent to:

```tsx
<Button disabled={true} />
```

---

### Expression prop

```tsx
<User age={18 + 2} />
```

---

## 6. Props Are Read-Only (Immutable Rule)

❌ Invalid:

```tsx
function User(props) {
  props.name = "John"; // ❌
}
```

✅ Valid:

```tsx
function User({ name }) {
  return <h1>{name}</h1>;
}
```

Why?

* React treats props as **inputs**
* Mutation breaks predictability

---

## 7. Destructuring Props (Best Practice)

### Without destructuring

```tsx
function User(props) {
  return <h1>{props.name}</h1>;
}
```

---

### With destructuring (recommended)

```tsx
function User({ name }) {
  return <h1>{name}</h1>;
}
```

---

## 8. Multiple Props

```tsx
<User name="Adan" age={30} isAdmin={true} />
```

```tsx
type UserProps = {
  name: string;
  age: number;
  isAdmin: boolean;
};

function User({ name, age, isAdmin }: UserProps) {
  return (
    <div>
      <p>{name}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}
```

---

## 9. Passing Functions as Props (VERY IMPORTANT)

Props can pass **behavior**, not just data.

### Parent

```tsx
function App() {
  const handleClick = () => {
    alert("Clicked!");
  };

  return <Button onClick={handleClick} />;
}
```

---

### Child

```tsx
type ButtonProps = {
  onClick: () => void;
};

function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Click</button>;
}
```

This enables **child → parent communication**.

---

## 10. `children` Prop (Special Prop)

Every component automatically receives `children`.

### Parent

```tsx
<Card>
  <p>Hello</p>
</Card>
```

---

### Child

```tsx
type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}
```

---

## 11. Default Props

### Using default parameters (modern)

```tsx
type ButtonProps = {
  text?: string;
};

function Button({ text = "Click" }: ButtonProps) {
  return <button>{text}</button>;
}
```

---

## 12. Conditional Props

```tsx
<Button disabled={isLoading} />
```

```tsx
<button disabled={disabled}>Click</button>
```

---

## 13. Spread Props (`...props`)

Useful for wrapper components.

```tsx
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}
```

Usage:

```tsx
<Input placeholder="Email" type="email" />
```

---

## 14. Props vs State (Critical Distinction)

| Props            | State              |
| ---------------- | ------------------ |
| External         | Internal           |
| Read-only        | Mutable            |
| Passed by parent | Owned by component |
| Configuration    | Behavior           |

---

## 15. Anti-Patterns ❌

### ❌ Mutating props

```tsx
props.count++;
```

---

### ❌ Copying props to state unnecessarily

```tsx
const [name, setName] = useState(props.name);
```

(Unless there’s a real reason.)

---

## 16. Mental Model (Backend-Friendly)

Props are like:

* Function parameters
* Constructor arguments
* Immutable config

```python
def greet(name):
    print(name)
```

You don’t mutate `name`.

---

## 17. Real-World Example: Reusable Button

```tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

---

## 🔥 React Props Cheat Sheet

### Pass props

```tsx
<Component prop={value} />
```

---

### Receive props

```tsx
function Component({ prop }) {}
```

---

### Props are read-only

```tsx
❌ props.x = 1
```

---

### Pass functions

```tsx
onClick={handleClick}
```

---

### Children

```tsx
props.children
```

---

## Final Takeaway

* Props are **read-only inputs**
* They flow **parent → child**
* They define **what a component is**
* Functions as props enable communication
* Mastering props = mastering React composition

---
