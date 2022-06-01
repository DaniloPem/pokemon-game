class Pokemon {
    private tipo: string;
    private habilidade: Habilidade;
    private sexo: string;
    private evolucao: Pokemon;
    private estatisticasIV: EstatisticasIV;
    private experiencia: number;
    private nivel: number;

    constructor(tipo: string, habilidade: Habilidade, evolucao: Pokemon) {
        this.tipo = tipo;
        this.habilidade = habilidade;
        this.evolucao = evolucao;
        this.experiencia = 0;
        this.nivel = 0;
        this.atribuirSexo();
    }
    
    
    getTipo(): string {
        return this.tipo;
    }
    
    getHabilidade(): Habilidade {
        return this.habilidade;
    }
    
    getSexo(): string {
        return this.sexo
    }

    getEstatisticasIV(): EstatisticasIV {
        return this.estatisticasIV
    }

    getExperiencia(): number {
        return this.experiencia
    }

    getNivel(): number {
        return this.nivel
    }

    private atribuirSexo(): void {
        const masFem = Math.round(Math.random());
        this.sexo = masFem === 0 ? 'Femea' : 'Macho';   
    }
}

class PokemonSelvagem extends Pokemon {
    private dificuldadeCaptura: number;
    
    getDificuldadeCaptura(): number {
        return this.dificuldadeCaptura;
    }
}




