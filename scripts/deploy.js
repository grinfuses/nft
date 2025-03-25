const { ethers } = require("hardhat");

async function main() {
  // Deploy the NFT collection
  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const nftCollection = await NFTCollection.deploy(
    "LEP", // Name
    "LEP", // Symbol
    "ipfs://QmVKN4SWZAMeGnHZGvC69zszugnTznFXaWGM7GCdWcwEVX" // Base URI que apunta a los metadatos
  );

  await nftCollection.deployed();
  console.log("LEP NFT Collection deployed to:", nftCollection.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });