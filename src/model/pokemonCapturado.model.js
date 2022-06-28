import { Pokemon } from "./pokemon.model.js";

export class PokemonCapturado extends Pokemon {
  pokemonInicial;
  constructor(pokemonPrototipo) {
    super(pokemonPrototipo);
    this.pokemonInicial = false;
    this.experienciaGanhada = this.experienciaGanhada;
  }

  adicionarExperienciaGanhada(pokemon, bonus) {
    this.experienciaGanhada = 4 * pokemon.level * (1 - pokemon.vida / pokemon.vidaOriginal) * (1 + bonus);
  }

  sumarExperiencia() {
    const sumaDasExperiencias = this.experiencia + this.experienciaGanhada;
    if (sumaDasExperiencias > 100) {
      this.level += 1;
      this.experiencia = sumaDasExperiencias - 100;
      this.experienciaGanhada = 0;
    } else if (sumaDasExperiencias === 100) {
      this.level += 1;
      this.experiencia = 0;
      this.experienciaGanhada = 0;
    } else {
      this.experiencia = sumaDasExperiencias;
      this.experienciaGanhada = 0;
    }
  }
}
