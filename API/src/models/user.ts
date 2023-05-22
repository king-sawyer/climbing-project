const Sequelize = require('sequelize');
const db = require('../util/database');

export interface UserInterface {
    UserID: number;
    UserUuid: string;
    FirstName: string;
    LastName: string;
    Email: string;
  }

const User = db.define('user', {
    userID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: false,
        unique: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING
});

export default User;