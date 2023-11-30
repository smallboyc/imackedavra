//On récupère la div principale : quizContainer
const quizContainer = document.getElementById("quiz");
let table = [];
let currentId = 0;

//Fonction de récupération de l'API
async function getAPI(url) {
  const fetcher = await fetch(url);
  const data = await fetcher.json();
  data.forEach((el) => console.log(el.name));
}

//Fonction qui détermine le résultat du quiz
function selectedHouse(totalChoices) {
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
  result.sort((a, b) => b.value - a.value);
  const displayResult = document.createElement("p");
  displayResult.textContent = "Bravo tu es " + result[0].name;
  quizContainer.appendChild(displayResult);
  getAPI(
    `https://hp-api.onrender.com/api/characters/house/${result[0].api_value}`
  );
  console.log(result);
}

//Génère toutes les questions - réponses + Affiche la première question - réponses
function loadQuiz(quiz) {
  quiz.forEach((question) => {
    //Création et ajout de la DIV contenant la question et les réponses
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("questionDiv");
    questionDiv.id = question.id;
    quizContainer.appendChild(questionDiv);
    //Initialisation de la 1ère question
    if (questionDiv.id == currentId) {
      questionDiv.style.display = "block";
    } else {
      questionDiv.style.display = "none";
    }

    //Création et ajout du titre de la question
    const questionTitle = document.createElement("h1");
    questionTitle.textContent = question.title;
    questionDiv.appendChild(questionTitle);

    //Création et ajout des choix de la question.
    const answersList = document.createElement("ol");
    question.answers.map((possibility, index) => {
      const answer = document.createElement("li");
      answer.id = index;
      answer.textContent = possibility.answer;
      answersList.appendChild(answer);
      questionDiv.appendChild(answersList);
    });

    //Création et ajout de la pagination
    const pagination = document.createElement("p");
    pagination.textContent = question.id + 1 + " / " + quiz.length;
    questionDiv.appendChild(pagination);
  });
}

//On gère la partie jouée par l'utilisateur. (Clique + Nouvelles questions)
function playQuiz(quiz) {
  const getAllAnswers = document.querySelectorAll("li");
  getAllAnswers.forEach((answer) => {
    answer.addEventListener("click", () => {
      quiz[currentId].answers.forEach((possibility) => {
        if (possibility.id == answer.id) {
          console.log(possibility.house);
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
  const fetcher = await fetch("quiz.json");
  const data = await fetcher.json();
  loadQuiz(data);
  playQuiz(data);
}

Quiz();
