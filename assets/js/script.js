const questions = [
    {
        question : "select B",
        answerA : "this is A",
        answerB : "this is B",
        answerC : "this is C",
        answerD : "this is D",
        correctAnswer : "B"
    },
    {
        question : "select C",
        answerA : "this is A",
        answerB : "this is B",
        answerC : "this is C",
        answerD : "this is D",
        correctAnswer : "C"
    },
    {
        question : "select A",
        answerA : "this is A",
        answerB : "this is B",
        answerC : "this is C",
        answerD : "this is D",
        correctAnswer : "A"
    },
    {
        question : "select B",
        answerA : "this is A",
        answerB : "this is B",
        answerC : "this is C",
        answerD : "this is D",
        correctAnswer : "B"
    },
    {
        question : "select D",
        answerA : "this is A",
        answerB : "this is B",
        answerC : "this is C",
        answerD : "this is D",
        correctAnswer : "D"
    }
];

const defaultQuestion = {
    question : "Click Start to Begin",
    answerA : "-",
    answerB : "-",
    answerC : "-",
    answerD : "-",
    correctAnswer : "D"
}

const $answerButtons = document.querySelector("#answer-buttons");
const $startButton = document.querySelector("#start-button");
const $timerBar = document.querySelector(".timer");
const $quiz = document.querySelector(".quiz");
const $scores = document.querySelector(".high-scores");
const $returnButton = document.querySelector("#return-form")

let gamePlaying = false;
let questionIndex = 0;
let currentQuestion = 0;

const timerMax = 10;
let timer = timerMax;
let startTimer = null;

let highScore = 0;
if (localStorage.getItem("highScore")) {
    highScore = localStorage.getItem("highScore");
    console.log ("highscore   " +highScore);
}

const startGame = function(){
    if (!gamePlaying) {
        gamePlaying = true;
        questionIndex = 0;
        currentQuestion = questions[questionIndex];
        displayQuestion(currentQuestion);
        timer = timerMax;
        $timerBar.style.width = ((timer/timerMax)*100) + "%";
        startTimer = setInterval(lowerTimer, 1000);
    }
    else {
        endGame();
    }
}

const lowerTimer = function(){
    if (timer > 0){
        timer --;
        $timerBar.style.width = ((timer/timerMax)*100) + "%";
    }
    if (timer === 0)
    {
        endGame();
    }
    
}

const endGame = function() {
    let $scoreInfoContainer = document.querySelector(".score-info-container");
    console.log("Score: "+timer);
    let score = timer;
    let $yourScore = document.createElement("h2");
    let $highScore = document.createElement("h2");
    $yourScore.textContent = "Your score was "+score+ " based on your remaining time";
    $highScore.textContent = "The highscore is "+ highScore + " set by NULL";
    $scoreInfoContainer.innerHTML = "";

    $scoreInfoContainer.appendChild($yourScore);
    $scoreInfoContainer.appendChild($highScore);

    if (score > highScore)
    {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }


    gamePlaying = false;
    displayQuestion(defaultQuestion);
    
    $scores.style.display = "block";
    $quiz.style.display = "none"; 
    
    

    clearInterval(startTimer);

}

displayQuestion = function(currentQuestion){
let $question = document.querySelector("#question");
let $answerA = document.querySelector("#answer-a");
let $answerB = document.querySelector("#answer-b");
let $answerC = document.querySelector("#answer-c");
let $answerD = document.querySelector("#answer-d");

$question.textContent = currentQuestion.question;
$answerA.textContent = currentQuestion.answerA;
$answerB.textContent = currentQuestion.answerB;
$answerC.textContent = currentQuestion.answerC;
$answerD.textContent = currentQuestion.answerD;
}

answerQuestion = function(selectedAnswer) {
    
    if (selectedAnswer === questions[questionIndex].correctAnswer) {
        console.log ("correct!");
        if (questionIndex < questions.length-1) {
            questionIndex ++;
            displayQuestion(questions[questionIndex]);    
        } 
        else
        {
            endGame();
        }
    }
    else {
        console.log ("incorrect!");
        if (questionIndex < questions.length-1) {
            timer -= 30;
            if (timer < 0) {
                timer = 0;
                $timerBar.style.width = "0%";
                endGame();
            }
            $timerBar.style.width = ((timer/timerMax)*100) + "%";
            // questionIndex ++;
            // displayQuestion(questions[questionIndex]);    
        }
        else {
            endGame();
        }
    }
}

const getClickedAnswer = function(event){
    let $target = event.target;
    if (gamePlaying) {
        if ($target.matches("#answer-a")){
            answerQuestion("A");
        }
        if ($target.matches("#answer-b")){
            answerQuestion("B");
        }
        if ($target.matches("#answer-c")){
            answerQuestion("C");
        }
        if ($target.matches("#answer-d")){
            answerQuestion("D");
        }
    }
}

const returnToGame = function(event) {
    event.preventDefault();
    $scores.style.display = "none";
    $quiz.style.display = "block";   
    $timerBar.style.width = "100%"; 

}


displayQuestion(defaultQuestion);
$scores.style.display = "none";
console.log($scores);


$answerButtons.addEventListener("click",getClickedAnswer);
$startButton.addEventListener("click",startGame);
$returnButton.addEventListener("submit",returnToGame);