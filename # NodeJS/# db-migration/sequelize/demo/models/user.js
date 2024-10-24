'use strict'
const Sequelize = require('sequelize')
const { db } = require('../db/pg-connect.js')

const User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  image: Sequelize.STRING,
})

User.associate = function (models) {
  User.hasMany(models.Post, {
    foreignKey: 'userId',
  })
}

module.exports = User
