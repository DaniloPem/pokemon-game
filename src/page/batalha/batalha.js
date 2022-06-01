import { teste } from "./teste.js";

const pokemonCompetidor = {
  tipo: "Planta",
  nome: "Venusaur",
  habilidades: [
    { nome: "Solar Beam", tipo: "Planta" },
    { nome: "Cut", tipo: "Planta" },
    { nome: "Bind", tipo: "Planta" },
    { nome: "Headbutt", tipo: "Normal" },
    { nome: "Vine Whip", tipo: "Planta" },
  ],
  evolucao: "",
  level: 20,
  backDefault:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png",
  frontDefault:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/3.png",
};

const pokemonOponente = {
  tipo: "Planta",
  nome: "Venusaur",
  habilidades: [
    { nome: "Solar Beam", tipo: "Planta" },
    { nome: "Cut", tipo: "Planta" },
    { nome: "Bind", tipo: "Planta" },
    { nome: "Headbutt", tipo: "Normal" },
    { nome: "Vine Whip", tipo: "Planta" },
  ],
  evolucao: "",
  level: 20,
  backDefault:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png",
  frontDefault:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/3.png",
};

//Barras Versus
const infoCompetidorBatalha = document.querySelector(
  "#info-competidor-batalha"
);
const nomeCompetidorBatalha = document.createElement("span");
const nivelCompetidorBatalha = document.createElement("span");
infoCompetidorBatalha.append(nomeCompetidorBatalha);
infoCompetidorBatalha.append(nivelCompetidorBatalha);
nomeCompetidorBatalha.innerHTML = `<span style="text-transform: uppercase">${pokemonCompetidor.nome}</span>`;
nivelCompetidorBatalha.innerText = `Lv ${pokemonCompetidor.level}`;

const infoOponenteBatalha = document.querySelector("#info-oponente-batalha");
const nomeOponenteBatalha = document.createElement("span");
const nivelOponenteBatalha = document.createElement("span");
infoOponenteBatalha.append(nomeOponenteBatalha);
infoOponenteBatalha.append(nivelOponenteBatalha);
nomeOponenteBatalha.innerHTML = `<span style="text-transform: uppercase">${pokemonOponente.nome}</span>`;
nivelOponenteBatalha.innerText = `Lv ${pokemonOponente.level}`;

//Icones dos Pokemon
const divIconPokemonCompetidor = document.querySelector(
  "#icon-pokemon-competidor"
);
const iconPokemonCompetidor = document.createElement("img");
const urlIconPokemonCompetidor = pokemonCompetidor.icon;
iconPokemonCompetidor.setAttribute("class", "img-icon-pokemon-competidor");
iconPokemonCompetidor.setAttribute("src", urlIconPokemonCompetidor);
divIconPokemonCompetidor.append(iconPokemonCompetidor);

const divIconPokemonOponente = document.querySelector("#icon-pokemon-oponente");
const iconPokemonOponente = document.createElement("img");
const urlIconPokemonOponente = pokemonOponente.icon;
iconPokemonOponente.setAttribute("class", "img-icon-pokemon-oponente");
iconPokemonOponente.setAttribute("src", urlIconPokemonOponente);
divIconPokemonOponente.append(iconPokemonOponente);

//Imagen dos Pokemon
const divOponenteBatalha = document.querySelector("#oponente-batalha");
const imgOponenteBatalha = document.createElement("img");
const urlFrontDefault = pokemonOponente.frontDefault;
imgOponenteBatalha.setAttribute("class", "img-oponente");
imgOponenteBatalha.setAttribute("src", urlFrontDefault);
divOponenteBatalha.append(imgOponenteBatalha);

const divCompetidorBatalha = document.querySelector("#competidor-batalha");
const imgCompetidorBatalha = document.createElement("img");
const urlBackDefault = pokemonCompetidor.backDefault;
imgCompetidorBatalha.setAttribute("class", "img-competidor");
imgCompetidorBatalha.setAttribute("src", urlBackDefault);
divCompetidorBatalha.append(imgCompetidorBatalha);

//Informacao da Batalha
const divInfoBatalha = document.querySelector("#info-batalha");
const infoBatalha = document.createElement("span");
divInfoBatalha.append(infoBatalha);
infoBatalha.innerHTML = `O que <span style="font-weight: bold">${pokemonCompetidor.nome}</span> fará?`;

//Botao Lutar
const botaoLutar = document.querySelector("#botao-lutar");
const aparecerAtaques = () => {
  const botoesAtaque = document.querySelector("#botoes-ataque");
  botoesAtaque.innerHTML = "";
  pokemonCompetidor.habilidades.forEach((habilidade) => {
    const ataqueBatalha = document.createElement("button");
    const iconTipo = document.createElement("img");
    const tipoHabilidade = habilidade.tipo.toLowerCase();
    const nomeAtaque = document.createElement("span");
    botoesAtaque.append(ataqueBatalha);
    ataqueBatalha.append(nomeAtaque);
    ataqueBatalha.append(iconTipo);
    nomeAtaque.innerText = `${habilidade.nome}`;
    iconTipo.setAttribute("src", `../../../assets/icone/${tipoHabilidade}.png`);
    ataqueBatalha.setAttribute("class", `${tipoHabilidade}-color-ataque`);
  });
};
botaoLutar.addEventListener("click", aparecerAtaques);

// function nome() {}
// const nome = () => {     }
