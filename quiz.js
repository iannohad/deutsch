import { probSets } from "./probSets.js"

let selectedSetName = localStorage.getItem("selectedSet");
let probList = probSets[selectedSetName];

let currentIndex = Math.floor(Math.random() * probList.length);

const questionEl = document.getElementById("question");
const rateEl = document.getElementById("rate");
const hintBtn = document.getElementById("hint-btn");
const hintEl = document.getElementById("hint");
const answerEl = document.getElementById("answer");
const enterBtn = document.getElementById("enter-btn");
const resultEl = document.getElementById("result");
const correctBtn = document.getElementById("show-correct-btn");
const correctEl = document.getElementById("correct-answer")

function showQuestion() {
  questionEl.textContent = probList[currentIndex].problem;
  rateEl.textContent = "";
  // TODO: add rate feature
  hintEl.textContent = "";
  hintBtn.style.display = "inline-block";
  answerEl.value = "";
  enterBtn.textContent = "Enter";
  resultEl.textContent = "";
  correctBtn.style.display = "none";
  correctEl.textContent = "";
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
  // .replaceAll('B', 'ß')
  // Eszett... idk
  .replaceAll(".", "")
  .replaceAll(",", "")
  .replaceAll("?", "")
  .replaceAll("!", "")
  .toLowerCase();

  let correct = probList[currentIndex].answer
  .replaceAll(".", "")
  .replaceAll(",", "")
  .replaceAll("?", "")
  .replaceAll("!", "")
  .toLowerCase();

  if (userAnswer === correct) {
    resultEl.textContent = "Richtig!";
    resultEl.style.color = "green";
    enterBtn.textContent = "Next"
    correctEl.textContent = "";
  } else {
    resultEl.textContent = "Falsch!";
    resultEl.style.color = "red";
    correctBtn.style.display = "inline-block";
  }
}

function nextWord() {
  // TODO: random
  let rand = Math.random();
  let add = Math.floor(rand * (probList.length - 1)) + 1;
  currentIndex = (currentIndex + add) % probList.length;
  showQuestion();
}

function showCorrect() {
  correctEl.textContent = `The answer is "${probList[currentIndex].answer}"`;
  correctBtn.style.display = "none"
}

function btnPressed() {
    if (enterBtn.textContent === "Enter") {
        checkAnswer();
    } else {
        nextWord();
    }
}

enterBtn.addEventListener("click", btnPressed);
answerEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnPressed();
    }
});

hintBtn.addEventListener("click", showHint);

correctBtn.addEventListener("click", showCorrect);


showQuestion();