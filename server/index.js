require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
//const { SERVER_PORT } = process.env;


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

const port = process.env.PORT || 4004;
app.listen(port, () => console.log(`Welcome to PORT ${port}`));