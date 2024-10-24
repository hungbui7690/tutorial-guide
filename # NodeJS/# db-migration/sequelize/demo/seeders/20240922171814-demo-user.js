'use strict'
const { users } = require('../db/data.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', users)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
