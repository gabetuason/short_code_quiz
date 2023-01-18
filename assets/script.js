// ** Variables **

// Page Sections Elements
var startEl = document.getElementById("startingpage");
var questEl = document.getElementById("questionpage");
var finishEl = document.getElementById("finishpage");
var scoreEl = document.getElementById("leaderboardpage");

// 75-seconds of Time                                            
var countDown = 75;
var clock = document.querySelector("div.timer");

//Question text replacement
var placequestion = document.getElementById("getquestion");

//Multiple choice buttons
var bttnall = document.querySelectorAll(".bttnall"); // in HTML document select all classes with bttnall
var bttnA = document.querySelector("#choice1");
var bttnB = document.querySelector("#choice2");
var bttnC = document.querySelector("#choice3");
var bttnD = document.querySelector("#choice4");

// Other buttons
var bttnScore = document.querySelector("#viewscores");
var bttnSubmit = document.querySelector("#submitbutton");
var bttnBack = document.querySelector("#back");
var bttnClear = document.querySelector("#clearall");

// Start button and back button
var bttnStart = document.getElementById("startbutton");
var bttnBack = document.getElementById("back");

// Scoring points and leaderboard
var userScore = 0;
var playerName = document.querySelector("#userName");
var quizScore = document.querySelector("#quizscore"); // Points are awarded for questions correct and it is shown in the finish page section
var scoreList = document.querySelector("#highscoreslist");


// ** Questions List **

// each question worth 10 points (total of 70 points)
// another array is nested for choices
// total of 7 questions (array: 0 - 6)
// each button has its own seperate value in HTML to match the answer
var questionsList = [
    {
        question: "In which part of the HTML metadata is contained?",
        choices: ["a) head tag", "b) title tag", "c) html tag", "d) body Tag"], answer: "0" //answer: a)
    },
    {
        question: "Which of the following HTML tag is used to create an unordered list.",
        choices: ["a) <ol>", "b) <ul>", "c) <li>", "d) <lol>"], answer: "1" //answer: b)
    },
    {
        question: "The following CSS property defines the different properties of all four sides of an element's border in a single declaration?",
        choices: ["a) border-collapse", "b) border-width", "c) padding", "d) border"], answer: "1" //answer: b)
    },
    {
        question: "Arrays in Javascript can be used to store...",
        choices: ["a) numbers and strings", "b) other arrays", "c) booleans", "d) all of the above"], answer: "3" //answer: d)
    },
    {
        question: "Which of the following is not an error in JavaScript ?",
        choices: ["a) Missing of Bracket", "b) Syntax error", "c) Division by zero", "d) Missing of semicolons"], answer: "2" //answer: c)
    },
    {
        question: "The following methods is used to access HTML elements using Javascript?",
        choices: ["a) getElementbyId()", "b) getElementsByClassName()", "c) Both A and B", "d) None of the above"], answer: "2" //answer: c) 
    },
    {
        question: "Javascript is an _____ language?",
        choices: ["a) Object-Oriented", "b) Object-Based", "c) Procedural", "d) None of the above"], answer: "0" //answer: a)
    },
];

// ** Functions **

// Function begin quiz and hide starting page *triggered by bttnStart*
function beginQuiz() {
    //question number 0 is first question in the array
    questionNumber = 0;
    userScore = 0;
    questEl.style.display = "block";
    startEl.style.display = "none";
    bttnScore.style.display = "none";
    insertQuestion(questionNumber);
    timeClock();
}

// Function for changing the textContent to the corresponding question from the array. Looks through the quizQuestion array *called by Function beginQuiz()*
function insertQuestion(i) {
    if (i < questionsList.length) {

        placequestion.textContent = questionsList[i].question;

        bttnA.textContent = questionsList[i].choices[0];

        bttnB.textContent = questionsList[i].choices[1];

        bttnC.textContent = questionsList[i].choices[2];

        bttnD.textContent = questionsList[i].choices[3];
    }
}
// Function to check multiple-choice answer if it's right or wrong
function validate(chosenAnswer) {
    chosenAnswer.preventDefault();
    bestAnswer = questionsList[questionNumber].answer;

    if (bestAnswer === chosenAnswer.target.value) {
        alert(" Correct answer! ")
        userScore++;

    } else if (bestAnswer !== chosenAnswer.target.value) {
        alert(" Wrong answer! Time is reduced by 10 seconds")
        // Time penalty. Reduce 10 seconds if wrong
        countDown = countDown - 10;
    }
    // Increment the points and cycle through the questions. 0 - 6 array (7 questions)
    if (questionNumber < questionsList.length) {
        questionNumber++;
    }
    insertQuestion(questionNumber);
}

// Function for time. *called by Function beginQuiz()*
function timeClock() {
    var timerInterval = setInterval(function () {
        countDown--;
        clock.textContent = `Time: ${countDown}`;

        // if (countdown is less than zero) or (question number is equivalent to the questions length or countdown hits zero) call endquiz and clearinterval
        if ((countDown < 0) || (questionNumber === questionsList.length || countDown === 0)) {
            endquiz();
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Function section page for finish quiz (end)
function endquiz() {
    countDown = 0;
    clock.textContent = `Time: ${countDown}`; // Time display
    scoreEl.style.display = "none";
    points = userScore * 10; // 10 points per question
    questEl.style.display = "none";
    finishEl.style.display = "block";
    quizScore.textContent = points + " points";
    playerName.value = "";
}
// Function for submitting score
function submitScore() {
    if (playerName.value === "") {
        alert("Please enter initials/name to save score");
        return false;
    } else {
        var scoreData = JSON.parse(localStorage.getItem("scoreData")) || []; // parses a string and returns a JavaScript object
        var newPlayer = playerName.value.trim(); // remove space
        var newScore = { score: points, name: newPlayer }; // score object
    }
    scoreData.push(newScore);
    scoreData.sort((a, b) => b.score - a.score); // sorting score

    //Show only 10 users in 
    scoreData.splice(10);

    localStorage.setItem("scoreData", JSON.stringify(scoreData));
    viewLeaderboard();
}

// Function section page for viewing leaderboard
function viewLeaderboard() {
    var highScores = JSON.parse(localStorage.getItem("scoreData")) || [];
    scoreList.innerHTML = highScores.map(score => {
        return `<li class="topusers">${score.name} - ${score.score} points </li>`;
    }).join("");

    scoreEl.style.display = "block";
    finishEl.style.display = "none";
    startEl.style.display = "none";
}

// Function go back 
function goback() {
    countDown = 75;
    scoreEl.style.display = "none";
    startEl.style.display = "block";
    bttnScore.style.display = "block";
    clock.textContent = `Time: ${countDown}`;
}
// Function clearing score
function clearScore() {
    window.localStorage.clear();
    scoreList.innerHTML = "";
}


// Event Listeners------------------------------------------------------------------
//when button click begin function beginQuiz()
bttnStart.addEventListener("click", beginQuiz);

bttnall.forEach(item => { item.addEventListener("click", validate); });

bttnSubmit.addEventListener("click", submitScore);

bttnScore.addEventListener("click", viewLeaderboard);

bttnBack.addEventListener("click", goback);

bttnClear.addEventListener("click", clearScore);
