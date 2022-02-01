const Pokedex = require("pokeapi-js-wrapper");
const pokedex = new Pokedex.Pokedex();

async function getMetadata(pokemonId) {
  const pokemon = await pokedex.getPokemonByName(pokemonId);
  console.log(pokemon);
  const [firstLetter, ...rest] = pokemon.name;

  let metadata = {
    name: `${firstLetter.toUpperCase()}${rest.join("")}`,
    properties: {},
    image: pokemon.sprites.front_default,
  };
  pokemon.stats.forEach((stat) => {
    metadata.properties[stat.stat.name] = stat.base_stat;
  });

  console.log(metadata);
}

getMetadata("5");
