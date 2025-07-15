const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonprev = document.querySelector('.btn-prev');
const buttonnext = document.querySelector('.btn-next');
const buttonshiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let isShiny = false;
let currentPokemonData = null;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        currentPokemonData = data;  
        isShiny = false;
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['other']['official-artwork']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = 'ERROR';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonprev.addEventListener('click', () => {
    if (searchPokemon >= 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
buttonnext.addEventListener('click', () => {
    if (searchPokemon >= 1) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});


buttonshiny.addEventListener('click', () => {
    if (!currentPokemonData) return;

    isShiny = !isShiny;

    const spriteUrl = isShiny
        ? currentPokemonData.sprites.other['official-artwork'].front_shiny
        : currentPokemonData.sprites.other['official-artwork'].front_default;

    if (spriteUrl) {
        pokemonImage.src = spriteUrl;
    } else {
        alert('Versão shiny não disponível!');
    }
});

renderPokemon(searchPokemon);