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
    let v1 = parseInt(`${body.vote_count_1}`);
    let v2 = parseInt(`${body.vote_count_2}`);

    let percent_1 = Math.round((v1 / (v1 + v2)) * 100);
    let percent_2 = Math.round((v2 / (v1 + v2)) * 100);
    if (isNaN(percent_1)) {
        percent_1 = 0;
    }
    if (isNaN(percent_2)) {
        percent_2 = 0;
    }
    newPost.innerHTML =
        `<div id="a-post">
        <h2>
            <img src="trash-bin.png"
            onclick="deleteThisPost(${body.post_id})" 
            alt="delete post" id="delete-this" style="width:3vw;height:3vw">
            ${body.post_title}             
        </h2>
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
        </div >`;
    listPosts.appendChild(newPost);
}

function deleteThisPost(id) {
    axios.delete(`http://localhost:4004/deletePost/${id}`)
        .then(response => {
            alert('Post deleted');
            location.reload();
        })
        .catch(error => {
            console.log(error);
            alert('Uh oh. Unable delete this post');
        })
}

getMyPosts();