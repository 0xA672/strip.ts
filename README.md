# strip.ts

Recursively strip empty values from objects and arrays.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](.)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](.)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Install

```shell
npm install @0xA672/strip.ts
```

```shell
npm install github:0xA672/strip.ts
```

```shell
npm install github:0xA672/strip.ts#main
```

```shell
# or with bun
bun install github:0xA672/strip.ts
```

## Usage

```typescript
import { stripEmpties } from 'strip.ts';

const obj = {
  name: 'test',
  age: 0,
  addr: '',
  meta: {
    tags: [],
    extra: null,
    note: 'hello',
  },
};

console.log(stripEmpties(obj));
// => { name: 'test', meta: { note: 'hello' } }

console.log(stripEmpties(obj, { omitZero: true }));
// => { name: 'test', meta: { note: 'hello' } }  (age removed)
```

## Options

* omitZero (boolean): remove 0 values. Default false.
