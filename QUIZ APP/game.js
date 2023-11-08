
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// const questionCounterText = document.getElementById('questionCounter');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false ;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question : "김구이가 가장 좋아하는 베스킨라빈스 메뉴는 ?",
        choice1 : "아몬드 봉봉",
        choice2 : "그린티",
        choice3 : "파핑파핑 바나나",
        choice4 : "바람과 함께 사라지다",
        answer : 3
    },
    {
        question : "김구이가 최근에 자주 먹는 과자는 ?",
        choice1 : "새우깡",
        choice2 : "바나나킥",
        choice3 : "꼬깔콘",
        choice4 : "홈런볼",
        answer : 1
    },
    {
        question : "김구이가 최근에 빠진 과일는 ?",
        choice1 : "사과",
        choice2 : "감",
        choice3 : "블루베리",
        choice4 : "복숭아",
        answer : 2
    }
]

// CONSTANTS

const CORRECT_BOUNS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
        // go to the end page
        return window.location.assign("/end.html");
    }

    questionCounter ++;
    // questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    // questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    
    progressText.innerText = `Questions ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress Bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply == 'correct') {
            incrementScore(CORRECT_BOUNS);
        }
        // selectedChoice.parentElemet.classList.add(classToApply); error
        selectedChoice.parentNode.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentNode.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();