import { Pokemon } from "../model/pokemon.model";

let pokemons; 
readTextFile('../../pokemon-config-json', (response) => pokemons = JSON.parse(response));

export const buscarPokemonAleatorio = () => {
    return new Pokemon
}