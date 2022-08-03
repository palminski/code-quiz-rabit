
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
        answerA : "A",
        answerB : "B",
        answerC : "C",
        answerD : "D",
        correctAnswer : "C"
    },
    {
        question : "select A",
        answerA : "A",
        answerB : "B",
        answerC : "C",
        answerD : "D",
        correctAnswer : "A"
    },
    {
        question : "select B",
        answerA : "A",
        answerB : "B",
        answerC : "C",
        answerD : "D",
        correctAnswer : "B"
    },
    {
        question : "select D",
        answerA : "A",
        answerB : "B",
        answerC : "C",
        answerD : "D",
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

let gamePlaying = false;
let questionIndex = 0;
let currentQuestion = 0;

const timerMax = 10;
let timer = timerMax;
let startTimer = null;

const startGame = function(){
    if (!gamePlaying) {
        gamePlaying = true;
        questionIndex = 0;
        currentQuestion = questions[questionIndex];
        displayQuestion(currentQuestion);
        timer = timerMax;
        startTimer = setInterval(lowerTimer, 1000);
    }
}

const lowerTimer = function(){
    if (timer > 0){
        timer --;
        console.log(timer);
    }
    else {
        endGame();
    }
    
}

const endGame = function() {
    gamePlaying = false;
    displayQuestion(defaultQuestion);
    alert("You have Completed the quiz!");
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
    console.log(questionIndex);
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
            questionIndex ++;
            displayQuestion(questions[questionIndex]);    
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

displayQuestion(defaultQuestion);

$answerButtons.addEventListener("click",getClickedAnswer);
$startButton.addEventListener("click",startGame);