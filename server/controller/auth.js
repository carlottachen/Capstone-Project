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

//const bcrypt = require('bcryptjs');

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
            user_password VARCHAR(500)
            );
            
            CREATE TABLE posts(
                post_id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(user_id),
                post_title VARCHAR(100),
                post_content VARCHAR(1000),
                button_1 VARCHAR(30),
                button_2 VARCHAR(30),
                date_posted DATE
                );
                
                CREATE TABLE results(
                    post_id INT NOT NULL REFERENCES posts(post_id),
                    vote_count_1 INT,
                    vote_count_2 INT
                    );

                    INSERT INTO users(user_email, username, user_password)
                    VALUES('carlotta@gmail.com', 'carlottachen', 'password1'),
                    ('cchen@gmail.com', 'cchen123', 'password2'),
                    ('hello@yahoo.com', 'brownie', 'test');

                    INSERT INTO posts(user_id, post_title, post_content, button_1, button_2, date_posted)
                    VALUES(1, 'Which fast food is better', 'I like Taco Bell but my boyfriend wants McDonalds, which fast food is healthier? We will go eat there.', 'Taco Bell', 'McDonalds', CURRENT_DATE),
                    (2, 'AITA for yelling at my boyfriend that Im not his friends personal cook?', 'I F31 have been with my boyfriend M32 for 2 years. We met via a dating site and I moved to his hometown months ago. One new thing I learned about him is that he is extremely sociable. He has a group of 15+ guy friends that he calls brothers. Believe it or not theyre all single despite being in their 30s. Not saying its weird but still...Theyre military though.', 'NTA', 'YTA', CURRENT_DATE);

                    INSERT INTO results(post_id, vote_count_1, vote_count_2)
                    VALUES(1, 6, 4),
                    (2, 0, 0);
        `).then(() => {
            console.log('DB SEEDED!!');
            response.sendStatus(200);
        }).catch(error => console.log('ERROR seeding DB', error));
    },

    //Login a user if matching creds are found
    login: (request, response) => {
        const { username, password } = request.body;

        return sequelize.query(
            `SELECT * FROM users
            WHERE username = '${username}' AND user_password = '${password}'`)
            .then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    //Create a new user
    register: (request, response) => {
        const { email, username, password } = request.body;

        //let salt = bcrypt.genSaltSync(5);
        //let passwordHash = bcrypt.hashSync(password, salt);

        sequelize.query(`
        INSERT INTO users(
            user_email,
            username,
            user_password
        )VALUES('${email}', '${username}', '${password}')
        `).then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    },

    //returns all existing user info to check
    //for existing username/emails in the front end
    searchUsers: (request, response) => {
        sequelize.query(`
        SELECT * FROM users;
        `).then(dbRes => response.status(200).send(dbRes[0]))
            .catch(error => console.log(error));
    }
}
