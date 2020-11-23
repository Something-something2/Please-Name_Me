const  pinSeed= {
   
};

const  pinSeedJSON= {
    
};

const user_id = window.location.toString().split('?')[
    window.location.toString().split('?').length - 1
];

async function getUserProfile(event) {

    event.preventDefault();

    const response = await fetch(`/api/users/${user_id}`, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json'
        }
    });
    // console.log(response);

    let userLoginResponse = await response.json();
    // console.log(userLoginResponse);



};

async function newPinHandler() {

    
    const city_input = document.querySelector('#city').value.trim();
    const lat_input = document.querySelector('#lat').value.trim();
    const lon_input = document.querySelector('#lon').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            city_input,
            lat_input,
            lon_input
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#locBtn').addEventListener('submit', getUserProfile);

  