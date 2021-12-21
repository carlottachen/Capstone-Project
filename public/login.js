const loginSubmit = document.querySelector('#login-form');

const baseURL = `http://localhost:4004/api`

function loginUser(event) {
    let username = document.querySelector('#username-field');
    let password = document.querySelector('#password-field');

    let loginObj = {
        username: username.value,
        password: password.value
    }

    login(loginObj);

    username.value = '';
    password.value = '';
}

function login(body) {
    axios.post(`${baseURL}/login`, body).then(response => {
        alert('Signed in!');
    }).catch(error => {
        console.log(error);
        alert('Uh oh. Your request did not work.');
    })
}

loginSubmit.addEventListener('submit', loginUser);