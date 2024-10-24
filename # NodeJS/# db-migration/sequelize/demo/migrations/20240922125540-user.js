'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
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
    await queryInterface.dropTable('Users')
  },
}
