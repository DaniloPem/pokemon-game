export const audio = {
  telaInicio: new Howl({
    src: "../../../assets/musicas/tela-inicio.mp3",
    html5: true,
    volume: 0.3,
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
    volume: 0.2,
    loop: true,
  }),
  ataque: new Howl({
    src: "../../../assets/musicas/ataque.wav",
    html5: true,
    volume: 0.7,
  }),
  mapa: new Howl({
    src: "../../../assets/musicas/mapa.mp3",
    html5: true,
    volume: 0.2,
    loop: true,
  }),
  select: new Howl({
    src: "../../../assets/musicas/select.mp3",
    html5: true,
    volume: 0.7,
  }),
};
