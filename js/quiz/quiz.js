import {
  newAnswers,
  newDivQuestion,
  newPagination,
  newTitleQuestion,
  newHouseMember,
} from "./function/new.js";
import {
  displayFinalResult,
  displayFlag,
  displayHouseTitle,
} from "./function/display.js";
import { getHouse, getQuestion } from "./function/get.js";

//On récupère la div principale : quizContainer
const quizContainer = document.getElementById("quiz");
let table = [];
let currentId = 0;

//Fonction qui détermine le résultat du quiz
async function result(totalChoices) {
  let result = getHouse(totalChoices);
  const house = document.getElementById("house");
  displayFlag(house, result);
  displayHouseTitle(house, result);

  const members = document.getElementById("character");
  //API
  const fetcher = await fetch(
    `https://hp-api.onrender.com/api/characters/house/${result[0].api_value}`
  );
  const data = await fetcher.json();

  for (let i = 0; i < 6; i += 2) {
    const span = document.createElement("span");
    newHouseMember(data, span, i);
    newHouseMember(data, span, i + 1);
    members.appendChild(span);
  }
  displayFinalResult();
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
            result(table);
          }
        }
      });
      currentId++;
      //On récupère les questions pour changer au click d'une réponse.
      const allQuestionDiv = document.querySelectorAll(".questionDiv");
      allQuestionDiv.forEach((questionDiv) => {
        getQuestion(questionDiv, currentId);
      });
    });
  });
}

//Fonction principale
async function Quiz() {
  const fetcher = await fetch("js/quiz/quiz.json");
  const data = await fetcher.json();
  loadQuiz(data);
  playQuiz(data);
}

Quiz();
