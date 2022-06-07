import { personagem } from "../../model/personagem.model.js";
import { Pokemon } from "../../model/pokemon.model.js";
import { buscarPokemonAleatorio } from "../../repository/pokemon.repository.js";

const pokemonCompetidor = new Pokemon({
  tipo: "Planta",
  nome: "Venusaur",
  habilidades: [
    { nome: "Headbutt", tipo: "Normal", forca: 30 },
    { nome: "Vine Whip", tipo: "Planta", forca: 40 },
    { nome: "Toxic", tipo: "Veneno", forca: 70 },
    { nome: "Razor Leaf", tipo: "Planta", forca: 60 },
    { nome: "Petal Dance", tipo: "Planta", forca: 80 },
    { nome: "Solar Beam", tipo: "Planta", forca: 100 },
  ],
  vidaOriginal: 100,
  debilidades: [
    { tipo: "Agua", dano: "0.6" },
    { tipo: "Planta", dano: "0.3" },
    { tipo: "Luta", dano: "0.6" },
    { tipo: "Elétrico", dano: "0.6" },
    { tipo: "Fada", dano: "0.6" },
    { tipo: "Voador", dano: "1.6" },
    { tipo: "Fogo", dano: "1.6" },
    { tipo: "Psíquico", dano: "1.6" },
    { tipo: "Gelo", dano: "1.6" },
    { tipo: "Veneno", dano: "0.6" },
    { tipo: "Pedra", dano: "0.5" },
    { tipo: "Terra", dano: "0.6" },
    { tipo: "Inseto", dano: "0.5" },
    { tipo: "Ferro", dano: "0.6" },
  ],
  evolucao: null,
  level: 30,
  backDefault: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png",
  frontDefault: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/3.png",
});

const pokemonOponente = buscarPokemonAleatorio();

const renderGame = () => {
  //Barras Versus
  const infoCompetidorBatalha = document.querySelector("#info-competidor-batalha");
  infoCompetidorBatalha.innerHTML = "";
  const nomeCompetidorBatalha = document.createElement("span");
  const nivelCompetidorBatalha = document.createElement("span");
  infoCompetidorBatalha.append(nomeCompetidorBatalha);
  infoCompetidorBatalha.append(nivelCompetidorBatalha);
  nomeCompetidorBatalha.innerHTML = `<span style="text-transform: uppercase">${pokemonCompetidor.nome}</span>`;
  nivelCompetidorBatalha.innerText = `Lv ${pokemonCompetidor.level}`;
  const barraVidaCompetidor = document.querySelector("#barra-vida-competidor");
  atualizarBarraVida(barraVidaCompetidor, pokemonCompetidor);

  const infoOponenteBatalha = document.querySelector("#info-oponente-batalha");
  infoOponenteBatalha.innerHTML = "";
  const nomeOponenteBatalha = document.createElement("span");
  const nivelOponenteBatalha = document.createElement("span");
  infoOponenteBatalha.append(nomeOponenteBatalha);
  infoOponenteBatalha.append(nivelOponenteBatalha);
  nomeOponenteBatalha.innerHTML = `<span style="text-transform: uppercase">${pokemonOponente.nome}</span>`;
  nivelOponenteBatalha.innerText = `Lv ${pokemonOponente.level}`;
  const barraVidaOponente = document.querySelector("#barra-vida-oponente");
  atualizarBarraVida(barraVidaOponente, pokemonOponente);
  console.log(pokemonOponente.vida);

  //Icones dos Pokemon
  const divIconPokemonCompetidor = document.querySelector("#icon-pokemon-competidor");
  divIconPokemonCompetidor.innerHTML = "";
  const iconPokemonCompetidor = document.createElement("img");
  const urlIconPokemonCompetidor = pokemonCompetidor.icon;
  iconPokemonCompetidor.setAttribute("class", "img-icon-pokemon-competidor");
  iconPokemonCompetidor.setAttribute("src", urlIconPokemonCompetidor);
  divIconPokemonCompetidor.append(iconPokemonCompetidor);

  const divIconPokemonOponente = document.querySelector("#icon-pokemon-oponente");
  divIconPokemonOponente.innerHTML = "";
  const iconPokemonOponente = document.createElement("img");
  const urlIconPokemonOponente = pokemonOponente.icon;
  iconPokemonOponente.setAttribute("class", "img-icon-pokemon-oponente");
  iconPokemonOponente.setAttribute("src", urlIconPokemonOponente);
  divIconPokemonOponente.append(iconPokemonOponente);

  //Imagen dos Pokemon
  const divOponenteBatalha = document.querySelector("#oponente-batalha");
  divOponenteBatalha.innerHTML = "";
  const imgOponenteBatalha = document.createElement("img");
  const urlFrontDefault = pokemonOponente.frontDefault;
  imgOponenteBatalha.setAttribute("class", "img-oponente");
  imgOponenteBatalha.setAttribute("src", urlFrontDefault);
  divOponenteBatalha.append(imgOponenteBatalha);

  const divCompetidorBatalha = document.querySelector("#competidor-batalha");
  divCompetidorBatalha.innerHTML = "";
  const imgCompetidorBatalha = document.createElement("img");
  const urlBackDefault = pokemonCompetidor.backDefault;
  imgCompetidorBatalha.setAttribute("class", "img-competidor");
  imgCompetidorBatalha.setAttribute("src", urlBackDefault);
  divCompetidorBatalha.append(imgCompetidorBatalha);
};

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
    ataqueBatalha.addEventListener("click", () => usarHabilidade(habilidade));
  });
};
botaoLutar.addEventListener("click", aparecerAtaques);

// // Informacao da Batalha
// const divInfoBatalha = document.querySelector("#info-batalha");
// const infoBatalha = document.createElement("span");
// divInfoBatalha.append(infoBatalha);
// infoBatalha.innerHTML = `O que <span style="font-weight: bold">${pokemonCompetidor.nome}</span> fará?`;

const usarHabilidade = (habilidade) => {
  const botoesAtaque = document.querySelectorAll("#botoes-ataque > button");
  if (pokemonCompetidor.vida > 0 && pokemonOponente.vida > 0) {
    botoesAtaque.forEach((botao) => {
      botao.disabled = true;
    });
    pokemonCompetidor.atacar(habilidade, pokemonOponente);
    renderGame();
    setTimeout(() => {
      pokemonOponente.atacarAleatorio(pokemonCompetidor);
      botoesAtaque.forEach((botao) => {
        botao.disabled = false;
      });
      renderGame();
    }, 3000);
  } else {
    botoesAtaque.forEach((botao) => {
      botao.disabled = true;
    });
  }
};

const atualizarBarraVida = (barraVida, pokemon) => {
  const porVidaPokemon = (pokemon.vida / pokemon.vidaOriginal) * 100;
  if (porVidaPokemon >= 0) {
    barraVida.style.width = `${porVidaPokemon}%`;
    if (porVidaPokemon > 50) {
      barraVida.style.backgroundColor = "green";
    } else if (porVidaPokemon > 20) {
      barraVida.style.backgroundColor = "#D8DC00";
    } else {
      barraVida.style.backgroundColor = "red";
    }
  } else {
    barraVida.style.width = "0";
  }
};

renderGame();

// function nome() {}
// const nome = () => {     }
// gerar numero aleatorio entre 1 e 5. Math.round(Math.random() * 5)
//timeout

//
//pegar keys, sortear uma chave, pegar objeto
// Object.keys(pokemons)
