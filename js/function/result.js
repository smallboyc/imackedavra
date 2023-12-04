export function displayFlag(house, result) {
  const houseImg = document.createElement("img");
  houseImg.classList.add("flag");
  houseImg.src = `img/${result[0].name}.svg`;
  house.appendChild(houseImg);
}

export function displayHouseTitle(house, result) {
  const houseTitle = document.createElement("h1");
  houseTitle.textContent = result[0].name;
  house.appendChild(houseTitle);
}

export function displayFinalResult() {
  const displayResult = document.querySelector(".result");
  displayResult.style.display = "flex";
  const displayTitle = document.getElementById("title");
  displayTitle.style.display = "none";
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
