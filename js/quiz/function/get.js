export function getQuestion(questionDiv, currentId) {
  if (questionDiv.id == currentId) {
    questionDiv.style.display = "block";
  } else {
    questionDiv.style.display = "none";
  }
}

export function getHouse(totalChoices) {
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
  return result;
}
