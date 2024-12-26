let fname = document.getElementById("fullName");
let email = document.getElementById("email");
let password = document.getElementById("password");

let account = JSON.parse(localStorage.account);

let getInfo = function () {

    let accounttemp = {Fname:"", Email:"", Password: ""};
    if (fname != "") {
        accounttemp.Fname = fname.value;
    }

    if (email != "") {
        accounttemp.Email = email.value;
    }

    if (password != "") {
        accounttemp.Password = password.value;
    }

    account = accounttemp;
    localStorage.setItem("account", JSON.stringify(account));
}

let ShowAccountInfo = function () {

    fname.value = account.Fname;
    email.value = account.Email;
    password.value = account.Password;
}
ShowAccountInfo();