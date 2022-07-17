import { audio } from "../../../sounds/audio.js";
import { criarBotaoPokemon } from "../../components/batalha/botaoPokemon.js";
import { Personagem } from "../../model/personagem.model.js";
import { buscarPokemonAleatorioPorNivel } from "../../repository/pokemon.repository.js";
import { atualizarPodeAndar } from "../home/home.js";

export function iniciarBatalha() {
  const personagem =
    localStorage.getItem("personagem") !== null
      ? Personagem.criarAPartirDoLocalStorage(JSON.parse(localStorage.getItem("personagem")))
      : Personagem.criarPersonagemInicial();

  let pokemonCompetidor = personagem.pokemonsNaBolsa.find((pokemon) => pokemon.vida > 0);

  const levelsPokemonsNaBolsa = personagem.pokemonsNaBolsa.map((pokemon) => pokemon.level);
  const pokemonOponente = buscarPokemonAleatorioPorNivel(Math.max(...levelsPokemonsNaBolsa));

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
    imgOponenteBatalha.setAttribute("id", "imgOponenteBatalha");
    divOponenteBatalha.append(imgOponenteBatalha);

    const divCompetidorBatalha = document.querySelector("#competidor-batalha");
    divCompetidorBatalha.innerHTML = "";
    const imgCompetidorBatalha = document.createElement("img");
    const urlBackDefault = pokemonCompetidor.backDefault;
    imgCompetidorBatalha.setAttribute("class", "img-competidor");
    imgCompetidorBatalha.setAttribute("src", urlBackDefault);
    imgCompetidorBatalha.setAttribute("id", "imgCompetidorBatalha");
    divCompetidorBatalha.append(imgCompetidorBatalha);
  };

  const renderizarMensagem = (msg) => {
    const acoesBatalha = document.querySelector("#acoesDosBotoes");
    acoesBatalha.innerHTML = "";
    const divInfoBatalha = document.createElement("div");
    const infoBatalha = document.createElement("div");
    divInfoBatalha.setAttribute("class", "div-info-batalha");
    infoBatalha.setAttribute("class", "info-batalha");
    divInfoBatalha.setAttribute("id", "divInfoBatalha");
    infoBatalha.setAttribute("id", "infoBatalha");
    acoesBatalha.append(divInfoBatalha);
    divInfoBatalha.append(infoBatalha);
    infoBatalha.innerHTML = msg;
  };

  const botoesTodos = document.querySelectorAll("button");
  botoesTodos.forEach((botao) => (botao.disabled = false));

  let atacar = false;

  //Botao Lutar
  const botaoLutar = document.querySelector("#botao-lutar");
  const aparecerAtaques = () => {
    const acoesBatalha = document.querySelector("#acoesDosBotoes");
    acoesBatalha.innerHTML = "";
    const divListaAtaques = document.createElement("div");
    const listaAtaques = document.createElement("div");
    const botoesAtaque = document.createElement("div");
    divListaAtaques.setAttribute("class", "lista-acoes-competidor");
    listaAtaques.setAttribute("class", "lista-ataques-batalha");
    botoesAtaque.setAttribute("class", "botoes-ataques");
    renderizarMensagem(`O que <span style="font-weight: bold">${pokemonCompetidor.nome}</span> fará?`);
    acoesBatalha.append(divListaAtaques);
    divListaAtaques.append(listaAtaques);
    listaAtaques.append(botoesAtaque);
    botoesAtaque.innerHTML = "";
    pokemonCompetidor.habilidades.forEach((habilidade) => {
      const ataqueBatalha = document.createElement("button");
      ataqueBatalha.setAttribute("id", "botoesDeAtaque");
      const iconTipo = document.createElement("img");
      const tipoHabilidade = habilidade.tipo.toLowerCase();
      const nomeAtaque = document.createElement("span");
      const spanPontosPoder = document.createElement("span");
      botoesAtaque.append(ataqueBatalha);
      ataqueBatalha.append(nomeAtaque);
      ataqueBatalha.append(iconTipo);
      ataqueBatalha.append(spanPontosPoder);
      iconTipo.setAttribute("src", `../../../assets/icone/${tipoHabilidade}.png`);
      ataqueBatalha.setAttribute("class", `${tipoHabilidade}-color-ataque`);
      spanPontosPoder.setAttribute("class", "pontosPoder");
      nomeAtaque.innerText = `${habilidade.nome}`;
      atualizarPontosPoder(spanPontosPoder, habilidade);
      if (habilidade.pontosPoder === 0) {
        ataqueBatalha.classList.add("ataqueSemPontos");
      }
      ataqueBatalha.addEventListener("click", () => {
        usarHabilidade(habilidade);
        atualizarPontosPoder(spanPontosPoder, habilidade);
      });
    });
  };
  botaoLutar.addEventListener("click", () => {
    audio.click.play();
    aparecerAtaques();
  });

  //Botao Pokemon
  const botaoPokemon = document.querySelector("#botao-pokemon");
  const aparecerPokemons = () => {
    const acoesBatalha = document.querySelector("#acoesDosBotoes");
    acoesBatalha.innerHTML = "";
    const divListaPokemons = document.createElement("div");
    divListaPokemons.setAttribute("class", "lista-pokemons-batalha");
    acoesBatalha.append(divListaPokemons);
    divListaPokemons.innerHTML = "";
    personagem.pokemonsNaBolsa.forEach((poke) => {
      const button = criarBotaoPokemon(poke);
      button.setAttribute("id", "button-pokemon");
      divListaPokemons.append(button);
      if (poke === pokemonCompetidor) {
        button.classList.add("pokemonCompetidor-active");
      }
      if (poke.vida === 0) {
        button.classList.add("pokemonSemVida");
      }
      const pegarPokemonCompetidor = () => {
        const buttonPokemon = document.querySelectorAll("#button-pokemon");
        botaoLutar.classList.remove("pokemonSemVida");
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
  botaoPokemon.addEventListener("click", () => {
    audio.click.play();
    aparecerPokemons();
  });

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
      registrarCaptura(botaoItem, item, numItem);
    });
  };
  botaoItems.addEventListener("click", () => {
    audio.click.play();
    aparecerItems();
  });

  // //Botao Fugir
  const botaoFugir = document.querySelector("#botao-fugir");
  const fugirPraTelaHome = () => {
    audio.click.play();
    const bonusCaptura = 0;
    pokemonCompetidor.adicionarExperienciaGanhada(pokemonOponente, bonusCaptura);
    pokemonCompetidor.somarExperiencia();
    botaoLutar.classList.remove("pokemonSemVida");
    const botoesTodos = document.querySelectorAll("button");
    botoesTodos.forEach((botao) => (botao.disabled = false));
    localStorage.setItem("personagem", JSON.stringify(personagem));
    voltarProMapa();
  };
  botaoFugir.addEventListener("click", fugirPraTelaHome);

  const usarHabilidade = (habilidade) => {
    const botoesTodos = document.querySelectorAll("button");
    const infoBatalha = document.querySelector("#infoBatalha");
    if (pokemonCompetidor.vida > 0 && pokemonOponente.vida > 0) {
      botoesTodos.forEach((botao) => {
        botao.disabled = true;
      });
      infoBatalha.innerHTML = `<span style="font-weight: bold">${pokemonCompetidor.nome}</span> usou <span style="font-weight: bold">${habilidade.nome}</span>`;
      pokemonCompetidor.atacar(habilidade, pokemonOponente);
      setTimeout(() => {
        audio.ataque.play();
      }, 800);
      atacar = true;
      gsap.to("#imgCompetidorBatalha", {
        x: -20,
        onComplete() {
          gsap.to("#imgCompetidorBatalha", {
            x: 40,
            duration: 0.1,
            onComplete: () => {
              gsap.to("#imgOponenteBatalha", {
                x: 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });

              gsap.to("#imgCompetidorBatalha", {
                x: 0,
              });

              gsap.to("#imgOponenteBatalha", {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          });
        },
      });
      renderGame();
      setTimeout(() => {
        if (pokemonCompetidor.vida > 0 && pokemonOponente.vida > 0) {
          const ataqueUtilizado = pokemonOponente.atacarAleatorio(pokemonCompetidor);
          setTimeout(() => {
            audio.ataque.play();
          }, 800);
          atacar = true;
          gsap.to("#imgOponenteBatalha", {
            x: 20,
            onComplete() {
              gsap.to("#imgOponenteBatalha", {
                x: -40,
                duration: 0.1,
                onComplete: () => {
                  gsap.to("#imgCompetidorBatalha", {
                    x: -10,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.08,
                  });

                  gsap.to("#imgOponenteBatalha", {
                    x: 0,
                  });

                  gsap.to("#imgCompetidorBatalha", {
                    opacity: 0,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.08,
                  });
                },
              });
            },
          });
          infoBatalha.innerHTML = `<span style="font-weight: bold">${pokemonOponente.nome}</span> usou <span style="font-weight: bold">${ataqueUtilizado.nome}</span>`;
          setTimeout(() => {
            botoesTodos.forEach((botao) => {
              botao.disabled = false;
            }, 2000);
          });
        }
        renderGame();
        localStorage.setItem("personagem", JSON.stringify(personagem));
      }, 3000);
    }
    setTimeout(() => {
      const botoesTodos = document.querySelectorAll("button");
      if (pokemonCompetidor.vida === 0) {
        botoesTodos.forEach((botao) => {
          botao.disabled = true;
        });
        const imgCompetidorBatalha = document.querySelector("#imgCompetidorBatalha");
        gsap.to("#imgCompetidorBatalha", {
          y: 40,
          onComplete() {
            gsap.to("#imgCompetidorBatalha", {
              opacity: 0,
            });
          },
        });
        infoBatalha.innerHTML = `<span style="font-weight: bold">${pokemonCompetidor.nome}</span> foi derrotado!`;
        setTimeout(() => {
          botoesTodos.forEach((botao) => {
            botao.disabled = false;
          });
          botaoLutar.classList.add("pokemonSemVida");
          aparecerPokemons();
        }, 2000);
      } else if (pokemonOponente.vida === 0) {
        botoesTodos.forEach((botao) => {
          botao.disabled = true;
        });
        infoBatalha.innerHTML = `<span style="font-weight: bold">${pokemonOponente.nome}</span> foi derrotado!`;
        setTimeout(() => {
          botoesTodos.forEach((botao) => {
            botao.disabled = false;
          });
          botaoLutar.classList.add("pokemonSemVida");
          aparecerItems();
        }, 2000);
      }
    }, 4000);
  };

  const atualizarBarraVida = (barraVida, pokemon) => {
    const porVidaPokemon = (pokemon.vida / pokemon.vidaOriginal) * 100;
    if (atacar === false) {
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
    } else {
      setTimeout(() => {
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
      }, 2000);
    }
  };

  const registrarCaptura = (botaoPokebola, item, numeroItem) => {
    const clicarPokebola = () => {
      estilarBotoesItemClick(botaoPokebola);
      const divMensagemItems = document.getElementById("divMensagemItems");
      const { botaoCapturar, botaoCancelar } = aparecerMensagemItem(
        divMensagemItems,
        `Você quer tentar capturar ${pokemonOponente.nome}?`
      );
      const cancelarCaptura = () => {
        divMensagemItems.innerHTML = "";
      };
      if (item.quantidade > 0) {
        adicionarTentativaDeCaptura(item, numeroItem, divMensagemItems, cancelarCaptura, botaoCapturar);
      } else {
        divMensagemItems.innerHTML = ``;
      }
      botaoCancelar.addEventListener("click", cancelarCaptura);
    };
    botaoPokebola.addEventListener("click", clicarPokebola);
  };
  renderGame();

  const adicionarTentativaDeCaptura = (item, numeroItem, divMensagemItems, cancelarCaptura, botaoCapturar) => {
    const capturarPokemon = () => {
      const botoesTodos = document.querySelectorAll("button");
      const variableCaptura =
        ((3 * pokemonOponente.vidaOriginal - 2 * pokemonOponente.vida) *
          pokemonOponente.ratioCaptura *
          item.descricaoItem.ratio) /
        (3 * pokemonOponente.vidaOriginal);
      const probabilidadeDeCaptura = (variableCaptura + 1) / 256;
      if (item.quantidade > 0) {
        item.quantidade -= 1;
        numeroItem.innerHTML = `${item.quantidade}`;
      }
      botoesTodos.forEach((botao) => {
        botao.disabled = true;
      });
      handleCaptura(probabilidadeDeCaptura, divMensagemItems, botoesTodos, item, capturarPokemon, cancelarCaptura);
    };
    botaoCapturar.addEventListener("click", capturarPokemon);
  };

  const handleCaptura = (
    probabilidadeDeCaptura,
    divMensagemItems,
    botoesTodos,
    item,
    capturarPokemon,
    cancelarCaptura
  ) => {
    setTimeout(() => {
      if (probabilidadeDeCaptura >= 1) {
        const numAleatorioA = Math.round(Math.random() * 10);
        if (numAleatorioA < 7) {
          personagem.capturar(pokemonOponente);
          aparecerMensagemItem(divMensagemItems, `${pokemonOponente.nome} foi capturado!`);
          const bonusCaptura = 0.5;
          pokemonCompetidor.adicionarExperienciaGanhada(pokemonOponente, bonusCaptura);
          pokemonCompetidor.somarExperiencia();
          localStorage.setItem("personagem", JSON.stringify(personagem));
          setTimeout(() => {
            botaoLutar.classList.remove("pokemonSemVida");
            botoesTodos.forEach((botao) => (botao.disabled = false));
            voltarProMapa();
          }, 2000);
        } else {
          const { botaoCapturar, botaoCancelar } = aparecerMensagemItem(
            divMensagemItems,
            `${pokemonOponente.nome} saiu da pokebola. Quer tentar capturar?`
          );
          botoesTodos.forEach((botao) => {
            botao.disabled = false;
          });
          verificarItemEMostrarMensagem(item, botaoCapturar, capturarPokemon, botaoCancelar, cancelarCaptura);
        }
      } else {
        const numRandom = Math.random();
        if (numRandom <= probabilidadeDeCaptura) {
          personagem.capturar(pokemonOponente);
          aparecerMensagemItem(divMensagemItems, `${pokemonOponente.nome} foi capturado!`);
          const bonusCaptura = 0.5;
          pokemonCompetidor.adicionarExperienciaGanhada(pokemonOponente, bonusCaptura);
          pokemonCompetidor.somarExperiencia();
          localStorage.setItem("personagem", JSON.stringify(personagem));
          setTimeout(() => {
            botaoLutar.classList.remove("pokemonSemVida");
            botoesTodos.forEach((botao) => (botao.disabled = false));
            voltarProMapa();
          }, 2000);
        } else {
          const numAleatorioB = Math.round(Math.random() * 10);
          if (numAleatorioB < 6) {
            const { botaoCapturar, botaoCancelar } = aparecerMensagemItem(
              divMensagemItems,
              `${pokemonOponente.nome} saiu da pokebola. Quer tentar capturar?`
            );
            botoesTodos.forEach((botao) => {
              botao.disabled = false;
            });
            verificarItemEMostrarMensagem(item, botaoCapturar, capturarPokemon, botaoCancelar, cancelarCaptura);
          } else {
            aparecerMensagemItem(divMensagemItems, `${pokemonOponente.nome} fugiu!`);
            const bonusCaptura = 0;
            pokemonCompetidor.adicionarExperienciaGanhada(pokemonOponente, bonusCaptura);
            pokemonCompetidor.somarExperiencia();
            localStorage.setItem("personagem", JSON.stringify(personagem));
            setTimeout(() => {
              const botoesTodos = document.querySelectorAll("button");
              botoesTodos.forEach((botao) => (botao.disabled = false));
              botaoLutar.classList.remove("pokemonSemVida");
              voltarProMapa();
            }, 2000);
          }
        }
      }
    }, 3000);
  };

  const verificarItemEMostrarMensagem = (item, botaoCapturar, capturarPokemon, botaoCancelar, cancelarCaptura) => {
    if (item.quantidade > 0) {
      botaoCapturar.addEventListener("click", capturarPokemon);
      botaoCancelar.addEventListener("click", cancelarCaptura);
    } else {
      botaoCapturar.style.visibility = "hidden";
      botaoCancelar.style.visibility = "hidden";
    }
  };

  const aparecerMensagemItem = (divMensagemItems, msg) => {
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
    mensagemCaptura.innerHTML = msg;
    botaoCapturar.innerHTML = "Capturar";
    botaoCancelar.innerHTML = "Cancelar";
    return { botaoCapturar, botaoCancelar };
  };

  const estilarBotoesItemClick = (botaoPokebola) => {
    const botoesItems = document.querySelectorAll("#botoesItems");
    botoesItems.forEach((botao) => {
      botao.classList.remove("pokebola-active");
    });
    botaoPokebola.classList.add("pokebola-active");
  };
  const atualizarPontosPoder = (spanPontosPoder, habilidade) => {
    spanPontosPoder.innerText = `${habilidade.pontosPoder}/${habilidade.pontosMax}`;
  };

  aparecerAtaques();
}

const voltarProMapa = () => {
  const mapaDoJogo = document.querySelector("main");
  const divTransicao = document.querySelector("#divTransicao");
  const telaBatalha = document.getElementById("tela-batalha");
  audio.batalha.stop();
  audio.mapa.play();
  telaBatalha.style.display = "none";
  mapaDoJogo.style.display = "block";
  gsap.to("#divTransicao", {
    opacity: 1,
    onComplete() {
      gsap.to("#divTransicao", {
        opacity: 0,
        onComplete() {
          divTransicao.style.display = "none";
          atualizarPodeAndar(true);
        },
      });
    },
  });
};
