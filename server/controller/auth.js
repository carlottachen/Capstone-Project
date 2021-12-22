require('dotenv').config();
const { DATABASE_URL } = process.env;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
            //would not want this in prod
        }
    }
})

const bcrypt = require('bcryptjs');

module.exports = {
    login: (request, response) => {
        const { username, password } = request.body;

        sequelize.query()
            .then()
            .catch()

    },

    register: (request, response) => {

        sequelize.query()
            .then()
            .catch()
    }
}