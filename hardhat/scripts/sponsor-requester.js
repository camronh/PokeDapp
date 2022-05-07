const hre = require("hardhat");
const airnodeAdmin = require("@api3/airnode-admin");
async function sponsorRequester(requesterAddress) {
  console.log(`Sponsoring Requester: ${requesterAddress}`);
  const mnemonic =
    "achieve sphere certain gold prison total ball display host episode pen auto";

  const providerURL =
    "https://ropsten.infura.io/v3/8a5e57fedea046d0a4c12341003d9a85";
  //   const requesterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const airnodeRrpAddress = "0x3B35250Ca54C1Fb8c83D48F21231ef6e4fb9f79D";
  // First obtain the contract instance on target chain

  const airnodeRrp = await airnodeAdmin.getAirnodeRrp(providerURL, {
    signer: { mnemonic },
    airnodeRrpAddress,
  });

  const requester = await airnodeAdmin.sponsorRequester(
    airnodeRrp,
    requesterAddress
  );
  console.log(requester);
  console.log(`Sponsored Requester: ${requesterAddress}`);
}

module.exports = {
  sponsorRequester,
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// sponsorRequester("0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6")
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
