async function editFormHandler(event) {

    event.preventDefault();

    // console.log("button clicked!");

    const id = window.parent.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    console.log("id", id)

    const email = document.querySelector('input[email="email"]').value.trim();
    const password = document.querySelector('input[password="password"]').value.trim();


    if (!password) {
        alert("Please enter a new password!");
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
        // TODO: need to find a way to get user id for below...
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // console.log(response);

        // check the response status
        if (response.ok) {
            console.log("id", id)
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.edit-user-form').addEventListener('submit', editFormHandler);