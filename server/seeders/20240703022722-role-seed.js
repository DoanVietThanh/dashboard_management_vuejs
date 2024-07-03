'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return await queryInterface.bulkInsert('Roles', [
      {
        roleName: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'userAdmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'productAdmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
