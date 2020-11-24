/*const  pinSeed= {
   
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

    if (response.ok) {
        newLogHandler();
    } else {
        alert(response.statusText);
    }

};*/

async function newPinHandler (event) {
    event.preventDefault();

    const city = document.querySelector('input[name="pin-city"]').value;
    const lat = document.querySelector('input[name="pin-lat"]').value;
    const lon = document.querySelector('input[name="pin-lon"]').value;  


    const response = await fetch(`/api/pins`, {
        method: 'POST',
        body: JSON.stringify({
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



document.querySelector('.new-pin-form').addEventListener('submit', newPinHandler);

  