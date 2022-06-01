const jogador = new Personagem();

function capturar(pokemon: PokemonSelvagem, pokebola: Pokebola) {
    const dificuldadeCaptura = pokemon.getDificuldadeCaptura(); // 0 - 1
    const chanceCaptura = pokebola.getChanceDeCaptura();// 1+
    const efeitoCaptura = Math.random() * chanceCaptura; // 0 - 1
    if (efeitoCaptura >= dificuldadeCaptura) {
        jogador.capturar(pokemon);
    }
}
