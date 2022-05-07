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
  solidity: "0.8.9",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/8a5e57fedea046d0a4c12341003d9a85",
      accounts: [
        "0x8130ba1cb71aa3b055926940c1fcabe9edbf500d18ed123237d8ed60785d6811",
      ],
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/8a5e57fedea046d0a4c12341003d9a85",
      accounts: [
        "0x8130ba1cb71aa3b055926940c1fcabe9edbf500d18ed123237d8ed60785d6811",
      ],
    },
  },
};
