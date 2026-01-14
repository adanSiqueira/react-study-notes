# 🧱 Updating Objects in React State — Theoretical Review with Practical Examples

---

## 1. Why Updating Objects in State Is Special

In React, **state must be treated as immutable**.

This is especially important with **objects**, because:

* Objects are stored by **reference**
* Mutating an object does **not change its reference**
* React detects changes using **reference equality**

### ❗ Key rule

> **Never mutate objects in state — always create a new object**

---

## 2. How React Detects State Changes

React compares **references**, not values:

```ts
prevObject === nextObject
```

If the reference is the same:

* React assumes nothing changed
* Component may not re-render

---

## 3. ❌ The Wrong Way: Mutating Objects

```tsx
user.age = 30;
setUser(user);
```

Why this is wrong:

* Same object reference
* React may skip re-render
* Causes unpredictable bugs

---

## 4. ✅ The Correct Way: Create a New Object

```tsx
setUser({
  ...user,
  age: 30
});
```

✔ New object reference
✔ React detects change
✔ UI updates correctly

---

## 5. The Spread Operator (`...`) — Core Tool

The spread operator copies properties into a **new object**.

```tsx
{ ...prevObject }
```

---

## 6. Basic Example: Updating One Property

```tsx
const [user, setUser] = useState({
  name: "Alice",
  age: 25
});

function updateAge() {
  setUser(prevUser => ({
    ...prevUser,
    age: prevUser.age + 1
  }));
}
```

---

## 7. Why Use an Updater Function Here?

Because:

* Updates depend on previous state
* React batches updates
* Prevents stale values

```tsx
setUser(prev => ({ ...prev, key: value }));
```

---

## 8. Updating Multiple Properties

```tsx
setUser(prev => ({
  ...prev,
  name: "Bob",
  age: 30
}));
```

Only specified fields change — the rest remain intact.

---

## 9. Updating Nested Objects (Very Important)

### State example

```tsx
const [user, setUser] = useState({
  name: "Alice",
  address: {
    city: "New York",
    zip: "10001"
  }
});
```

### ❌ Wrong (mutates nested object)

```tsx
user.address.city = "Boston";
setUser(user);
```

---

### ✅ Correct (copy every level)

```tsx
setUser(prev => ({
  ...prev,
  address: {
    ...prev.address,
    city: "Boston"
  }
}));
```

---

## 10. Rule for Nested Updates

> **You must copy every level that changes**

If you update:

* `user.address.city`

You must copy:

* `user`
* `user.address`

---

## 11. Updating Objects from Input Fields

### Example: Controlled form

```tsx
const [user, setUser] = useState({
  name: "",
  email: ""
});
```

```tsx
function handleChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const { name, value } = e.target;

  setUser(prev => ({
    ...prev,
    [name]: value
  }));
}
```

```tsx
<input name="name" onChange={handleChange} />
<input name="email" onChange={handleChange} />
```

---

## 12. Dynamic Keys (`[key]: value`)

Used when property names are determined at runtime.

```tsx
setState(prev => ({
  ...prev,
  [dynamicKey]: newValue
}));
```

---

## 13. Objects Inside Arrays (Common Case)

```tsx
const [items, setItems] = useState([
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" }
]);
```

### Update one object inside array

```tsx
setItems(prev =>
  prev.map(item =>
    item.id === 2
      ? { ...item, name: "Orange" }
      : item
  )
);
```

---

## 14. Deleting Object Properties (Rare but Possible)

```tsx
const { password, ...safeUser } = user;
setUser(safeUser);
```

---

## 15. TypeScript and Object State

### Define state shape

```tsx
interface User {
  name: string;
  age: number;
}
```

```tsx
const [user, setUser] = useState<User>({
  name: "",
  age: 0
});
```

TypeScript:

* Prevents missing properties
* Ensures safe updates

---

## 16. Common Mistakes

### ❌ Forgetting to copy previous state

```tsx
setUser({ age: 30 }); // ❌ name lost
```

---

### ❌ Mutating previous state

```tsx
setUser(prev => {
  prev.age += 1;
  return prev;
});
```

---

### ❌ Shallow copy only when nested changes exist

```tsx
setUser({ ...user, address: user.address }); // ❌
```

---

## 17. When Object State Becomes Hard to Manage

If:

* Object is deeply nested
* Many updates exist
* Logic becomes complex

Consider:

* `useReducer`
* State normalization
* Breaking state into smaller pieces

---

## 18. Mental Model (Memorize This)

> React detects changes by **reference**, not by value
>
> Always return a **new object**
>
> Never mutate state directly

---

## 19. Cheat Sheet

### Update one field

```tsx
setObj(prev => ({ ...prev, key: value }));
```

### Update nested field

```tsx
setObj(prev => ({
  ...prev,
  nested: {
    ...prev.nested,
    key: value
  }
}));
```

### Update object in array

```tsx
map → copy → replace
```

---

## 20. Final Takeaway

Updating objects in React state is:

* Fundamental
* Error-prone if done incorrectly
* Safe and predictable when using immutability + updater functions

Mastering this skill prevents **entire classes of bugs**.

---