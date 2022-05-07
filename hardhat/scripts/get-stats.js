// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const airnodeProtocol = require("@api3/airnode-protocol");

async function main() {
  const { address } = require("../deployed-contract.json");

  const contract = await hre.ethers.getContractAt("Pokemon", address);
  const [owner] = await hre.ethers.getSigners();

  const pokedex = await contract.ownersPokedex();
  console.log({ pokedex });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
