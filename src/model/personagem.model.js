import { buscarPokemonAleatorio } from "../repository/pokemon.repository.js";
import { pokebolas } from "./pokebola.model.js";
import { pokeInicial } from "./pokemonCapturado.model.js";

export class Personagem {
  nomeUser;
  imagemPersonagem;
  pokemonsNaBolsa;
  pokemonsNoDepote;
  itens;

  constructor(nomeUser, imagemPersonagem) {
    this.nomeUser = nomeUser;
    this.imagemPersonagem = imagemPersonagem;
    this.pokemonsNaBolsa = [pokeInicial];
    this.pokemonsNoDepote = [];
    this.itens = [
      { quantidade: 10, descricaoItem: pokebolas.pokeball },
      { quantidade: 5, descricaoItem: pokebolas.greatball },
      { quantidade: 2, descricaoItem: pokebolas.ultraball },
    ];
  }

  capturar(pokemonSelvagem) {
    if (this.pokemonsNaBolsa.length < 6) {
      this.pokemonsNaBolsa.push(pokemonSelvagem);
    } else {
      this.pokemonsNoDepote.push(pokemonSelvagem);
    }
  }
}

export const personagem = new Personagem();
// personagem.capturar(buscarPokemonAleatorio());
// personagem.capturar(buscarPokemonAleatorio());
// personagem.capturar(buscarPokemonAleatorio());
