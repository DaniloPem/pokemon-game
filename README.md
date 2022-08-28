# Pokémon Game

Jogo desenvolvido em HTML, CSS e JavaScript vanilla com uso apenas da biblioteca de animação gsap e howler para efeitos sonoros.

Experimente agora!
https://danilopem.github.io/pokemon-game/

[![Batalha](https://github.com/DaniloPem/pokemon-game/examples/batalha.gif "Batalha")](https://github.com/DaniloPem/pokemon-game/examples/batalha.gif "Batalha")

### Funcionalidades do jogo

##### CADASTRO DO USUÁRIO

- Cadastrar usuário com localStorage: username.
- Escolher um pokemon inicial entre bulbasaur, charmander e squirtle.
- O pokemon inicial começa desde o nível 1 e experiência 0.

##### MOVIMENTAÇÃO DO PERSONAGEM

- Animações de andar do personagem.
- Movimento do personagem dentro de um mapa usando as flechas UP, DOWN, RIGHT, LEFT.
- O personagem colide em objetos do mapa (árvores, prédios, casas, entre outros).

##### GERAIS

- O personagem encontra pokemons selvagens aleatórios enquando ele se movimenta pelo mapa e entram na tela de batalha, estes pokemons são buscados com base no maior nível de pokemon do personagem.
- Na tela batalha aparecem as imagens dos dois pokemons na luta (Pokemon competidor que o personagem está usando e o pokemon selvagem).
- Cada Pokemon tem uma bara de informação (vida, nivel, nome, icone)
- Cada pokemon tem uma barra de nivel que se renderiza enquanto os pokemons atacam.
- Na tela de batalha tem um quadro de texto na parte inferior isquerda que narra o que tá acontecendo na batalha.
- Os dados do usuário são salvos no localStorage.
- Na tela de batalha têm 4 botões:
  1.  Lutar: Quando foi clicado, aparecem os ataques do pokemon usado.
  1.  Pokemon: Quando for clicado, aparecem a lista de pokemons que podem ser usados.
  1.  Itens: Quando for clicado, aparecem as pokebolas.
  1.  Fugir: Quando for clicado, o personagem volta pra tela do mapa.

##### SOBRE OS POKEMONS

- Os pokemons selvagens têm niveis aleatorios de 1 a 30.
- Cada pokemon tem tipo (água, fogo, planta, terra, elétrico, etc.)
- Cada pokemon tem fraquezas e forças que dependem do tipo dele.
- Cada Pokemon tem máximo 6 habilidades.
- Cada habilidade tem tipos (agua, fogo, planta, terra, eletrico...)
- Cada habilidade tem forças.
- Cada habilidade tem pontos de poder que depende da força dele.
- Os pontos de poder diminui quando a habilidade é usada.
- Uma habilidade pode ser usada quando os pontos de poder forem maior que zero.
- Os pokemons selvagens podem ser capturados.
- O método de captura é o seguinte:
  1.  Cada pokemon tem um ratio de captura (quanto mais baixo o ratio, mais difícil de capturar).
  1.  Cada pokebola tem um ratio de captura (quanto mais alto o ratio, mais fácil de capturar um pokemon): 2. Ratio da pokeball: 1 2. Ratio da greatball: 2 2. Ratio da ultraball: 3
  1.  Quanto mais debilitado está o pokemon, é mais fácil de capturar.
- O pokemon ganha experiência quando consegue tirar a vida total ou um porcentagem da vida total do pokemon selvagem.
- O pokemon ganha experiência extra quando o pokemon selvagem foi capturado.
- O pokemon sube de nível enquanto ganha experiência.
- Cada pokemon evolui quando atinge um certo nível, baseado na config do jogo.
- O personagem tem pokemons da bolsa e do depote:
  1.  Os pokemons da bolsa: 2. São pokemons capturados que podem ser usados na batalha. 2. São máximo 6.
  1.  Os pokemons do depote: 2. São pokemons capturados que não podem ser usados na batalha. 2. Não têm quantidade máxima.
- Os pokemons da bolsa podem ser removidos e guardados na lista de pokemons do depote.
- Os pokemons do depote podem ser adicionados na lista de pokemons da bolsa, sempre e quando cumpla o requisito de ser máximo 6 pokemons.

##### SOBRE O CENTRO POKEMON

- No mapa tem dois centros pokemons.
- O personagem pode entrar no centro pokemon quando ele estiver acima da porta/entrada.
- O personagem pode curar (vida cheia e pontos poder de cada ataque no máximo) os pokemons da bolsa no centro pokemon.
- O personagem pode obter 3 pokebolas por cada tipo de pokeball no centro pokemon.
- As pokebolas só podem ser obtidas 5 min depois da ultima obtencão.

##### ANIMACÕES

- Efeito de transição da tela do cadastro pra tela do mapa.
- Efeito de transição da tela do mapa pra tela de batalha.
- Efeitos de ataques dos pokemons.

##### AUDIO

- Música de fondo na tela do cadastro do usuário.
- Efeito de som no click dos botões.
- Música de fondo na tela do mapa.
- Música de fondo na tela de batalha.

##### OBSERVACÕES

- As imagens e GIFs dos pokemons foram retiradas da pokeAPI.
- O desenho do mapa foi feito com tiled.
