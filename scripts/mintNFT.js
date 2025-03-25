const { ethers } = require("hardhat");

async function main() {
  // Get the contract instance
  const contractAddress = "0x99332B40eB24f8Eb448E2FF8Df8dA76690458700";
  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const contract = NFTCollection.attach(contractAddress);

  // Get the signer (your wallet)
  const [signer] = await ethers.getSigners();
  console.log("Mintando NFT desde la dirección:", signer.address);

  // Mint the NFT
  const mintPrice = await contract.mintPrice();
  console.log("Precio de mint:", ethers.utils.formatEther(mintPrice), "ETH");

  try {
    const tx = await contract.mintNFT(signer.address, {
      value: mintPrice
    });
    console.log("Transacción enviada:", tx.hash);
    
    // Esperar a que la transacción se confirme
    const receipt = await tx.wait();
    console.log("NFT minteado exitosamente!");
    console.log("ID del token:", receipt.events[0].args.tokenId.toString());
  } catch (error) {
    console.error("Error al mintear:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 