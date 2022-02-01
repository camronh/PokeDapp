const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pokemon", function () {
  it("Mint a Pokemon", async function () {
    const Contract = await ethers.getContractFactory("Pokemon");
    const contract = await Contract.deploy();
    const [owner] = await ethers.getSigners();

    await contract.deployed();

    // const mintTx = await contract.mint(6);

    // // wait until the transaction is mined
    // await mintTx.wait();
    const balance = await contract.balanceOf(owner.address, 6);
    console.log(balance);
    console.log(await contract.uri(6));
  });
});
