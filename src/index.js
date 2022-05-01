const $ = (el) => document.querySelector(el);
const search = $(".search");
const form = $(".form");
const pokemonSprite = $(".pokemon-sprite");
const pokemonId = $(".pokemon-id");
const pokemonName = $(".pokemon-name");
const pokemonTypes = $(".pokemon-types");
const pokemonStats = $(".pokemon-stats");

const typeColors = {
  fire: "#ee6565",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#F4E7DA",
  rock: "#D5D5D4",
  fairy: "#FCEAFF",
  poison: "#a069d1",
  bug: "#F8D5A3",
  dragon: "#97B3E6",
  psychich: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const pokemon = {};
let pokemonInput = search.value;

async function fetchPokemon() {
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonInput.toLowerCase()}/`;
  const { pokemonDataHandler, displayRenderHandler } = handlers;
  await fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      pokemonDataHandler(data);
      displayRenderHandler(pokemon);
    })
    .catch(() => {
      alert("Pokemon não encontrado. Tente novamente");
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (search.value.length == 0) {
    alert("Digite o nome de um pokemon");
    search.focus();
    search.classList.add("red-border");
    return;
  }

  pokemonInput = search.value;
  fetchPokemon();
  search.value = "";
  search.classList.remove("red-border");
});

const handlers = {
  pokemonDataHandler(data) {
    const { id, name, abilities, types, sprites, stats } = data;
    pokemon.id = id;
    pokemon.name = name;
    pokemon.ability = abilities;
    pokemon.types = types;
    pokemon.sprite = sprites.front_default;
    pokemon.stats = stats;
  },

  displayRenderHandler(pokemonData) {
    console.log(pokemonData);
    const { id, name, ability, types, sprite, stats } = pokemon;
    pokemonSprite.src = sprite;
    pokemonId.innerHTML = `#${id}`;
    pokemonName.innerHTML = name[0].toUpperCase() + name.slice(1);

    pokemonTypes.innerHTML = "";
    types.forEach((type) => {
      pokemonTypes.innerHTML =
        pokemonTypes.innerHTML +
        `
        <li class="type">${
          type.type.name[0].toUpperCase() + type.type.name.slice(1)
        }</li>
      `;
    });

    pokemonStats.innerHTML = "";
    stats.forEach((stat) => {
      pokemonStats.innerHTML =
        pokemonStats.innerHTML +
        `
        <li class="stat" id="${stat.stat.name}">
          <span>${stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1)}:</span>
          <span>${stat.base_stat}</span>
        </li>
     `;
    });
  },
};