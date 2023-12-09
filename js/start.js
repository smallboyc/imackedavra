//on récupère la balise <h1>
const title = document.querySelector("h1");
//on récupère le texte du <h1> et on split pour obtenir les lettres dans un tableau.
const letters = title.innerText.split("");
const setEffectToLetters = letters.map((letter) => {
  //On génère un nombre aléatoire => animation aléatoire sur les lettres.
  const randomNumber = Math.floor(Math.random() * 2);
  if (randomNumber == 0)
    return `<span class="oscillation_first">${letter}</span>`;
  else return `<span class="oscillation_second">${letter}</span>`;
});
title.innerHTML = setEffectToLetters.join("");
