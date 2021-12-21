const postQuestion = document.querySelector('.post-question');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

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