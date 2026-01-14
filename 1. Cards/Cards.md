Below is a **complete theoretical review with practical examples** about **Cards in React**, written to be **framework-agnostic**, **TypeScript-friendly**, and **industry-aligned**.
This is not about a “Card API”, but about **the Card pattern** as a UI + architectural concept.

---

# Cards in React — Complete Theoretical & Practical Guide

## 1. What Is a “Card” in React?

A **Card** is a **presentational UI component** that:

* Encapsulates a **single unit of information**
* Has **visual boundaries**
* Is **reusable**
* Is usually **stateless** or minimally stateful

> A Card is **not a React feature** — it is a **design pattern**.

Examples:

* Product card
* User profile card
* Article preview card
* Dashboard metric card

---

## 2. Why Cards Are Important

Cards provide:

| Benefit                | Explanation                             |
| ---------------------- | --------------------------------------- |
| Reusability            | Same component used in many contexts    |
| Consistency            | Uniform UI across the app               |
| Separation of concerns | UI logic isolated                       |
| Scalability            | Easy to extend without breaking layouts |

---

## 3. Mental Model (Very Important)

Think of a Card as:

> **A pure visual container that receives data and renders it**

It should:

* Receive data via `props`
* Avoid business logic
* Avoid API calls
* Avoid global state (in most cases)

---

## 4. Simplest Card Example

### Card.tsx

```tsx
interface CardProps {
  title: string;
  description: string;
}

function Card({ title, description }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
```

### Usage

```tsx
<Card
  title="React"
  description="A library for building user interfaces"
/>
```

---

## 5. Cards as Presentational Components

### Good Card Characteristics

✅ Accepts props
✅ Renders JSX
✅ Has styles
❌ Does not fetch data
❌ Does not mutate global state

### ❌ Bad Example

```tsx
function Card() {
  fetch("/api/data"); // ❌ bad
  return <div />;
}
```

---

## 6. Styling Cards (Three Common Approaches)

### 1️⃣ External CSS

```css
.card {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

```tsx
<div className="card">...</div>
```

---

### 2️⃣ CSS Modules (Recommended)

```tsx
import styles from "./Card.module.css";

<div className={styles.card}>...</div>
```

Benefits:

* Scoped styles
* No class collisions
* Production-ready

---

### 3️⃣ Inline Styles (Rare for Cards)

```tsx
<div style={{ padding: 16, borderRadius: 8 }} />
```

Best for:

* Dynamic values
* Small overrides

---

## 7. Cards with Children (Composition Pattern)

This is **very important**.

### Generic Card Container

```tsx
interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}
```

### Usage

```tsx
<Card>
  <h3>Product</h3>
  <p>$29.99</p>
</Card>
```

This makes the Card **fully reusable**.

---

## 8. Card Variants (Design System Pattern)

### Props-Based Variant

```tsx
interface CardProps {
  variant?: "default" | "highlighted";
}
```

```tsx
<div className={`card card--${variant}`} />
```

---

### Conditional Styling

```tsx
<div className={variant === "highlighted" ? styles.highlight : styles.default}>
```

Used heavily in:

* Design systems
* UI libraries

---

## 9. Cards with Actions

### Example

```tsx
interface CardProps {
  title: string;
  onAction: () => void;
}

function Card({ title, onAction }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

Cards **emit events upward**, they do not act alone.

---

## 10. Cards and Lists (Very Common Pattern)

### Mapping Cards

```tsx
const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
];

products.map(product => (
  <Card key={product.id} title={product.name} />
));
```

Rules:

* Card does not know about lists
* Parent controls iteration

---

## 11. Cards and TypeScript Best Practices

### Props as interface

```ts
interface CardProps {
  title: string;
  description?: string;
}
```

### Default values

```tsx
function Card({ description = "No description" }: CardProps) {}
```

Avoid:

* `defaultProps`
* `any`

---

## 12. Cards vs Containers (Architectural Concept)

| Card           | Container     |
| -------------- | ------------- |
| Presentational | Logic-heavy   |
| Receives props | Fetches data  |
| Reusable       | Page-specific |

Example:

```tsx
<ProductCard product={product} /> // Card
<ProductPage />                   // Container
```

---

## 13. Cards in Real Applications

Cards are used in:

* Dashboards
* E-commerce
* Blogs
* Social networks
* Admin panels

If your app has:

* Repeated UI blocks
* Lists of entities

👉 You need Cards.

---

## 14. Common Mistakes

❌ Card fetching its own data
❌ Card handling routing logic
❌ Card managing global state
❌ Overloading Card with logic

---

## 15. Best-Practice Card Checklist

✅ Stateless or minimal state
✅ Receives data via props
✅ Uses composition (`children`) when possible
✅ Uses CSS Modules or design system styles
✅ Reusable across pages

---

## 16. Senior-Level Insight

> A Card is not a component —
> it is a **contract between data and UI**.

The better your Card abstraction:

* The easier your app scales
* The cleaner your codebase
* The faster your UI evolves

---

## Final Summary

* Cards are **design patterns**, not React features
* They should be **simple, reusable, and composable**
* TypeScript makes Cards safer and more expressive
* Good Cards reduce duplication and complexity

---
