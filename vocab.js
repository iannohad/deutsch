// Simple vocabulary list: question → answer
const vocabList = [
  { word: "Haus", meaning: "house" },
  { word: "Baum", meaning: "tree" },
  { word: "Wasser", meaning: "water" },
  { word: "Buch", meaning: "book" },
  { word: "Himmel", meaning: "sky" }
];

let currentIndex = 0;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const resultEl = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");

function showQuestion() {
  resultEl.textContent = "";
  answerEl.value = "";
  const vocab = vocabList[currentIndex];
  questionEl.textContent = `What does "${vocab.word}" mean?--enter key version`;
}

// ✅ Make a function to check the answer (used by both click and Enter)
function checkAnswer() {
  const userAnswer = answerEl.value.trim().toLowerCase();
  const correct = vocabList[currentIndex].meaning.toLowerCase();

  if (userAnswer === correct) {
    resultEl.textContent = "✅ Correct!";
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = `❌ Wrong. The correct answer is "${correct}".`;
    resultEl.style.color = "red";
  }
}

// When the "Check" button is clicked
checkBtn.addEventListener("click", checkAnswer);

// ✅ When the Enter key is pressed inside the input box
answerEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// When the "Next Word" button is clicked
document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % vocabList.length;
  showQuestion();
});

showQuestion();
