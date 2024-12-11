// if mobile device, increase font size
var str = navigator.userAgent;
var device = "";
if (str.match(/(ipad)|(iphone)|(ipod)|(android)|(webos)/i))
    device = "mobileDevice";
else
    device = "desktopPC";

if (device == "mobileDevice") {
    document.body.style.fontSize = "150%";
    document.getElementById("dup_check").style.fontSize = "120%";
    document.getElementById("signup_button").style.fontSize = "120%";
    document.getElementById("reset2").style.fontSize = "120%";
}
 
// 비활성화 되어 있는 버튼 활성화. 중복 체크, 회원 가입 버튼
document.getElementById("dup_check").removeAttribute("disabled");
document.getElementById("signup_button").removeAttribute("disabled");

// 중복 체크, 회원 가입 버튼에 이벤트 핸들러 연결
document.getElementById("dup_check").onclick = duplicationCheck;
document.getElementById("signup_button").onclick = signup;

// 중복 확인 함수 정의
function duplicationCheck() {
    username_in = document.getElementById("username2").value;

    var localStorage = window.localStorage;
    if (!localStorage) {
        // local storage is not supported by this browser.
        // do nothing
    }
    else {
        numUsers = localStorage.numUsers;

		// 406쪽 소스 코드 참고 35~44줄 실습: 중복 확인 코드 작성
			var duplicate = false;
			if (numUsers != undefined) {
				for(i=0;i<numUsers;i++) {
					username = localStorage["user"+i];
				if (username == username_in) {
					duplicate = true;
					break;
				}
			}
		}
           // 여기까지 
 
        if (duplicate)
            alert(username_in + " is duplicate username. Please enter diffrent one.");
        else
            alert("You can use " + username_in + " as a username.");
    }
}

// 회원 가입 함수 정의 (408쪽 참고)
function signup() {
    username_in = document.getElementById("username2").value;
    password_in1 = document.getElementById("pass1").value;

if (username_in=="" ||password_in1=="")
{
	alert("아이디 또는 비밀번호를 입력하시오."); return;
	
}
    var localStorage = window.localStorage;
    if (!localStorage) {
        // local storage is not supported by this browser.
        // do nothing
    }
    else {
		
        numUsers = localStorage.numUsers;
        if (numUsers == undefined) numUsers = "0";
		// 실습: 예제 14-6) 408쪽 14~15줄 : user1, pass1 와 같은 방법으로 ID와 PW 저장하기 
		localStorage["user"+numUsers] = username_in;
		localStorage["pass"+numUsers] = password_in1;

        localStorage.numUsers = parseInt(numUsers) + 1;
        alert("Signup succeeded!\n" + "Number of users: " + localStorage.numUsers);
    }
}