export function newDivQuestion(
  questionDiv,
  quizContainer,
  question,
  currentId
) {
  questionDiv.classList.add("questionDiv");
  questionDiv.id = question.id;
  quizContainer.appendChild(questionDiv);

  //Initialisation de la 1ère question
  if (questionDiv.id == currentId) {
    questionDiv.style.display = "block";
  } else {
    questionDiv.style.display = "none";
  }
}

export function newTitleQuestion(questionDiv, question) {
  const questionTitle = document.createElement("p");
  questionTitle.classList.add("questionTitle");
  questionTitle.textContent = question.title;
  questionDiv.appendChild(questionTitle);
}

export function newAnswers(questionDiv, question) {
  const answersList = document.createElement("ol");
  question.answers.map((possibility, index) => {
    const answer = document.createElement("li");
    answer.classList.add("answer");
    answer.id = index;
    answer.textContent = possibility.answer;
    answersList.appendChild(answer);
    questionDiv.appendChild(answersList);
  });
}

export function newPagination(questionDiv, question, quiz) {
  const pagination = document.createElement("p");
  pagination.classList.add("pagination");
  pagination.textContent = question.id + 1 + " / " + quiz.length;
  questionDiv.appendChild(pagination);
}

//Fonction qui créé un li (optimisation)
export function newHouseMember(data, span, i) {
  const li = document.createElement("li");
  li.textContent = data[i].name;
  span.appendChild(li);
}
