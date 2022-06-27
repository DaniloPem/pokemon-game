import { PokemonSelvagem } from "../model/pokemonSelvagem.model.js";
import { readTextFile } from "./file-reader.js";

let pokemons;
readTextFile("../../../pokemon-config.json", (response) => (pokemons = JSON.parse(response)));
Object.freeze(pokemons);

export const buscarPokemonAleatorio = () => {
  const listaPokemons = Object.keys(pokemons);
  const numAleatorio = Math.round(Math.random() * (listaPokemons.length - 1));
  const pokemonAleatorio = listaPokemons[numAleatorio];
  return new PokemonSelvagem(pokemons[pokemonAleatorio]);
};

export const pegarPokemonsIniciais = () => {
  const listaPokemons = Object.keys(pokemons);
  const listaPokemonsInicias = [listaPokemons[0], listaPokemons[3], listaPokemons[6]];
  return listaPokemonsInicias.map((pokeInicial) => new PokemonSelvagem(pokemons[pokeInicial]));
};
