# @sellerartifact/sequelize-tool



## Introduction

This project includes some practical `sequencize query helper functions` for processing object filtering, SQL query generation, and field condition rendering.

## Install

```
npm install --save @sellerartifact/sequelize-tool
```

## API

### filterSeqWhereObj

Filters the given object by removing properties with falsy values. If the property value is an object, it also removes properties with falsy values within that object.

#### Usage

```typescript
import { filterSeqWhereObj } from '@sellerartifact/sequelize-tool';

const obj = {
  a: 1,
  b: null,
  c: {
    d: 0,
    e: false,
    f: 'hello',
  },
  e: undefined,
};

const filteredObj = filterSeqWhereObj(obj);
console.log(filteredObj); // output: { a: 1, c: { d: 0, f: 'hello' } }

```

### renderField

Renders a field condition based on the provided parameters.

- field - The field name.
- value - The field value.
- type - The type of field condition (optional). "fuzzy" | "time" | "section" | "leftGreaterEqual" | "leftLessEqual" | "range" | "";

#### Usage

```typescript
import { renderField, FieldConditionType } from '@sellerartifact/sequelize-tool';

renderField("txt", "hello", "fuzzy"); // "txt LIKE '%hello%'"

renderField("create_time", [1730339266, 1730349266], "time");  // "create_time BETWEEN 1730339266 AND 1730349266"

renderField("age", 18, "leftGreaterEqual"); // "age >= 18"

renderField("age", undefined, "leftGreaterEqual"); // "1=1"

renderField("age", 18, "leftLessEqual"); // "age <= 18"

renderField("id", 9527, "range"); // "id in (9527)"

renderField("id", [9527, 9528], "range"); // "id in (9527, 9528)"

renderField("a", 1); // "a = 1"

renderField("a", undefined); // "1=1"
```


### renderTotalSql

Renders the total SQL query by replacing the SELECT clause with a COUNT(*) clause.


#### Usage

```typescript
import { renderTotalSql } from '@sellerartifact/sequelize-tool';

const sql = "SELECT id, name FROM users WHERE age > 18";
const totalSql = renderTotalSql(sql);
console.log(totalSql); // 输出: "SELECT COUNT(*) AS COUNT FROM users WHERE age > 18"
```


# Contributing

Welcome to submit questions and pull requests. If you have any suggestions or discover bugs, please submit an issue on GitHub.

# License

MIT License

Copyright (c) 2024 王珏

