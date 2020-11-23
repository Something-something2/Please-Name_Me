
async function editPinHandler() {


    const city = document.querySelector('input[city="city"]').value.trim();
    const lat = document.querySelector('input[latitude="latitude"]').value.trim();
    const lon = document.querySelector('input[name="longitude"]').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            id,
            city,
            lat,
            lon
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-pin-form').addEventListener('submit', getUserProfile);