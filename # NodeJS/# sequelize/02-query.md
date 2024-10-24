### Insert Query 

```js
// Single Record
const jane = await User.create({ firstName: 'Jane', lastName: 'Doe' }); // shorthand for build + save

const joe = await User.build({name: 'Joe'})
await joe.save()
```

```js
// Multiple Records
const captains = await Captain.bulkCreate([{ name: 'Jack Sparrow' }, { name: 'Davy Jones' }]);
console.log(captains.length); // 2
console.log(captains[0] instanceof Captain); // true
console.log(captains[0].name); // 'Jack Sparrow'
console.log(captains[0].id); // 1 // (or another auto-generated value)

```

### SELECT Query

```js

// SELECT * FROM ...
const users = await User.findAll();

// SELECT foo, bar FROM ...
Model.findAll({
  attributes: ['foo', 'bar'],
});

// Rename field
Model.findAll({
  attributes: ['foo', ['bar', 'baz'], 'qux'], // rename "bar" to "baz"
});

// Exclude
Model.findAll({
  attributes: { exclude: ['baz'] },
});

// Aggregation
Model.findAll({
  attributes: {
    include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']],
  },
});

```


### WHERE Clause

```js

// SELECT * FROM post WHERE authorId = 2;
Post.findAll({
  where: {
    authorId: 2,
  },
});


// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
const { Op } = require('sequelize');
Post.findAll({
  where: {
    [Op.and]: [{ authorId: 12 }, { status: 'active' }],
  },
});


// WHERE char_length("content") = 7
Post.findAll({
  where: sequelize.where(sequelize.fn('char_length', sequelize.col('content')), 7),
});

```


#### Paranoid

Will have special column called `deletedAt`.
We will have `soft-deletion` instead of `hard-deletion`


```js
Post.init(
  {
    /* attributes here */
  },
  {
    sequelize,
    paranoid: true,    
    deletedAt: 'destroyTime', // If you want to give a custom name to the deletedAt column
  },
);

```


### DELETE Query
```js

// Delete everyone named "Jane"
await User.destroy({
  where: {
    firstName: 'Jane',
  },
});


// Truncate the table
await User.destroy({
  truncate: true,
});

```


### DELETE Paranoid 

```js
// Soft Delete: UPDATE "posts" SET "deletedAt"=[timestamp] WHERE "deletedAt" IS NULL AND "id" = 1
await Post.destroy({
  where: {
    id: 1,
  },
});

// Hard Delete: DELETE FROM "posts" WHERE "id" = 1
await Post.destroy({
  where: {
    id: 1,
  },
  force: true,
});
```

### Restore

Restore soft-deleted records,

```js
const post = await Post.create({ title: 'test' });
await post.destroy(); // soft delete
await post.restore();

// Restoring every soft-deleted post with more than 100 likes
await Post.restore({
  where: {
    likes: {
      [Op.gt]: 100,
    },
  },
});

```








### Ordering

```js
Subtask.findAll({
  order: [
    ['title', 'DESC'], // order by title DESC
    [Task, 'createdAt', 'DESC'],
    [{ model: Task, as: 'Task' }, 'createdAt', 'DESC'],
    ['Task', 'createdAt', 'DESC'], // order by an associated model's createdAt using the name of the association.
  ]
});

```

### Group By

```js
// GROUP BY name
Project.findAll({ group: 'name' });

```


### Limits and Pagination

```js
// Fetch 10 instances/rows
Project.findAll({ limit: 10 });

// Skip 8 instances/rows
Project.findAll({ offset: 8 });

// Skip 5 instances and fetch the 5 after that
Project.findAll({ offset: 5, limit: 5 });

```