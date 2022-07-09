export class Pokemon {
  tipos;
  nome;
  habilidades;
  vidaOriginal;
  vida;
  debilidades;
  evolucao;
  levelMin;
  levelMax;
  level;
  experiencia;
  ratioCaptura;
  backDefault;
  frontDefault;
  icon;
  animacao;

  constructor(pokemonPrototipo) {
    this.tipos = pokemonPrototipo.tipos;
    this.nome = pokemonPrototipo.nome;
    this.habilidades = pokemonPrototipo.habilidades;
    this.vidaOriginal = pokemonPrototipo.vidaOriginal;
    this.vida = pokemonPrototipo.vida !== undefined ? pokemonPrototipo.vida : pokemonPrototipo.vidaOriginal;
    this.debilidades = pokemonPrototipo.debilidades;
    this.evolucao = pokemonPrototipo.evolucao;
    this.levelMin = pokemonPrototipo.levelMin;
    this.levelMax = pokemonPrototipo.levelMax;
    this.level = pokemonPrototipo.level;
    this.experiencia = pokemonPrototipo.experiencia;
    this.ratioCaptura = pokemonPrototipo.ratioCaptura;
    this.backDefault = pokemonPrototipo.backDefault;
    this.frontDefault = pokemonPrototipo.frontDefault;
    this.icon = pokemonPrototipo.icon;
    this.animacao = pokemonPrototipo.animacao;
  }

  atacar(habilidade, pokemon) {
    if (this.vida > 0 && pokemon.vida > 0) {
      const debilidadePokemon = pokemon.debilidades.find((debilidade) => debilidade.tipo === habilidade.tipo);
      const multiplicadorDano = !!debilidadePokemon ? debilidadePokemon.dano : 1;
      const danoBaseadoNoNivel = 1 + (this.level - pokemon.level) / 30;
      const vidaPokemon = pokemon.vida - Math.round(habilidade.forca * multiplicadorDano * danoBaseadoNoNivel);
      pokemon.vida = vidaPokemon > 0 ? vidaPokemon : 0;
      habilidade.pontosPoder--;
      console.log(habilidade.pontosPoder);
    }
  }

  atacarAleatorio(pokemonAlvo) {
    const numeroAleatorio = Math.round(Math.random() * (this.habilidades.length - 1));
    this.atacar(this.habilidades[numeroAleatorio], pokemonAlvo);
    return this.habilidades[numeroAleatorio];
  }
}
