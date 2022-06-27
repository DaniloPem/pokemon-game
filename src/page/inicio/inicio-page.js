import { Personagem } from "../../model/personagem.model.js";
import { pegarPokemonsIniciais } from "../../repository/pokemon.repository.js";
const pokemonsIniciais = pegarPokemonsIniciais();

const telaInicio = document.querySelector("#tela-inicio");
const divUsuarioNome = document.createElement("div");
const paragrafoUsuarioNome = document.createElement("p");
const inputUsuario = document.createElement("input");
const botaoProximo = document.createElement("button");
divUsuarioNome.setAttribute("class", "nome-usuario");
telaInicio.append(divUsuarioNome);
divUsuarioNome.append(paragrafoUsuarioNome);
divUsuarioNome.append(inputUsuario);
divUsuarioNome.append(botaoProximo);
inputUsuario.required = true;
paragrafoUsuarioNome.innerText = "Qual é o seu nome, treinador?";
botaoProximo.innerText = "Próximo";
const clicarBotaoProximo = () => {
  const nomePersonagem = inputUsuario.value;
  divUsuarioNome.style.visibility = "hidden";
  aparecerListaPokemonInicial(nomePersonagem);
};
botaoProximo.addEventListener("click", clicarBotaoProximo);

function aparecerListaPokemonInicial(nomePersonagem) {
  const divElecaoPokemonInicial = document.createElement("div");
  const paragrafoElecaoPokemonInicial = document.createElement("p");
  const divListaPokemonInicial = document.createElement("div");
  divElecaoPokemonInicial.setAttribute("class", "elecao-pokemonInicial");
  divListaPokemonInicial.setAttribute("class", "pokemonsIniciais");
  telaInicio.append(divElecaoPokemonInicial);
  divElecaoPokemonInicial.append(paragrafoElecaoPokemonInicial);
  divElecaoPokemonInicial.append(divListaPokemonInicial);
  paragrafoElecaoPokemonInicial.innerText = `Escolha seu primeiro pokemon!`;
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
      const personagem = Personagem.criarPersonagemInicial(nomePersonagem, pokeInicial);
      localStorage.setItem("personagem", JSON.stringify(personagem));
      location.href = "../home/home.html";
    };
    botaoPokemonInicial.addEventListener("click", escolherPokemonInicial);
  });
}