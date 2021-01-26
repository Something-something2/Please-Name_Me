async function editFormHandler(event) {
    event.preventDefault();

    const id = window.parent.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    console.log("id", id)
    const first_name = document.querySelector('input[name="first-name"]').value.trim();
    const last_name = document.querySelector('input[name="last-name"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const group_id = document.querySelector('select[name="group-id"]').value.trim();

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            // username,
            first_name,
            last_name,
            phone,
            email,
            group_id
      
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("id", id)
    if (response.ok) {
        document.location.replace('/dashboard');
        
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-user-form').addEventListener('submit', editFormHandler);
