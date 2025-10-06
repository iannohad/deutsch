// Simple vocabulary list: question → answer
import { probList } from "./probList.js"

let currentIndex = 0;

const questionEl = document.getElementById("question");
const rateEl = document.getElementById("rate");
const hintBtn = document.getElementById("hint-btn");
const hintEl = document.getElementById("hint");
const answerEl = document.getElementById("answer");
const enterBtn = document.getElementById("enter-btn");
const resultEl = document.getElementById("result");
// const showAnswerBtn = document.getElementById("show-answer-btn");

function showQuestion() {
  questionEl.textContent = probList[currentIndex].problem;
  rateEl.textContent = "";
  // TODO: add rate feature
  hintEl.textContent = "";
  hintBtn.style.display = "inline-block";
  answerEl.value = "";
  enterBtn.textContent = "Enter";
  resultEl.textContent = "";
  // showAnswerBtn.textContent = "";
}

function showHint() {
  hintEl.textContent = probList[currentIndex].hint;
  hintBtn.style.display = "none";
}

// Make a function to check the answer (used by both click and Enter)
function checkAnswer() {
  let userAnswer = answerEl.value.trim();
  userAnswer = userAnswer
    .replaceAll('a"', 'ä')
    .replaceAll('o"', 'ö')
    .replaceAll('u"', 'ü')
    .replaceAll('B', 'ß')
    .toLowerCase();

  const correct = probList[currentIndex].answer.toLowerCase();

  if (userAnswer === correct) {
    resultEl.textContent = "Richtig!";
    resultEl.style.color = "green";
    enterBtn.textContent = "Next"
  } else {
    resultEl.textContent = "Falsch!";
    resultEl.style.color = "red";
  }
}

function nextWord() {
  currentIndex = (currentIndex + 1) % probList.length;
  showQuestion();
}

// function showAnswer() {
//   resultEl.textContent = "";
//   showAnswerBtn.textContent = "";
// }

function btnPressed() {
    if (enterBtn.textContent === "Enter") {
        checkAnswer();
    } else {
        nextWord();
    }
}

enterBtn.addEventListener("click", btnPressed);
hintBtn.addEventListener("click", showHint);

answerEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnPressed();
    }
});

showQuestion();