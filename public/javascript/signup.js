async function signupFormHandler(event) {

    event.preventDefault();

    // console.log("button clicked!");

    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    const privacyPolicy = document.querySelector('#gridCheck').checked;

    if (!privacyPolicy) {
        alert("Please select that you've read and agree to our privacy policy!");
        return;
    };

    if (password.length < 4) {
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

        // check the response status
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);




