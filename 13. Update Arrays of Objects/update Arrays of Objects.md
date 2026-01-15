# Updating an Array of Objects in React State

## 1. What this topic really means

In React, **state is immutable**.

That means:

* You **never modify** the existing array or objects directly
* You **always create a new array** (and often new objects)
* React detects changes by **reference**, not by mutation

When we say **“update an array of objects in state”**, we usually mean:

* Add a new object to the array
* Remove an object from the array
* Update one object inside the array
* Replace the whole array safely

---

## 2. Why immutability is mandatory in React

React compares **references**, not deep values.

```ts
cars.push(newCar);   // ❌ mutates original array
setCars(cars);      // ❌ React may not re-render
```

Correct approach:

```ts
setCars([...cars, newCar]); // ✅ new array reference
```

React sees a **new array**, triggers a re-render, and updates the UI.

---

## 3. Your data model (Car interface)

This is **correct and well-designed**:

```ts
interface Car {
    year: number;
    make: string;
    model: string;
}
```

Each element in the array represents **one car object**.

---

## 4. The main problem in your current code

### ❌ Problematic state definition

```ts
const [cars, setCars] = useState<Array<object>>([]);
```

This forces you to do unsafe casts later:

```ts
(car as Car).year
```

### ✅ Correct state typing

```ts
const [cars, setCars] = useState<Car[]>([]);
```

Now TypeScript **knows exactly** what’s inside the array.

✔ No casting
✔ Full autocomplete
✔ Compile-time safety

---

## 5. Adding an object to an array (your example)

### Your logic (conceptually correct)

```ts
function handleAddCar() {
    const newCar: Car = {
        year: carYear,
        make: carMake,
        model: carModel
    };

    setCars(c => [...c, newCar]);
}
```

### Why this is the **correct pattern**

* `c` → previous state (safe, up-to-date)
* `[...]` → creates a new array
* `newCar` → appended immutably

This pattern is called an **updater function** and is the **recommended approach**.

---

## 6. Resetting input state (good practice)

```ts
setCarYear(new Date().getFullYear());
setCarMake("");
setCarModel("");
```

This:

* Clears the form
* Keeps the UI predictable
* Matches controlled component behavior

✔ Excellent practice.

---

## 7. Removing an object from an array

### Your implementation

```ts
function handleRemoveCar(index: number) {
    setCars(cars.filter((_, i) => i !== index));
}
```

### How this works

* `.filter()` creates a **new array**
* Skips the element at the given index
* Does **not mutate** the original array

This is a **canonical React pattern**.

---

## 8. Rendering the array safely

### Current render logic

```tsx
{cars.map((car, index) => (
    <li key={index} onClick={() => handleRemoveCar(index)}>
        {`${(car as Car).year} ${(car as Car).make} ${(car as Car).model}`}
    </li>
))}
```

### Improved version (after fixing state typing)

```tsx
{cars.map((car, index) => (
    <li key={index} onClick={() => handleRemoveCar(index)}>
        {car.year} {car.make} {car.model}
    </li>
))}
```

✔ Cleaner
✔ Safer
✔ No type assertions

---

## 9. Updating an object **inside** an array (very important)

Example: updating the `model` of a car at a specific index.

```ts
function updateCarModel(index: number, newModel: string) {
    setCars(cars =>
        cars.map((car, i) =>
            i === index ? { ...car, model: newModel } : car
        )
    );
}
```

### Why this works

* `.map()` creates a **new array**
* `{ ...car }` creates a **new object**
* Only the targeted object is updated
* Everything else is preserved

---

## 10. Common array operations cheat sheet

### Add item

```ts
setCars(cars => [...cars, newCar]);
```

### Remove item

```ts
setCars(cars => cars.filter((_, i) => i !== index));
```

### Update item

```ts
setCars(cars =>
    cars.map((item, i) =>
        i === index ? { ...item, updatedProp: value } : item
    )
);
```

### Replace entire array

```ts
setCars(newCarsArray);
```

---

## 11. Why updater functions are preferred

❌ Risky:

```ts
setCars([...cars, newCar]);
```

✅ Safe:

```ts
setCars(prev => [...prev, newCar]);
```

Why?

* React state updates are **asynchronous**
* `prev` guarantees the latest state
* Prevents race conditions

---

## 12. Keys: index vs id (important concept)

Using `index` as key is **acceptable for learning**, but not ideal.

Better approach:

```ts
interface Car {
    id: number;
    year: number;
    make: string;
    model: string;
}
```

```tsx
<li key={car.id}>
```

Keys help React:

* Track elements efficiently
* Avoid rendering bugs
* Improve performance

---

## 13. Final cleaned-up version (best practice)

```ts
const [cars, setCars] = useState<Car[]>([]);
```

```tsx
{cars.map((car, index) => (
    <li key={index} onClick={() => handleRemoveCar(index)}>
        {car.year} {car.make} {car.model}
    </li>
))}
```

---

## 14. Core mental model (memorize this)

> **React state is read-only.
> To “change” it, you must replace it with a new version.**

For arrays of objects:

* New array
* New object when needed
* Never mutate

---

## 15. Why this topic matters

This exact pattern is used in:

* Todo lists
* Shopping carts
* Tables
* Forms with dynamic fields
* Dashboards
* APIs & fetched data

Mastering this means you understand **real React**, not just syntax.

---
