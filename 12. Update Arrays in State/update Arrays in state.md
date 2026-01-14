# 📦 Updating Arrays in React State — Theoretical Review with Practical Examples

---

## 1. Why Arrays in State Need Special Care

Arrays in React state must be treated as **immutable**, just like objects.

Arrays are:

* Reference types
* Stored by memory reference
* Compared by React using reference equality

### ❗ Golden Rule

> **Never mutate arrays in React state**

---

## 2. How React Detects Array Changes

React checks:

```ts
prevArray === nextArray
```

If the reference does not change:

* React assumes nothing changed
* Component may not re-render

---

## 3. ❌ The Wrong Way: Mutating Arrays

```tsx
items.push("Apple");
setItems(items);
```

```tsx
items.splice(1, 1);
setItems(items);
```

Why this is wrong:

* Same array reference
* UI may not update
* Causes hard-to-debug bugs

---

## 4. ✅ The Correct Way: Create a New Array

Always return a **new array**.

```tsx
setItems([...items, "Apple"]);
```

---

## 5. Core Tools for Updating Arrays

| Operation | Correct Method |
| --------- | -------------- |
| Add       | spread (`...`) |
| Remove    | `filter()`     |
| Update    | `map()`        |
| Replace   | `map()`        |
| Copy      | `slice()`      |

---

## 6. Adding Items to an Array

### Add to the end

```tsx
setItems(prev => [...prev, "Apple"]);
```

---

### Add to the beginning

```tsx
setItems(prev => ["Apple", ...prev]);
```

---

### Add multiple items

```tsx
setItems(prev => [...prev, "Apple", "Banana"]);
```

---

## 7. Removing Items from an Array

### Remove by value

```tsx
setItems(prev => prev.filter(item => item !== "Apple"));
```

---

### Remove by id (common in real apps)

```tsx
setItems(prev =>
  prev.filter(item => item.id !== 3)
);
```

---

## 8. Updating One Item in an Array

### Example state

```tsx
const [items, setItems] = useState([
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" }
]);
```

---

### Update item using `map()`

```tsx
setItems(prev =>
  prev.map(item =>
    item.id === 2
      ? { ...item, name: "Orange" }
      : item
  )
);
```

✔ Only the changed item gets a new object
✔ Array reference changes
✔ React re-renders correctly

---

## 9. Updating Array Index (Less Recommended)

```tsx
setItems(prev =>
  prev.map((item, index) =>
    index === 1 ? "Orange" : item
  )
);
```

⚠ Prefer IDs over indexes in real apps.

---

## 10. Replacing the Entire Array

```tsx
setItems(["A", "B", "C"]);
```

Useful when:

* Loading API data
* Resetting state
* Applying filters

---

## 11. Updating Arrays Based on Previous State

Always use an **updater function** when the new value depends on the old one.

```tsx
setItems(prev => [...prev, newItem]);
```

This prevents:

* Race conditions
* Stale closures
* Bugs with batched updates

---

## 12. Sorting Arrays in State (Important!)

### ❌ Wrong (mutates original array)

```tsx
items.sort();
setItems(items);
```

---

### ✅ Correct

```tsx
setItems(prev =>
  [...prev].sort((a, b) => a.price - b.price)
);
```

---

## 13. Reversing Arrays

```tsx
setItems(prev => [...prev].reverse());
```

---

## 14. Arrays of Objects (Very Common)

### Toggle a boolean value

```tsx
setTodos(prev =>
  prev.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  )
);
```

---

## 15. Updating Nested Arrays

### Example

```tsx
const [cart, setCart] = useState([
  {
    id: 1,
    items: [{ name: "Apple", qty: 1 }]
  }
]);
```

---

### Correct nested update

```tsx
setCart(prev =>
  prev.map(order =>
    order.id === 1
      ? {
          ...order,
          items: order.items.map(item =>
            item.name === "Apple"
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        }
      : order
  )
);
```

---

## 16. Removing Items with `splice` (Safe Version)

```tsx
setItems(prev => {
  const copy = [...prev];
  copy.splice(1, 1);
  return copy;
});
```

---

## 17. TypeScript and Array State

```tsx
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const [todos, setTodos] = useState<Todo[]>([]);
```

TypeScript ensures:

* Correct object structure
* Safe updates
* Fewer runtime bugs

---

## 18. Common Mistakes

### ❌ Mutating the array

```tsx
prev.push(item);
return prev;
```

---

### ❌ Mutating array objects

```tsx
item.completed = true;
```

---

### ❌ Using index as key

```tsx
key={index} // unstable
```

---

## 19. When Arrays Become Hard to Manage

If:

* Many array operations exist
* Logic becomes complex
* State updates are scattered

Consider:

* `useReducer`
* Normalized state
* State management libraries

---

## 20. Mental Model (Memorize This)

> Arrays are objects
> Objects are references
> New reference = React update

---

## 21. Cheat Sheet

### Add

```tsx
setArr(prev => [...prev, item]);
```

### Remove

```tsx
setArr(prev => prev.filter(x => x.id !== id));
```

### Update

```tsx
setArr(prev =>
  prev.map(x => x.id === id ? { ...x, key: val } : x)
);
```

### Sort

```tsx
setArr(prev => [...prev].sort());
```

---

## 22. Final Takeaway

Updating arrays in React state is about:

* Immutability
* Predictable updates
* Safe re-renders

Once mastered, you unlock:

* Stable UI behavior
* Clean mental models
* Confidence in complex state logic

---
