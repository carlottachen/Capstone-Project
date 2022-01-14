const signupForm = document.querySelector('#signup-form');
const message = document.querySelector('#message');

function registerNewUser(event) {
    event.preventDefault();
    let email = document.querySelector('#signup-email-field')
    let username = document.querySelector('#signup-username-field');
    let password = document.querySelector('#signup-password-field');
    let confirmPass = document.querySelector('#confirm-password-field');
    /*
        if (email.value < 1 || username.value < 1 ||
            password.value < 1 || confirmPass < 1) {
            alert('All fields required to register');
            return;
        }
    */
    if (password.value.length < 6) {
        alert('Password must be at least 5 characters long');
        return;
    }
    if (password.value != confirmPass.value) {
        alert('Passwords must match!');
        return;
    }

    let newUserObj = {
        email: email.value.toLowerCase(),
        username: username.value.toLowerCase(),
        password: password.value
    }
    checkExists(newUserObj);

    email.value = '';
    username.value = '';
    password.value = '';
    confirmPass.value = '';
}

function checkExists(body) {
    const { email, username, password } = body;
    // axios.get(`http://localhost:4004/searchUsers`)
    axios.get(`/searchUsers`)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                if (email === response.data[i].user_email) {
                    alert('There is an account registered to this email');
                    return;
                }
                else if (username === response.data[i].username) {
                    alert('This username is taken');
                    return;
                }
            }
            register(body);
        }).catch(error => {
            console.log(error);
            alert('Uh oh. Your request did not work');
        })
}

/*response.data.forEach(user => {
if (email === user['user_email']) {
    alert('There is an account registered to this email');
    break;
}
else if (username === user['username']) {
    alert('This username is taken');
    break;
};
})*/

function register(body) {
    // axios.post(`http://localhost:4004/register`, body)
    axios.post(`/register`, body)
        .then(response => {
            alert('Successfully registered! Please login :)');
            window.location.href = "login.html";
        }).catch(error => {
            console.log(error);
            alert('Uh oh. Your request did not work');
        })
}

signupForm.addEventListener('submit', registerNewUser);