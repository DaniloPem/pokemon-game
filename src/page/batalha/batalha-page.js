import { criarBotaoPokemon } from "../../components/batalha/botaoPokemon.js";
import { personagem } from "../../model/personagem.model.js";
import { pokebolas } from "../../model/pokebola.model.js";
import { Pokemon } from "../../model/pokemon.model.js";
import { pokeInicial } from "../../model/pokemonCapturado.model.js";
import { buscarPokemonAleatorio } from "../../repository/pokemon.repository.js";

let pokemonCompetidor = pokeInicial;

const pokemonsPersonagem = personagem.pokemonsNaBolsa;
const pokemonOponente = buscarPokemonAleatorio();

const renderGame = () => {
  //Barras Versus
  const infoCompetidorBatalha = document.querySelector("#info-competidor-batalha");
  infoCompetidorBatalha.innerHTML = "";
  const nomeCompetidorBatalha = document.createElement("span");
  const nivelCompetidorBatalha = document.createElement("span");
  infoCompetidorBatalha.append(nomeCompetidorBatalha);
  infoCompetidorBatalha.append(nivelCompetidorBatalha);
  nomeCompetidorBatalha.innerHTML = `<span style="text-transform: uppercase">${pokemonCompetidor.nome}</span>`;
  nivelCompetidorBatalha.innerText = `Nv ${pokemonCompetidor.level}`;
  const barraVidaCompetidor = document.querySelector("#barra-vida-competidor");
  atualizarBarraVida(barraVidaCompetidor, pokemonCompetidor);

  const infoOponenteBatalha = document.querySelector("#info-oponente-batalha");
  infoOponenteBatalha.innerHTML = "";
  const nomeOponenteBatalha = document.createElement("span");
  const nivelOponenteBatalha = document.createElement("span");
  infoOponenteBatalha.append(nomeOponenteBatalha);
  infoOponenteBatalha.append(nivelOponenteBatalha);
  nomeOponenteBatalha.innerHTML = `<span style="text-transform: uppercase">${pokemonOponente.nome}</span>`;
  nivelOponenteBatalha.innerText = `Nv ${pokemonOponente.level}`;
  const barraVidaOponente = document.querySelector("#barra-vida-oponente");
  atualizarBarraVida(barraVidaOponente, pokemonOponente);

  //Icones dos Pokemon
  const divIconPokemonCompetidor = document.querySelector("#icon-pokemon-competidor");
  divIconPokemonCompetidor.innerHTML = "";
  const iconPokemonCompetidor = document.createElement("img");
  const urlIconPokemonCompetidor = pokemonCompetidor.icon;
  iconPokemonCompetidor.setAttribute("class", "img-icon-pokemon-competidor");
  iconPokemonCompetidor.setAttribute("src", urlIconPokemonCompetidor);
  divIconPokemonCompetidor.append(iconPokemonCompetidor);

  const divIconPokemonOponente = document.querySelector("#icon-pokemon-oponente");
  divIconPokemonOponente.innerHTML = "";
  const iconPokemonOponente = document.createElement("img");
  const urlIconPokemonOponente = pokemonOponente.icon;
  iconPokemonOponente.setAttribute("class", "img-icon-pokemon-oponente");
  iconPokemonOponente.setAttribute("src", urlIconPokemonOponente);
  divIconPokemonOponente.append(iconPokemonOponente);

  //Imagen dos Pokemon
  const divOponenteBatalha = document.querySelector("#oponente-batalha");
  divOponenteBatalha.innerHTML = "";
  const imgOponenteBatalha = document.createElement("img");
  const urlFrontDefault = pokemonOponente.frontDefault;
  imgOponenteBatalha.setAttribute("class", "img-oponente");
  imgOponenteBatalha.setAttribute("src", urlFrontDefault);
  divOponenteBatalha.append(imgOponenteBatalha);

  const divCompetidorBatalha = document.querySelector("#competidor-batalha");
  divCompetidorBatalha.innerHTML = "";
  const imgCompetidorBatalha = document.createElement("img");
  const urlBackDefault = pokemonCompetidor.backDefault;
  imgCompetidorBatalha.setAttribute("class", "img-competidor");
  imgCompetidorBatalha.setAttribute("src", urlBackDefault);
  divCompetidorBatalha.append(imgCompetidorBatalha);
};

//Botao Lutar
const botaoLutar = document.querySelector("#botao-lutar");
const aparecerAtaques = () => {
  const acoesBatalha = document.querySelector("#acoesDosBotoes");
  acoesBatalha.innerHTML = "";
  const divInfoBatalha = document.createElement("div");
  const infoBatalha = document.createElement("div");
  const divListaAtaques = document.createElement("div");
  const listaAtaques = document.createElement("div");
  const botoesAtaque = document.createElement("div");
  divInfoBatalha.setAttribute("class", "div-info-batalha");
  infoBatalha.setAttribute("class", "info-batalha");
  divListaAtaques.setAttribute("class", "lista-acoes-competidor");
  listaAtaques.setAttribute("class", "lista-ataques-batalha");
  botoesAtaque.setAttribute("class", "botoes-ataques");
  acoesBatalha.append(divInfoBatalha);
  divInfoBatalha.append(infoBatalha);
  acoesBatalha.append(divListaAtaques);
  divListaAtaques.append(listaAtaques);
  listaAtaques.append(botoesAtaque);
  botoesAtaque.innerHTML = "";
  pokemonCompetidor.habilidades.forEach((habilidade) => {
    const ataqueBatalha = document.createElement("button");
    const iconTipo = document.createElement("img");
    const tipoHabilidade = habilidade.tipo.toLowerCase();
    const nomeAtaque = document.createElement("span");
    botoesAtaque.append(ataqueBatalha);
    ataqueBatalha.append(nomeAtaque);
    ataqueBatalha.append(iconTipo);
    nomeAtaque.innerText = `${habilidade.nome}`;
    iconTipo.setAttribute("src", `../../../assets/icone/${tipoHabilidade}.png`);
    ataqueBatalha.setAttribute("class", `${tipoHabilidade}-color-ataque`);
    ataqueBatalha.addEventListener("click", () => usarHabilidade(habilidade));
  });
};
botaoLutar.addEventListener("click", aparecerAtaques);

//Botao Pokemon
const botaoPokemon = document.querySelector("#botao-pokemon");
const aparecerPokemons = () => {
  const acoesBatalha = document.querySelector("#acoesDosBotoes");
  acoesBatalha.innerHTML = "";
  const divListaPokemons = document.createElement("div");
  divListaPokemons.setAttribute("class", "lista-pokemons-batalha");
  acoesBatalha.append(divListaPokemons);
  divListaPokemons.innerHTML = "";
  pokemonsPersonagem.forEach((poke, index) => {
    const button = criarBotaoPokemon(poke);
    button.setAttribute("id", "button-pokemon");
    divListaPokemons.append(button);
    if (poke === pokemonCompetidor) {
      button.classList.add("pokemonCompetidor-active");
    }
    const pegarPokemonCompetidor = () => {
      const buttonPokemon = document.querySelectorAll("#button-pokemon");
      buttonPokemon.forEach((botao) => {
        botao.classList.remove("pokemonCompetidor-active");
      });
      button.classList.add("pokemonCompetidor-active");
      pokemonCompetidor = poke;
      renderGame();
    };
    button.addEventListener("click", pegarPokemonCompetidor);
  });
};
botaoPokemon.addEventListener("click", aparecerPokemons);

//Botao Items
const botaoItems = document.querySelector("#botao-items");
const aparecerItems = () => {
  const acoesBatalha = document.querySelector("#acoesDosBotoes");
  acoesBatalha.innerHTML = "";
  const divMensagemItems = document.createElement("div");
  const divItems = document.createElement("div");
  divMensagemItems.setAttribute("class", "mensagem-itens");
  divMensagemItems.setAttribute("id", "divMensagemItems");
  divItems.setAttribute("class", "itens-conteiner");
  acoesBatalha.append(divMensagemItems);
  acoesBatalha.append(divItems);
  divItems.innerHTML = "";
  personagem.itens.forEach((item) => {
    const divItem = document.createElement("div");
    const botaoItem = document.createElement("button");
    botaoItem.setAttribute("id", "botoesItems");
    const imgItem = document.createElement("img");
    const numItem = document.createElement("span");
    const urlImgPokebola = item.descricaoItem.imagem;
    divItems.append(divItem);
    divItem.append(botaoItem);
    botaoItem.append(imgItem);
    divItem.append(numItem);
    divItem.setAttribute("class", "item");
    imgItem.setAttribute("src", urlImgPokebola);
    numItem.innerHTML = `${item.quantidade}`;
    const imgPokemonOponente = document.querySelector("#oponente-batalha > img");
    registrarCaptura(botaoItem);
  });
};
botaoItems.addEventListener("click", aparecerItems);

// //Botao Fugir
const botaoFugir = document.querySelector("#botao-fugir");
const fugirPraTelaHome = () => {
  location.href = "../home/home.html";
};
botaoFugir.addEventListener("click", fugirPraTelaHome);

// // Informacao da Batalha
// const divInfoBatalha = document.querySelector("#info-batalha");
// const infoBatalha = document.createElement("span");
// divInfoBatalha.append(infoBatalha);
// infoBatalha.innerHTML = `O que <span style="font-weight: bold">${pokemonCompetidor.nome}</span> fará?`;

const usarHabilidade = (habilidade) => {
  const botoesAtaque = document.querySelectorAll("button");
  if (pokemonCompetidor.vida > 0 && pokemonOponente.vida > 0) {
    botoesAtaque.forEach((botao) => {
      botao.disabled = true;
    });
    pokemonCompetidor.atacar(habilidade, pokemonOponente);
    renderGame();
    setTimeout(() => {
      pokemonOponente.atacarAleatorio(pokemonCompetidor);
      botoesAtaque.forEach((botao) => {
        botao.disabled = false;
      });
      renderGame();
    }, 3000);
  } else {
    botoesAtaque.forEach((botao) => {
      botao.disabled = true;
    });
  }
};

const atualizarBarraVida = (barraVida, pokemon) => {
  const porVidaPokemon = (pokemon.vida / pokemon.vidaOriginal) * 100;
  if (porVidaPokemon >= 0) {
    barraVida.style.width = `${porVidaPokemon}%`;
    if (porVidaPokemon > 50) {
      barraVida.style.backgroundColor = "green";
    } else if (porVidaPokemon > 20) {
      barraVida.style.backgroundColor = "#D8DC00";
    } else {
      barraVida.style.backgroundColor = "red";
    }
  } else {
    barraVida.style.width = "0";
  }
};

const registrarCaptura = (botaoPokebola) => {
  if (pokemonOponente.vida === 0) {
    const clicarPokebola = () => {
      const botoesItems = document.querySelectorAll("#botoesItems");
      botoesItems.forEach((botao) => {
        botao.classList.remove("pokebola-active");
      });
      botaoPokebola.classList.add("pokebola-active");
      const divMensagemItems = document.getElementById("divMensagemItems");
      divMensagemItems.innerHTML = "";
      const mensagemConteiner = document.createElement("div");
      const mensagemCaptura = document.createElement("span");
      const divBotoesCaptura = document.createElement("div");
      const botaoCapturar = document.createElement("button");
      const botaoCancelar = document.createElement("button");
      mensagemConteiner.setAttribute("class", "mensagem-captura-conteiner");
      mensagemCaptura.setAttribute("class", "mensagem-captura");
      divBotoesCaptura.setAttribute("class", "botoes-capturar-cancelar");
      divMensagemItems.append(mensagemConteiner);
      mensagemConteiner.append(mensagemCaptura);
      mensagemConteiner.append(divBotoesCaptura);
      divBotoesCaptura.append(botaoCapturar, botaoCancelar);
      mensagemCaptura.innerHTML = `Você quer tentar capturar ${pokemonOponente.nome}?`;
      botaoCapturar.innerHTML = "Capturar";
      botaoCancelar.innerHTML = "Cancelar";
      const capturarPokemon = () => {
        personagem.capturar(pokemonOponente);
      };
      const cancelarCaptura = () => {
        divMensagemItems.innerHTML = "";
      };
      botaoCapturar.addEventListener("click", capturarPokemon);
      botaoCancelar.addEventListener("click", cancelarCaptura);
    };
    botaoPokebola.addEventListener("click", clicarPokebola);
  }
};
renderGame();

//Chance de captura
// dano baseado em nivel
// funcionalidade de level, experiencia
// tela de inicio
// nao poder usar pokemon sem vida
