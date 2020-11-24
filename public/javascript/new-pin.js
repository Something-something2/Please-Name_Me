function newPinForm(event) {
    event.preventDefault();
    document.location.replace("/add-pin")
};

function editFormHandler(event) {
    event.preventDefault();
    document.location.replace("/edit-user")
};


document.getElementById("add-pin").addEventListener("click", newPinForm)

document.getElementById("edit-user").addEventListener("click", editFormHandler)