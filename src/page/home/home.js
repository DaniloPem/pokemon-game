import { Personagem } from "../../model/personagem.model.js";

const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

// Recursos do jogo
const backgroundHome = new Image();
backgroundHome.src = "../../../assets/imagem/backgroundHome.png";

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
  largura: 3360,
  altura: 1920,
};
sprites.push(cenario);

const personagem =
  localStorage.getItem("personagem") !== null
    ? Personagem.criarAPartirDoLocalStorage(JSON.parse(localStorage.getItem("personagem")))
    : Personagem.criarPersonagemInicial();

const spritePersonagem = {
  img: imagemPersonagem,
  x: 0,
  y: 0,
  posicaoX: null,
  posicaoY: null,
  largura: 80,
  altura: 80,
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
    spritePersonagem.posicaoX -= 4;
    verificarPokemonsSelvagem();
  }
  if (keymap["ArrowRight"]) {
    spritePersonagem.posicaoX += 4;
    verificarPokemonsSelvagem();
  }
  if (keymap["ArrowUp"]) {
    spritePersonagem.posicaoY -= 4;
    verificarPokemonsSelvagem();
  }
  if (keymap["ArrowDown"]) {
    spritePersonagem.posicaoY += 4;
    verificarPokemonsSelvagem();
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
};

//Desenhar funcoes na tela
const render = () => {
  contexto.save();
  contexto.translate(-camera.x, -camera.y);
  sprites.forEach((sprite) => {
    contexto.drawImage(
      sprite.img,
      sprite.x,
      sprite.y,
      sprite.largura,
      sprite.altura,
      sprite.posicaoX,
      sprite.posicaoY,
      sprite.largura,
      sprite.altura
    );
  });
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

document.body.onload = function () {
  spritePersonagem.posicaoX = personagem.posicaoX;
  spritePersonagem.posicaoY = personagem.posicaoY;
};
loop();

//Soundtrack
//17,18,20,23,24,25,26?,28,34?,43?,46,50,83,85,
