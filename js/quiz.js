import {
  newAnswers,
  newDivQuestion,
  newPagination,
  newTitleQuestion,
} from "./function.js";

//On récupère la div principale : quizContainer
const quizContainer = document.getElementById("quiz");
let table = [];
let currentId = 0;

//Fonction qui créé un li (optimisation)
function newMember(data, span, i) {
  const li = document.createElement("li");
  li.textContent = data[i].name;
  span.appendChild(li);
}

//Fonction qui détermine le résultat du quiz
async function selectedHouse(totalChoices) {
  let r, v, b, j;
  r = v = b = j = 0;
  for (let i = 0; i < totalChoices.length; i++) {
    let content = totalChoices[i];
    for (let k = 0; k < content.length; k++) {
      if (content[k] == "R") r++;
      else if (content[k] == "V") v++;
      else if (content[k] == "B") b++;
      else if (content[k] == "J") j++;
    }
  }
  let result = [
    { name: "Gryffondor", api_value: "gryffindor", value: r },
    { name: "Serpentard", api_value: "slytherin", value: v },
    { name: "Serdaigle", api_value: "ravenclaw", value: b },
    { name: "Poufsouffle", api_value: "hufflepuff", value: j },
  ];
  //On trie le tableau de résultat => l'élément 0 à la value la plus grande.
  result.sort((a, b) => b.value - a.value);

  const house = document.getElementById("house");

  //Affichage dynamique du drapeau
  const houseImg = document.createElement("img");
  houseImg.classList.add("flag");
  houseImg.src = `img/${result[0].name}.svg`;
  house.appendChild(houseImg);

  //Affichage dynamique du nom de la maison
  const houseTitle = document.createElement("h1");
  houseTitle.textContent = result[0].name;
  house.appendChild(houseTitle);

  const members = document.getElementById("character");

  //API
  const fetcher = await fetch(
    `https://hp-api.onrender.com/api/characters/house/${result[0].api_value}`
  );
  const data = await fetcher.json();

  for (let i = 0; i < 6; i += 2) {
    const span = document.createElement("span");
    newMember(data, span, i);
    newMember(data, span, i + 1);
    members.appendChild(span);
  }

  const displayResult = document.querySelector(".result");
  displayResult.style.display = "flex";
  const displayTitle = document.getElementById("title");
  displayTitle.style.display = "none";
}

//Génère toutes les questions - réponses + Affiche la première question - réponses
function loadQuiz(quiz) {
  quiz.forEach((question) => {
    const questionDiv = document.createElement("div");
    newDivQuestion(questionDiv, quizContainer, question, currentId);
    //Création et ajout du titre de la question
    newTitleQuestion(questionDiv, question);
    //Création et ajout des réponses.
    newAnswers(questionDiv, question);
    //Création et ajout de la pagination
    newPagination(questionDiv, question, quiz);
  });
}

//On gère la partie jouée par l'utilisateur. (Clique + Nouvelles questions)
function playQuiz(quiz) {
  const getAllAnswers = document.querySelectorAll("li");
  getAllAnswers.forEach((answer) => {
    answer.addEventListener("click", () => {
      quiz[currentId].answers.forEach((possibility) => {
        if (possibility.id == answer.id) {
          table.push(possibility.house);
          if (quiz.length == table.length) {
            selectedHouse(table);
          }
        }
      });
      currentId++;
      //On récupère les questions pour changer au click d'une réponse.
      const allQuestionDiv = document.querySelectorAll(".questionDiv");
      allQuestionDiv.forEach((questionDiv) => {
        if (questionDiv.id == currentId) {
          questionDiv.style.display = "block";
        } else {
          questionDiv.style.display = "none";
        }
      });
    });
  });
}

//Fonction principale
async function Quiz() {
  const fetcher = await fetch("js/quiz.json");
  const data = await fetcher.json();
  loadQuiz(data);
  playQuiz(data);
}

Quiz();
