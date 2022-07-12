import { Pokemon } from "./pokemon.model.js";
import { buscarPokemonPorNome } from "../repository/pokemon.repository.js";

export class PokemonCapturado extends Pokemon {
  pokemonInicial;
  constructor(pokemonPrototipo) {
    super(pokemonPrototipo);
    this.pokemonInicial = false;
    this.experienciaGanhada = this.experienciaGanhada;
  }

  adicionarExperienciaGanhada(pokemon, bonusCaptura) {
    this.experienciaGanhada = 4 * pokemon.level * (1 - pokemon.vida / pokemon.vidaOriginal) * (1 + bonusCaptura);
  }

  somarExperiencia() {
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
    if (this.level > this.levelMax && !!this.evolucao) {
      const pokemonPrototipo = buscarPokemonPorNome(this.evolucao);
      pokemonPrototipo.level = this.level;
      pokemonPrototipo.experiencia = this.experiencia;
      Object.assign(this, new PokemonCapturado(pokemonPrototipo));
    }
  }
}
