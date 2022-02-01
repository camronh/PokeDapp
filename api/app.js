const express = require("express");
const app = express();
const pokeapi = require("./utils/pokeapi");
let cors = require("cors");
app.use(express.json()); // for parsing application/json
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

let corsOptions = {
  origin: ["http://localhost:8080"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const port = 3000;

// Create a config
app.get("/metadata/:pokemonId.json", async function (req, res) {
  try {
    const pokemonId = req.params.pokemonId;
    const metadata = await pokeapi.getMetadata(pokemonId);
    res.send(metadata);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


// Create a config
app.get("/metadata/:pokemonId", async function (req, res) {
  try {
    const pokemonId = req.params.pokemonId;
    const metadata = await pokeapi.getMetadata(pokemonId);
    res.send(metadata);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


// Create a config
app.get("/randomPokemon", async function (req, res) {
  try {
    const pokemonId = Math.floor(Math.random() * 898) + 1;
    const metadata = await pokeapi.getMetadata(pokemonId);
    res.send(metadata);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// start server
// app.listen(port, function () {
//   console.log("listening on http://localhost:" + port);
// });

module.exports = app; // add this line
