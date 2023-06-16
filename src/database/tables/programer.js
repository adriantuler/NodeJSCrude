const Sequelize = require('sequelize');
const database = require("../db.js");
const { access } = require('fs');

const programmer = database.define('programmer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    javascript: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    java: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    python: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    access: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    sql: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    aws: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    C: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    CPlusPlus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    CSharp: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = programmer;
