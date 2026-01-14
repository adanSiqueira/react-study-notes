
# Ordering, Sorting & Data Manipulation in React

*(Using your `fruits` example)*

---

## 1. Core Principle (Very Important)

> **React does not care about sorting. JavaScript does.**

React only:

* Receives data
* Renders it in the order it is given

All ordering logic happens **before rendering**, using **array methods**.

---

## 2. The `.sort()` Method (Foundation)

### Basic definition

```ts
array.sort(compareFn)
```

* Mutates the original array ❗
* Uses `compareFn` to decide order
* Returns the sorted array

---

## 3. Numerical Sorting (Ascending & Descending)

### Ascending order (low → high)

```ts
fruits.sort((a, b) => a.calories - b.calories);
```

How it works:

* Negative → `a` comes before `b`
* Positive → `b` comes before `a`
* Zero → no change

### Descending order (high → low)

```ts
fruits.sort((a, b) => b.calories - a.calories);
```

---

### Mental Model

| Expression | Meaning    |
| ---------- | ---------- |
| `a - b`    | Ascending  |
| `b - a`    | Descending |

---

## 4. Alphabetical Sorting with Strings

### Why subtraction doesn’t work with strings

```ts
a.name - b.name // ❌ invalid
```

Strings need **locale-aware comparison**.

---

### Alphabetical A → Z

```ts
fruits.sort((a, b) => a.name.localeCompare(b.name));
```

### Alphabetical Z → A

```ts
fruits.sort((a, b) => b.name.localeCompare(a.name));
```

---

### Why `localeCompare`?

* Handles accents
* Handles casing
* Follows language rules

```ts
"Água".localeCompare("Banana"); // works correctly
```

---

## 5. ⚠️ Very Important React Rule: Avoid Mutations

Your example:

```ts
fruits.sort(...)
```

This **mutates** the array.

In React:

* Mutating data can cause bugs
* Especially dangerous with `state` or `props`

---

### ✅ Correct Pattern (Immutable Sorting)

```ts
const sortedFruits = [...fruits].sort(
  (a, b) => a.calories - b.calories
);
```

Why:

* Keeps original data intact
* Prevents side effects
* Aligns with React’s rendering model

---

## 6. Filtering Data (Very Common)

### Example: Low-calorie fruits

```ts
const lowCalFruits = fruits.filter(
  fruit => fruit.calories < 100
);
```

Then render:

```tsx
lowCalFruits.map(...)
```

---

## 7. Combining Filter + Sort (Real-World Pattern)

```ts
const sortedLowCalFruits = [...fruits]
  .filter(fruit => fruit.calories < 100)
  .sort((a, b) => a.calories - b.calories);
```

Order matters:

1. Filter
2. Sort
3. Render

---

## 8. Mapping (Rendering Step)

```ts
fruits.map(fruit => (
  <li key={fruit.id}>
    {fruit.name}: {fruit.calories}
  </li>
))
```

This step:

* Should be **pure**
* Should not modify data
* Should only transform data → JSX

---

## 9. Other Important Array Methods in React

### `.find()` — get one item

```ts
const apple = fruits.find(fruit => fruit.name === "Apple");
```

---

### `.some()` — check existence

```ts
const hasHighCal = fruits.some(fruit => fruit.calories > 100);
```

---

### `.every()` — validate all items

```ts
const allHealthy = fruits.every(fruit => fruit.calories < 150);
```

---

### `.reduce()` — aggregate data

```ts
const totalCalories = fruits.reduce(
  (sum, fruit) => sum + fruit.calories,
  0
);
```

---

## 10. Sorting by Dynamic Criteria (State-Driven)

```tsx
const [order, setOrder] = useState<"asc" | "desc">("asc");

const sortedFruits = [...fruits].sort((a, b) =>
  order === "asc"
    ? a.calories - b.calories
    : b.calories - a.calories
);
```

This is **very common in real apps**.

---

## 11. Alphabetical Case-Insensitive Sorting

```ts
fruits.sort((a, b) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
);
```

---

## 12. Stable Keys Matter After Sorting

Your usage:

```tsx
<li key={fruit.id}>
```

✅ Perfect.

Why:

* Sorting changes order
* Keys must stay stable
* Prevents DOM mismatch bugs

---

## 13. Common Mistakes

❌ Mutating state with `.sort()`
❌ Sorting inside JSX
❌ Using index as key
❌ Mixing data logic with render logic

---

## 14. Best Practice Pattern (Clean & Scalable)

```tsx
function List() {
  const fruits = [...];

  const sortedFruits = [...fruits].sort(
    (a, b) => a.calories - b.calories
  );

  return (
    <ol>
      {sortedFruits.map(fruit => (
        <li key={fruit.id}>
          {fruit.name}: {fruit.calories} calories
        </li>
      ))}
    </ol>
  );
}
```

---

## 15. Senior-Level Insight

> Sorting is **state transformation**, not UI logic.

In professional React code:

* Data is transformed **before rendering**
* Rendering stays declarative
* Immutability is non-negotiable

---

## Final Summary Cheat Sheet

| Goal               | Method               |
| ------------------ | -------------------- |
| Numeric ascending  | `a - b`              |
| Numeric descending | `b - a`              |
| Alphabetical A-Z   | `a.localeCompare(b)` |
| Alphabetical Z-A   | `b.localeCompare(a)` |
| Filter items       | `.filter()`          |
| Transform to JSX   | `.map()`             |
| Avoid mutation     | `[...array]`         |
| Stable rendering   | `key={id}`           |

---
