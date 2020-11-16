const signupSeed = {
    username: "doggface420",
    email: "doggface420@gmail.com",
    password: "password",
};

const signupSeedJSON = {
    "username": "doggface420",
    "email": "doggface420@gmail.com",
    "password": "password",
};

async function signupFormHandler(event) {

    event.preventDefault();

    // console.log("button clicked!");

    
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
   

    const privacyPolicy = document.querySelector('#gridCheck');
    // console.log(privacyPolicy.checked);

    if (!privacyPolicy.checked) {
        alert("Please select that you've read and agree to our privacy policy!");
        return;
    };

    if (password.length < 4) {
        // console.log(password.length);
        alert("Password must be longer than 4 characters.  Please try again.");
        return;
    };

    if (!email || !password) {
        alert("Please make sure all of the fields are filled in!");
        return;
    };




    if (email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
                
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // console.log(response);

        // check the response status
        if (response.ok) {
            // console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};





document.querySelector('#modalRegisterForm').addEventListener('submit', signupFormHandler);