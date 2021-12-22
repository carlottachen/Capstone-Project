require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { SERVER_PORT } = process.env;


const {
    login,
    register
} = require('./controller/auth.js');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '../public/login.html'));
})


app.post(`/api/login`, login);
app.post(`/api/register`, register);

app.listen(SERVER_PORT, () => console.log(`Welcome to PORT ${SERVER_PORT}`));