import { details } from "./apiDetails.js";

const select = document.querySelector(".select");
const pokeContainer = document.querySelector(".poke-container");
const allBtn = document.querySelector(".all-btn");
const searchInput = document.querySelector(".search-input");
const loaderDiv = document.querySelector(".loader-div");

const pokePerPage = 16;
let currentPage = 1;
let isScrolledToBottom = false;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#d6b3ff",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#e0f5ff ",
};

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

document.addEventListener("click", (event) => {
  const sortUl = select.children[2];
  if (!select.contains(event.target) && sortUl.classList.contains("active")) {
    sortUl.classList.remove("active");
  }
});

const toggleSelect = () => {
  select.addEventListener("click", () => {
    const sortUl = select.children[2];
    sortUl.classList.toggle("active");
  });
};

toggleSelect();

const newArr = Array.from(
  new Map(details.map((item) => [item["number"], item])).values()
);

const initPoke = async () => {
  const startIndex = (currentPage - 1) * pokePerPage;
  const endIndex = startIndex + pokePerPage;
  newArr.slice(startIndex, endIndex).forEach((poke) => {
    createPokeBox(poke);
  });
};

const loadNextPokes = async () => {
  if (!isScrolledToBottom) {
    console.log("1", currentPage);
    isScrolledToBottom = true;
    currentPage++;
    console.log("2", currentPage);
    loaderShow();
  }
};

const createPokeBox = async (poke) => {
  console.log(poke);
  const pokeImg = poke.id.toString().padStart(3, 0);
  const typeOne = poke.type[0][0].toUpperCase() + poke.type[0].slice(1);
  const typeTwo =
    poke.type.length > 1
      ? poke.type[1][0].toUpperCase() + poke.type[1].slice(1)
      : "";
  const pokeBoxColor = colors[poke.type[0]];

  const pokeBox = document.createElement("div");
  const pokeAbility = document.querySelectorAll(".two");
  pokeAbility.forEach((item) => {
    if (item.textContent === "") {
      item.style.display = "none";
    }
  });
  pokeBox.style.backgroundColor = pokeBoxColor;
  pokeBox.classList.add("poke-box");
  pokeBox.innerHTML = `<div class="poke-image">
  <img
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeImg}.png"
    alt=""
  />
</div>
<div class="poke-info">
  <div class="poke-id">#${poke.number}</div>
  <div class="poke-name">${poke.name}</div>
  <div class="poke-abilities">
    <span class="ability one">${typeOne}</span>
    <span class="ability two">${typeTwo}</span>
  </div>
</div>
`;
  pokeContainer.appendChild(pokeBox);
};

const loaderShow = () => {
  allBtn.addEventListener("click", async () => {
    loaderDiv.style.display = "block";
    setTimeout(() => {
      loaderDiv.style.display = "none";
      setTimeout(async () => {
        await initPoke();
        isScrolledToBottom = false;
        await loadNextPokes();
      }, 100);
    }, 1000);
  });
};

initPoke();
loadNextPokes();

searchInput.addEventListener("input", (e) => {
  const search = searchInput.value.toLowerCase().trim();

  console.log();
  console.log(search);

  const searchValue = newArr.find((item) => item.id == search);
  console.log(searchValue);

  if (searchValue) {
    pokeContainer.innerHTML = ``;
    createPokeBox(searchValue);
  } else {
    pokeContainer.innerHTML = ``;
    newArr.slice(0, 16).forEach((poke) => {
      createPokeBox(poke);
    });
  }
});
