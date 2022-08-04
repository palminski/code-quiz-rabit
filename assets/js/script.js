const questions = [
    {
        question : "What should you end all but the last cases in a switch case with?",
        answerA : "return;",
        answerB : "break;",
        answerC : "a semi-colon",
        answerD : "default:",
        correctAnswer : "B"
    },
    {
        question : "Which of these will set value to a random intiger from min to max?",
        answerA : "value = Math.floor(Math.random()*(max - min +1)+min)",
        answerB : "value = floor(Math.random()*(max - min +1)+min)",
        answerC : "value = Math.floor(random()*(max - min)+min)",
        answerD : "value = Math.floor(math.random()*(max - min +1))",
        correctAnswer : "A"
    },
    {
        question : "To make a new HTML element appear on the page you can use which of the following functions?",
        answerA : ".addChild()",
        answerB : ".pop()",
        answerC : ".appendChild()",
        answerD : ".push()",
        correctAnswer : "C"
    },
    {
        question : "if [0,1,2] === [0,1,2] was typed into the console, what would it return?",
        answerA : "array",
        answerB : "false",
        answerC : "undefined",
        answerD : "true",
        correctAnswer : "B"
    },
    {
        question : "if you wanted to turn the string 'intoanarray' into an array, which of the following could you use",
        answerA : "JSON.arrayify()",
        answerB : ".split(array)",
        answerC : "JSON.arrayify('')",
        answerD : ".split('')",
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
const $returnButton = document.querySelector("#return-button");
const $submitScoreForm = document.querySelector("#submit-score-form");

let gamePlaying = false;
let questionIndex = 0;
let currentQuestion = 0;

const timerMax = 60;
let timer = timerMax;
const incorrectPenalty = 5;
let playersScore = 0;

let startTimer = null;

let highScores = [  //This will store default highscores
    {
        initials: "WB",
        score: 5
    }
];
if (localStorage.getItem("highScores")) {
    let storedHighScores = localStorage.getItem("highScores");
    highScores = JSON.parse(storedHighScores);
}




const startGame = function(){
    if (!gamePlaying) {
        $startButton.textContent = "End Game";
        $startButton.style.backgroundColor = "#F09A9A";
        gamePlaying = true;
        questionIndex = 0;
        currentQuestion = questions[questionIndex];
        displayQuestion(currentQuestion);
        timer = timerMax;
        $timerBar.style.width = ((timer/timerMax)*100) + "%";
        startTimer = setInterval(lowerTimer, 1000);
    }
    else {
        timer = 0;
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
    let $endMessage = document.querySelector(".end-message");


    playersScore = timer;
    let $yourScore = document.createElement("h2");

    if (playersScore > 0) {
        $endMessage.textContent = "Congratulations! You have finished the quiz!";
    }
    else
    {
        $endMessage.textContent = "Game Over!";
    }
    $yourScore.textContent = "Your score was "+playersScore;
    $scoreInfoContainer.innerHTML = "";
    $scoreInfoContainer.appendChild($yourScore);

    highScoreTable();

    gamePlaying = false;
    $startButton.textContent = "Start Game";
        $startButton.style.backgroundColor = "";
    displayQuestion(defaultQuestion);

    $scores.style.display = "block";
    if ((highScores.length<10 || playersScore > highScores[highScores.length-1].score) && playersScore>0) {
        $submitScoreForm.style.display = "block";
    }
    $quiz.style.display = "none"; 

    clearInterval(startTimer);

}

const highScoreTable = function() {
    let $highScoreTable = document.querySelector(".high-score-table");
    highScores.sort(function(a,b){ // Sorts Array based on each objects score value going from largest to highest
        return b.score - a.score;
    })
    if (highScores.length > 10) {
        highScores.pop();
    }

    localStorage.setItem("highScores",JSON.stringify(highScores));
    $highScoreTable.innerHTML = "";
    for (i=0 ; i<10 ; i++){
        if (highScores[i]){
            let $highScoreEntry = document.createElement("li");
            $highScoreEntry.textContent = "initials: " + highScores[i].initials + " - Score: " + highScores[i].score; 
            $highScoreTable.appendChild($highScoreEntry);
        }
        else {
            let $highScoreEntry = document.createElement("li");
            $highScoreEntry.textContent = "-"; 
            $highScoreTable.appendChild($highScoreEntry);
        }
        
    }
    
}

const addNewHighScore = function(event) {
    event.preventDefault();

    let playersInitials = document.querySelector("input[name='players-name']").value;
    if (playersInitials){
        highScores.push({
            initials: playersInitials.substring(0,3).toUpperCase(),
            score: playersScore
        })
        $submitScoreForm.style.display = "none";
        highScoreTable();
    }
    
}

const displayQuestion = function(currentQuestion){
let $question = document.querySelector("#question");
let $answerA = document.querySelector("#answer-a");
let $answerB = document.querySelector("#answer-b");
let $answerC = document.querySelector("#answer-c");
let $answerD = document.querySelector("#answer-d");
let answerButtons = [$answerA,$answerB,$answerC,$answerD];
for (i=0;i<answerButtons.length;i++){
    answerButtons[i].style.backgroundColor = "";

}

$question.textContent = currentQuestion.question;
$answerA.textContent = currentQuestion.answerA;
$answerB.textContent = currentQuestion.answerB;
$answerC.textContent = currentQuestion.answerC;
$answerD.textContent = currentQuestion.answerD;

// let answerToAppend  = 1;
for (i=randomNumber(0,4); i < 4; i++) {

    switch (randomNumber(1,4)) {
        case 1:
            $answerButtons.appendChild($answerA);
            break;
        case 2:
            $answerButtons.appendChild($answerB);
            break;
        case 3:
            $answerButtons.appendChild($answerC);
            break;
        case 4:
            $answerButtons.appendChild($answerD);
            break;
            
        default:
    }
    
}

}

answerQuestion = function(selectedAnswer,clickedId) {
    
    let $clickedHTMLElement = document.querySelector(clickedId);

    if (selectedAnswer === questions[questionIndex].correctAnswer) {
        
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
        $clickedHTMLElement.style.backgroundColor = "#F09A9A";
        
        
            timer -= incorrectPenalty;
            if (timer < 0) {
                timer = 0;
                $timerBar.style.width = "0%";
                endGame();
            }
            $timerBar.style.width = ((timer/timerMax)*100) + "%";   
        
    }
}

const getClickedAnswer = function(event){
    let $target = event.target;
    if (gamePlaying) {
        if ($target.matches("#answer-a")){
            answerQuestion("A","#answer-a");
        }
        if ($target.matches("#answer-b")){
            answerQuestion("B","#answer-b");
        }
        if ($target.matches("#answer-c")){
            answerQuestion("C","#answer-c");
        }
        if ($target.matches("#answer-d")){
            answerQuestion("D","#answer-d");
        }
    }
}

let randomNumber = function (min, max) {
    let value = Math.floor(Math.random()*(max - min +1)+min);
    
    return value;
}

const returnToGame = function(event) {

    $scores.style.display = "none";
    $quiz.style.display = "block";   
    $timerBar.style.width = "100%"; 

}


displayQuestion(defaultQuestion);
$scores.style.display = "none";
$submitScoreForm.style.display = "none";



$answerButtons.addEventListener("click",getClickedAnswer);
$startButton.addEventListener("click",startGame);

$returnButton.addEventListener("click",returnToGame);
$submitScoreForm.addEventListener("submit",addNewHighScore);
