const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

// Recursos do jogo
const backgroundHome = new Image();
backgroundHome.src = "../../../assets/imagem/backgroundHome.png";

//Objetos
const sprites = [];
const cenario = {
  img: backgroundHome,
  x: 500,
  y: 650,
  width: 3360,
  height: 1920,
};
sprites.push(cenario);

//Rodando infinitamente
const loop = () => {
  window.requestAnimationFrame(loop, canvas);
  update();
  render();
};

//Pra fazer atualizacoes
const update = () => {};

//Desenhar funcoes na tela
const render = () => {
  contexto.drawImage(backgroundHome, 500, 650, 3360, 1920, 0, 0, 3360, 1920);
};

loop();
