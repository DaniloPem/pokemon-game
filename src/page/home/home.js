import { audio } from "../../../sounds/audio.js";
import { Personagem } from "../../model/personagem.model.js";
import { iniciarBatalha } from "../batalha/batalha-page.js";
import { aparecerTelaInicial } from "../inicio/inicio-page.js";

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

let personagem;

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

let podeAndar = true;

//Rodando infinitamente
const loop = () => {
  window.requestAnimationFrame(loop, canvas);
  update();
  console.log(spritePersonagem);
  render();
};

//Pra fazer atualizacoes
const update = () => {
  if (podeAndar) {
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
      (spritePersonagem.posicaoX > 2105 &&
        spritePersonagem.posicaoX < 2150 &&
        spritePersonagem.posicaoY < 137 &&
        spritePersonagem.posicaoY > 110) ||
      (spritePersonagem.posicaoX > 4949 &&
        spritePersonagem.posicaoX < 5001 &&
        spritePersonagem.posicaoY < 580 &&
        spritePersonagem.posicaoY > 546)
    ) {
      podeAndar = false;
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
      const { msgDisponivelPokebolas, botaoAceitar, mensagemJoy, botaoCurar, botaoPokebolas } =
        aparecerNurseJoy(centroPokemon);
      temporizarBotaoPokebolas(msgDisponivelPokebolas);
      sairDoCentroPokemon(main, botaoAceitar);
      curarPokemonsDaBolsa(mensagemJoy, botaoCurar);
      obterMaisPokebolas(mensagemJoy, msgDisponivelPokebolas, botaoPokebolas);
    }
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
  if (
    !(
      (spritePersonagem.posicaoX > 2085 &&
        spritePersonagem.posicaoX < 2172 &&
        spritePersonagem.posicaoY < 180 &&
        spritePersonagem.posicaoY > 100) ||
      (spritePersonagem.posicaoX > 4925 &&
        spritePersonagem.posicaoX < 5030 &&
        spritePersonagem.posicaoY < 600 &&
        spritePersonagem.posicaoY > 520)
    )
  ) {
    const numeroConstante = 0.005;
    const numeroAleatorio = Math.random();
    if (numeroAleatorio <= numeroConstante) {
      personagem.posicaoX = spritePersonagem.posicaoX;
      personagem.posicaoY = spritePersonagem.posicaoY;
      const divTransicao = document.querySelector("#divTransicao");
      divTransicao.style.display = "block";
      divTransicao.style.opacity = 0;
      podeAndar = false;
      audio.mapa.stop();
      audio.transicaoPraBatalha.play();
      setTimeout(() => audio.batalha.play(), 3000);
      gsap.to("#divTransicao", {
        opacity: 1,
        repeat: 3,
        yoyo: true,
        duration: 0.4,
        onComplete() {
          gsap.to("#divTransicao", {
            opacity: 1,
            duration: 0.4,
            onComplete() {
              localStorage.setItem("personagem", JSON.stringify(personagem));
              iniciarBatalha();
              const telaBatalha = document.getElementById("tela-batalha");
              const mapaDoJogo = document.querySelector("main");
              telaBatalha.style.display = "block";
              mapaDoJogo.style.display = "none";
              // location.href = "../batalha/batalha-page.html";
            },
          });
        },
      });
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
  if (personagem.pokemonsNaBolsa.length === 1) {
    botaoRemover.classList.add("botaoDesabilitado");
  }
  personagem.pokemonsNaBolsa.forEach((pokemonBolsa) => {
    const botaoPokemonNaBolsa = aparecerBotoesPokemonBolsa(pokemonBolsa, listaPokemonBolsa);
    removerPokemonDaBolsaNoDepote(pokemonBolsa, botaoPokemonNaBolsa, botaoRemover);
  });
  if (personagem.pokemonsNoDepote.length != 0) {
    const { botaoAdicionar, listaPokemonDepote, divPokemonDepote } = aparecerListaPokemonsDepote(divListaPokemons);
    if (personagem.pokemonsNaBolsa.length === 6) {
      botaoAdicionar.classList.add("botaoDesabilitado");
    }
    personagem.pokemonsNoDepote.forEach((pokemonDepote) => {
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
  if (personagem.pokemonsNoDepote.length >= 6) {
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
    if (personagem.pokemonsNaBolsa.length > 1) {
      const index = personagem.pokemonsNaBolsa.findIndex((poke) => poke === pokemonBolsa);
      personagem.pokemonsNaBolsa.splice(index, 1);
      personagem.pokemonsNoDepote.unshift(pokemonBolsa);
      pokemonPreRemovido.length = 0;
      localStorage.setItem("personagem", JSON.stringify(personagem));
      aparecerListaPokemons();
    }
  };
  botaoRemover.addEventListener("click", removerPokemon);
};

const adicionarPokemonNaBolsa = (pokemonDepote, botaoAdicionar) => {
  const adicionarPokemon = () => {
    const index = personagem.pokemonsNoDepote.findIndex((poke) => poke === pokemonDepote);
    personagem.pokemonsNoDepote.splice(index, 1);
    personagem.pokemonsNaBolsa.push(pokemonDepote);
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
    if (personagem.pokemonsNaBolsa.length > 1) {
      botaoRemover.classList.remove("botaoDesabilitado");
      removerPokemonDaBolsa(pokemonBolsa, botaoRemover);
    }
  };
  botaoPokemonNaBolsa.addEventListener("click", posibilitarRemoverPokemon);
};

const adicionarPokemonDoDepoteNaBolsa = (pokemonDepote, botaoPokemonNoDepote, botaoAdicionar) => {
  const posibilitarAdicionarPokemon = () => {
    if (personagem.pokemonsNaBolsa.length + pokemonPreAdicionado.length < 6) {
      pokemonPreAdicionado.push(pokemonDepote);
    }
    if (pokemonPreAdicionado.includes(pokemonDepote)) {
      botaoPokemonNoDepote.classList.add("botaoPokemon-active");
    }
    if (personagem.pokemonsNaBolsa.length < 6 && pokemonPreAdicionado.includes(pokemonDepote)) {
      botaoAdicionar.classList.remove("botaoDesabilitado");
      adicionarPokemonNaBolsa(pokemonDepote, botaoAdicionar);
    }
  };
  botaoPokemonNoDepote.addEventListener("click", posibilitarAdicionarPokemon);
};

const aparecerNurseJoy = (centroPokemon) => {
  podeAndar = false;
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
  botaoAceitar.innerText = "Aceitar";
  return { msgDisponivelPokebolas, botaoAceitar, mensagemJoy, botaoCurar, botaoPokebolas };
};

const temporizarBotaoPokebolas = (msgDisponivelPokebolas) => {
  const dataAtual = new Date();
  const dataUltimaAdicao = new Date(localStorage.getItem("dataPokebola"));
  const sustracaoDasDatas = Math.floor((dataAtual.getTime() - dataUltimaAdicao.getTime()) / (1000 * 60));
  if (sustracaoDasDatas > 5) {
    msgDisponivelPokebolas.innerHTML = `Disponível agora.`;
  } else {
    msgDisponivelPokebolas.innerHTML = `Disponível em ${5 - sustracaoDasDatas} min.`;
  }
};

const obterMaisPokebolas = (mensagemJoy, msgDisponivelPokebolas, botaoPokebolas) => {
  const adicionarPokebolas = () => {
    const dataAtual = new Date();
    const dataUltimaAdicao = new Date(localStorage.getItem("dataPokebola")) || new Date();
    dataUltimaAdicao.setMinutes(dataUltimaAdicao.getMinutes() + 5);
    if (dataAtual > dataUltimaAdicao) {
      personagem.itens.forEach((pokebola) => (pokebola.quantidade += 3));
      localStorage.setItem("dataPokebola", dataAtual);
      mensagemJoy.innerText = `${personagem.nomeUser}, você recebeu 3 pokebolas por cada tipo de pokeball!`;
      msgDisponivelPokebolas.innerHTML = `Disponível em 5 min.`;
    } else {
      mensagemJoy.innerText = `${personagem.nomeUser}, você não pode receber pokebolas agora. Tente mais tarde.`;
    }
  };
  botaoPokebolas.addEventListener("click", adicionarPokebolas);
};

const curarPokemonsDaBolsa = (mensagemJoy, botaoCurar) => {
  const curarPokemons = () => {
    personagem.pokemonsNaBolsa.forEach((pokemon) => {
      pokemon.vida = pokemon.vidaOriginal;
      pokemon.habilidades.forEach((habilidade) => (habilidade.pontosPoder = habilidade.pontosMax));
    });
    mensagemJoy.innerText = `${personagem.nomeUser}, seus pokemons estão curados!`;
  };
  botaoCurar.addEventListener("click", curarPokemons);
};

const sairDoCentroPokemon = (main, botaoAceitar) => {
  const fecharCentroPokemon = () => {
    main.removeChild(main.children.namedItem("centro-pokemon"));
    spritePersonagem.img = imagemPersonagem;
    podeAndar = true;
  };
  botaoAceitar.addEventListener("click", fecharCentroPokemon);
};

export const atualizarPodeAndar = (valor) => {
  podeAndar = valor;
  personagem = Personagem.criarAPartirDoLocalStorage(JSON.parse(localStorage.getItem("personagem")));
  console.log(personagem);
};

export const carregarJogo = () => {
  personagem = Personagem.criarAPartirDoLocalStorage(JSON.parse(localStorage.getItem("personagem")));
  spritePersonagem.posicaoX = personagem.posicaoX;
  spritePersonagem.posicaoY = personagem.posicaoY;
  loop();
  setInterval(() => {
    if (podeAndar) {
      personagem.posicaoX = spritePersonagem.posicaoX;
      personagem.posicaoY = spritePersonagem.posicaoY;
      localStorage.setItem("personagem", JSON.stringify(personagem));
    }
  }, 5000);
};

const infosPersonagemSalvas = localStorage.getItem("personagem");
if (!!infosPersonagemSalvas) {
  carregarJogo();
} else {
  aparecerTelaInicial();
}
