async function deletePinHandler(event) {
    event.preventDefault();


    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(id);

    const response = await fetch(`/api/pins/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.ok) {
        document.location.replace('/profile/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-pin-btn').addEventListener('click', deletePinHandler);