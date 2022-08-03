
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
    }
];

const $answerButtons = document.querySelector("#answer-buttons");
const $startButton = document.querySelector("#start-button");

let gamePlaying = false;
let questionIndex = 0;
let currentQuestion = 0;

const startGame = function(){
    gamePlaying = true;
    currentQuestion = questions[questionIndex];
    displayQuestion(currentQuestion);
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
        while (questionIndex < questions.length-1) {
            questionIndex ++;
            displayQuestion(questions[questionIndex]);    
        } 
    }
    else {
        console.log ("incorrect!");
        while (questionIndex < questions.length-1) {
            questionIndex ++;
            displayQuestion(questions[questionIndex]);    
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

$answerButtons.addEventListener("click",getClickedAnswer);
$startButton.addEventListener("click",startGame);