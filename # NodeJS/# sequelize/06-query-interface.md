### Introduction

An instance of Sequelize uses something called `Query Interface` to communicate to the database in a dialect-agnostic way. Most of the methods you've learned in this manual are implemented with the help of several methods from the query interface.

The methods from the `query interface` are therefore `lower-level` methods; you should use them only if you do not find another way to do it with higher-level APIs from Sequelize. They are, of course, still higher-level than running raw queries directly (i.e., writing SQL by hand).

This guide shows a few examples, but for the full list of what it can do, and for detailed usage of each method, check the `QueryInterface API`.

https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface

### Create a table
CREATE TABLE IF NOT EXISTS `Person` (
  `name` VARCHAR(255),
  `isBetaMember` TINYINT(1) NOT NULL DEFAULT 0
);
```js
queryInterface.createTable('Person', {
  name: DataTypes.STRING,
  isBetaMember: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});





CREATE TABLE IF NOT EXISTS `Person` (
  `name` VARCHAR(255),
  `isBetaMember` TINYINT(1) NOT NULL DEFAULT 0
);
```

### Add Column to a table

```js
queryInterface.addColumn('Person', 'petName', { type: DataTypes.STRING });

ALTER TABLE `Person` ADD `petName` VARCHAR(255);
```

### Change Data Type of a Column

```js
queryInterface.changeColumn('Person', 'foo', {
  type: DataTypes.FLOAT,
  defaultValue: 3.14,
  allowNull: false,
});

ALTER TABLE `Person` CHANGE `foo` `foo` FLOAT NOT NULL DEFAULT 3.14;
```


### Remove a Column

```js
queryInterface.removeColumn('Person', 'petName', {
  /* query options */
});

ALTER TABLE "public"."Person" DROP COLUMN "petName";
```

### Bulk Insert

```js
queryInterface.bulkInsert('roles', [{
   label: 'user',
   createdAt: new Date(),
   updatedAt: new Date()
 }, {
   label: 'admin',
   createdAt: new Date(),
   updatedAt: new Date()
 }]);

```


... and many more: createDatabase(), dropTable(), dropAllTables(), dropConstraint()...