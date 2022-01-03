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
    getPosts: (request, response) => {
        let userId = localStorage["userID"];
        sequelize.query(`SELECT * FROM posts WHERE user_id=${userId}`)
            .then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    postQuestion: (request, response) => {
        const { userId, modalHeader, modalBody, input1, input2 } = request.body;

        console.log(userId);
        sequelize.query(`
        INSERT INTO posts(
            user_id, 
            post_title, 
            post_content, 
            button_1, 
            button_2, 
            date_posted
        )VALUES(${userId}, '${modalHeader}', '${modalBody}', '${input1}', '${input2}', CURRENT_DATE);

        SELECT post_id FROM posts ORDER BY post_id DESC LIMIT 1;
        `).then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    postResult: (request, response) => {
        const { post_id_data } = request.body;
        sequelize.query(`
        INSERT INTO results(
            post_id, 
            vote_count_1,
            vote_count_2
        )VALUES(${post_id_data}, 0, 0)
        `).then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    }
}