get 10 random users

```js
const users = await User.aggregate([
  {
    $match: {
      _id: { $ne: userId },
    },
  },
  { $sample: { size: 10 } }, // Appends new custom $sample operator to this aggregate pipeline -> The $sample stage has the following syntax: { $sample: { size: <positive integer> } } -> Add a pipeline that picks 10 random documents
])
```

https://medium.com/@sahinkasap52/getting-random-records-from-mongodb-with-mongoose-js-29a598e8ec24