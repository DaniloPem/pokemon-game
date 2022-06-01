class Personagem {
    private nomeUser: string;
    private imagemPersonagem: string;
    private pokemons: Pokemon[];

    constructor() {
        this.pokemons = []
    }

    capturar(pokemonSelvagem: PokemonSelvagem) {
        this.pokemons.push(pokemonSelvagem);
    }

}