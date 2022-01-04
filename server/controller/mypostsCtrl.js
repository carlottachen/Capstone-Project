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
    getMyPosts: (request, response) => {
        const { userID } = request.body;
        sequelize.query(`
        SELECT results.post_id, results.vote_count_1, results.vote_count_2, posts.post_id, posts.user_id, posts.post_title, posts.post_content, posts.button_1, posts.button_2
        FROM results, posts
        WHERE results.post_id = posts.post_id AND posts.user_id = ${userID}
        `)
            .then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    deletePost: (request, response) => {
        const { id } = request.params;
        sequelize.query(`
        DELETE FROM tracker WHERE post_id = ${id};
        DELETE FROM results WHERE post_id = ${id};
        DELETE FROM posts WHERE post_id = ${id};
        `)
            .then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    }

}