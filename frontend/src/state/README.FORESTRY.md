## Forestry Overview

[Forestry](https://forestry-3-docs.vercel.app/api) is a reactive state management library built on RxJS. 
It manages values with synchronous updates and exposes a consistent, testable interface for actions and observation.

### Key Benefits Over Redux

- Synchronous by design; no reliance on React hooks
- RxJS-powered observability
- Combines actions, value, and state access into one class
- Works seamlessly for both local and global state
- Supports sync and async actions with transactional locking

---

## Quick Start

Use `ObjectCollection` to manage POJO-style values:

```ts
const instance = new ObjectCollection(name, {
  initialValue: POJO,
  validator(value) => false | Error, // optional
}, { actions });
```

### Instance API

- `.value`: current state
- `.get(key)`, `.set(key, value)`, `.mutate(fn)`
- `.acts`: bound actions (sync or async)
- `.observe(fn)`: RxJS-style subscription

You can inject actions directly into UI event handlers and access state synchronously at any time.

---

## Usage Contexts

- `catState`, `levelState`, `questState`: transient, reusable local state
- `globalState`: singleton for persistence through sessionState
---

## Advanced Features

### Validation & Transactions

- Optional `validator` runs after every change
- Invalid states trigger rollback to last good value

### Journaling

- All changes logged for easy debugging
- History is pruned to avoid memory issues

### Observability

- Interoperable with RxJS
- Subscribe to full or partial state changes

---

## Why Not Hooks?

Hooks tightly couple state to components and the render cycle, causing issues like:

- Asynchronous change propagation
- State loss on component unmount
- Logic hidden in closures, difficult to test
- No support for reusable or extendable logic patterns

Forestry solves these by isolating business logic in class instances that are:

- Extendable
- Injectable
- Synchronously inspectable
- Validated and transactional

---

## Async with Integrity

Forestry keeps all internal mechanics synchronous to maintain transactional guarantees. 
Async actions are allowed, but changes within them must use sync methods (`set`, `mutate`, etc.) for safety:

```ts
async function fetchUser() {
  const data = await fetch(...);
  this.set('user', data); // safe after await
}
```

This model separates external delays (like I/O) from internal consistency.

---

## Unified Local & Global State

Forestry applies the same API to local and global state, reducing mental load:

1. Define observable values
2. Define how they're updated
3. Bind values to UI
4. Connect events to updates

Unlike Redux or hooks, there’s no conceptual split between local and global state management.

---

## Testing Advantages

Forestry’s testability is a core strength:

- Pass state down as full, testable objects
- Use `.value` or `.get()` for immediate inspection
- Journaled state enables precise failure tracing
- View and business logic are independently testable

This leads to a clear testing strategy:

1. Validate state logic
2. Validate view bindings
3. Validate interactive UX (optional)

---

## Forestry Principles

- **Journaling**: every change is traceable
- **Concentration**: actions, selectors, and events live in one place
- **Observability**: seamless RxJS integration
- **Validation**: every mutation checked
- **Testability**: sync access means fast, isolated tests

---

## Summary

Forestry offers a focused, powerful alternative to Redux and hooks:

- Reactive, yet synchronous core
- Built-in validation and journaling
- Clean separation of business logic
- Uniform API for all scopes of state

It’s designed to make **state management transparent, testable, and resilient**—whether you're building forms or full applications.
