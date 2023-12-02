//on récupère la balise <h1>
const title = document.querySelector("h1");
//on récupère le texte du <h1> et on split pour obtenir les letters dans un tableau.
const letters = title.innerText.split("");
const setEffectToLetters = letters.map((lettre) => {
  //On génère un nombre aléatoire => animation aléatoire sur les lettres.
  const randomNumber = Math.floor(Math.random() * 10);
  if (randomNumber % 2 == 0)
    return `<span class="oscillation_first">${lettre}</span>`;
  else return `<span class="oscillation_second">${lettre}</span>`;
});
title.innerHTML = setEffectToLetters.join("");
