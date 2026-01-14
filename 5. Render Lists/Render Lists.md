# Rendering Lists in React

**Theory + Practical Examples**

---

## 1. What Does “Rendering Lists” Mean?

Rendering lists means:

> **Displaying multiple similar UI elements based on a collection of data**

This usually involves:

* Arrays
* Iteration
* Reusable components

Example:

* List of users
* Product cards
* Menu items
* Comments

---

## 2. Core Mental Model

> React does not render arrays directly.
> React renders **elements created from arrays**.

You use JavaScript methods (mostly `.map()`) to convert data into JSX.

---

## 3. Basic Example: Mapping an Array

```tsx
const fruits = ["Apple", "Banana", "Orange"];

function FruitList() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```

What’s happening:

1. `map()` iterates
2. Each item becomes JSX
3. React renders the list

---

## 4. Rendering Objects (Most Common Case)

```tsx
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Lucas" },
];
```

```tsx
function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 5. The `key` Prop (Critical Concept)

### Why React Needs `key`

> `key` helps React **identify which items changed, were added, or removed**

Without keys:

* React re-renders unnecessarily
* State bugs appear
* Performance degrades

---

### Rules for `key`

✅ Must be **unique** among siblings
✅ Should be **stable**
❌ Should NOT be array index (usually)

---

### Bad Example

```tsx
{items.map((item, index) => (
  <Item key={index} /> // ❌ bad
))}
```

---

### Good Example

```tsx
{items.map(item => (
  <Item key={item.id} /> // ✅
))}
```

---

## 6. Rendering Components in Lists

### Example

```tsx
function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}
```

```tsx
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
```

This is the **correct pattern**:

* Parent controls iteration
* Child focuses on presentation

---

## 7. Conditional Rendering in Lists

```tsx
{users.map(user =>
  user.isActive ? (
    <li key={user.id}>{user.name}</li>
  ) : null
)}
```

Or filter first (better):

```tsx
{users
  .filter(user => user.isActive)
  .map(user => (
    <li key={user.id}>{user.name}</li>
))}
```

---

## 8. Rendering Empty States

### Important UX pattern

```tsx
function UserList({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 9. Rendering Lists with State

```tsx
function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <>
      {todos.map(todo => (
        <p key={todo}>{todo}</p>
      ))}
    </>
  );
}
```

React re-renders when state changes.

---

## 10. Lists and Events

```tsx
{items.map(item => (
  <button key={item.id} onClick={() => handleClick(item.id)}>
    {item.name}
  </button>
))}
```

Each item gets its own handler context.

---

## 11. Lists of Lists (Nested Lists)

```tsx
categories.map(category => (
  <div key={category.id}>
    <h3>{category.name}</h3>

    <ul>
      {category.products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  </div>
))
```

Each level needs its own `key`.

---

## 12. Performance Considerations

### React Reconciliation

React:

* Compares old list vs new list
* Uses keys to match elements
* Minimizes DOM updates

Bad keys → unnecessary re-renders.

---

## 13. Advanced Pattern: Render Props

```tsx
function List<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return <>{items.map(render)}</>;
}
```

Usage:

```tsx
<List
  items={users}
  render={user => <p key={user.id}>{user.name}</p>}
/>
```

---

## 14. Avoid These Common Mistakes

❌ Using array index as key
❌ Mutating the array directly
❌ Rendering huge lists without virtualization
❌ Logic-heavy JSX

---

## 15. Virtualized Lists (When Lists Get Big)

For large lists:

* Use `react-window`
* Use `react-virtualized`

Reason:

* Only visible items are rendered
* Massive performance improvement

---

## 16. Best Practices Cheat Sheet

✅ Use `.map()`
✅ Use stable unique keys
✅ Extract list items into components
✅ Handle empty states
✅ Filter before mapping
✅ Keep JSX readable

---

## 17. Senior-Level Insight

> Lists are where **React’s reconciliation algorithm becomes visible**.

If you understand:

* Keys
* Stability
* Immutability

You understand **React performance**.

---

## Final Summary

* Rendering lists = mapping data → JSX
* Keys are **not optional**
* Parent controls iteration
* Child controls presentation
* Performance depends on correct keys

---
