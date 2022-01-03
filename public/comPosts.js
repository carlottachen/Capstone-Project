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
        <form method="PUT" action="..." onsubmit="return checkForm(this);" id='${body.post_id}'>
            <div class="button_wrap">
                <input class="select_button" id="pick_1" type="submit" name="b1" value="${body.button_1}">
                <input class="select_button" id="pick_2" type="submit" name="b2" value="${body.button_2}">
            </div>
        </form>
        </div>`;
    listPosts.appendChild(newPost);
}
//CREATE POST REQUEST TO SEE IF THIS WORKS!!!
//REFER TO BACK-END-2-DEMO in lectures


function checkForm(form) {
    form.b1.disabled = true;
    form.b2.disabled = true;
    return true;
}

getAllPosts();