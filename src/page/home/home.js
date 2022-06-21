const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

// Recursos do jogo
const backgroundHome = new Image();
backgroundHome.src = "../../../assets/imagem/backgroundHome.png";

const spritePersonagem = new Image();
spritePersonagem.src = "../../../assets/imagem/personagem.png";

//Objetos
const sprites = [];
const cenario = {
  img: backgroundHome,
  x: 500,
  y: 650,
  posicaoX: 0,
  posicaoY: 0,
  largura: 3360,
  altura: 1920,
};
sprites.push(cenario);

const personagem = {
  img: spritePersonagem,
  x: 0,
  y: 0,
  posicaoX: canvas.clientWidth / 2,
  posicaoY: canvas.clientHeight / 2,
  largura: 80,
  altura: 80,
};
sprites.push(personagem);

const camera = {
  x: 500,
  y: 650,
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

document.addEventListener("keydown", (e) => {
  keymap[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keymap[e.key] = false;
});

//Rodando infinitamente
const loop = () => {
  window.requestAnimationFrame(loop, canvas);
  update();
  render();
};

//Pra fazer atualizacoes
const update = () => {
  if (keymap["ArrowLeft"]) {
    personagem.posicaoX -= 4;
  }
  if (keymap["ArrowRight"]) {
    personagem.posicaoX += 4;
  }
  if (keymap["ArrowUp"]) {
    personagem.posicaoY -= 4;
  }
  if (keymap["ArrowDown"]) {
    personagem.posicaoY += 4;
  }
};

//Desenhar funcoes na tela
const render = () => {
  contexto.save();
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

loop();
