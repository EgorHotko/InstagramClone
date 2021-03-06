
$(document).ready(function(){
  
    var siteURL = 'http://cdevroe.com/',
        entries = $('.text-container p');
    
    if ( entries.length > 0 ) {
    
      entries.each(function(){
          contents = $(this).text().replace(/#(\S+)/g,'<a href="/hashtag/$1">#$1</a>');
        
        $(this).html(contents);
        
      });
      
    }
    
  });

const addComment = function() {
    var fd = new FormData();
    const xhr = new XMLHttpRequest();
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    let date = new Date(Date.now()).toString();
    xhr.open("POST", '/api/comments');
    let text = document.getElementById("commentInput").value;
    let userId = document.getElementById("currentUserIdInput").value;
    fd.append('text', text);
    fd.append('postId', id);
    fd.append('date', date);
    fd.append('userId', userId);
    xhr.send(fd);
}

const deletePost = function(){
    const xhr = new XMLHttpRequest();
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    xhr.open("DELETE", `/api/posts/${id}`);
    xhr.send();
    document.location.href = "/";
}
