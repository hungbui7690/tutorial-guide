### Implementation


#### One to One

`Example 1`: 
- A person has only 1 ID
- An ID belongs to 1 person

```js
Foo.hasOne(Bar);
Bar.belongsTo(Foo);


Foo.hasOne(Bar, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
Bar.belongsTo(Foo);


Foo.hasOne(Bar, {
  foreignKey: 'myFooId',
});
Bar.belongsTo(Foo);


Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: 'myFooId',
});

```

`Example 2`:
- Ship & Captain 
- Ship can exist without a Captain and vice-versa -> `foreign key` can be `null`

```js
// no need foreign key
Ship.hasOne(Captain);
Captain.belongsTo(Ship); 
```



#### One to Many

One `Team` has many `Players`, while each Player belongs to a single Team.

```js
Team.hasMany(Player); 
Player.belongsTo(Team);

CREATE TABLE IF NOT EXISTS "Teams" ();
CREATE TABLE IF NOT EXISTS "Players" (
  "TeamId" INTEGER REFERENCES "Teams" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
);

Image.hasMany(Comment);
Comment.belongsTo(Image);

Video.hasMany(Comment);
Comment.belongsTo(Video);

```

#### Many to Many

One `actor` may have participated in many `movies`, and one `movie` had many `actors` involved with its production


- Method 1
```js
const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
Movie.belongsToMany(Actor, { through: 'ActorMovies' });
Actor.belongsToMany(Movie, { through: 'ActorMovies' });

CREATE TABLE IF NOT EXISTS "ActorMovies" (
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "MovieId" INTEGER REFERENCES "Movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "ActorId" INTEGER REFERENCES "Actors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("MovieId","ActorId")
);
```

- Method 2
```js
const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
const ActorMovies = sequelize.define('ActorMovies', {
  MovieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie, // 'Movies' would also work
      key: 'id',
    },
  },
  ActorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Actor, // 'Actors' would also work
      key: 'id',
    },
  },
});
Movie.belongsToMany(Actor, { through: ActorMovies });
Actor.belongsToMany(Movie, { through: ActorMovies });


CREATE TABLE IF NOT EXISTS "ActorMovies" (
  "MovieId" INTEGER NOT NULL REFERENCES "Movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "ActorId" INTEGER NOT NULL REFERENCES "Actors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE ("MovieId", "ActorId"),     -- Note: Sequelize generated this UNIQUE constraint but
  PRIMARY KEY ("MovieId","ActorId")  -- it is irrelevant since it's also a PRIMARY KEY
);

```

```js
Project.belongsToMany(User, {
  through: UserProjects,
  uniqueKey: 'my_custom_unique',
});
```


### Lazy Loading
The concepts of `Eager` Loading and `Lazy` Loading are fundamental to understand how fetching associations work in Sequelize. 

`Lazy Loading` refers to the technique of fetching the associated data only when you really want it; `Eager Loading`, on the other hand, refers to the technique of fetching everything at once, since the beginning, with a larger query.

##### Example
```js
const awesomeCaptain = await Captain.findOne({
  where: {
    name: 'Jack Sparrow',
  },
});
// Do stuff with the fetched captain
console.log('Name:', awesomeCaptain.name);
console.log('Skill Level:', awesomeCaptain.skillLevel);
// Now we want information about his ship!
const hisShip = await awesomeCaptain.getShip();
// Do stuff with the ship
console.log('Ship Name:', hisShip.name);
console.log('Amount of Sails:', hisShip.amountOfSails);
```
Observe that in the example above, we made `two queries`, only fetching the associated ship when we wanted to use it. This can be especially useful if we may or may not need the ship, perhaps we want to fetch it conditionally, only in a few cases; this way we can save time and memory by only fetching it when necessary.


#### Eager Loading Example
`Note`: ship and captain is `one to one` relationship
```js
const awesomeCaptain = await Captain.findOne({
  where: {
    name: 'Jack Sparrow',
  },
  include: Ship,
});
// Now the ship comes with it
console.log('Name:', awesomeCaptain.name);
console.log('Skill Level:', awesomeCaptain.skillLevel);
console.log('Ship Name:', awesomeCaptain.ship.name);
console.log('Amount of Sails:', awesomeCaptain.ship.amountOfSails);
```
As shown above, `Eager Loading` is performed in Sequelize by using the `include` option. Observe that here only one query was performed to the database (which brings the associated data along with the instance).