var searchAllUsersEl = document.querySelector("#all-users")
var nameInputEl = document.querySelector("#first-name")
var usersContainerEl = document.querySelector("#users-container");
// var updateButtonEl = document.querySelector("#update-button")
var holeButtonsEl = document.querySelector("#hole-buttons")

function formSubmitHandler(event) {
    event.preventDefault();
    var name = nameInputEl.value.trim()

    if (name) {
        
        nameInputEl.value = "";
    } else {
        alert("Please enter your group members first name!")
    }
};

function buttonClickHandler(event) {
    var iframeContainerEl = document.createElement("div")
    console.log("iframe container element", iframeContainerEl)
    var name = event.target.getAttribute("id")
    console.log("name", name)
    // create an iframe element
    var iframeEL = document.getElementById("myframe")

    // set src attribute
    iframeEL.setAttribute("src", '../dashboard/' + name + '/')
    
    
    console.log(iframeEL)
    
    
};

function UpdateButtonClickHandler(event) {
    var iframeContainerEl = document.createElement("div")
    console.log("iframe container element", iframeContainerEl)
    var name = event.target.getAttribute("id")
    console.log("name", name)
    // create an iframe element
    var iframeEL = document.getElementById("myframe")

    // set src attribute
    iframeEL.setAttribute("src", '../dashboard/edit' + name + '/')
    
    
    console.log(iframeEL)
}



searchAllUsersEl.addEventListener("click", buttonClickHandler)
// updateButtonEl.addEventListener('click', buttonClickHandler)
holeButtonsEl.addEventListener("click", buttonClickHandler);
