### Indexes

Sequelize supports adding indexes to the model definition which will be created on `sequelize.sync()`.

```js
const User = sequelize.define(
  'User',
  { /* attributes */},
  {
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['email'],
      },

      // By default index name will be [table]_[fields]
      // Creates a multi column partial index
      {
        name: 'public_by_author',
        fields: ['author', 'status'],
        where: {
          status: 'public',
        },
      },
    ],
  },
);

```