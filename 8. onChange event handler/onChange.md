Below is a **deep, focused, and practical deep dive exclusively about `onChange` in React**, with **theory + real examples + TypeScript details + mental models + pitfalls**.
This is written at a **professional frontend / React + TS level**, not beginner fluff.

---

# `onChange` in React — Complete & Detailed Review

---

## 1. What is `onChange` in React?

`onChange` is an **event handler** that fires when the **value of a form element changes**.

In React, `onChange` is primarily used with:

* `<input>`
* `<textarea>`
* `<select>`

It is the **core mechanism behind controlled components**.

> 💡 **Key idea:**
> `onChange` is how React **listens to user input and syncs it to state**.

---

## 2. React `onChange` vs Native HTML `change`

This is **extremely important**.

### Native HTML behavior

| Element      | Fires when               |
| ------------ | ------------------------ |
| `<input>`    | When element loses focus |
| `<select>`   | When selection changes   |
| `<textarea>` | When element loses focus |

### React behavior

React **normalizes** `onChange`:

> 🔹 React `onChange` fires **on every keystroke**, not on blur.

This makes React `onChange` behave like native `input` events.

---

## 3. The Controlled Component Pattern

### What is a controlled input?

An input whose **value is controlled by React state**.

```tsx
const [value, setValue] = useState("");
```

```tsx
<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

✔ React owns the value
✔ UI always reflects state
✔ Predictable behavior

---

## 4. Anatomy of `onChange`

```tsx
onChange={(event) => {
  setValue(event.target.value);
}}
```

### What is `event`?

A **SyntheticEvent** wrapping a native DOM event.

### Key properties used with `onChange`

| Property              | Meaning                           |
| --------------------- | --------------------------------- |
| `event.target`        | Element that triggered the event  |
| `event.currentTarget` | Element where handler is attached |
| `value`               | Current input value               |
| `checked`             | For checkboxes                    |
| `name`                | Used in dynamic forms             |

---

## 5. Typing `onChange` in TypeScript

### Input (text, email, password)

```tsx
function handleChange(
  event: React.ChangeEvent<HTMLInputElement>
) {
  setValue(event.target.value);
}
```

### Textarea

```tsx
React.ChangeEvent<HTMLTextAreaElement>
```

### Select

```tsx
React.ChangeEvent<HTMLSelectElement>
```

---

## 6. Text Input Example (Typed)

```tsx
const [username, setUsername] = useState("");

function handleChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  setUsername(e.target.value);
}

<input value={username} onChange={handleChange} />
```

---

## 7. Checkbox Handling (Very Common Mistake)

❌ Wrong:

```tsx
setChecked(e.target.value);
```

✔ Correct:

```tsx
setChecked(e.target.checked);
```

### Example

```tsx
const [isChecked, setIsChecked] = useState(false);

<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

---

## 8. Select Dropdowns

```tsx
const [country, setCountry] = useState("BR");

<select
  value={country}
  onChange={(e) => setCountry(e.target.value)}
>
  <option value="BR">Brazil</option>
  <option value="US">USA</option>
</select>
```

---

## 9. Handling Multiple Inputs with One `onChange`

### Pattern: `name` attribute

```tsx
const [form, setForm] = useState({
  email: "",
  password: ""
});
```

```tsx
function handleChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const { name, value } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: value
  }));
}
```

```tsx
<input name="email" onChange={handleChange} />
<input name="password" onChange={handleChange} />
```

✔ Scalable
✔ Clean
✔ Real-world pattern

---

## 10. `onChange` with Numbers

Inputs return **strings**, always.

❌ Bug:

```tsx
setAge(e.target.value);
```

✔ Correct:

```tsx
setAge(Number(e.target.value));
```

Or safer:

```tsx
setAge(parseInt(e.target.value, 10));
```

---

## 11. Controlled vs Uncontrolled Inputs

### Controlled

```tsx
<input value={value} onChange={...} />
```

### Uncontrolled

```tsx
<input defaultValue="test" />
```

| Controlled   | Uncontrolled |
| ------------ | ------------ |
| State-driven | DOM-driven   |
| Predictable  | Less control |
| Preferred    | Rare cases   |

---

## 12. Performance Considerations

`onChange` fires **on every keystroke**.

This means:

* Avoid heavy logic inside it
* Avoid expensive state updates
* Avoid API calls directly

### Bad

```tsx
onChange={(e) => fetchData(e.target.value)}
```

### Better

```tsx
useEffect(() => {
  const timeout = setTimeout(() => {
    fetchData(value);
  }, 500);

  return () => clearTimeout(timeout);
}, [value]);
```

---

## 13. Debouncing `onChange`

Used for:

* Search bars
* Live filtering
* Autocomplete

```tsx
function handleChange(e) {
  setValue(e.target.value);
}
```

```tsx
useEffect(() => {
  const id = setTimeout(() => {
    search(value);
  }, 300);

  return () => clearTimeout(id);
}, [value]);
```

---

## 14. Validation with `onChange`

```tsx
function handleChange(e) {
  const value = e.target.value;

  if (value.length < 3) {
    setError("Too short");
  } else {
    setError("");
  }

  setUsername(value);
}
```

---

## 15. `onChange` vs `onInput`

React **prefers `onChange`**.

* `onInput` exists
* Less commonly used
* `onChange` already behaves like input

---

## 16. `event.target` vs `event.currentTarget`

| Property        | Difference            |
| --------------- | --------------------- |
| `target`        | Actual element        |
| `currentTarget` | Handler-bound element |

In inputs → usually the same.

---

## 17. Common Pitfalls

### ❌ Forgetting `value`

```tsx
<input onChange={...} />
```

Creates **uncontrolled input**

---

### ❌ Reading state immediately after set

```tsx
setValue("abc");
console.log(value); // stale
```

---

### ❌ Mutating state directly

```tsx
form.email = value; // ❌
```

---

## 18. Mental Model

> **`onChange` does not change the input**
> **It tells React that the user wants to change it**

React then:

1. Receives event
2. Updates state
3. Re-renders
4. Updates input value

---

## 19. Cheat Sheet

### Text Input

```tsx
onChange={e => setValue(e.target.value)}
```

### Checkbox

```tsx
onChange={e => setChecked(e.target.checked)}
```

### Number Input

```tsx
onChange={e => setAge(+e.target.value)}
```

### Multiple Fields

```tsx
const { name, value } = e.target;
```

### TypeScript

```tsx
React.ChangeEvent<HTMLInputElement>
```

---

## 20. When to Master `onChange`

You **cannot build**:

* Forms
* Auth flows
* Dashboards
* Filters
* Search
* CRUD UIs

without fully understanding `onChange`.

---

If you want next:

* `onSubmit` deep dive
* Controlled vs uncontrolled (advanced)
* Form libraries comparison (React Hook Form vs Formik)
* Build a full form with validation + TS

Just say the word 👌
