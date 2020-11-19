$('#submit').on('click', async function loginFormHandler(event) {
    event.preventDefault();

    console.log("button clicked!");

    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert("Incorrect email or password.  Please try again.");
        }
    }
})