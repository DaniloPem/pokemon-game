const pokemonCompetidor = {
  tipo: "Planta",
  nome: "Venusaur",
  habilidades: [
    { nome: "Solar Beam", tipo: "Planta", forca: 80 },
    { nome: "Cut", tipo: "Planta", forca: 20 },
    { nome: "Bind", tipo: "Planta", forca: 10 },
    { nome: "Headbutt", tipo: "Normal", forca: 30 },
    { nome: "Vine Whip", tipo: "Planta", forca: 30 },
  ],
  vidaOriginal: 100,
  vida: 100,
  debilidades: [
    { tipo: "Planta", dano: 0.3 },
    { tipo: "Agua", dano: 0.6 },
  ],
  evolucao: "",
  level: 20,
  backDefault: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png",
  frontDefault: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/3.png",
};

const pokemonOponente = {
  tipo: "Planta",
  nome: "Venusaur",
  habilidades: [
    { nome: "Solar Beam", tipo: "Planta", forca: 80 },
    { nome: "Cut", tipo: "Planta", forca: 20 },
    { nome: "Bind", tipo: "Planta", forca: 10 },
    { nome: "Headbutt", tipo: "Normal", forca: 30 },
    { nome: "Vine Whip", tipo: "Planta", forca: 30 },
  ],
  vidaOriginal: 100,
  vida: 100,
  debilidades: [
    { tipo: "Planta", dano: 0.3 },
    { tipo: "Agua", dano: 0.6 },
  ],
  evolucao: "",
  level: 20,
  backDefault: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png",
  frontDefault: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/3.png",
};

//Barras Versus
const infoCompetidorBatalha = document.querySelector("#info-competidor-batalha");
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
const divIconPokemonCompetidor = document.querySelector("#icon-pokemon-competidor");
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
    ataqueBatalha.addEventListener("click", () => atacar(habilidade));
  });
};
botaoLutar.addEventListener("click", aparecerAtaques);

//Informacao da Batalha
const divInfoBatalha = document.querySelector("#info-batalha");
const infoBatalha = document.createElement("span");
divInfoBatalha.append(infoBatalha);
infoBatalha.innerHTML = `O que <span style="font-weight: bold">${pokemonCompetidor.nome}</span> fará?`;
const atacar = (pokemonAtacante, pokemonAlvo, habilidade) => {
  const barraVidaOponente = document.querySelector("#barra-vida-oponente");
  infoBatalha.innerHTML = `<span style="font-weight: bold">${pokemonCompetidor.nome}</span> usou ${habilidade.nome}`;
  const debilidadeOponente = pokemonOponente.debilidades.find((debilidade) => debilidade.tipo === habilidade.tipo);
  const multiplicadorDano = !!debilidadeOponente ? debilidadeOponente.dano : 1;
  const vidaOponente = pokemonOponente.vida - habilidade.forca * multiplicadorDano;
  const porVidaOponente = (vidaOponente / pokemonOponente.vidaOriginal) * 100;
  if (porVidaOponente >= 0) {
    pokemonOponente.vida = vidaOponente;
    barraVidaOponente.style.width = `${porVidaOponente}%`;
    if (porVidaOponente > 50) {
      barraVidaOponente.style.backgroundColor = "green";
    } else if (porVidaOponente > 20) {
      barraVidaOponente.style.backgroundColor = "#D8DC00";
    } else {
      barraVidaOponente.style.backgroundColor = "red";
    }
  } else {
    pokemonOponente.vida = 0;
    barraVidaOponente.style.width = "0";
  }
};

// function nome() {}
// const nome = () => {     }
// gerar numero aleatorio entre 1 e 5. Math.round(Math.random() * 5)
//timeout
