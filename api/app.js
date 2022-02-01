const express = require("express");
const app = express();
// let cors = require("cors");
// app.use(express.json()); // for parsing application/json
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

// let corsOptions = {
//   origin: [
//     "http://localhost:8080",
//     "https://admin.d2du7nzzwc512e.amplifyapp.com",
//     "https://pre-alpha.d2du7nzzwc512e.amplifyapp.com",
//   ],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));

// const port = 3000;

// Create a config
app.get("/metadata/:pokemonId", async function (req, res) {
  const pokemonId = req.params.pokemonId;
  const metadata = await pokeapi.getMetadata(pokemonId);
  res.send(metadata);
});

// start server
app.listen(port, function () {
  console.log("listening on http://localhost:" + port);
});

module.exports = app; // add this line
