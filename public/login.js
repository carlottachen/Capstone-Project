const loginSubmit = document.querySelector('#login-form');

function loginUser(event) {
    event.preventDefault();
    let username = document.querySelector('#username-field');
    let password = document.querySelector('#password-field');

    if (username.value < 1 || password.value < 1) {
        alert('Username and Password is required to login');
        return;
    }

    let loginObj = {
        username: username.value.toLowerCase(),
        password: password.value
    }

    login(loginObj);

    username.value = '';
    password.value = '';
}

function login(body) {
    axios.post(`http://localhost:4004/login`, body).then(response => {
        //console.log(response.data.length);
        //console.log('Logging in', response.data[0].username);
        //window.localStorage.setItem('user', JSON.stringify(response.data));
        window.localStorage.setItem('userID', response.data[0].user_id);
        window.localStorage.setItem('username', response.data[0].username);
        window.location.href = "comPosts.html";
        //redirectLogin(loggedIn);
    }).catch(error => {
        console.log(error);
        alert('Uh oh. Username or Password match not found.');
    })
}

loginSubmit.addEventListener('submit', loginUser);


