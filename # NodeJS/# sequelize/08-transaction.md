### Intro

`Sequelize` does not use `transactions` by default. However, for `production-ready` usage of Sequelize, you should definitely configure Sequelize to use `transactions`.

Sequelize supports two ways of using `transactions`:
- `Unmanaged transactions`: Committing and rolling back the transaction should be done manually by the user (by calling the appropriate Sequelize methods).
- `Managed transactions`: Sequelize will automatically rollback the transaction if any error is thrown, or commit the transaction otherwise. Also, if CLS (Continuation Local Storage) is enabled, all queries within the transaction callback will automatically receive the transaction object.

### Unmanaged transactions

```js
// First, we start a transaction from your connection and save it into a variable
const t = await sequelize.transaction();

try {
  // Then, we do some calls passing this transaction as an option:

  const user = await User.create(
    {
      firstName: 'Bart',
      lastName: 'Simpson',
    },
    { transaction: t },
  );

  await user.addSibling(
    {
      firstName: 'Lisa',
      lastName: 'Simpson',
    },
    { transaction: t },
  );

  // If the execution reaches this line, no errors were thrown.
  // We commit the transaction.
  await t.commit();
} catch (error) {
  // If the execution reaches this line, an error was thrown.
  // We rollback the transaction.
  await t.rollback();
}
```


### Managed transactions

`Managed transactions` handle committing or rolling back the transaction automatically. You start a managed transaction by passing a callback to `sequelize.transaction`. This callback can be async (and usually is).

The following will happen in this case:
- Sequelize will automatically start a transaction and obtain a transaction object `t`
- Then, Sequelize will execute the callback you provided, passing `t` into it
- If your callback throws an error, Sequelize will automatically rollback the transaction
- If your callback succeeds, Sequelize will automatically commit the transaction
- Only then the `sequelize.transaction` call will settle:
  - Either resolving with the resolution of your callback
  - Or, if your callback throws, rejecting with the thrown error

```js
try {
  const result = await sequelize.transaction(async t => {
    const user = await User.create(
      {
        firstName: 'Abraham',
        lastName: 'Lincoln',
      },
      { transaction: t },
    );

    await user.setShooter(
      {
        firstName: 'John',
        lastName: 'Boothe',
      },
      { transaction: t },
    );

    return user;
  });

  // If the execution reaches this line, the transaction has been committed successfully
  // `result` is whatever was returned from the transaction callback (the `user`, in this case)
} catch (error) {
  // If the execution reaches this line, an error occurred.
  // The transaction has already been rolled back automatically by Sequelize!
}
```


### Throw errors to rollback

When using the managed transaction you should never commit or rollback the transaction manually. If all queries are successful (in the sense of not throwing any error), but you still want to rollback the transaction, you should throw an error yourself:

```js
await sequelize.transaction(async t => {
  const user = await User.create(
    {
      firstName: 'Abraham',
      lastName: 'Lincoln',
    },
    { transaction: t },
  );

  // Woops, the query was successful but we still want to roll back!
  // We throw an error manually, so that Sequelize handles everything automatically.
  throw new Error();
});
```