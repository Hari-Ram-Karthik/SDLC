document.getElementById("signup").addEventListener("click", signupClick);
document.getElementById("login").addEventListener("click", loginClick);
let name_ = document.getElementById("name");
let mailId = document.getElementById("mailid");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmpassword");
let message;

/**
 *Function to login click
 */
async function loginClick() {
  window.location = parent.window.document.location.origin;
}

async function signupClick() {
  if (
    name_.value == "" ||
    mailId.value == "" ||
    password.value == "" ||
    confirmPassword.value == ""
  ) {
    alert("All fields are mandatory");
  } else {
    if (!mailId.value.match("[a-z0-9.]+@[a-z]+.[a-z]{2,3}")) {
      alert("Invalid mail id");
    } else {
      if (name_.value.length <= 3) {
        alert("Name should have atleast 4 characters");
      } else {
        if (password.value != confirmPassword.value) {
          alert("Password should match");
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = {
              Name: name_.value,
              Password: password.value,
              MailId:mailId.value,
            };
            raw = JSON.stringify(raw);
            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };
            await fetch("http://127.0.0.1:9000/newuser", requestOptions)
            .then((response) =>response.json())
            .then((result) => (message = result))
            .catch((error) => {
              alert("Error couldn't read data from glitch", error);
              //location.reload();
            });
              if(message==="ok"){
                window.localStorage.setItem("Username",name_.value);
                window.location = parent.window.document.location.origin;
              }
          }
        }
      }
    }
  }