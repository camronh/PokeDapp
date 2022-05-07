// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const airnodeProtocol = require("@api3/airnode-protocol");

async function main() {
  const { address } = require("../deployed-contract.json");

  const abi = airnodeProtocol.AirnodeRrpFactory.abi;
  const airnodeRrp = new hre.ethers.Contract(
    "0x3B35250Ca54C1Fb8c83D48F21231ef6e4fb9f79D",
    abi
  );

  const contract = await hre.ethers.getContractAt("Pokemon", address);

  const providerURL =
    "https://ropsten.infura.io/v3/8a5e57fedea046d0a4c12341003d9a85";
  const provider = new hre.ethers.providers.JsonRpcProvider(providerURL);

  //   const provider = hre.network.provider;

  const mintTx = await contract.requestRandomPokemon();

  console.log("Tx Made");

  // const providerURL = process.env.PROVIDER_URL;
  // const provider = new ethers.providers.JsonRpcProvider(providerURL);
  // let requester = await hre.ethers.getContractAt("Requester", requesterAddress);

  // Wait until the transaction is mined
  const requestId = await new Promise(resolve =>
    provider.once(mintTx.hash, tx => {
      const parsedLog = airnodeRrp.interface.parseLog(tx.logs[0]);
      resolve(parsedLog.args.requestId);
    })
  );

  console.log("Request ID:\n", requestId);

  await new Promise(resolve =>
    provider.once(airnodeRrp.filters.FulfilledRequest(null, requestId), resolve)
  );
  console.log("Fulfilled!");
  // console.log(
  //   `Minted! Check at https://testnets.opensea.io/assets/${contract.address}/${randomId}`
  // );
  // console.log(
  //   `Check https://ropsten.rarible.com/token/${contract.address}:${randomId}?tab=details`
  // );
  console.log(`Minted! Check https://ropsten.rarible.com/items/owned`);
  // console.log(balance);
  // console.log(await contract.uri(6));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
