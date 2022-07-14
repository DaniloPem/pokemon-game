export const criarBotaoPokemon = (pokemon) => {
  const porcentagemVida = (pokemon.vida / pokemon.vidaOriginal) * 100;
  const button = document.createElement("button");
  button.innerHTML = `
    <div class="icone-pokemon-conteiner">
      <img src="${pokemon.icon}" />
    </div>
    <div class="nome-hp-nv-conteiner">
      <div class="nome-sexo-tipo-pokemon">
        <div>
          <span>${pokemon.nome}</span>
          <img class="icone-sexo" src="../../../assets/icone/icone-${pokemon.sexo}.svg" style="color: blue" />
        </div>
        <div class="icone-tipos-pokemon">
          <img src="../../../assets/icone/${pokemon.tipos[1].toLowerCase()}.png" />
          <img src="../../../assets/icone/${pokemon.tipos[0].toLowerCase()}.png" />
        </div>
      </div>

      <div class="barra-hp-pokemon" style="width:${porcentagemVida}%; background-color:${calcularCor(
    porcentagemVida
  )}"></div>
      <div class="pp-lv">
        <span>${pokemon.vida}/${pokemon.vidaOriginal}</span>
        <span>Nv ${pokemon.level}</span>
      </div>
    </div>`;
  return button;
};

const calcularCor = (porcentagemVida) => {
  if (porcentagemVida > 50) {
    return "green";
  } else if (porcentagemVida > 20) {
    return "#D8DC00";
  } else {
    return "red";
  }
};
