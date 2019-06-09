
const registerUser = function() {
    var fd = new FormData();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/auth/register');
    let username = document.getElementById("usernameInput").value;
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    fd.append('username', username);
    fd.append('email', email);
    fd.append('password', password);
    xhr.send(fd);
    document.location.href = "/login";
}