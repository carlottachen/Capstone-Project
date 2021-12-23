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

const bcrypt = require('bcryptjs');

module.exports = {
    seed: (request, response) => {
        sequelize.query(`
        DROP TABLE IF EXISTS results;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        
        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            user_email VARCHAR(50),
            username VARCHAR(50),
            user_password VARCHAR(50)
            );
            
            CREATE TABLE posts(
                post_id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(user_id),
                post_title VARCHAR(50),
                post_content VARCHAR(1000),
                date_posted DATE
                );
                
                CREATE TABLE results(
                    post_id INT NOT NULL REFERENCES posts(post_id),
                    button_1 VARCHAR(30),
                    button_2 VARCHAR(30),
                    vote_count_1 INT,
                    vote_count_2 INT,
                    percent_1 INT,
                    percent_2 INT
                    );

                    INSERT INTO users(user_email, username, user_password)
                    VALUES(carlotta@gmail.com, carlottachen, password1),
                    ('cchen@gmail.com', 'cchen123', 'password2'),
                    ('hello@yahoo.com, 'helloWorld', 'password3');

                    INSERT INTO posts(user_id, post_title, post_content, date_posted)
                    VALUES(1, 'Test post', 'This is some content', CURRENT_DATE);

                    INSERT INTO results(post_id, button_1, button_2, vote_count_1, vote_count_2, percent_1, percent_2)
                    VALUES(1, 'NTA', 'YTA', 6, 4, 60, 40);
        `).then(() => {
            console.log('DB SEEDED!!');
            response.sendStatus(200);
        }).catch(error => console.log('ERROR seeding DB', error));
    },

    login: (request, response) => {
        const { username, password } = request.body;

        sequelize.query()
            .then()
            .catch();

    },

    register: (request, response) => {
        const { email, username, password } = request.body;

        let salt = bcrypt.genSaltSync(5);
        let passwordHash = bcrypt.hashSync(password, salt);

        sequelize.query(`
        INSERT INTO users(
            user_email,
            username,
            user_password
        )VALUES('${email}, ${username}, ${passwordHash})
        `).then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    }
}