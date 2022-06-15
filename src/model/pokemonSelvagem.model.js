import { Pokemon } from "./pokemon.model.js";

export class PokemonSelvagem extends Pokemon {
  constructor(pokemonPrototipo) {
    super(pokemonPrototipo);
    this.level = this.gerarNivel();
  }

  gerarNivel() {
    const pegarNivelAleatorio = () => {
      return Math.floor(Math.random() * (this.levelMax - this.levelMin + 1)) + this.levelMin;
    };
    const nivelAleatorio = pegarNivelAleatorio();
    return nivelAleatorio;
  }
}
