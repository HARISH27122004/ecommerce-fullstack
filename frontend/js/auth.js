const registerPage = document.getElementById("registerPage");
const loginPage = document.getElementById("loginPage");
const loginEmail = document.getElementById("loginEmail")
const loginPassword = document.getElementById("loginPassword")
const registerName = document.getElementById("registerName")
const registerEmail = document.getElementById("registerEmail")
const registerPassword = document.getElementById("registerPassword")
const registerRole = document.getElementById("registerRole")

function registerBtn() {
  registerPage.style.display = "block"
  loginPage.style.display = "none"
}

function loginBtn() {
  registerPage.style.display = "none"
  loginPage.style.display = "block"
}

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:7700/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value,
        role: registerRole.value
      })
    })
    if (response.status === 200) {
      registerName.value = ""
      registerEmail.value = ""
      registerPassword.value = ""
      registerRole.value = "Customer"
      alert('Registered Successfull! You can now Login')
      const data = await response.json()
      console.log(data);
    } else {
      alert('Something went Wrong!!!')
    }
  }
  catch (e) {
    console.log(e);
  }
});


document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch('http://localhost:7700/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    })
  })
  const data = await response.json()
  console.log(data);
  if (response.status === 401) {
    alert("Invalid Credentials. Please try again!")
    return;
  }
  else {
    loginEmail.value = "";
    loginPassword.value = "";
    alert("Login Successfully")
    if (data.token) {
      localStorage.setItem("token", data.token);
      const userResponse = await fetch("http://localhost:7700/api/me", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      const userData = await userResponse.json();
      const role = userData.user?.role;
      if (role === "Admin") {
        window.location.href = "../html/admin.html";
      } else {
        window.location.href = "../html/index.html";
      }
    }
    console.log(data.token, response);
  }
})