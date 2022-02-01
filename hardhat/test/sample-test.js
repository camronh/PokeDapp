const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Contract = await ethers.getContractFactory("GameItems");
    const contract = await Contract.deploy();
    const [owner, custy] = await ethers.getSigners();

    await contract.deployed();

    const mintTx = await contract.mint(6);

    // wait until the transaction is mined
    await mintTx.wait();
    const balance = await contract.balanceOf(owner.address, 6);
    console.log(balance);
    console.log(await contract.uri(6));
  });
});
