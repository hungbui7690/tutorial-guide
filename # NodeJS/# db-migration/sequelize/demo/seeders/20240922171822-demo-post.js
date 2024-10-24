'use strict'
const { posts } = require('../db/data.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Posts', posts)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Posts', null, {})
  },
}
