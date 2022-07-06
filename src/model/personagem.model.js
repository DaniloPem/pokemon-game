import { pokebolas } from "./pokebola.model.js";
import { PokemonCapturado } from "./pokemonCapturado.model.js";

export class Personagem {
  nomeUser;
  pokemonsNaBolsa;
  pokemonsNoDepote;
  itens;
  posicaoX;
  posicaoY;

  constructor(nomeUser, pokemonsNaBolsa, pokemonsNoDepote, itens, posicaoX, posicaoY) {
    this.nomeUser = nomeUser;
    this.pokemonsNaBolsa = pokemonsNaBolsa;
    this.pokemonsNoDepote = pokemonsNoDepote;
    this.itens = itens;
    this.posicaoX = posicaoX;
    this.posicaoY = posicaoY;
  }

  static criarPersonagemInicial(usuario, pokeInicial) {
    return new Personagem(
      usuario,
      [pokeInicial],
      [],
      [
        { quantidade: 10, descricaoItem: pokebolas.pokeball },
        { quantidade: 5, descricaoItem: pokebolas.greatball },
        { quantidade: 2, descricaoItem: pokebolas.ultraball },
      ],
      2061,
      180
    );
  }

  static criarAPartirDoLocalStorage(personagem) {
    return new Personagem(
      personagem.nomeUser,
      personagem.pokemonsNaBolsa.map((dadosPokemon) => new PokemonCapturado(dadosPokemon)),
      personagem.pokemonsNoDepote.map((dadosPokemon) => new PokemonCapturado(dadosPokemon)),
      personagem.itens,
      personagem.posicaoX,
      personagem.posicaoY
    );
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
Personagem.criarPersonagemInicial();
