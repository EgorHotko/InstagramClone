
const logOut = function(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/auth/logout');
    xhr.send();
    document.location.href = "/login";
}