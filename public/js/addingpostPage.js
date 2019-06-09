
const sendReq = function() {
    const fd = new FormData();
    let text = document.getElementById("textInput").value;
    let files = document.getElementById("postPhotoInput").files;
    let id = document.getElementById("currentUserIdInput").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/posts/user/${id}`, true);
    fd.append('text', text);
    fd.append('photo', files[0]);
    xhr.send(fd);
    document.location.href = "/";
}

