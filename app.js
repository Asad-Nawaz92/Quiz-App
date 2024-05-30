function signup() {
  var nameInput = document.getElementById("signup-name");
  var emailInput = document.getElementById("signup-email");
  var passwordInput = document.getElementById("signup-pass");
  var confirmpasswordInput = document.getElementById("signup-confirm-pass");

  var name = nameInput.value;
  var email = emailInput.value;
  var password = passwordInput.value;
  var confirmPassword = confirmpasswordInput.value;

  if (password != confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Passwords do not match.'
    });
    return;
  }

  if (
    name === "" ||
    confirmPassword === "" ||
    email === "" ||
    password === ""
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all fields.'
    });
    return;
  }

  if (password.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password must be at least 6 characters long.'
    });
    return;
  }
  var usersJSON = localStorage.getItem("users");
  var users = usersJSON ? JSON.parse(usersJSON) : [];

  var existingUser = users.some(function (user) {
    return user.email === email;
  });

  if (existingUser) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'User with this email already exists. Please Login.'
    }).then(() => {
      location.href = "./signin.html";
    });
    return;
  }

  var newUser = {
    email: email,
    password: password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  location.href = "./signin.html";
}

function signin() {
  var emailInput = document.getElementById("signin-email");
  var passwordInput = document.getElementById("signin-pass");
  var email = emailInput.value;
  var password = passwordInput.value;

  var usersJSON = localStorage.getItem("users");
  var users = usersJSON ? JSON.parse(usersJSON) : [];

  var user = users.find(function (e) {
    return e.email === email && e.password === password;
  });

  if (user) {
    location.href = "./welcome.html";
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid email or password. Please try again.'
    }).then(() => {
      location.href = "./signin.html";
    });
  }
}
