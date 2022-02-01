require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/8a5e57fedea046d0a4c12341003d9a85",
      accounts: [
        "0xf991bfe0733264c31d485d0ed4f350ce242fdd9fc61f92ee369c6171cc912f52",
      ],
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/8a5e57fedea046d0a4c12341003d9a85",
      accounts: [
        "0xf991bfe0733264c31d485d0ed4f350ce242fdd9fc61f92ee369c6171cc912f52",
      ],
    },
  },
};
