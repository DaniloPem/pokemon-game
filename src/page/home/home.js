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
  largura: 6144,
  altura: 3072,
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

// const imagens = [0, 1, 2, 3, 0];
// let indiceImagens = 0;
// function passos(posicaoSpriteMovimentoX, posicaoSpriteMovimentoY) {
//   posicaoSpriteMovimentoX = spritePersonagem.largura * imagens[indiceImagens];
//   posicaoSpriteMovimentoY = spritePersonagem.altura;
//   indiceImagens++;
//   if (indiceImagens > 4) {
//     indiceImagens = 0;
//   }
// }

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
  console.log(spritePersonagem.posicaoX);
  console.log(spritePersonagem.posicaoY);
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

document.body.onload = function () {
  spritePersonagem.posicaoX = personagem.posicaoX;
  spritePersonagem.posicaoY = personagem.posicaoY;
};
loop();

//Soundtrack
//1, 2, 17,18,20,23,24,25,26?,28,34?,43?,46,50,83,85,
