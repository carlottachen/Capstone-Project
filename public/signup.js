const signupForm = document.querySelector('#signup-form');
const message = document.querySelector('#message');

function registerNewUser(event) {
    event.preventDefault();
    let email = document.querySelector('#signup-email-field')
    let username = document.querySelector('#signup-username-field');
    let password = document.querySelector('#signup-password-field');
    let confirmPass = document.querySelector('#confirm-password-field');

    if (email.value < 1 || username.value < 1 ||
        password.value < 1 || confirmPass < 1) {
        alert('All fields required to register');
        return;
    }

    if (password.value != confirmPass.value) {
        alert('Passwords must match!');
        return;
    }

    let newUserObj = {
        email: email.value,
        username: username.value,
        password: password.value
    }

    checkExisting(newUserObj);

    email.value = '';
    username.value = '';
    password.value = '';
    confirmPass.value = '';
}

function checkExisting(body) {
    const { email, username, password } = request.body;

    axios.get(`/searchUsers`).then(response => {
        for (let i = 0; i < response.data.length; i++) {
            if (email === response.data[i]['user_email'])
                console.log('found');
        }
    }).catch(error => {
        console.log(error);
        alert('Uh oh. Your request did not work');
    })
}

function register(body) {
    axios.post(`/register`, body).then(response => {
        alert('Successfully registered! Please login :)');
        window.location.href = "/login.html";
    }).catch(error => {
        console.log(error);
        alert('Uh oh. Your request did not work');
    })
}

signupForm.addEventListener('submit', registerNewUser);