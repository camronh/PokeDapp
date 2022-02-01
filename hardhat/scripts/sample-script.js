// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("Pokemon");
  const contract = await Contract.deploy();
  const [owner] = await ethers.getSigners();

  const max = 898;
  const randomId = Math.floor(Math.random() * max) + 1;

  await contract.deployed();

  console.log(`Deployed at ${contract.address}`);

  const mintTx = await contract.mint(randomId);

  // wait until the transaction is mined
  await mintTx.wait();
  const balance = await contract.balanceOf(owner.address, randomId);
  console.log({ balance });
  console.log(
    `Minted! Check at https://testnets.opensea.io/assets/${contract.address}/${randomId}`
  );
  console.log(
    `Check https://ropsten.rarible.com/token/${contract.address}:${randomId}?tab=details`
  );
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
