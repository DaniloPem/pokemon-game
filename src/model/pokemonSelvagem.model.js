import { Pokemon } from "./pokemon.model.js";

export class PokemonSelvagem extends Pokemon {
  constructor(pokemonPrototipo) {
    super(pokemonPrototipo);
    this.level = this.gerarNivel();
    this.experiencia = this.experienciaAleatoria();
  }

  gerarNivel() {
    const pegarNivelAleatorio = () => {
      return Math.floor(Math.random() * (this.levelMax - this.levelMin + 1)) + this.levelMin;
    };
    const nivelAleatorio = pegarNivelAleatorio();
    return nivelAleatorio;
  }

  gerarExperiencia() {
    const pegarExperienciaAleatoria = () => {
      return Math.round(Math.random() * 99);
    };
    const experienciaAleatoria = pegarExperienciaAleatoria();
    return experienciaAleatoria;
  }
}
