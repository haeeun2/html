// 전역 변수 선언
var mouseX, mouseY;
var photo_num = 0;
var photo_id = "";
var photo_left, photo_top;

function album_dragstart(event) {
    photo_id = event.target.id;
    event.dataTransfer.setData("id", photo_id);
}

// 412쪽 2번째 박스 코드 
function album_dragover(event) {
    event.preventDefault(); event.preventDefault();
}

function start_move(event) {
    event.preventDefault();

    photo_id = event.target.id;
    photo = document.getElementById(photo_id);
    photo_left = photo.leftOffset;
    photo_top = photo.topOffset;
    
    document.onmouseup = stop_move;
    document.onmousemove = move_photo;
}

function move_photo(event) {
    offsetx = photo_left - event.clientX;
    offsety = photo_top - event.clientY;
    photo_left = event.clientX;
    photo_top = event.clientY;

    photo = document.getElementById(photo_id);

    document.getElementById(photo_id).style.top = (photo.offsetTop - offsety) + "px";
    document.getElementById(photo_id).style.left = (photo.offsetLeft - offsetx) + "px";
}

function stop_move() {
    document.onmouseup = null;
    document.onmousemove = null;
}

function delete_photo(event) {
    id = event.target.id;
    document.getElementById("album").removeChild(document.getElementById(id));
}

// 412쪽 3번째 박스 코드 
function album_drop(event) {
    event.preventDefault()
    mouseX = event.clientX;
    mouseY = event.clientY;

    photo_id = event.dataTransfer.getData("id");
    if (photo_id == "") {
        const reader = new FileReader();
        var files = event.dataTransfer.files;
        for(i=0; i<files.length; i++) {
            if (files[i].type.match(/image.*/)) {
                reader.addEventListener('load', post_on_album);
                reader.readAsDataURL(files[i]);
            }
        }
    }
}


// 413쪽 코드 
function post_on_album(event) {
    album = document.getElementById("album").getBoundingClientRect();
    pic = document.createElement("img");
    pic.src = event.target.result;
    pic.id = "photo" + photo_num;
    pic.style.cursor = "move";
    pic.onmousedown = start_move;
    pic.ondblclick = delete_photo;
    photo_num ++;
    pic.style.width = "128px";
    pic.style.position = "absolute";
    pic.style.top = (mouseY - parseInt(album.top)) + "px";
    pic.style.left = (mouseX - parseInt(album.left)) + "px";
    document.getElementById("album").appendChild(pic);
}


function save() {
    var localStorage = window.localStorage;

    if (!localStorage) {
        // local storage is not supported by this browser.
        // do nothing
    }
    else {
        for(i=0; i<photo_num; i++) {
            photo_id = "photo" + i;
            if (document.getElementById(photo_id) != null) {
                localStorage.setItem(photo_id, document.getElementById(photo_id).src);
                localStorage.setItem("x_" + photo_id, document.getElementById(photo_id).style.left);
                localStorage.setItem("y_" + photo_id, document.getElementById(photo_id).style.top);
            }
        }
    }
}

function clear_album() {
    for(i=0; i<photo_num; i++) {
        if (document.getElementById("photo" + i) != null)
            document.getElementById("album").removeChild(document.getElementById("photo" + i));
    }
    photo_num = 0;
}

function restore() {
    clear_album();
    var localStorage = window.localStorage;
    if (!localStorage) {
        // local storage is not supported by this browser.
        // do nothing
    }
    else {
        for(i=0; i<localStorage.length; i++) {
            key = localStorage.key(i);
            if (key.substring(0, 5) == "photo") post_photo(key);
        }
    }
}

function post_photo(id) {
    pic = document.createElement("img");
    pic.src = localStorage.getItem(id);
    pic.id = id;
    pic.style.cursor = "move";
    pic.onmousedown = start_move;
    pic.ondblclick = delete_photo;
    photo_num = Math.max(photo_num, parseInt(id.substring(5)) + 1);
    pic.style.width = "128px";
    pic.style.position = "absolute";
    pic.style.top = localStorage.getItem("y_" + id);
    pic.style.left = localStorage.getItem("x_" + id);
    document.getElementById("album").appendChild(pic);
}

// 412쪽 1번째 박스 코드 
document.getElementById("album").ondragstart = album_dragstart;
document.getElementById("album").ondragover = album_dragover;
document.getElementById("album").ondrag = album_dragover;
document.getElementById("album").ondrop = album_drop;
