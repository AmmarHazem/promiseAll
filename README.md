# PromiseAll

A custom implementation of `Promise.all()` that handles both Promise objects and non-Promise values in an iterable.

## Description

This module provides a custom implementation of the `Promise.all()` method. Unlike the native `Promise.all()`, this implementation can handle mixed iterables containing both Promise objects and regular values.

## Features

- ✅ Handles Promise objects and non-Promise values in the same iterable
- ✅ Maintains order of results based on input order
- ✅ Rejects immediately if any Promise in the iterable rejects
- ✅ Resolves with an empty array for empty iterables
- ✅ Preserves the original Promise.all() behavior for Promise-only iterables

## Installation

No dependencies required. Simply import the function:

```javascript
import promiseAll from './promiseAll.js';
```

## Usage

### Basic Usage

```javascript
import promiseAll from './promiseAll.js';

// Example with mixed values
const promises = [
  Promise.resolve(1),
  2, // Non-Promise value
  Promise.resolve(3),
  'hello' // Non-Promise value
];

promiseAll(promises)
  .then(results => {
    console.log(results); // [1, 2, 3, 'hello']
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Handling Errors

```javascript
const promises = [
  Promise.resolve(1),
  Promise.reject(new Error('Something went wrong')),
  Promise.resolve(3)
];

promiseAll(promises)
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error('Error:', error.message); // "Something went wrong"
  });
```

### Empty Iterable

```javascript
promiseAll([])
  .then(results => {
    console.log(results); // []
  });
```

## API Reference

### `promiseAll(iterable)`

**Parameters:**
- `iterable` (Array): An array containing Promise objects and/or regular values

**Returns:**
- `Promise<Array>`: A Promise that resolves with an array of results in the same order as the input iterable

**Behavior:**
- If the iterable is empty, resolves immediately with an empty array
- If all values are non-Promise values, resolves immediately with the values
- If the iterable contains Promises, waits for all to resolve
- If any Promise rejects, the returned Promise rejects with the first error encountered

## Examples

### Mixed Promise and Non-Promise Values

```javascript
const mixedValues = [
  Promise.resolve('async value'),
  42,
  Promise.resolve({ data: 'object' }),
  'sync string'
];

promiseAll(mixedValues)
  .then(results => {
    console.log(results);
    // ['async value', 42, { data: 'object' }, 'sync string']
  });
```

### Simulating API Calls

```javascript
const apiCalls = [
  fetch('/api/users/1'),
  fetch('/api/users/2'),
  { id: 3, name: 'Static User' } // Static data
];

promiseAll(apiCalls)
  .then(results => {
    console.log('All data loaded:', results);
  });
```

## Comparison with Native Promise.all()

| Feature | Native Promise.all() | This Implementation |
|---------|---------------------|-------------------|
| Promise objects | ✅ | ✅ |
| Non-Promise values | ❌ | ✅ |
| Order preservation | ✅ | ✅ |
| Early rejection | ✅ | ✅ |
| Empty array handling | ✅ | ✅ |

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!
