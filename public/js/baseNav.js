
const logOut = function(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/auth/logout');
    xhr.send();
    document.location.href = "/login";
}


const search = async function(){
    
    let text = document.getElementById("searchHeaderInput").value;
    if(text[0] == "#"){
        document.location.href = `/hashtag/${text.substr(1)}`;
    } else {
        const userRes = await fetch(`http://localhost:3000/api/users/username/${text}`);
        const user = await userRes.json();
        document.location.href = `/user/${user.id}`;
    }
}