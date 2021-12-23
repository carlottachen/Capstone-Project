require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const {
    seed,
    login,
    register
} = require('./controller/auth.js');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '../public/signup.html'));
})

app.post('/seed', seed);
app.post(`/login`, login);
app.post(`/register`, register);

const port = process.env.PORT || 4004;
app.listen(port, () => console.log(`Welcome to PORT ${port}`));