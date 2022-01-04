const logout = document.querySelector("#header-link");
const postBody = document.querySelector(".post-body");
const listPosts = document.querySelector(".list-posts");
const aPost = document.querySelector("#a-post");

function loggingOut(event) {
    window.localStorage.removeItem('user');
    window.localStorage.clear();
    window.location.href = "login.html";
}

logout.addEventListener('click', loggingOut);

/*
*
Display posts on Community posts page
*
*/

function getAllPosts() {
    axios.get(`http://localhost:4004/getAllPosts`)
        //.then(function ({ data: postData }) { postData(postData) })
        .then(response => {
            //console.log(response.data.length);
            let postInfo = response.data;
            postData(postInfo);
        })
        .catch(error => {
            console.log(error);
            alert('Uh oh. Unable to retreive posts.');
        });
}

function postData(postData) {
    listPosts.innerHTML = "";
    for (let i = 0; i < postData.length; i++) {
        //create a new post for each item in database
        postCard(postData[i]);
        console.log(postData[i]);
    }
}



function postCard(body) {
    const newPost = document.createElement('div');
    newPost.classList.add('a-post');

    let { post_id } = body;
    let userID = localStorage.getItem("userID");
    userID = Number(userID);
    //console.log(userID, post_id);

    axios.get(`http://localhost:4004/voteCasted`)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                console.log(post_id, userID);
                console.log(response.data[i]);
                if (post_id === response.data[i].post_id &&
                    userID == response.data[i].user_id &&
                    response.data[i].disable_vote === true) {
                    newPost.innerHTML = `<div id="a-post">
                    <h2>${body.post_title}</h2>
                    <p>${body.post_content}<br><br>
                    <h4>Posted On ${body.date_posted} By ${body.username}
                    </h4></p>
                    <section>
                            <table>
                            <tr>
                            <td>${body.button_1}:   </td>
                            <td>${body.button_2}:   </td>
                            </tr >
                            <tr>
                            <td>${body.vote_count_1} votes</td>
                            <td>${body.vote_count_2} votes</td>
                            </tr>
                            </table >
                    </section>
                    </div>`;
                }
                else {
                    newPost.innerHTML = `<div id="a-post">
                    <h2>${body.post_title}</h2>
                    <p>${body.post_content}<br><br>
                    <h4>Posted On ${body.date_posted} By ${body.username}
                    </h4></p>
                    <section>
                    <div class="button_wrap">
                    <button class="select_button" id="${post_id}" 
                    onclick="updateOption1(${body.post_id})" 
                    type="submit">${body.button_1}</button>
                
                    <button class="select_button" id="${post_id}" 
                    onclick="updateOption2(${body.post_id})" 
                    type="submit">${body.button_2}</button>
                    </div>
                    </section>
                    </div>`;
                }
                listPosts.appendChild(newPost);
            }
        })
        .catch(error => {
            console.log(error);
            alert('Uh oh. Your request did not work');
        })
}

function updateOption1(id) {
    axios.put(`http://localhost:4004/update_1/${id}`)
        .then(response => {
            console.log('updated 1');
            getAllPosts();
        })
        .catch(error => {
            console.log(error);
            alert('Uh oh. Unable to update option 1');
        })
    disableButton(id);
}

function updateOption2(id) {
    axios.put(`http://localhost:4004/update_2/${id}`)
        .then(response => {
            console.log('updated 2');
            getAllPosts();
        })
        .catch(error => {
            console.log(error);
            alert('Uh oh. Unable to update option 2');
        })
    disableButton(id);
}

function disableButton(id) {
    let body = { userID: localStorage["userID"] };
    axios.post(`http://localhost:4004/disable_this/${id}`, body)
        .then(console.log('added to tracker'))
        .catch(error => {
            console.log(error);
        })
}

getAllPosts();