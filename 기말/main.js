var str = navigator.userAgent;
var device = "";
if (str.match(/(ipad)|(iphone)|(ipod)|(android)|(webos)/i))
	device = "mobileDevice";
else
	device = "decktopPC";

if (device == "mobileDevice") {
	document.body.style.fontSize = "150%";
	document.getElementByTagName("nav")[0].style.fontSize = "120%";
}


document.getElementById("location").removeAttribute("disabled");
document.getElementById("save_favorite").removeAttribute("disabled");
document.getElementById("view_favorite").removeAttribute("disabled");
document.getElementById("album_btn").removeAttribute("disabled");
document.getElementById("memo").removeAttribute("disabled"); 


document.getElementById("location").onclick = showMap;
document.getElementById("save_favorite").onclick = saveFavorite;
document.getElementById("view_favorite").onclick = viewFavorite;
document.getElementById("album_btn").onclick = showAlbum;
document.getElementById("memo").onclick = memoCanvas;

function showMap() {
	dom = document.getElementsByName("display_area");
	dom[0].src = "show_map.html";
}

function saveFavorite() {
	dom = document.getElementsByName("display_area");
    dom[0].src = "save_favorite.html";
}

function viewFavorite() {
	dom = document.getElementsByName("display_area");
    dom[0].src = "view_favorite.html";
}

function showAlbum() {
	dom = document.getElementsByName("display_area");
    dom[0].src = "show_album.html";
}

function memoCanvas() {
    dom = document.getElementsByName("display_area");
    dom[0].src = "memo.html";
}
