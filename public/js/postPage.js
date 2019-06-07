
const addComment = function() {
    var fd = new FormData();
    const xhr = new XMLHttpRequest();
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    let date = new Date(Date.now()).toString();
    xhr.open("POST", '/api/comments');
    let text = document.getElementById("commentInput").value;
    fd.append('text', text);
    fd.append('postId', id);
    fd.append('date', date);
    xhr.send(fd);
}
