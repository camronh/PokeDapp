const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pokemon", function () {
  let rrpContract, pokeContract, owner, custy1;
  let ownerContract, custyContract;

  it("Deployment", async function () {
    const RRPContract = await hre.ethers.getContractFactory("AirnodeRrp");

    rrpContract = await RRPContract.deploy();
    await rrpContract.deployed();

    const Contract = await ethers.getContractFactory("Pokemon");
    pokeContract = await Contract.deploy(rrpContract.address);
    await pokeContract.deployed();

    [owner, custy1] = await ethers.getSigners();
    ownerContract = pokeContract.connect(owner);
    custyContract = pokeContract.connect(custy1);
  });

  it("Mint Pokemon", async function () {
    await ownerContract.ownerMint(55, owner.address, 100);
    await ownerContract.ownerMint(20, custy1.address, 200);
    expect((await ownerContract.ownersPokedex(owner.address)).length).to.equal(
      1
    );
    expect((await ownerContract.ownersPokedex(custy1.address)).length).to.equal(
      1
    );
  });

  it("Propose Battle", async function () {
    await ownerContract.proposeBattle(0, {
      value: ethers.utils.parseEther("0.1"),
    });
    const battle = await ownerContract.battles(owner.address);
    expect(battle.opponent).to.equal(owner.address);
    await expect(
      ownerContract.proposeBattle(0, {
        value: ethers.utils.parseEther("0.1"),
      })
    ).to.be.reverted;
  });

  it("Challenge Owner", async function () {
    await custyContract.challenge(owner.address, 0, {
      value: ethers.utils.parseEther("0.1"),
    });
    const battle = await ownerContract.battles(owner.address);
    expect(battle.opponent).to.equal(custy1.address);
  });

  it("Battle", async function () {
    await ownerContract.battle(owner.address);
    const battle = await ownerContract.battles(owner.address);
    expect(battle.status).to.equal(0);
  });
});
