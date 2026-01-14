# React Events, Event Objects & DOM Properties

### 📘 Complete Cheat Sheet

---

## 1️⃣ What Is an Event in React?

An **event** is a user interaction:

* Click
* Typing
* Mouse movement
* Keyboard press
* Form submission

React wraps native browser events into **Synthetic Events** for:

* Cross-browser consistency
* Better performance
* Predictable behavior

---

## 2️⃣ Event Object Hierarchy (Mental Model)

```
Browser Event
 → Native DOM Event
 → React SyntheticEvent
 → Typed with TypeScript
```

Example:

```ts
React.MouseEvent<HTMLButtonElement>
```

---

## 3️⃣ Core React Event Types

| Event Type       | Trigger             |
| ---------------- | ------------------- |
| `MouseEvent`     | Click, hover        |
| `KeyboardEvent`  | Key press           |
| `ChangeEvent`    | Input change        |
| `FormEvent`      | Form submit         |
| `FocusEvent`     | Focus/blur          |
| `DragEvent`      | Drag & drop         |
| `PointerEvent`   | Mouse / pen / touch |
| `ClipboardEvent` | Copy / paste        |

---

## 4️⃣ Universal Event Properties (`SyntheticEvent`)

Available on **all events**

| Property              | Description                    |
| --------------------- | ------------------------------ |
| `e.type`              | Event type (`click`, `change`) |
| `e.target`            | Actual source element          |
| `e.currentTarget`     | Element with handler           |
| `e.preventDefault()`  | Cancel default action          |
| `e.stopPropagation()` | Stop event bubbling            |
| `e.timeStamp`         | Event timestamp                |
| `e.nativeEvent`       | Raw browser event              |

---

## 5️⃣ Mouse Events (`React.MouseEvent<T>`)

Triggered by:

* `onClick`
* `onMouseEnter`
* `onMouseLeave`
* `onMouseMove`

### Key Properties

| Property              | Explanation                |
| --------------------- | -------------------------- |
| `clientX` / `clientY` | Mouse position in viewport |
| `pageX` / `pageY`     | Position in document       |
| `button`              | Which mouse button         |
| `buttons`             | Buttons pressed            |
| `ctrlKey`             | Ctrl key pressed           |
| `shiftKey`            | Shift key pressed          |
| `altKey`              | Alt key pressed            |
| `metaKey`             | Cmd (Mac)                  |

### Example

```ts
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.clientX, e.clientY);
};
```

---

## 6️⃣ Keyboard Events (`React.KeyboardEvent<T>`)

Triggered by:

* `onKeyDown`
* `onKeyUp`
* `onKeyPress` (deprecated)

### Key Properties

| Property   | Explanation                |
| ---------- | -------------------------- |
| `key`      | Key pressed (`Enter`, `a`) |
| `code`     | Physical key (`KeyA`)      |
| `repeat`   | Key held down              |
| `ctrlKey`  | Ctrl pressed               |
| `shiftKey` | Shift pressed              |
| `altKey`   | Alt pressed                |

### Example

```ts
const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") submit();
};
```

---

## 7️⃣ Change Events (`React.ChangeEvent<T>`)

Used mainly for **inputs**

### Key Properties

| Property         | Explanation    |
| ---------------- | -------------- |
| `target.value`   | Input value    |
| `target.checked` | Checkbox state |
| `target.name`    | Input name     |
| `target.type`    | Input type     |

### Example

```ts
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

---

## 8️⃣ Form Events (`React.FormEvent<T>`)

Triggered by:

* `onSubmit`

### Key Properties

| Property           | Explanation      |
| ------------------ | ---------------- |
| `preventDefault()` | Stop page reload |
| `currentTarget`    | Form element     |

### Example

```ts
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form submitted");
};
```

---

## 9️⃣ Focus Events (`React.FocusEvent<T>`)

Triggered by:

* `onFocus`
* `onBlur`

### Key Properties

| Property        | Explanation                  |
| --------------- | ---------------------------- |
| `relatedTarget` | Element losing/gaining focus |
| `currentTarget` | Focused element              |

---

## 🔟 Drag Events (`React.DragEvent<T>`)

Triggered by:

* `onDrag`
* `onDrop`
* `onDragOver`

### Key Properties

| Property        | Explanation        |
| --------------- | ------------------ |
| `dataTransfer`  | Dragged data       |
| `effectAllowed` | Allowed operations |
| `dropEffect`    | Drop behavior      |

---

## 1️⃣1️⃣ Most Important DOM Element Properties

These are accessed via:

```ts
e.currentTarget
```

---

### Text & Content

| Property      | Use                 |
| ------------- | ------------------- |
| `textContent` | Text inside element |
| `innerText`   | Rendered text       |
| `innerHTML`   | HTML content ⚠️     |

---

### Styling & Classes

| Property             | Use             |
| -------------------- | --------------- |
| `className`          | Element classes |
| `classList.add()`    | Add class       |
| `classList.remove()` | Remove class    |
| `style`              | Inline styles   |

---

### State & Attributes

| Property   | Use            |
| ---------- | -------------- |
| `disabled` | Enable/disable |
| `hidden`   | Visibility     |
| `id`       | Element ID     |
| `title`    | Tooltip        |

---

### Inputs & Forms

| Property      | Use              |
| ------------- | ---------------- |
| `value`       | Input value      |
| `checked`     | Checkbox         |
| `placeholder` | Placeholder text |
| `name`        | Input name       |

---

## 1️⃣2️⃣ DOM Measurements & Utilities

| Property                  | Use             |
| ------------------------- | --------------- |
| `getBoundingClientRect()` | Size/position   |
| `scrollTop`               | Scroll position |
| `offsetWidth`             | Element width   |
| `offsetHeight`            | Element height  |

---

## 1️⃣3️⃣ Best Practices in React ⚠️

### ❌ Avoid

```ts
e.currentTarget.textContent = "Clicked!";
```

### ✅ Prefer

```tsx
const [text, setText] = useState("Click");
<button onClick={() => setText("Clicked")} />
```

---

## 1️⃣4️⃣ When Direct DOM Access Is Acceptable

| Case                | Tool                      |
| ------------------- | ------------------------- |
| Focus input         | `useRef`                  |
| Measure element     | `getBoundingClientRect()` |
| Integrate libraries | Refs                      |
| Temporary hacks     | Rare                      |

---

## 🧠 Final Mental Model

> React controls **state → UI**
> DOM access is for **edge cases**
> TypeScript teaches what exists

---

## ✅ Ultimate Summary Table

| Category          | Access               |
| ----------------- | -------------------- |
| Event info        | `e.type`             |
| Element reference | `e.currentTarget`    |
| Mouse position    | `e.clientX`          |
| Keyboard input    | `e.key`              |
| Input value       | `e.target.value`     |
| DOM content       | `textContent`        |
| Styles            | `classList`, `style` |

---
