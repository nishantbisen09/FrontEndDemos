var validate = () => {
    var username = document.forms["sign-up"]["username"].value;
    var password = document.forms["sign-up"]["password"].value;

    if (username == "" || password == "") {        
        document.getElementById('blank').style.display = "block";
        setInterval(() => {
            document.getElementById('blank').style.display = "none";
        }, 4000);
    }else if(username == "nishant" && password == "nishant"){
        window.location = "home.html"
    }else{
        document.getElementById('incorrect').style.display = "block";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        setInterval(() => {
            document.getElementById('incorrect').style.display = "none";
        }, 4000);
    }

    
}
