### Hooks

```js
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Posts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: Sequelize.STRING,
        desc: Sequelize.STRING,
        body: Sequelize.TEXT,
        image: Sequelize.STRING,
        updatedAt: Sequelize.DATE,
        createdAt: Sequelize.DATE,
      },
      {
        hooks: {
          beforeCreate: function (user, options, fn) {
            user.createdAt = new Date()
            user.updatedAt = new Date()
            fn(null, user)
          },
          beforeUpdate: function (user, options, fn) {
            user.updatedAt = new Date()
            fn(null, user)
          },
        },
      }
    )
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Posts')
  },
}

```