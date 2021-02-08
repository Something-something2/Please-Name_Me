async function signupFormHandler(event) {
    event.preventDefault();
    // getting data from the form
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector("#password-signup").value.trim();

  // Confirm login credentials with database
  console.log(username, email, password)
    if (username && password) {
      const response = await fetch("api/users", {
        method: "post",
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { "Content-Type": "application/json" },
      });
      // check the response status, redirect to dashboard after

      if (response.ok) {
        console.log("success");
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);