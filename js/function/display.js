export function displayFlag(house, result) {
  const houseImg = document.createElement("img");
  houseImg.classList.add("flag");
  houseImg.src = `img/${result[0].name}.svg`;
  house.appendChild(houseImg);
}

export function displayHouseTitle(house, result) {
  const houseTitle = document.createElement("h2");
  houseTitle.textContent = result[0].name;
  house.appendChild(houseTitle);
}

export function displayFinalResult() {
  const displayResult = document.querySelector(".result");
  displayResult.style.display = "flex";
  const displayTitle = document.getElementById("title");
  displayTitle.style.display = "none";
}

