class Personagem {
  nomeUser;
  imagemPersonagem;
  pokemonsNaBolsa;

  constructor(nomeUser, imagemPersonagem) {
    this.nomeUser = nomeUser;
    this.imagemPersonagem = imagemPersonagem;
    this.pokemonsNaBolsa = [];
  }

  capturar(pokemonSelvagem) {
    this.pokemons.push(pokemonSelvagem);
  }
}

export const personagem = new Personagem();
