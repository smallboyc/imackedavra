const quiz = [
  {
    id: 0,
    title: "Qui es-tu à l'imac?",
    answers: [
      { id: 0, answer: "Miss ou Mister Imac", house: "R" },
      { id: 1, answer: "J'aurai dû être Miss ou Mister Imac", house: "V" },
      { id: 2, answer: "Le gilet jaune", house: "J" },
      { id: 3, answer: "Personne et je m'en branle", house: "B" },
    ],
  },
  {
    id: 1,
    title: "Quelle est ta matière préférée ?",
    answers: [
      { id: 0, answer: "Pratique vidéo", house: "R" },
      { id: 1, answer: "Le Web et l'Anglais", house: "J" },
      { id: 2, answer: "Expression et écriture", house: "B" },
      { id: 3, answer: "La programmation C++ et les Maths", house: "V" },
    ],
  },
  {
    id: 2,
    title: "Vas-tu aux soirées de l’esiee?",
    answers: [
      { id: 0, answer: "Oui", house: ["R", "V"] },
      { id: 1, answer: "Non", house: ["J", "B"] },
    ],
  },
  {
    id: 3,
    title: "Tu viens de",
    answers: [
      { id: 0, answer: "MMI", house: "R" },
      { id: 1, answer: "DUT Info ", house: "J" },
      { id: 2, answer: "Prépa", house: "B" },
      { id: 3, answer: "Autres", house: "V" },
    ],
  },
  {
    id: 4,
    title: "As-tu fait ton gage de parrainage?",
    answers: [
      { id: 0, answer: "Oui en plus d’un mois", house: "R" },
      { id: 1, answer: "Non et je le ferai sûrement pas", house: "V" },
      { id: 2, answer: "Non pas encore mais c’est prévu", house: "J" },
      { id: 3, answer: "Oui en moins d’un mois", house: "B" },
    ],
  },
  {
    id: 5,
    title: "Pour les courts-métrage tu préfères t’occuper de ?",
    answers: [
      { id: 0, answer: "La réalisation ", house: "R" },
      { id: 1, answer: "L’acting", house: "V" },
      { id: 2, answer: "Le son", house: "J" },
      { id: 3, answer: "La prise de vue", house: "B" },
    ],
  },
];

//On récupère la div principale : main
const main = document.getElementById("quiz");
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
  main.appendChild(displayResult);
  getAPI(
    `https://hp-api.onrender.com/api/characters/house/${result[0].api_value}`
  );
  console.log(result);
}

//Génère toutes les questions - réponses + Affiche la première question - réponses
function loadQuiz() {
  quiz.forEach((question) => {
    //Création et ajout de la DIV contenant la question et les réponses
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("questionDiv");
    questionDiv.id = question.id;
    main.appendChild(questionDiv);
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
function playQuiz() {
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

loadQuiz();
playQuiz();
