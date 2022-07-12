export const audio = {
  telaInicio: new Howl({
    src: "../../../assets/musicas/tela-inicio.mp3",
    html5: true,
    volume: 0.4,
    loop: true,
  }),
  click: new Howl({
    src: "../../../assets/musicas/click.mp3",
    html5: true,
    volume: 0.6,
  }),
  transicaoPraBatalha: new Howl({
    src: "../../../assets/musicas/transicaoPraBatalha.mp3",
    html5: true,
    volume: 0.4,
  }),
  batalha: new Howl({
    src: "../../../assets/musicas/batalha.mp3",
    html5: true,
    volume: 0.4,
    loop: true,
  }),
};
