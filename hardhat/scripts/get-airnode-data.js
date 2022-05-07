const { ethers } = require("hardhat");
const {
  deriveSponsorWalletAddress,
  deriveAirnodeXpub,
} = require("@api3/airnode-admin");

async function main() {
  const airnodeWallet = new ethers.Wallet.fromMnemonic(
    "achieve sphere certain gold prison total ball display host episode pen auto"
  );
  // AirnodeWallet Balance

  const airnodeXpub = await deriveAirnodeXpub(airnodeWallet.mnemonic.phrase);

  const sponsorWalletAddress = await deriveSponsorWalletAddress(
    airnodeXpub,
    airnodeWallet.address,
    airnodeWallet.address
  );

  console.log({
    sponsorWalletAddress,
    airnodeXpub,
    airnodeWallet: airnodeWallet.address,
    privateKey: airnodeWallet.privateKey,
  });
}

main();
