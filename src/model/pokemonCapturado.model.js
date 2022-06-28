import { Pokemon } from "./pokemon.model.js";

export class PokemonCapturado extends Pokemon {
  pokemonInicial;
  constructor(pokemonPrototipo) {
    super(pokemonPrototipo);
    this.pokemonInicial = false;
    this.experienciaGanhada = this.experienciaGanhada;
  }

  adicionarExperiencia(pokemon, bonus) {
    this.experienciaGanhada = 4 * pokemon.level * (1 - pokemon.vida / pokemon.vidaOriginal) * (1 + bonus);
  }
}
