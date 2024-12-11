document.getElementById("login_button").removeAttribute("disabled");

document.getElementById("login_button").onclick = checkUser;
 
 
function checkUser() {
	
	username_in = document.getElementById("username").value;
	password_in = document.getElementById("password").value;

	

	var localStorage = window.localStorage;
		if (!localStorage) {
           }
    else {
		
		numUsers = localStorage.numUsers;
		
        var login_success = false; 
        if (numUsers != undefined) {
			
            for(i=0;i<numUsers;i++) {
				
				username = localStorage["user"+i];
				password = localStorage["pass"+i];
		
		
				if (username == username_in && password== password_in)
				{
					login_success = true;
					break;
				}			
			} 
        } 
 
 		
        if (login_success)
            alert("Login Success!");
        else
            alert("Username and password are not matched with our database!");
    } 
}
