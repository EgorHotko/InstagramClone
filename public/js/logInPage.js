
const logIn = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/auth/login');
    xhr.setRequestHeader("Content-Type", "application/json");
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    xhr.send(JSON.stringify({"email": email, "password": password}));
}