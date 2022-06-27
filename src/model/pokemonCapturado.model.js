import { Pokemon } from "./pokemon.model.js";

export class PokemonCapturado extends Pokemon {
  pokemonInicial;
  constructor(pokemonPrototipo) {
    super(pokemonPrototipo);
    this.pokemonInicial = false;
  }
}
