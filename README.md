Pokemons Handbook

Disponível em: https://pokemons-handbook.herokuapp.com/

O Pokemons Handbook é uma aplicação que consome dados da API https://pokeapi.co/ e apresenta informações sobre Pokemons e seus tipos.
Na página principal são listados todos os pokemons em cards, e cada um pode ser acessado para detalhes sobre o pokemon.

Na barra inferior está a navegação entre páginas, e um controle de quantos registros exibir por página.

Na barra vertical à esquerda da lista estão listados os tipos de pokemons. Ao selecionar um tipo, somente pokémons que pertencem a ele são exibidos.
Para retornar à listagem completa basta clicar novamente sobre o tipo selecionado.

Na barra acima da listagem pode-se pesquisar Pokémons pelo nome ou trecho do nome (E assim serão apresentados todos com essa correspondencia).
A pesquisa está submetida à seleção de tipo, ou seja, se um tipo estiver selecionado, somente pokemons daquele tipo serão retornados.

Clicando sobre os pokémons da lista são apresentados detalhes sobre cada um deles:
<ul>
    <li>Cadeia de evolução</li>
    <li>tipos, habitat e grupos de ovos</li>
    <li>Habilidades e stats</li>
    <li>Peso, altura e forma</li>
</ul>
<br/>
Na cadeia de evolução é possível navegar para os outros pokémons da família.
Para voltar à lista, clique sobre o "X" no canto superior direito.


Para rodar o projeto, clone o código, e no terminal, na pasta do projeto dê o comando yarn add ou npm install, conforme o gerenciador de pacotes que utiliza, para instalar as dependências.
Depois, rode com yarn start ou npm start.