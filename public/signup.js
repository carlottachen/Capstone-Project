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

    register(newUserObj);

    email.value = '';
    username.value = '';
    password.value = '';
    confirmPass.value = '';
}

function register(body) {
    axios.post(`https://cc-capstone.herokuapp.com/register`, body).then(response => {
        message.innerHTML = 'Successfully registered new user';
    }).catch(error => {
        console.log(error);
        alert('Uh oh. Your request did not work');
    })
}

signupForm.addEventListener('submit', registerNewUser);