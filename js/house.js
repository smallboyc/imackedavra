const CharacterTable = [
  "Harry Potter",
  "Severus Snape",
  "Luna Lovegood",
  "Cedric Diggory",
];

async function getExemplaryCharacter() {
  const fetcher = await fetch("https://hp-api.onrender.com/api/characters");
  const data = await fetcher.json();
  let result = [];
  //On cherche le personnage dans l'API.
  CharacterTable.forEach((character) => {
    data.forEach(
      (data_character) =>
        character == data_character.name &&
        result.push({ name: data_character.name, house: data_character.house })
    );
  });
  //Affichage de la maison
  const house = document.querySelectorAll("h2");
  let i = 0;
  house.forEach((element) => {
    console.log(element);
    element.textContent = result[i].house;
    i++;
  });
  //Affichage du personnage exemplaire
  const names = document.querySelectorAll("h3");
  let j = 0;
  names.forEach((element) => {
    console.log(element);
    element.textContent = result[j].name.toUpperCase();
    j++;
  });
}

getExemplaryCharacter();
