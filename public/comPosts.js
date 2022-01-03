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
        //console.log(postData[i]);
        postCard(postData[i]);
    }
}

function postCard(body) {
    const newPost = document.createElement('div');
    newPost.classList.add('a-post');
    newPost.innerHTML =
        `<div id="a-post">
        <h2>${body.post_title}</h2>
        <p>${body.post_content}<br><br>
        <h4>Posted On ${body.date_posted} By ${body.username}</h4></p>
        <section>
            <div class="button_wrap">
                <button class="select_button" id="${body.post_id}_a" 
                onclick="updateOption1(${body.post_id})" 
                type="submit">${body.button_1}</button>
                
                <button class="select_button" id="${body.post_id}_b" 
                onclick="updateOption2(${body.post_id})" 
                type="submit">${body.button_2}</button>
            </div>
        </section>
        </div>`;
    listPosts.appendChild(newPost);
}
//CREATE POST REQUEST TO SEE IF THIS WORKS!!!

function updateOption1(id) {
    if (document.getElementById(`${id}_a`).disabled === false) {
        axios.put(`http://localhost:4004/update_1/${id}`)
            .then(response => {
                console.log('updated 1');
            })
            .catch(error => {
                console.log(error);
                alert('Uh oh. Unable to update option 1');
            })
    }
    document.getElementById(`${id}_a`).disabled = true;
    document.getElementById(`${id}_b`).disabled = true;
}

function updateOption2(id) {
    if (document.getElementById(`${id}_b`).disabled === false) {
        axios.put(`http://localhost:4004/update_2/${id}`)
            .then(response => {
                console.log('updated 2');
            })
            .catch(error => {
                console.log(error);
                alert('Uh oh. Unable to update option 2');
            })
    }
    document.getElementById(`${id}_a`).disabled = true;
    document.getElementById(`${id}_b`).disabled = true;
}

getAllPosts();