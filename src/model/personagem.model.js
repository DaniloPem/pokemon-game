import { buscarPokemonAleatorio } from "../repository/pokemon.repository.js";
import { pokebolas } from "./pokebola.model.js";

export class Personagem {
  nomeUser;
  imagemPersonagem;
  pokemonsNaBolsa;
  itens;

  constructor(nomeUser, imagemPersonagem) {
    this.nomeUser = nomeUser;
    this.imagemPersonagem = imagemPersonagem;
    this.pokemonsNaBolsa = [];
    this.itens = [
      { quantidade: 10, descricaoItem: pokebolas.pokeball },
      { quantidade: 5, descricaoItem: pokebolas.greatball },
      { quantidade: 2, descricaoItem: pokebolas.ultraball },
    ];
  }

  capturar(pokemonSelvagem) {
    this.pokemonsNaBolsa.push(pokemonSelvagem);
  }
}

export const personagem = new Personagem();
// personagem.capturar(buscarPokemonAleatorio());
// personagem.capturar(buscarPokemonAleatorio());
// personagem.capturar(buscarPokemonAleatorio());
