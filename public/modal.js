
const postQuestion = document.querySelector('.post-question');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

const questionForm = document.querySelector("#question-form");

window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; //loader hidden
})

function displayUser() {
    document.getElementById("display-username").innerHTML = 'Hi, ' + localStorage["username"];
}
displayUser();

function postModal(event) {
    modal.style.display = "block";
}
postQuestion.addEventListener('click', postModal);

function closeModal(event) {
    modal.style.display = "none";
}
span.addEventListener('click', closeModal);

function clickAway(event) {
    if (event.target === modal)
        modal.style.display = "none";
}
window.addEventListener('click', clickAway);

function fillOutForm(event) {
    event.preventDefault();
    let userId = localStorage["userID"];
    let modalHeader = document.querySelector('.modal-header');
    let modalBody = document.querySelector('.modal-body');
    let input1 = document.querySelector('.input1');
    let input2 = document.querySelector('.input2');

    if (modalHeader.value < 1 || modalBody.value < 1 ||
        input1.value < 1 || input2 < 1) {
        alert('All fields required to post a question');
        return;
    }

    let newPostObj = {
        userId: userId,
        modalHeader: modalHeader.value,
        modalBody: modalBody.value,
        input1: input1.value,
        input2: input2.value
    }

    submitQuestion(newPostObj);

    modalHeader.value = '';
    modalBody.value = '';
    input1.value = '';
    input2.value = '';
}

function submitQuestion(body) {
    axios.post(`http://localhost:4004/postQuestion`, body).then(response => {
        let postObj = { post_id_data: response.data[0].post_id };
        console.log('this', postObj);
        attachResult(postObj);
        //postData(response.data);
        location.reload();
    }).catch(error => {
        console.log(error);
        alert('Uh oh. Your post could not be posted');
    })
    modal.style.display = "none";
}

function attachResult(body) {
    axios.post(`http://localhost:4004/postResult`, body).then(
        console.log('Results table updated')
    ).catch(error => {
        console.log(error);
        alert('Uh oh. Something went wrong');
    })
}

questionForm.addEventListener('submit', fillOutForm);

