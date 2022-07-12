import { audio } from "../../../sounds/audio.js";
import { Personagem } from "../../model/personagem.model.js";
import { pegarPokemonsIniciais } from "../../repository/pokemon.repository.js";

// const musicaTelaInicio = document.querySelector("#musica-tela-inicio");
// musicaTelaInicio.play();
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
  audio.telaInicio.play();
  if (inputUsuario.value.length > 4 && inputUsuario.value.length < 13) {
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
    const srcImgPokemonInicial = pokeInicial.animacao;
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
      gsap.to("#divTransicao", {
        opacity: 1,
        repeat: 3,
        yoyo: true,
        duration: 0.4,
        onComplete() {
          gsap.to("#divTransicao", {
            opacity: 1,
            duration: 0.4,
            onComplete() {
              localStorage.setItem("personagem", JSON.stringify(personagem));
              location.href = "../home/home.html";
            },
          });
        },
      });
    };
    botaoPokemonInicial.addEventListener("click", escolherPokemonInicial);
  });
};
