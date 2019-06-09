
const sendReq = function() {
    const fd = new FormData();
    const xhr = new XMLHttpRequest();
    let id = document.getElementById("currentUserIdInput").value;
    xhr.open("POST", `/api/posts/user/${id}`, true);
    let text = document.getElementById("textInput").value;
    let files = document.getElementById("postPhotoInput").files;
    fd.append('text', text);
    fd.append('photo', files[0]);
    xhr.send(fd);
    document.location.href = "/";
}

