const pokemonImage = document.querySelector("#pokemon");
const bait = document.querySelector("#bait");
const pokeballs = document.querySelector("#pokeballs");
const countPokeballs = document.querySelector("#countPokeballs");
let totalPokeballs = 5;
let hasPokemon = false;

bait.addEventListener("click", () => {
  const pokemonName = `${getRandomPokemon()}`;
  requestPokemon({ pokemonName });
});

pokeballs.addEventListener("click", () => {
  capture();
});

const getRandomPokemon = () => {
  return Math.floor(Math.random() * 900);
};

const chancesToCapture = () => {
  return Math.floor(Math.random() * 200);
};

const requestPokemon = async (params) => {
  if (!params) return;

  const { pokemonName } = params;

  hidePokemon();

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
  ).then(async (response) => response.json());

  setTimeout(() => {
    renderPokemon({ pokemonData: response });
  }, 1000);
};

const capture = () => {
  if (!hasPokemon || totalPokeballs <= 0) return;

  const chances = chancesToCapture();
  pokemonImage.style.animation = "capturePokemon 3s";

  if (chances > 100) {
    hidePokemon();
    alert("Pokemon capturado!");
  } else {
    setInterval(() => {
      pokemonImage.style.animation = "";
    }, 3000);
  }

  totalPokeballs--;
  updatePokeballs();
};

const hidePokemon = () => {
  pokemonImage.style.width = "0px";
  hasPokemon = false;
};

const renderPokemon = (params) => {
  const { pokemonData } = params;
  const { sprites } = pokemonData;
  pokemonImage.src = sprites.front_default;
  pokemonImage.style.width = "250px";
  pokemonImage.style.animation = "renderPokemon 3s";

  hasPokemon = true;
};

const updatePokeballs = () => {
  countPokeballs.innerHTML = `x${totalPokeballs}`;
};

updatePokeballs();
