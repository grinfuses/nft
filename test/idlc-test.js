const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("idlc", function () {
  let nftContract;
  let deployer;

  beforeEach(async function () {
    [deployer] = await ethers.getSigners();
    const NFTContractFactory = await ethers.getContractFactory("idlc");
    nftContract = await NFTContractFactory.deploy();
    await nftContract.deployed();
  });

  it("Debería asignar al deployer como owner", async function () {
    expect(await nftContract.owner()).to.equal(deployer.address);
  });

  it("Debería acuñar un NFT y asignarlo al address correcto", async function () {
    await nftContract.mint(deployer.address);
    expect(await nftContract.ownerOf(0)).to.equal(deployer.address);
  });
});
