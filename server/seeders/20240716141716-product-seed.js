'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        productName: 'Rolex Date Just',
        price: 78000,
        description: 'Rolex Date Just is a good choice',
        urlImage:
          'https://media.rolex.com/image/upload/q_auto/f_auto/t_v7/c_limit,w_1920/v1/catalogue/2024/upright-c/m126234-0051',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'Cartier Tank Solo',
        price: 2500,
        description: 'Cartier Tank Solo is a good choice',
        urlImage:
          'https://bizweb.dktcdn.net/thumb/grande/100/418/162/files/dong-ho-cartier-tank-must-extra-large-automatic-wsta0040.jpg?v=1653358918378',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'Catier Santos',
        price: 34000,
        description: 'Catier Santos is a good choice',
        urlImage:
          'https://bizweb.dktcdn.net/thumb/1024x1024/100/418/162/products/cartier-santos-de-cartier-whsa0009-watch-39-8.png?v=1657597721740',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'Mido Ocean Star',
        price: 5400,
        description: 'Mido Ocean Star is a good choice',
        urlImage:
          'https://donghoduyanh.com/images/products/2022/09/20/large/m0268301708100_1663692828.jpg.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: 'Patek Philippe Grand Complications',
        price: 98000,
        description: 'Patek Philippe Grand Complications is a good choice',
        urlImage:
          'https://empireluxury.vn/wp-content/uploads/2022/04/dong-ho-patek-philippe-grand-complications-blue-split-seconds-chronograph-5372p-001-mat-so-xanh-38-3mm-4.png',
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
