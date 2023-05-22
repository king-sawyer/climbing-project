const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        userUuid: uuidv4(),
        firstName: 'Mack',
        lastName: 'Peters',
        email: 'mackpeters27@gmail.com',
        updatedAt: new Date(),
        createdAt: new Date()
      },
      {
        userUuid: uuidv4(),
        firstName: 'Sawyer',
        lastName: 'King',
        email: 'kingsawyer@gmail.com',
        updatedAt: new Date(),
        createdAt: new Date()
      }
    ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
    }
  };