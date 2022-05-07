const axios = require("axios");

async function getMetadata(pokemonId) {
  if (isNaN(pokemonId)) pokemonId = pokemonId.toLowerCase();

  const { data: pokemon } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );

  const [firstLetter, ...rest] = pokemon.name;

  let metadata = {
    name: `${firstLetter.toUpperCase()}${rest.join("")}`,
    id: pokemonId,
    description: "POKEMNON!",
    image: pokemon.sprites.front_default,
    external_url: "https://www.youtube.com/watch?v=jtbIqUZEfu4",
  };
  metadata.attributes = pokemon.stats.map(stat => {
    return {
      trait_type: stat.stat.name,
      value: stat.base_stat,
    };
  });
  console.log({ metadata });
  return metadata;
}

module.exports = {
  getMetadata,
};
