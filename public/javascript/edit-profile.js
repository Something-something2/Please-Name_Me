async function editFormHandler(event) {

    event.preventDefault();

    // console.log("button clicked!");

    const id = document.querySelector('#user_id').innerHTML.trim();
    // console.log(id);


    const first_name = document.querySelector('#inputFirstName').value.trim();
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    

    if (!password) {
        alert("Please enter a new password!");
        return;
    };

    if (password.length < 4) {
        // console.log(password.length);
        alert("Password must be longer than 4 characters.  Please try again.");
        return;
    };

    if (!first_name || !email || !password) {
        alert("Please make sure all of the fields are filled in!");
        return;
    };

    if (first_name && email && password) {
        // TODO: need to find a way to get user id for below...
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                first_name,
                email,
                password,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // console.log(response);

        // check the response status
        if (response.ok) {
            // console.log('success');
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#submit-edit-profile').addEventListener('click', editFormHandler);