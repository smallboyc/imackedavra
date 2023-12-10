import { displayQuestion } from "./display.js";

//Créée la div principale qui contient la question et les réponses
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
  displayQuestion(questionDiv, currentId);
}

//Créée le titre de la question sélectionnée
export function newTitleQuestion(questionDiv, question) {
  const questionTitle = document.createElement("p");
  questionTitle.classList.add("questionTitle");
  questionTitle.textContent = question.title;
  questionDiv.appendChild(questionTitle);
}

//Créée les réponses proposées
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

//Créée une pagination
export function newPagination(questionDiv, question, quiz) {
  const pagination = document.createElement("p");
  pagination.classList.add("pagination");
  pagination.textContent = question.id + 1 + " / " + quiz.length;
  questionDiv.appendChild(pagination);
}

//Créée une liste d'étudiants
export function newHouseMember(data, span, i) {
  const li = document.createElement("li");
  li.textContent = data[i].name;
  span.appendChild(li);
}

//Créée le drapeau de la maison
export function newFlag(house, result) {
  const houseImg = document.createElement("img");
  houseImg.classList.add("flag");
  houseImg.src = `img/${result[0].name}.svg`;
  houseImg.alt = `maison ${result[0].name}`;
  house.appendChild(houseImg);
}

//Créée le nom de la maison
export function newHouseTitle(house, result) {
  const houseTitle = document.createElement("h2");
  houseTitle.textContent = result[0].name;
  house.appendChild(houseTitle);
}

//Créée le lien vers la description de la maison
export function newHouseLink(house, result) {
  const houseLinkDiv = document.createElement("div");
  const houseLink = document.createElement("a");
  houseLink.textContent = "Voir les caractéristiques de la maison";
  houseLinkDiv.classList.add("houseLink");
  houseLink.href = `/house.html#${result[0].name.toLowerCase()}`;
  houseLink.title = `Lien vers la maison ${result[0].name}`;
  houseLinkDiv.appendChild(houseLink);
  house.appendChild(houseLinkDiv);
}
