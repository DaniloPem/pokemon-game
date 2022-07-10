import { Personagem } from "../../model/personagem.model.js";

const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

// Recursos do jogo
const backgroundHome = new Image();
backgroundHome.src = "../../../assets/imagem/mapaPokemon.png";

const imagemPersonagem = new Image();
imagemPersonagem.src = "../../../assets/imagem/personagem.png";

const imagemTransparente = new Image();
imagemTransparente.src = "../../../assets/icone/semtipo.png";

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
    verificarPokemonsSelvagem();
  }
  if (keymap["ArrowRight"]) {
    spritePersonagem.y = 2;
    spritePersonagem.posicaoX += spritePersonagem.velocidade;
    verificarPokemonsSelvagem();
  }
  if (keymap["ArrowUp"]) {
    spritePersonagem.y = 3;
    spritePersonagem.posicaoY -= spritePersonagem.velocidade;
    verificarPokemonsSelvagem();
  }
  if (keymap["ArrowDown"]) {
    spritePersonagem.y = 0;
    spritePersonagem.posicaoY += spritePersonagem.velocidade;
    verificarPokemonsSelvagem();
  }

  if (
    spritePersonagem.posicaoX > 2105 &&
    spritePersonagem.posicaoX < 2150 &&
    spritePersonagem.posicaoY < 137 &&
    spritePersonagem.posicaoY > 110
  ) {
    document.removeEventListener("keydown", apertarArrow);
    spritePersonagem.posicaoY += 40;
    spritePersonagem.img = imagemTransparente;
    const main = document.querySelector("main");
    const divExistenteCentroPokemon = main.children.namedItem("centroPokemon");
    if (!!divExistenteCentroPokemon) {
      main.removeChild(divExistenteCentroPokemon);
    }
    const centroPokemon = document.createElement("div");
    centroPokemon.setAttribute("name", "centro-pokemon");
    main.append(centroPokemon);
    // aparecerNurseJoy(centroPokemon);
    const curarPokemonConteiner = document.createElement("div");
    const mensagemConteiner = document.createElement("div");
    const mensagemJoy = document.createElement("p");
    const botoesCurarConteiner = document.createElement("div");
    const botaoCurar = document.createElement("button");
    const msgCurar = document.createElement("p");
    const botaoPokebolas = document.createElement("button");
    const msgPokebolas = document.createElement("p");
    const msgDisponivelPokebolas = document.createElement("p");
    const botaoAceitar = document.createElement("button");
    const imgNurseJoy = document.createElement("img");
    const imgChansey = document.createElement("img");
    centroPokemon.setAttribute("class", "centroPokemon-conteiner");
    curarPokemonConteiner.setAttribute("class", "curarPokemon-conteiner");
    mensagemConteiner.setAttribute("class", "msg-nurseJoy-conteiner");
    mensagemJoy.setAttribute("class", "msg-nurseJoy");
    botoesCurarConteiner.setAttribute("class", "botoes-curarPokemons-pokebolas");
    msgDisponivelPokebolas.setAttribute("class", "msg-disponivel");
    botaoAceitar.setAttribute("class", "botao-aceitar");
    imgNurseJoy.setAttribute("class", "img-nurseJoy");
    imgNurseJoy.setAttribute("src", "../../../assets/imagem/nurseJoy.png");
    imgChansey.setAttribute("class", "img-chansey");
    imgChansey.setAttribute("src", "../../../assets/imagem/chansey.png");
    centroPokemon.append(curarPokemonConteiner);
    curarPokemonConteiner.append(mensagemConteiner, botoesCurarConteiner, botaoAceitar, imgNurseJoy, imgChansey);
    mensagemConteiner.append(mensagemJoy);
    botoesCurarConteiner.append(botaoCurar, botaoPokebolas);
    botaoCurar.append(msgCurar);
    botaoPokebolas.append(msgPokebolas, msgDisponivelPokebolas);
    curarPokemonConteiner.append(botaoAceitar);
    mensagemJoy.innerText = "Olá! Eu sou a nurse Joy. Você deseja curar seus pokemons e receber pokebolas?";
    msgCurar.innerText = "Curar";
    msgPokebolas.innerText = "Pokebolas";
    msgDisponivelPokebolas.innerHTML = `Disponível em 5 min`;
    botaoAceitar.innerText = "Aceitar";
    const fecharCentroPokemon = () => {
      main.removeChild(main.children.namedItem("centro-pokemon"));
      spritePersonagem.img = imagemPersonagem;
      document.addEventListener("keydown", apertarArrow);
    };
    botaoAceitar.addEventListener("click", fecharCentroPokemon);
    const curarPokemons = () => {
      pokemonsNaBolsaPersonagem.forEach((pokemon) => {
        pokemon.vida = pokemon.vidaOriginal;
        pokemon.habilidades.forEach((habilidade) => (habilidade.pontosPoder = habilidade.pontosMax));
      });
      mensagemJoy.innerText = `${personagem.nomeUser}, seus pokemons estão curados!`;
    };
    botaoCurar.addEventListener("click", curarPokemons);
    const adicionarPokebolas = () => {
      const dataAtual = new Date();
      const dataUltimaAdicao = new Date(localStorage.getItem("dataPokebola")) || new Date();
      dataUltimaAdicao.setMinutes(dataUltimaAdicao.getMinutes() + 5);
      if (dataAtual > dataUltimaAdicao) {
        personagem.itens.forEach((pokebola) => (pokebola.quantidade += 3));
        localStorage.setItem("dataPokebola", dataAtual);
        mensagemJoy.innerText = `${personagem.nomeUser}, você recebeu 3 pokebolas por cada tipo de pokeball!`;
      } else {
        mensagemJoy.innerText = `${personagem.nomeUser}, você não pode receber pokebolas agora. Tente mais tarde.`;
      }
    };
    botaoPokebolas.addEventListener("click", adicionarPokebolas);
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
  console.log(spritePersonagem.posicaoX, spritePersonagem.posicaoY);
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
  if (
    !(
      spritePersonagem.posicaoX > 2049 &&
      spritePersonagem.posicaoX < 2199 &&
      spritePersonagem.posicaoY < 196 &&
      spritePersonagem.posicaoY > 110
    )
  ) {
    const numeroConstante = 0.005;
    const numeroAleatorio = Math.random();
    if (numeroAleatorio <= numeroConstante) {
      personagem.posicaoX = spritePersonagem.posicaoX;
      personagem.posicaoY = spritePersonagem.posicaoY;
      localStorage.setItem("personagem", JSON.stringify(personagem));
      location.href = "../batalha/batalha-page.html";
    }
  }
};

//Botao Pokemons
const botaoPokemons = document.querySelector("#botaoPokemons");
const pokemonPreRemovido = [];
const pokemonPreAdicionado = [];
const aparecerListaPokemons = () => {
  const main = document.querySelector("main");
  const divExistenteListaPokemons = main.children.namedItem("listaPokemons");
  if (!!divExistenteListaPokemons) {
    main.removeChild(divExistenteListaPokemons);
  }
  const divListaPokemons = document.createElement("div");
  divListaPokemons.setAttribute("name", "listaPokemons");
  main.append(divListaPokemons);
  const { botaoRemover, listaPokemonBolsa } = aparecerListaPokemonsNaBolsa(divListaPokemons);
  if (pokemonsNaBolsaPersonagem.length === 1) {
    botaoRemover.classList.add("botaoDesabilitado");
  }
  pokemonsNaBolsaPersonagem.forEach((pokemonBolsa) => {
    const botaoPokemonNaBolsa = aparecerBotoesPokemonBolsa(pokemonBolsa, listaPokemonBolsa);
    removerPokemonDaBolsaNoDepote(pokemonBolsa, botaoPokemonNaBolsa, botaoRemover);
  });
  if (pokemonsNoDepotePersonagem.length != 0) {
    const { botaoAdicionar, listaPokemonDepote, divPokemonDepote } = aparecerListaPokemonsDepote(divListaPokemons);
    if (pokemonsNaBolsaPersonagem.length === 6) {
      botaoAdicionar.classList.add("botaoDesabilitado");
    }
    pokemonsNoDepotePersonagem.forEach((pokemonDepote) => {
      const botaoPokemonNoDepote = aparecerBotoesPokemonDepote(pokemonDepote, listaPokemonDepote);
      adicionarPokemonDoDepoteNaBolsa(pokemonDepote, botaoPokemonNoDepote, botaoAdicionar);
    });
    adicionarOverflowNoPokemonDepote(divPokemonDepote, listaPokemonDepote);
  }
};
botaoPokemons.addEventListener("click", () => {
  const main = document.querySelector("main");
  const divExistenteListaPokemons = main.children.namedItem("listaPokemons");
  if (!!divExistenteListaPokemons) {
    main.removeChild(divExistenteListaPokemons);
    pokemonPreRemovido.length = 0;
    pokemonPreAdicionado.length = 0;
  } else {
    aparecerListaPokemons();
  }
});

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

const aparecerListaPokemonsNaBolsa = (divListaPokemons) => {
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
  return { botaoRemover, listaPokemonBolsa };
};

const aparecerListaPokemonsDepote = (divListaPokemons) => {
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
  botaoAdicionar.innerText = "Adicionar";
  return { botaoAdicionar, listaPokemonDepote, divPokemonDepote };
};

const aparecerBotoesPokemonBolsa = (pokemonBolsa, listaPokemonBolsa) => {
  const botaoPokemonNaBolsa = document.createElement("button");
  const imgPokemonNaBolsa = document.createElement("img");
  const urlImgPokemonNaBolsa = pokemonBolsa.icon;
  const nivelPokemonNaBolsa = document.createElement("span");
  const barraVidaPokemonNaBolsa = document.createElement("div");
  const vidaPokemonNaBolsa = document.createElement("div");
  botaoPokemonNaBolsa.setAttribute("class", "botao-pokemon");
  botaoPokemonNaBolsa.setAttribute("id", "botao-pokemonBolsa");
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
  return botaoPokemonNaBolsa;
};

const aparecerBotoesPokemonDepote = (pokemonDepote, listaPokemonDepote) => {
  const botaoPokemonNoDepote = document.createElement("button");
  const imgPokemonNoDepote = document.createElement("img");
  const urlImgPokemonNoDepote = pokemonDepote.icon;
  const nivelPokemonNoDepote = document.createElement("span");
  const barraVidaPokemonNoDepote = document.createElement("div");
  const vidaPokemonNoDepote = document.createElement("div");
  botaoPokemonNoDepote.setAttribute("class", "botao-pokemon");
  botaoPokemonNoDepote.setAttribute("id", "botao-pokemonDepote");
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
  return botaoPokemonNoDepote;
};

const removerPokemonDaBolsa = (pokemonBolsa, botaoRemover) => {
  const removerPokemon = () => {
    if (pokemonsNaBolsaPersonagem.length > 1) {
      const index = pokemonsNaBolsaPersonagem.findIndex((poke) => poke === pokemonBolsa);
      pokemonsNaBolsaPersonagem.splice(index, 1);
      pokemonsNoDepotePersonagem.unshift(pokemonBolsa);
      pokemonPreRemovido.length = 0;
      localStorage.setItem("personagem", JSON.stringify(personagem));
      aparecerListaPokemons();
    }
  };
  botaoRemover.addEventListener("click", removerPokemon);
};

const adicionarPokemonNaBolsa = (pokemonDepote, botaoAdicionar) => {
  const adicionarPokemon = () => {
    const index = pokemonsNoDepotePersonagem.findIndex((poke) => poke === pokemonDepote);
    pokemonsNoDepotePersonagem.splice(index, 1);
    pokemonsNaBolsaPersonagem.push(pokemonDepote);
    pokemonPreAdicionado.length = 0;
    localStorage.setItem("personagem", JSON.stringify(personagem));
    aparecerListaPokemons();
  };
  botaoAdicionar.addEventListener("click", adicionarPokemon);
};

const removerPokemonDaBolsaNoDepote = (pokemonBolsa, botaoPokemonNaBolsa, botaoRemover) => {
  const posibilitarRemoverPokemon = () => {
    if (pokemonPreRemovido.length < 5) {
      pokemonPreRemovido.push(pokemonBolsa);
    }
    if (pokemonPreRemovido.includes(pokemonBolsa)) {
      botaoPokemonNaBolsa.classList.add("botaoPokemon-active");
    }
    if (pokemonsNaBolsaPersonagem.length > 1) {
      botaoRemover.classList.remove("botaoDesabilitado");
      removerPokemonDaBolsa(pokemonBolsa, botaoRemover);
    }
  };
  botaoPokemonNaBolsa.addEventListener("click", posibilitarRemoverPokemon);
};

const adicionarPokemonDoDepoteNaBolsa = (pokemonDepote, botaoPokemonNoDepote, botaoAdicionar) => {
  const posibilitarAdicionarPokemon = () => {
    if (pokemonsNaBolsaPersonagem.length + pokemonPreAdicionado.length < 6) {
      pokemonPreAdicionado.push(pokemonDepote);
    }
    if (pokemonPreAdicionado.includes(pokemonDepote)) {
      botaoPokemonNoDepote.classList.add("botaoPokemon-active");
    }
    if (pokemonsNaBolsaPersonagem.length < 6 && pokemonPreAdicionado.includes(pokemonDepote)) {
      botaoAdicionar.classList.remove("botaoDesabilitado");
      adicionarPokemonNaBolsa(pokemonDepote, botaoAdicionar);
    }
  };
  botaoPokemonNoDepote.addEventListener("click", posibilitarAdicionarPokemon);
};

// document.body.onload = function () {
//   spritePersonagem.posicaoX = personagem.posicaoX;
//   spritePersonagem.posicaoY = personagem.posicaoY;
//   setInterval(() => {
//     personagem.posicaoX = spritePersonagem.posicaoX;
//     personagem.posicaoY = spritePersonagem.posicaoY;
//     localStorage.setItem("personagem", JSON.stringify(personagem));
//     console.log("save");
//   }, 5000);
// };
// loop();

//Soundtrack
//1, 2, 17,18,20,23,24,25,26?,28,34?,43?,46,50,83,85,
