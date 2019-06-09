
const sendReq = function() {
    const fd = new FormData();
    let text = document.getElementById("textInput").value;
    let files = document.getElementById("postPhotoInput").files;
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `/api/posts/${id}`, true);
    fd.append('text', text);
    fd.append('photo', files[0]);
    xhr.send(fd);
    document.location.href = "/";
}