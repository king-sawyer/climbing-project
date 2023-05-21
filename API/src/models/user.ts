const Sequelize = require('sequelize');
const db = require('../util/database');

export interface UserInterface {
    UserID: number;
    UserUuid: string;
    Name: string;
    Email: string;
  }

const User = db.define('user', {
    UserID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    UserUuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: false,
        unique: true
    },
    Name: Sequelize.STRING,
    Email: Sequelize.STRING
});

export default User;