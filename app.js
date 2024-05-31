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

function logOut() {
  location.href = "./signin.html";
}

// QUIZ APP

var questions = [
  {
    question: "What does HTML stand for?",
    options: [
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyperlinking Text Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
    ],
  },
  {
    question: "What is the purpose of the 'alt' attribute in an <img> tag?",
    options: [
      { text: "To provide a URL for the image", correct: false },
      { text: "To specify the height of the image", correct: false },
      { text: "To define an alternate text for an image", correct: true },
      { text: "To specify the width of the image", correct: false },
    ],
  },
  {
    question: "Which HTML element is used to define the title of a document?",
    options: [
      { text: "head", correct: false },
      { text: "meta", correct: false },
      { text: "title", correct: true },
      { text: "body", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    options: [
      { text: "Colorful Style Sheets", correct: false },
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
    ],
  },
  {
    question: "How do you add a background color for all h1 elements in CSS?",
    options: [
      { text: "h1 {background-color: blue;}", correct: true },
      { text: "h1 {bgcolor: blue;}", correct: false },
      { text: "h1.all {background-color: blue;}", correct: false },
      { text: "h1 {background: blue;}", correct: false },
    ],
  },
  // {
  //   question: "Which CSS property controls the text size?",
  //   options: [
  //     { text: "font-style", correct: false },
  //     { text: "text-size", correct: false },
  //     { text: "font-size", correct: true },
  //     { text: "text-style", correct: false },
  //   ],
  // },
  // {
  //   question:
  //     "How do you make each word in a text start with a capital letter in CSS?",
  //   options: [
  //     { text: "text-transform: uppercase;", correct: false },
  //     { text: "text-transform: capitalize;", correct: true },
  //     { text: "transform: capitalize;", correct: false },
  //     { text: "capitalize: text-transform;", correct: false },
  //   ],
  // },
  // {
  //   question:
  //     "What is the correct CSS syntax to change the font of an element?",
  //   options: [
  //     { text: "font: 'Times New Roman';", correct: false },
  //     { text: "font-face: 'Times New Roman';", correct: false },
  //     { text: "fontname: 'Times New Roman';", correct: false },
  //     { text: "font-family: 'Times New Roman';", correct: true },
  //   ],
  // },
  // {
  //   question:
  //     "How can you make a list that lists its items with squares in CSS?",
  //   options: [
  //     { text: "list-style-type: square;", correct: true },
  //     { text: "list-type: square;", correct: false },
  //     { text: "list: square;", correct: false },
  //     { text: "list-style: square;", correct: false },
  //   ],
  // },
  // {
  //   question:
  //     "Which property is used to change the left margin of an element in CSS?",
  //   options: [
  //     { text: "padding-left", correct: false },
  //     { text: "margin-left", correct: true },
  //     { text: "indent-left", correct: false },
  //     { text: "spacing-left", correct: false },
  //   ],
  // },
  // {
  //   question:
  //     "What does JavaScript primarily use to interact with HTML elements?",
  //   options: [
  //     { text: "Classes", correct: false },
  //     { text: "Events", correct: false },
  //     { text: "DOM (Document Object Model)", correct: true },
  //     { text: "Styles", correct: false },
  //   ],
  // },
  // {
  //   question:
  //     "How do you write 'Hello World' in an alert box using JavaScript?",
  //   options: [
  //     { text: "msg('Hello World');", correct: false },
  //     { text: "alert('Hello World');", correct: true },
  //     { text: "alertBox('Hello World');", correct: false },
  //     { text: "msgBox('Hello World');", correct: false },
  //   ],
  // },
  // {
  //   question: "How do you create a function in JavaScript?",
  //   options: [
  //     { text: "function myFunction()", correct: true },
  //     { text: "function:myFunction()", correct: false },
  //     { text: "create function myFunction()", correct: false },
  //     { text: "def myFunction()", correct: false },
  //   ],
  // },
  // {
  //   question: "How do you call a function named 'myFunction' in JavaScript?",
  //   options: [
  //     { text: "call function myFunction()", correct: false },
  //     { text: "call myFunction()", correct: false },
  //     { text: "myFunction()", correct: true },
  //     { text: "invoke myFunction()", correct: false },
  //   ],
  // },
  // {
  //   question: "How can you add a comment in JavaScript?",
  //   options: [
  //     { text: "!--This is a comment--", correct: false },
  //     { text: "'This is a comment'", correct: false },
  //     { text: "/* This is a comment */", correct: false },
  //     { text: "//This is a comment", correct: true },
  //   ],
  // },
  // {
  //   question: "Which event occurs when the user clicks on an HTML element?",
  //   options: [
  //     { text: "onchange", correct: false },
  //     { text: "onclick", correct: true },
  //     { text: "onmouseclick", correct: false },
  //     { text: "onmouseover", correct: false },
  //   ],
  // },
  // {
  //   question: "How do you declare a JavaScript variable?",
  //   options: [
  //     { text: "var carName;", correct: true },
  //     { text: "variable carName;", correct: false },
  //     { text: "v carName;", correct: false },
  //     { text: "var: carName;", correct: false },
  //   ],
  // },
  // {
  //   question:
  //     "Which operator is used to assign a value to a variable in JavaScript?",
  //   options: [
  //     { text: "*", correct: false },
  //     { text: "=", correct: true },
  //     { text: "-", correct: false },
  //     { text: "+", correct: false },
  //   ],
  // },
  // {
  //   question: "What will the following code return: Boolean(10 > 9)?",
  //   options: [
  //     { text: "false", correct: false },
  //     { text: "NaN", correct: false },
  //     { text: "true", correct: true },
  //     { text: "undefined", correct: false },
  //   ],
  // },
  // {
  //   question: "Is JavaScript case-sensitive?",
  //   options: [
  //     { text: "Yes", correct: true },
  //     { text: "No", correct: false },
  //     { text: "Sometimes", correct: false },
  //     { text: "Only for strings", correct: false },
  //   ],
  // },
  // {
  //   question:
  //     "Which of the following is a correct way to create an array in JavaScript?",
  //   options: [
  //     { text: "var colors = 'red', 'green', 'blue';", correct: false },
  //     { text: "var colors = ['red', 'green', 'blue'];", correct: true },
  //     { text: "var colors = (1:'red', 2:'green', 3:'blue');", correct: false },
  //     { text: "var colors = {'red', 'green', 'blue'};", correct: false },
  //   ],
  // },
  // {
  //   question:
  //     "How do you round the number 7.25 to the nearest integer in JavaScript?",
  //   options: [
  //     { text: "Math.rnd(7.25)", correct: false },
  //     { text: "round(7.25)", correct: false },
  //     { text: "Math.floor(7.25)", correct: false },
  //     { text: "Math.round(7.25)", correct: true },
  //   ],
  // },
  // {
  //   question:
  //     "How do you find the number with the highest value of x and y in JavaScript?",
  //   options: [
  //     { text: "ceil(x, y)", correct: false },
  //     { text: "Math.ceil(x, y)", correct: false },
  //     { text: "Math.max(x, y)", correct: true },
  //     { text: "Math.maxValue(x, y)", correct: false },
  //   ],
  // },
  // {
  //   question: "How do you find the length of an array in JavaScript?",
  //   options: [
  //     { text: "arr.len", correct: false },
  //     { text: "arr.length", correct: true },
  //     { text: "arr.size", correct: false },
  //     { text: "arr.count", correct: false },
  //   ],
  // },
];

var questionEl = document.getElementById("question");
var optionBtn = document.getElementById("options-btn");
var nextBtn = document.getElementById("nxt-btn");
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start-btn");
var appEl = document.querySelector(".app");
var descPara = document.querySelector(".description");
var logoutBtn = document.querySelector(".logout-btn");

var currentQuestionIndex = 0;
var userScore = 0;
var timeLeft = 600;
var timer;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  timerEl.style.display = "block";
  logoutBtn.style.display = "none";
  descPara.style.display = "none";
  startBtn.style.display = "none";
  appEl.style.display = "block";
  currentQuestionIndex = 0;
  userScore = 0;
  nextBtn.innerHTML = "Next";
  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}

function updateTimerDisplay() {
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;
  timerEl.innerHTML = `Time left: ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function showQuestion() {
  resetState();
  var currentQuestion = questions[currentQuestionIndex];
  var questionNo = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.options.forEach((option) => {
    var button = document.createElement("button");
    button.innerHTML = option.text;
    button.classList.add("btn");
    optionBtn.appendChild(button);
    if (option.correct) {
      button.dataset.correct = option.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (optionBtn.firstChild) {
    optionBtn.removeChild(optionBtn.firstChild);
  }
}

function selectAnswer(e) {
  var selectedBtn = e.target;
  var isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    userScore++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(optionBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionEl.innerHTML = `You scored ${userScore} out of ${questions.length}!`;
  nextBtn.innerHTML = "Start Again";
  nextBtn.style.display = "block";
  timerEl.style.display = "none";
}

function nextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    nextButton();
  } else {
    startQuiz();
    clearInterval(timer);
    timeLeft = 601;
  }
});
