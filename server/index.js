require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const {
    seed,
    login,
    register,
    searchUsers
} = require('./controller/auth.js');

const {
    getPosts,
    postQuestion,
    postResult
} = require('./controller/modalCtrl.js');

const {
    getAllPosts
} = require('./controller/comPostsCtrl.js');

const {
    getMyPosts
} = require('./controller/mypostsCtrl.js');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '../public/login.html'));
})

app.post(`/seed`, seed);
app.post(`/login`, login);
app.post(`/register`, register);
app.get(`/searchUsers`, searchUsers);

app.get(`/getPosts`, getPosts);
app.post(`/postQuestion`, postQuestion);
app.post(`/postResult`, postResult);

app.get(`/getAllPosts`, getAllPosts);

app.post(`/getMyPosts`, getMyPosts);

const port = process.env.PORT || 4004;
app.listen(port, () => console.log(`Welcome to PORT ${port}`));