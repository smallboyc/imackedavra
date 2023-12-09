//Affiche la question sélectionnée
export function displayQuestion(questionDiv, currentId) {
  if (questionDiv.id == currentId) {
    questionDiv.style.display = "block";
  } else {
    questionDiv.style.display = "none";
  }
}

//Affiche le résultat
export function displayFinalResult() {
  const displayResult = document.getElementById("result");
  displayResult.style.display = "flex";
}
