'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Posts',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: Sequelize.STRING,
        desc: Sequelize.STRING,
        body: Sequelize.TEXT,
        image: Sequelize.STRING,
        category: Sequelize.STRING,
        updatedAt: Sequelize.DATE,
        createdAt: Sequelize.DATE,
      },
      {
        hooks: {
          beforeCreate: function (post, options, fn) {
            post.createdAt = new Date()
            post.updatedAt = new Date()
            fn(null, post)
          },
          beforeUpdate: function (post, options, fn) {
            post.updatedAt = new Date()
            fn(null, post)
          },
        },
      }
    )
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Posts')
  },
}
