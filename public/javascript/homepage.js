function loginFormHandler(event) {
    event.preventDefault();
    document.location.replace("/login")
};

function signupFormHandler(event) {
    event.preventDefault();
    document.location.replace("/signup")
};

document.getElementById("login").addEventListener("click", loginFormHandler)

document.getElementById("signup").addEventListener("click", signupFormHandler)
