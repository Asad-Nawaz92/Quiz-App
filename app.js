// SIGN UP AND SIGN IN

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
      icon: "error",
      title: "Oops...",
      text: "Passwords do not match.",
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
      icon: "error",
      title: "Oops...",
      text: "Please fill in all fields.",
    });
    return;
  }

  if (password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password must be at least 6 characters long.",
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
      icon: "error",
      title: "Oops...",
      text: "User with this email already exists. Please Login.",
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
      icon: "error",
      title: "Oops...",
      text: "Invalid email or password. Please try again.",
    }).then(() => {
      location.href = "./signin.html";
    });
  }
}

// QUIZ APP

var questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyperlinking Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "What is the purpose of the 'alt' attribute in an <img> tag?",
    options: [
      "To define an alternate text for an image",
      "To provide a URL for the image",
      "To specify the height of the image",
      "To specify the width of the image",
    ],
    answer: "To define an alternate text for an image",
  },
  {
    question: "Which HTML element is used to define the title of a document?",
    options: ["<title>", "<head>", "<meta>", "<body>"],
    answer: "<title>",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "How do you add a background color for all <h1> elements in CSS?",
    options: [
      "h1 {background-color: blue;}",
      "h1 {bgcolor: blue;}",
      "h1.all {background-color: blue;}",
      "h1 {background: blue;}",
    ],
    answer: "h1 {background-color: blue;}",
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
  },
  {
    question:
      "How do you make each word in a text start with a capital letter in CSS?",
    options: [
      "text-transform: capitalize;",
      "text-transform: uppercase;",
      "transform: capitalize;",
      "capitalize: text-transform;",
    ],
    answer: "text-transform: capitalize;",
  },
  {
    question:
      "What is the correct CSS syntax to change the font of an element?",
    options: [
      "font: 'Times New Roman';",
      "font-family: 'Times New Roman';",
      "font-face: 'Times New Roman';",
      "fontname: 'Times New Roman';",
    ],
    answer: "font-family: 'Times New Roman';",
  },
  {
    question:
      "How can you make a list that lists its items with squares in CSS?",
    options: [
      "list-style-type: square;",
      "list-type: square;",
      "list: square;",
      "list-style: square;",
    ],
    answer: "list-style-type: square;",
  },
  {
    question:
      "Which property is used to change the left margin of an element in CSS?",
    options: ["padding-left", "margin-left", "indent-left", "spacing-left"],
    answer: "margin-left",
  },
  {
    question:
      "What does JavaScript primarily use to interact with HTML elements?",
    options: ["Classes", "Events", "DOM (Document Object Model)", "Styles"],
    answer: "DOM (Document Object Model)",
  },
  {
    question:
      "How do you write 'Hello World' in an alert box using JavaScript?",
    options: [
      "msg('Hello World');",
      "alert('Hello World');",
      "alertBox('Hello World');",
      "msgBox('Hello World');",
    ],
    answer: "alert('Hello World');",
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunction()",
      "function:myFunction()",
      "create function myFunction()",
      "def myFunction()",
    ],
    answer: "function myFunction()",
  },
  {
    question: "How do you call a function named 'myFunction' in JavaScript?",
    options: [
      "call function myFunction()",
      "call myFunction()",
      "myFunction()",
      "invoke myFunction()",
    ],
    answer: "myFunction()",
  },
  {
    question: "How can you add a comment in JavaScript?",
    options: [
      "<!--This is a comment-->",
      "//This is a comment",
      "'This is a comment",
      "/* This is a comment */",
    ],
    answer: "//This is a comment",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
    answer: "onclick",
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: [
      "var carName;",
      "variable carName;",
      "v carName;",
      "var: carName;",
    ],
    answer: "var carName;",
  },
  {
    question:
      "Which operator is used to assign a value to a variable in JavaScript?",
    options: ["*", "=", "-", "+"],
    answer: "=",
  },
  {
    question: "What will the following code return: Boolean(10 > 9)?",
    options: ["true", "false", "NaN", "undefined"],
    answer: "true",
  },
  {
    question: "Is JavaScript case-sensitive?",
    options: ["Yes", "No", "Sometimes", "Only for strings"],
    answer: "Yes",
  },
  {
    question:
      "Which of the following is a correct way to create an array in JavaScript?",
    options: [
      "var colors = 'red', 'green', 'blue';",
      "var colors = ['red', 'green', 'blue'];",
      "var colors = (1:'red', 2:'green', 3:'blue');",
      "var colors = {'red', 'green', 'blue'};",
    ],
    answer: "var colors = ['red', 'green', 'blue'];",
  },
  {
    question:
      "How do you round the number 7.25 to the nearest integer in JavaScript?",
    options: [
      "Math.rnd(7.25)",
      "round(7.25)",
      "Math.round(7.25)",
      "Math.floor(7.25)",
    ],
    answer: "Math.round(7.25)",
  },
  {
    question:
      "How do you find the number with the highest value of x and y in JavaScript?",
    options: [
      "Math.max(x, y)",
      "ceil(x, y)",
      "Math.ceil(x, y)",
      "Math.maxValue(x, y)",
    ],
    answer: "Math.max(x, y)",
  },
  {
    question: "How do you find the length of an array in JavaScript?",
    options: ["arr.length", "arr.len", "arr.size", "arr.count"],
    answer: "arr.length",
  },
  {
    question:
      "Which built-in method returns the string representation of the number's value in JavaScript?",
    options: [
      "toString()",
      "valueOf()",
      "toLocaleString()",
      "toNumberString()",
    ],
    answer: "toString()",
  },
];

var questionEl = document.getElementById("question");
var optionBtn = document.getElementById("options-btn");
var nextBtn = document.getElementById("nxt-btn");

var currentQuestionIndex = 0;
var userScore = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

