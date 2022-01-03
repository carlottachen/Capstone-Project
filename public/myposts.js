const logout = document.querySelector("#header-link");
const listPosts = document.querySelector(".list-posts");

function loggingOut(event) {
    window.localStorage.removeItem('user');
    window.localStorage.clear();
    window.location.href = "login.html";
}

logout.addEventListener('click', loggingOut);

/* Display only logged in user's posts */

function getMyPosts() {
    let body = { userID: localStorage["userID"] };
    axios.post(`http://localhost:4004/getMyPosts`, body)
        .then(response => {
            //console.log(response.data.length);
            let postInfo = response.data;
            postMyData(postInfo);
        })
        .catch(error => {
            console.log(error);
            alert('Uh oh. Unable to retreive my posts.');
        });
}

function postMyData(postData) {
    if (postData.length < 1) {
        listPosts.innerHTML = "You have not posted any questions!";
    } else {
        listPosts.innerHTML = "";
        for (let i = 0; i < postData.length; i++) {
            //console.log(postData[i]);
            postMyCard(postData[i]);
        }
    }
}

function postMyCard(body) {
    const newPost = document.createElement('div');
    newPost.classList.add('a-post');
    let percent_1 = (`${body.vote_count_1}` / (`${body.vote_count_1}` + `${body.vote_count_2}`)) * 100;
    let percent_2 = (`${body.vote_count_2}` / (`${body.vote_count_1}` + `${body.vote_count_2}`)) * 100;
    newPost.innerHTML =
        `<div id="a-post">
        <h2>${body.post_title}</h2>
        <p>${body.post_content}<br><br>
        </p>
        <table>
        <tr>
        <td>${body.button_1}:   </td>
        <td>${body.button_2}:   </td>
        <td>${body.button_1}:   </td>
        <td>${body.button_2}:   </td>
        </tr >
        <tr>
        <td>${body.vote_count_1} votes</td>
        <td>${body.vote_count_2} votes</td>
        <td>${percent_1} %</td>
        <td>${percent_2} %</td>
        </tr>
        </table >
        </div > `;
    listPosts.appendChild(newPost);
}

getMyPosts();