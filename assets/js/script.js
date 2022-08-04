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
const $returnButton = document.querySelector("#return-button");
const $submitScoreForm = document.querySelector("#submit-score-form");

let gamePlaying = false;
let questionIndex = 0;
let currentQuestion = 0;

const timerMax = 30;
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
    console.log("Score: "+timer);
    playersScore = timer;
    let $yourScore = document.createElement("h2");

    $yourScore.textContent = "Your score was "+playersScore;
    $scoreInfoContainer.innerHTML = "";
    $scoreInfoContainer.appendChild($yourScore);

    highScoreTable();

    gamePlaying = false;
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
            timer -= incorrectPenalty;
            if (timer < 0) {
                timer = 0;
                $timerBar.style.width = "0%";
                endGame();
            }
            $timerBar.style.width = ((timer/timerMax)*100) + "%";   
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

    $scores.style.display = "none";
    $quiz.style.display = "block";   
    $timerBar.style.width = "100%"; 

}


displayQuestion(defaultQuestion);
$scores.style.display = "none";
$submitScoreForm.style.display = "none";
console.log($scores);


$answerButtons.addEventListener("click",getClickedAnswer);
$startButton.addEventListener("click",startGame);

$returnButton.addEventListener("click",returnToGame);
$submitScoreForm.addEventListener("submit",addNewHighScore);
//BUGS 
//YOU CAN ANSWER LAST QUESTION WITH ANYTHING AND IT RETURNS AS IF ITS CORRECT