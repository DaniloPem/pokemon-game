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

    constructor (tipo, nome, habilidades, vidaOriginal, debilidades, evolucao, level, backDefault,
        frontDefault, icon) {
            this.tipo = tipo;
            this.nome = nome;
            this.habilidades = habilidades;
            this.vidaOriginal = vidaOriginal;
            this.vida = vidaOriginal;
            this.debilidades = debilidades;
            this.evolucao = evolucao;
            this.level = level; 
            this.backDefault = backDefault;
            this. frontDefault = frontDefault;
            this.icon = icon; 
        }

    atacar(habilidade, pokemon) {
        const debilidadePokemon = pokemon.debilidades.find((debilidade) => debilidade.tipo === habilidade.tipo);
        const multiplicadorDano = !!debilidadePokemon ? debilidadePokemon.dano : 1;
        const vidaPokemon = pokemon.vida - habilidade.forca * multiplicadorDano;
        pokemon.vida = vidaPokemon;
    }

    atacarAleatorio(pokemonAlvo) {
        const numeroAleatorio = Math.round(Math.random()*(this.habilidades.length-1))
        this.atacar(this.habilidades[numeroAleatorio], pokemonAlvo)
    }
}
