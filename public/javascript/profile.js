function editRedirectHandler(event) {

    event.preventDefault();
    // console.log("button clicked!");
    document.location.replace('/edit-profile');

};

document.querySelector('.user-profile').addEventListener('submit', editRedirectHandler);