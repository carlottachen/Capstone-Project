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
        /*
        sequelize.query(`
        SELECT posts.post_id, posts.user_id, posts.post_title, posts.post_content, posts.button_1, posts.button_2, posts.date_posted, users.user_id, users.username
        FROM posts, users
        WHERE posts.user_id = users.user_id
        ORDER BY post_id DESC`)
            */
        sequelize.query(`
        SELECT posts.post_id, posts.user_id, posts.post_title, posts.post_content, posts.button_1, posts.button_2, posts.date_posted, users.user_id, users.username, results.vote_count_1, results.vote_count_2
        FROM posts
        JOIN users
        ON posts.user_id = users.user_id
        JOIN results
        ON posts.post_id = results.post_id
        ORDER BY CURRENT_DATE DESC, post_id DESC`)
            .then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    updateB1: (request, response) => {
        let { id } = request.params;

        sequelize.query(`UPDATE results SET vote_count_1 = vote_count_1 + 1
        WHERE post_id = ${id}`)
            .then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    updateB2: (request, response) => {
        let { id } = request.params;

        console.log('this two', id);
        sequelize.query(`UPDATE results SET vote_count_2 = vote_count_2 + 1
        WHERE post_id = ${id}`)
            .then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    voteCasted: (request, response) => {
        sequelize.query(`
        SELECT * FROM tracker;
        `).then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    disableThis: (request, response) => {
        let { post_id } = request.params;
        let { userID } = request.body;

        sequelize.query(`
                INSERT INTO tracker(user_id, post_id, disable_vote)
                VALUES(${userID}, ${post_id}, TRUE);
                `).then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    }
}