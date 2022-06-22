import { Pokemon } from "./pokemon.model.js";

export class PokemonCapturado extends Pokemon {
  pokemonInicial;
  constructor(pokemonPrototipo) {
    super(pokemonPrototipo);
    this.pokemonInicial = false;
  }
}

export const pokeInicial = new PokemonCapturado({
  tipos: ["Planta", "Veneno"],
  nome: "Venusaur",
  habilidades: [
    { nome: "Headbutt", tipo: "Normal", forca: 30 },
    { nome: "Vine Whip", tipo: "Planta", forca: 40 },
    { nome: "Toxic", tipo: "Veneno", forca: 70 },
    { nome: "Razor Leaf", tipo: "Planta", forca: 60 },
    { nome: "Petal Dance", tipo: "Planta", forca: 80 },
    { nome: "Solar Beam", tipo: "Planta", forca: 100 },
  ],
  vidaOriginal: 100,
  debilidades: [
    { tipo: "Agua", dano: "0.6" },
    { tipo: "Planta", dano: "0.3" },
    { tipo: "Luta", dano: "0.6" },
    { tipo: "Elétrico", dano: "0.6" },
    { tipo: "Fada", dano: "0.6" },
    { tipo: "Voador", dano: "1.6" },
    { tipo: "Fogo", dano: "1.6" },
    { tipo: "Psíquico", dano: "1.6" },
    { tipo: "Gelo", dano: "1.6" },
    { tipo: "Veneno", dano: "0.6" },
    { tipo: "Pedra", dano: "0.5" },
    { tipo: "Terra", dano: "0.6" },
    { tipo: "Inseto", dano: "0.5" },
    { tipo: "Ferro", dano: "0.6" },
  ],
  evolucao: null,
  level: 30,
  backDefault: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png",
  frontDefault: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/3.png",
});
