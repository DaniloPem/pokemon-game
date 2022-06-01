class Pokebola {
    private nomePokebola: string;
    private chanceDeCaptura: number;
    private imagemPokebola: string;

    constructor (nomePokebola: string, imagemPokebola: string) {
        this.nomePokebola = nomePokebola;
        this.imagemPokebola = imagemPokebola;
    }

    getNomePokebola(): string {
        return this.nomePokebola;
    }

    getChanceDeCaptura(): number {
        return this.chanceDeCaptura
    }

    getImagemPokebola(): string {
        return this.imagemPokebola
    }    
}