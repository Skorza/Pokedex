export default  function pokelist() {
    const pokedex = document.getElementById('pokedex');

    const fetchPokemon = () => {
        const promises = [];
        for (let i = 1; i <= 151; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) => ({
                name: result.name,
                image: result.sprites['front_default'],
                type: result.types.map((type) => type.type.name).join(', '),
                id: result.id
            }));
            displayPokemon(pokemon);
        });
    };

    const displayPokemon = (pokemon) => {
        console.log(pokemon);
        const pokemonHTMLString = pokemon
            .map(
                (pokeman) => `
<div class="col">
        
        <div class="card">
            <h4 class="card-title">#${pokeman.id}</h4>
            <div class="card-am">
            
                <img class="card-image-top" src="${pokeman.image}"/>
            </div> 
            
                <h4 class="card-title">${pokeman.name}</h4>
                <p class="card-text">Type: ${pokeman.type}</p>
          </div>  
            
        
</div>
    `
            )
            .join('');
        pokedex.innerHTML = pokemonHTMLString;
    };

    fetchPokemon();
}