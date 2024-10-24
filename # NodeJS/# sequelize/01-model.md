### Connect to DB

```js
const { Sequelize} = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: process.env.NODE_ENV === 'production' && { rejectUnauthorized: false },
  pool: { max: 1, idle: Infinity, maxUses: Infinity },
})
```


### Define Table

```js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, // // allowNull defaults to true
      unique: true // constraint
    },
    userDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // current time
    }
    email: DataTypes.STRING, // shorthand
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', hash(this.username + value)); // setter
      },
    }
    fullName: {
      type: DataTypes.VIRTUAL, // virtual field
      get() {
        return `${this.firstName} ${this.lastName}`; // getter
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!'); // setter
      },
    }
    hashedPassword: {
      type: DataTypes.STRING(64),
      validate: {
        is: /^[0-9a-f]{64}$/i, // validations
        len: [5, 10],
        min: -30, 
        max: 30
      },
    },
  },
  {
    // Other model options go here
    sequelize, // pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: 'Employees', // set table name
    timestamps: true, // will create createdAt & updatedAt
    createdAt: false // if we don't want createdAt
    indexes: [{ unique: true, fields: ['someUnique'] }],
    paranoid: true, // allow soft delete -> update instead of delete
    deletedAt: 'destroyTime'
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

```

### Instance

```js
// insert into db
const user = new User({ id: 1 }); // don't do this
const jane = User.build({ name: 'Jane' }); // do this 

console.log(jane); // Don't do this
console.log(jane.toJSON()); // This is good!

// Method 1: update
jane.age = 18
jane.set({
  name: 'Ada',
  favoriteColor: 'blue',
}); // update several fields
await jane.save();

// Method 2: build + save at the same time
const jane = await User.create({ name: 'Jane' }); 

// delete an instance
await jane.destroy();

// generates a SELECT query to get the up-to-date data from the database.
await jane.reload(); 

```



### Sync

This will apply changes into our Database

```js
// This creates the table if it doesn't exist (and does nothing if it already exists)
await User.sync();

// This creates the table, dropping it first if it already existed
await User.sync({ force: true });

// This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
await User.sync({ alter: true })

// You can use sequelize.sync() to automatically synchronize all models
await sequelize.sync({ force: true });

// This will run .sync() only if database name ends with '_test'
sequelize.sync({ force: true, match: /_test$/ });
```

### Dropping Tables

```js
await User.drop(); 
await sequelize.drop(); // drop all tables
```