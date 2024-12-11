// 전역 변수 선언하기 
var device;
var drawing = false;
var canvas;
var context;
var rect;
  
// 예제 14-9) 초기화 함수 
function initialize() {
    context.clearRect(0,0,580,450);
    context.beginPath();
    context.rect(0,0,580,450);
    context.strokeStyle = "silver";
    context.fillStyle = "LightGoldenrodYellow";
    context.fill();

    context.lineWidth = 0.5;
    for(i=1;i<=8;i++) {
        context.moveTo(5,i*50);
        context.lineTo(575, i*50);
    }
    context.stroke();
}

// 예제 14-9) 그리기 시작 함수 
function startDrawing() {
    if (device == "moblieDevice") event.preventDefault();
    event.preventDefault();
    drawing = true;
    context.beginPath();
    context.strokeStyle = "dimgray";
    context.lineWidth = 1;
    context.arc(event.clientX - rect.left, event.clientY - rect.top, 3, 0, 2*Math.PI)
    context.stroke();
    context.fillStyle = "dimgray";
    context.fill();
    context.closePath();

    context.beginPath();
    context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    context.lineCap = "round";
    context.lineWidth = 6;
}

// 예제 14-9) 그리기 중간(진행) 함수 
function keepDrawing() {
    if (drawing) {
        var x,y;
        if (device == "mobileDevice") {
            x = event.targetTouches[0].pageX;
            y = event.targetTouches[0].pageY;
        }
        else {
            x = event.clientX;
            y = event.clientY;
        }
        context.lineTo(x - rect.left, y - rect.top);
        context.stroke();
    }
}

// 예제 14-9) 그리기 멈춤 함수 
function stopDrawing() {
    if (drawing) {
        context.stroke();
        drawing = false;
    }
}



function save() {
	var localStorage = window.localStorage;

    if (!localStorage) {
        // local storage is not supported by this browser.
        // do nothing
    }
    else {
		// 캔버스(canvas)에 저장된 내용을 URL로 변환한 후에 localStorage에 canvas 키로 저장
		// toDataURL() 메소드 이용
        localStorage.canvas = canvas.toDataURL();
    }
}

function restore() {
	var localStorage = window.localStorage;
    if (!localStorage) {
        // local storage is not supported by this browser.
        // do nothing
    }
    else {
		// localStorage에 저장된 canvas 값을 읽어와서 그림으로 화면에 표시
        var img = new Image();
        img.src = localStorage.canvas;
        img.onload = function() {
            context.drawImage(img, 0, 0);
        }
    }
}

function getDeviceType() {
    var str = navigator.userAgent;
    if (str.match(/(ipad)|(iphone)|(ipod)|(android)|(webos)/i))
        device = "mobileDevice";
    else
        device = "desktopPC";
}

function startMemo() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d"); 
    rect = canvas.getBoundingClientRect();
    initialize();
}

getDeviceType();
document.body.onload = startMemo;

dom = document.getElementById("myCanvas");

// for desktop PC
dom.ontouchstart = startDrawing;
dom.ontouchmove = keepDrawing;
dom.ontouchend = stopDrawing;

// for mobile devices
dom.onmousedown = startDrawing;
dom.onmousemove = keepDrawing;
dom.onmouseup = stopDrawing;
