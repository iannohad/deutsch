// Simple vocabulary list: question → answer
const vocabList = [
  { problem: "Haus", answer: "house" },
  { problem: "Baum", answer: "tree" },
  { problem: "Wasser", answer: "water" },
  { problem: "Buch", answer: "book" },
  { problem: "Himmel", answer: "sky" }
];

let currentIndex = 0;

const questionEl = document.getElementById("question");
const rateEl = document.getElementById("rate");
const answerEl = document.getElementById("answer");
const resultEl = document.getElementById("result");
const enterBtn = document.getElementById("enter-btn");

function showQuestion() {
  resultEl.textContent = "";
  answerEl.value = "";
  const vocab = vocabList[currentIndex];
  questionEl.textContent = `${vocab.problem}`;
  rateEl.textContent = '[[add rate feature]]'
  enterBtn.textContent = "Enter"
}

// Make a function to check the answer (used by both click and Enter)
function checkAnswer() {
  const userAnswer = answerEl.value.trim();
  userAnswer = userAnswer
    .replaceAll("a\"", "ä")
    .replaceAll("o\"", "ö")
    .replaceAll("u\"", "ü")
    .replaceAll("B", "ß")
  userAnswer = userAnswer.toLowerCase();

  const correct = vocabList[currentIndex].answer.toLowerCase();

  if (userAnswer === correct) {
    resultEl.textContent = "Richtig!";
    resultEl.style.color = "green";
    enterBtn.textContent = "Next"
  } else {
    resultEl.textContent = `Falsch. Die richtige Antwort ist "${correct}".`;
    resultEl.style.color = "red";
  }
}

function nextWord() {
    currentIndex = (currentIndex + 1) % vocabList.length;
    showQuestion();
}

function enterBtn() {
    if (enterBtn.textContent === "Enter") {
        checkAnswer();
    } else {
        nextWord();
    }
}

enterBtn.addEventListener("click", () => {
    enterBtn();
});

answerEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        enterBtn();
    }
});

showQuestion();