'use strict'
const { Sequelize } = require('sequelize')
const { db } = require('../db/pg-connect.js')

const Posts = db.define('Posts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  desc: Sequelize.TEXT,
  body: Sequelize.TEXT,
  image: Sequelize.STRING,
  category: Sequelize.STRING,
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
})

Posts.associate = function (models) {
  Posts.belongsTo(models.Users, {
    foreignKey: 'userId',
  })
}

module.exports = Posts
