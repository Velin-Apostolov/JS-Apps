function attachEvents() {

    let loadBtn = document.getElementById('btnLoadPosts');
    let posts = document.getElementById('posts');
    let viewBtn = document.getElementById('btnViewPost');
    let postTitle = document.getElementById('post-title');
    let postBody = document.getElementById('post-body');
    let postComments = document.getElementById('post-comments');
    let postsInfo = [];

    loadBtn.addEventListener('click', loadPosts);
    viewBtn.addEventListener('click', loadComments);

    async function loadPosts() {
        let url = 'http://localhost:3030/jsonstore/blog/posts';
        posts.replaceChildren();
        let response = await fetch(url);
        let data = await response.json();
        
        for (const post in data) {
            let id = post;
            let body = data[post].body;
            let title = data[post].title;
            postsInfo.push({
                id,
                body,
                title,
            });

            let option = document.createElement('option');
            option.textContent = title;
            option.value = id;
            posts.appendChild(option);
            
        }
    }

    async function loadComments() {
        let url = 'http://localhost:3030/jsonstore/blog/comments';
        postComments.replaceChildren();
        let response = await fetch(url);
        let data = await response.json();
        let selectedPostValue = posts.value;
        let currentPost = postsInfo.find((post) => post.id == selectedPostValue);
        postTitle.textContent = currentPost.title;
        postBody.textContent = currentPost.body;

        for (const commentId in data) {
            let postId = data[commentId].postId;

            if (postId == selectedPostValue) {
                let comment = data[commentId].text;
                let li = document.createElement('li');
                li.id = commentId;
                li.textContent = comment;
                postComments.appendChild(li);
            }
        }
    }

}

attachEvents();