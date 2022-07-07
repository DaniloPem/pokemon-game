import { Personagem } from "../../model/personagem.model.js";

const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

// Recursos do jogo
const backgroundHome = new Image();
backgroundHome.src = "../../../assets/imagem/mapaPokemon.png";

const imagemPersonagem = new Image();
imagemPersonagem.src = "../../../assets/imagem/personagem.png";

//Objetos
const sprites = [];
const cenario = {
  img: backgroundHome,
  x: 0,
  y: 0,
  posicaoX: 0,
  posicaoY: 0,
  largura: 5632,
  altura: 3072,
};
sprites.push(cenario);

const personagem =
  localStorage.getItem("personagem") !== null
    ? Personagem.criarAPartirDoLocalStorage(JSON.parse(localStorage.getItem("personagem")))
    : Personagem.criarPersonagemInicial();

const pokemonsNaBolsaPersonagem = personagem.pokemonsNaBolsa;
const pokemonsNoDepotePersonagem = personagem.pokemonsNoDepote;

const spritePersonagem = {
  img: imagemPersonagem,
  x: 0,
  y: 0,
  posicaoX: null,
  posicaoY: null,
  largura: 68,
  altura: 72,
  velocidade: 3,
};
sprites.push(spritePersonagem);

const camera = {
  x: 0,
  y: 0,
  largura: canvas.clientWidth,
  altura: canvas.clientHeight,
  bordeEsquerdo: function () {
    return this.x + this.largura * 0.25;
  },
  bordeDireito: function () {
    return this.x + this.largura * 0.75;
  },
  bordeCima: function () {
    return this.y + this.altura * 0.25;
  },
  bordeBaixo: function () {
    return this.y + this.altura * 0.75;
  },
};

//Movimento do personagem
const keymap = {};

const apertarArrow = (evento) => {
  keymap[evento.key] = true;
};
const soltarArrow = (evento) => {
  keymap[evento.key] = false;
};
document.addEventListener("keydown", apertarArrow);
document.addEventListener("keyup", soltarArrow);

//Rodando infinitamente
const loop = () => {
  window.requestAnimationFrame(loop, canvas);
  update();
  render();
};

//Pra fazer atualizacoes
const update = () => {
  if (keymap["ArrowLeft"]) {
    spritePersonagem.y = 1;
    spritePersonagem.posicaoX -= spritePersonagem.velocidade;
    // verificarPokemonsSelvagem();
  }
  if (keymap["ArrowRight"]) {
    spritePersonagem.y = 2;
    spritePersonagem.posicaoX += spritePersonagem.velocidade;
    // verificarPokemonsSelvagem();
  }
  if (keymap["ArrowUp"]) {
    spritePersonagem.y = 3;
    spritePersonagem.posicaoY -= spritePersonagem.velocidade;
    // verificarPokemonsSelvagem();
  }
  if (keymap["ArrowDown"]) {
    spritePersonagem.y = 0;
    spritePersonagem.posicaoY += spritePersonagem.velocidade;
    // verificarPokemonsSelvagem();
  }

  //Atualizar posicao da Camera
  if (spritePersonagem.posicaoX < camera.bordeEsquerdo()) {
    camera.x = spritePersonagem.posicaoX - camera.largura * 0.25;
  }
  if (spritePersonagem.posicaoX + spritePersonagem.largura > camera.bordeDireito()) {
    camera.x = spritePersonagem.posicaoX + spritePersonagem.largura - camera.largura * 0.75;
  }
  if (spritePersonagem.posicaoY < camera.bordeCima()) {
    camera.y = spritePersonagem.posicaoY - camera.altura * 0.25;
  }
  if (spritePersonagem.posicaoY + spritePersonagem.altura > camera.bordeBaixo()) {
    camera.y = spritePersonagem.posicaoY + spritePersonagem.altura - camera.altura * 0.75;
  }

  //Limite cenario
  if (camera.y < 0) {
    camera.y = 0;
  }

  //limite personagem
  if (spritePersonagem.posicaoY < 0) {
    spritePersonagem.posicaoY = 0;
  }
};

//Desenhar funcoes na tela
let elapsed = 0;
const render = () => {
  contexto.save();
  contexto.translate(-camera.x, -camera.y);
  contexto.drawImage(
    cenario.img,
    cenario.x,
    cenario.y,
    cenario.largura,
    cenario.altura,
    cenario.posicaoX,
    cenario.posicaoY,
    cenario.largura,
    cenario.altura
  );
  contexto.drawImage(
    spritePersonagem.img,
    spritePersonagem.largura * spritePersonagem.x,
    spritePersonagem.altura * spritePersonagem.y,
    spritePersonagem.largura,
    spritePersonagem.altura,
    spritePersonagem.posicaoX,
    spritePersonagem.posicaoY,
    spritePersonagem.largura,
    spritePersonagem.altura
  );
  const emMovimento = Object.values(keymap).some((valor) => valor === true); // [false, false, false, false];
  if (emMovimento) {
    if (elapsed % 15 === 0) {
      spritePersonagem.x++;
      if (spritePersonagem.x > 3) {
        spritePersonagem.x = 0;
      }
    }
    elapsed++;
  } else {
    spritePersonagem.x = 0;
    elapsed = 0;
  }
  contexto.restore();
};

const verificarPokemonsSelvagem = () => {
  const numeroConstante = 0.005;
  const numeroAleatorio = Math.random();
  if (numeroAleatorio <= numeroConstante) {
    personagem.posicaoX = spritePersonagem.posicaoX;
    personagem.posicaoY = spritePersonagem.posicaoY;
    localStorage.setItem("personagem", JSON.stringify(personagem));
    location.href = "../batalha/batalha-page.html";
  }
};

//Botao Pokemons
const botaoPokemons = document.querySelector("#botaoPokemons");
const aparecerListaPokemons = () => {
  const main = document.querySelector("main");
  const divExistenteListaPokemons = main.children.namedItem("listaPokemons");
  if (!!divExistenteListaPokemons) {
    main.removeChild(divExistenteListaPokemons);
    return;
  }
  const divListaPokemons = document.createElement("div");
  divListaPokemons.setAttribute("name", "listaPokemons");
  main.append(divListaPokemons);
  const paragrafoBolsa = document.createElement("p");
  const divPokemonBolsa = document.createElement("div");
  const listaPokemonBolsa = document.createElement("div");
  const botaoRemover = document.createElement("button");
  divListaPokemons.setAttribute("class", "pokemons-depote-bolsa");
  divListaPokemons.setAttribute("id", "divListaPokemons");
  divPokemonBolsa.setAttribute("class", "pokemon-bolsa-conteiner");
  listaPokemonBolsa.setAttribute("class", "pokemon-bolsa");
  botaoRemover.setAttribute("class", "botao-remover-adicionar");
  divListaPokemons.append(paragrafoBolsa);
  divListaPokemons.append(divPokemonBolsa);
  divPokemonBolsa.append(listaPokemonBolsa);
  divPokemonBolsa.append(botaoRemover);
  paragrafoBolsa.innerText = "Bolsa";
  botaoRemover.innerText = "Remover";
  pokemonsNaBolsaPersonagem.forEach((pokemonBolsa) => {
    const botaoPokemonNaBolsa = document.createElement("button");
    const imgPokemonNaBolsa = document.createElement("img");
    const urlImgPokemonNaBolsa = pokemonBolsa.icon;
    const nivelPokemonNaBolsa = document.createElement("span");
    const barraVidaPokemonNaBolsa = document.createElement("div");
    const vidaPokemonNaBolsa = document.createElement("div");
    botaoPokemonNaBolsa.setAttribute("class", "botao-pokemon");
    imgPokemonNaBolsa.setAttribute("src", urlImgPokemonNaBolsa);
    barraVidaPokemonNaBolsa.setAttribute("class", "barra-hp-conteiner");
    vidaPokemonNaBolsa.setAttribute("class", "barra-hp");
    listaPokemonBolsa.append(botaoPokemonNaBolsa);
    botaoPokemonNaBolsa.append(imgPokemonNaBolsa);
    botaoPokemonNaBolsa.append(nivelPokemonNaBolsa);
    botaoPokemonNaBolsa.append(barraVidaPokemonNaBolsa);
    barraVidaPokemonNaBolsa.append(vidaPokemonNaBolsa);
    nivelPokemonNaBolsa.innerHTML = `Nv${pokemonBolsa.level}`;
    atualizarBarraVida(pokemonBolsa, vidaPokemonNaBolsa);
  });
  if (pokemonsNoDepotePersonagem.length != 0) {
    const paragrafoDepote = document.createElement("p");
    const divPokemonDepote = document.createElement("div");
    const listaPokemonDepote = document.createElement("div");
    const botaoAdicionar = document.createElement("button");
    paragrafoDepote.setAttribute("class", "p-depote");
    divPokemonDepote.setAttribute("class", "pokemon-depote-conteiner");
    listaPokemonDepote.setAttribute("class", "pokemon-depote");
    botaoAdicionar.setAttribute("class", "botao-remover-adicionar");
    divListaPokemons.append(paragrafoDepote);
    divListaPokemons.append(divPokemonDepote);
    divPokemonDepote.append(listaPokemonDepote);
    divPokemonDepote.append(botaoAdicionar);
    paragrafoDepote.innerText = "Depote";
    pokemonsNoDepotePersonagem.forEach((pokemonDepote) => {
      const botaoPokemonNoDepote = document.createElement("button");
      const imgPokemonNoDepote = document.createElement("img");
      const urlImgPokemonNoDepote = pokemonDepote.icon;
      const nivelPokemonNoDepote = document.createElement("span");
      const barraVidaPokemonNoDepote = document.createElement("div");
      const vidaPokemonNoDepote = document.createElement("div");
      botaoPokemonNoDepote.setAttribute("class", "botao-pokemon");
      imgPokemonNoDepote.setAttribute("src", urlImgPokemonNoDepote);
      barraVidaPokemonNoDepote.setAttribute("class", "barra-hp-conteiner");
      vidaPokemonNoDepote.setAttribute("class", "barra-hp");
      listaPokemonDepote.append(botaoPokemonNoDepote);
      botaoPokemonNoDepote.append(imgPokemonNoDepote);
      botaoPokemonNoDepote.append(nivelPokemonNoDepote);
      botaoPokemonNoDepote.append(barraVidaPokemonNoDepote);
      barraVidaPokemonNoDepote.append(vidaPokemonNoDepote);
      nivelPokemonNoDepote.innerHTML = `Nv${pokemonDepote.level}`;
      atualizarBarraVida(pokemonDepote, vidaPokemonNoDepote);
    });
    adicionarOverflowNoPokemonDepote(divPokemonDepote, listaPokemonDepote);
  }
};
botaoPokemons.addEventListener("click", aparecerListaPokemons);

const atualizarBarraVida = (pokemon, vidaPokemon) => {
  const porVidaPokemon = (pokemon.vida / pokemon.vidaOriginal) * 100;
  vidaPokemon.style.width = `${porVidaPokemon}%`;
  if (porVidaPokemon > 50) {
    vidaPokemon.style.backgroundColor = "green";
  } else if (porVidaPokemon > 20) {
    vidaPokemon.style.backgroundColor = "#D8DC00";
  } else {
    vidaPokemon.style.backgroundColor = "red";
  }
};

const adicionarOverflowNoPokemonDepote = (divPokemonDepote, listaPokemonDepote) => {
  if (pokemonsNoDepotePersonagem.length >= 6) {
    divPokemonDepote.classList.add("pokemon-depote-altura");
    listaPokemonDepote.classList.add("pokemon-depote-overflow");
  }
};

document.body.onload = function () {
  spritePersonagem.posicaoX = personagem.posicaoX;
  spritePersonagem.posicaoY = personagem.posicaoY;
};
loop();
//Soundtrack
//1, 2, 17,18,20,23,24,25,26?,28,34?,43?,46,50,83,85,
