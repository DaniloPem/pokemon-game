export class Pokemon {
  tipo;
  nome;
  habilidades;
  vidaOriginal;
  vida;
  debilidades;
  evolucao;
  level;
  backDefault;
  frontDefault;
  icon;

  constructor(pokemonPrototipo) {
    this.tipo = pokemonPrototipo.tipo;
    this.nome = pokemonPrototipo.nome;
    this.habilidades = pokemonPrototipo.habilidades;
    this.vidaOriginal = pokemonPrototipo.vidaOriginal;
    this.vida = pokemonPrototipo.vidaOriginal;
    this.debilidades = pokemonPrototipo.debilidades;
    this.evolucao = pokemonPrototipo.evolucao;
    this.level = pokemonPrototipo.level;
    this.backDefault = pokemonPrototipo.backDefault;
    this.frontDefault = pokemonPrototipo.frontDefault;
    this.icon = pokemonPrototipo.icon;
  }

  atacar(habilidade, pokemon) {
    if (this.vida > 0 && pokemon.vida > 0) {
      const debilidadePokemon = pokemon.debilidades.find((debilidade) => debilidade.tipo === habilidade.tipo);
      const multiplicadorDano = !!debilidadePokemon ? debilidadePokemon.dano : 1;
      const vidaPokemon = pokemon.vida - habilidade.forca * multiplicadorDano;
      pokemon.vida = vidaPokemon;
    }
  }

  atacarAleatorio(pokemonAlvo) {
    const numeroAleatorio = Math.round(Math.random() * (this.habilidades.length - 1));
    this.atacar(this.habilidades[numeroAleatorio], pokemonAlvo);
  }
}
