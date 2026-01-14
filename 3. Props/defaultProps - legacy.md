---

## 1. What `defaultProps` Was Originally For

In classic React (especially **class components**), `defaultProps` was used to:

* Provide default values for props
* Avoid `undefined` checks
* Document optional props

Example (old pattern):

```js
function Button({ label }) {
  return <button>{label}</button>;
}

Button.defaultProps = {
  label: "Click me",
};
```

---

## 2. Why `defaultProps` Is Problematic in TypeScript

TypeScript already has:

* Optional props (`?`)
* Default values via **destructuring**
* Strong type inference

### Problem 1 — TypeScript doesn’t narrow types correctly

```ts
interface ButtonProps {
  label?: string;
}

function Button({ label }: ButtonProps) {
  return <button>{label.toUpperCase()}</button>; // ❌ error
}
```

Even with:

```ts
Button.defaultProps = {
  label: "Click me",
};
```

TypeScript still thinks `label` may be `undefined`.

👉 **TypeScript does NOT use `defaultProps` for type inference in function components.**

---

## 3. The Modern, Correct Pattern (Recommended)

### ✅ Use default values in function parameters

```ts
interface ButtonProps {
  label?: string;
}

function Button({ label = "Click me" }: ButtonProps) {
  return <button>{label.toUpperCase()}</button>; // ✅ safe
}
```

Why this works:

* Happens at **runtime**
* TypeScript understands it
* No extra syntax
* Fully type-safe

---

## 4. Default Values vs `defaultProps`

| Feature          | defaultProps | Parameter Defaults |
| ---------------- | ------------ | ------------------ |
| Type-safe in TS  | ❌ No         | ✅ Yes              |
| Works with FC    | ⚠️ Legacy    | ✅ Recommended      |
| IDE inference    | ❌ Poor       | ✅ Excellent        |
| Runtime behavior | ✅ Yes        | ✅ Yes              |
| Future-proof     | ❌ No         | ✅ Yes              |

---

## 5. What About Required vs Optional Props?

### Required prop with default? ❌ Bad design

```ts
interface Props {
  label: string; // required
}
```

Providing a default makes no sense — it's already required.

---

### Optional prop with default? ✅ Correct

```ts
interface Props {
  label?: string;
}
```

Then:

```ts
function Button({ label = "Click me" }: Props) {}
```

---

## 6. Are There Any Cases Where `defaultProps` Is Still Useful?

### 🔹 Class components (legacy code)

```ts
class Button extends React.Component<{ label?: string }> {
  static defaultProps = {
    label: "Click me",
  };

  render() {
    return <button>{this.props.label}</button>;
  }
}
```

This still works — but **class components themselves are legacy**.

---

### 🔹 React.FC + children (historical workaround)

This was once common:

```ts
const Button: React.FC<ButtonProps> = ({ label }) => { ... };
```

But:

* `React.FC` is now discouraged
* Default parameters still win

---

## 7. Official & Community Direction

* React team: **function components + hooks**
* TypeScript community: **parameter defaults**
* ESLint rules often warn against `defaultProps` in FCs

---

## 8. Best Practice Cheat Sheet

### ✅ DO (Modern TS React)

```ts
interface Props {
  size?: "sm" | "md" | "lg";
}

function Button({ size = "md" }: Props) {
  ...
}
```

### ❌ AVOID

```ts
Button.defaultProps = {
  size: "md",
};
```

---

## Final Answer

> **In TypeScript, `defaultProps` has no real utility for function components.**

Use:

* Optional props (`?`)
* Default values in function parameters

This gives you:

* Better type safety
* Cleaner code
* Future-proof patterns

---

