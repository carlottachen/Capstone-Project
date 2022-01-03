require('dotenv').config();
//get "DATABASE_URL" from Heroku
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

module.exports = {
    getAllPosts: (request, response) => {
        sequelize.query(`SELECT posts.post_id, posts.user_id, posts.post_title, posts.post_content, posts.button_1, posts.button_2, posts.date_posted, users.user_id, users.username
        FROM posts, users
        WHERE posts.user_id = users.user_id
        ORDER BY date_posted DESC`)
            .then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    }

}