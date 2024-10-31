# @sellerartifact/sequelize-tool

## 简介

该项目包含一些实用的 sequelize 查询帮助函数，用于处理对象过滤、SQL 查询生成和字段条件渲染。

## 安装

```
npm install --save @sellerartifact/sequelize-tool
```

## 功能

### filterSeqWhereObj

用于过滤对象中的属性，移除所有值为假值（false）的属性。如果属性值是一个对象，它也会递归地移除该对象中的假值属性。

#### 使用方法

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
console.log(filteredObj); // 输出: { a: 1, c: { d: 0, f: 'hello' } }

```

### renderField

根据提供的参数渲染字段条件。支持多种类型的字段条件，包括模糊查询、时间范围、区间、左边界大于等于、左边界小于等于和范围查询。

#### 使用方法

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

用于将原始 SQL 查询中的 SELECT 子句替换为 COUNT(*) 子句，从而生成一个用于统计总数的 SQL 查询。


#### 使用方法

```typescript
import { renderTotalSql } from '@sellerartifact/sequelize-tool';

const sql = "SELECT id, name FROM users WHERE age > 18";
const totalSql = renderTotalSql(sql);
console.log(totalSql); // 输出: "SELECT COUNT(*) AS COUNT FROM users WHERE age > 18"
```


# 贡献

欢迎提交问题和拉取请求。如果您有任何建议或发现了 bug，请在 GitHub 上提交 issue。

# License

MIT License

Copyright (c) 2024 王珏

