import { audio } from "../../../sounds/audio.js";
import { Personagem } from "../../model/personagem.model.js";
import { pegarPokemonsIniciais } from "../../repository/pokemon.repository.js";
import { atualizarPodeAndar, carregarJogo } from "../home/home.js";

export function aparecerTelaInicial() {
  const mapaDoJogo = document.querySelector("main");
  mapaDoJogo.style.display = "none";

  const pokemonsIniciais = pegarPokemonsIniciais();

  const telaInicio = document.querySelector("#tela-inicio");
  const divUsuarioNome = document.createElement("div");
  const paragrafoUsuarioNome = document.createElement("p");
  const inputUsuario = document.createElement("input");
  const botaoProximo = document.createElement("button");
  divUsuarioNome.setAttribute("class", "nome-usuario");
  inputUsuario.setAttribute("placeholder", "Entre 5 e 12 caracteres.");
  telaInicio.append(divUsuarioNome);
  divUsuarioNome.append(paragrafoUsuarioNome);
  divUsuarioNome.append(inputUsuario);
  divUsuarioNome.append(botaoProximo);
  inputUsuario.required = true;
  paragrafoUsuarioNome.innerText = "Qual é o seu nome, treinador?";
  botaoProximo.innerText = "Próximo";
  const clicarBotaoProximo = () => {
    audio.click.play();
    if (inputUsuario.value.length > 4 && inputUsuario.value.length < 13) {
      audio.telaInicio.play();
      const nomePersonagem = inputUsuario.value;
      divUsuarioNome.style.visibility = "hidden";
      aparecerListaPokemonInicial(nomePersonagem);
    } else {
      inputUsuario.value = "";
    }
  };
  botaoProximo.addEventListener("click", clicarBotaoProximo);

  const aparecerListaPokemonInicial = (nomePersonagem) => {
    const divElecaoPokemonInicial = document.createElement("div");
    const paragrafoElecaoPokemonInicial = document.createElement("p");
    const divListaPokemonInicial = document.createElement("div");
    divElecaoPokemonInicial.setAttribute("class", "elecao-pokemonInicial");
    divListaPokemonInicial.setAttribute("class", "pokemonsIniciais");
    telaInicio.append(divElecaoPokemonInicial);
    divElecaoPokemonInicial.append(paragrafoElecaoPokemonInicial);
    divElecaoPokemonInicial.append(divListaPokemonInicial);
    paragrafoElecaoPokemonInicial.innerHTML = `<span style="font-weight: bold">${nomePersonagem}</span>, escolha seu primeiro pokemon!`;
    pokemonsIniciais.forEach((pokeInicial) => {
      const botaoPokemonInicial = document.createElement("button");
      const imgPokemonInicial = document.createElement("img");
      const nomePokemonInicial = document.createElement("span");
      const srcImgPokemonInicial = pokeInicial.animacaoFront;
      imgPokemonInicial.setAttribute("src", srcImgPokemonInicial);
      divListaPokemonInicial.append(botaoPokemonInicial);
      botaoPokemonInicial.append(imgPokemonInicial);
      botaoPokemonInicial.append(nomePokemonInicial);
      nomePokemonInicial.innerHTML = `${pokeInicial.nome}`;
      const escolherPokemonInicial = () => {
        audio.click.play();
        const personagem = Personagem.criarPersonagemInicial(nomePersonagem, pokeInicial);
        pokeInicial.level = 1;
        pokeInicial.experiencia = 0;
        const divTransicao = document.createElement("div");
        divTransicao.setAttribute("class", "divTransicao");
        divTransicao.setAttribute("id", "divTransicao");
        telaInicio.append(divTransicao);
        localStorage.setItem("personagem", JSON.stringify(personagem));
        atualizarPodeAndar(true);
        carregarJogo();
        gsap.to("#divTransicao", {
          opacity: 1,
          onComplete() {
            gsap.to("#divTransicao", {
              opacity: 0,
              onComplete() {
                telaInicio.style.display = "none";
                mapaDoJogo.style.display = "block";
                audio.telaInicio.stop();
                audio.mapa.play();
              },
            });
          },
        });
      };
      botaoPokemonInicial.addEventListener("click", escolherPokemonInicial);
    });
  };
}
