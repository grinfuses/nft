const { ethers } = require("hardhat");

async function main() {
  // Get the contract instance
  const contractAddress = "0x4CA84e0d5b302b80F8048d00399cB7cf86153aEB";
  const NFTCollection = await ethers.getContractFactory("NFTCollection");
  const contract = NFTCollection.attach(contractAddress);

  // Get the transfer events
  const filter = contract.filters.Transfer(null, null);
  const events = await contract.queryFilter(filter);
  
  if (events.length > 0) {
    console.log(`Total de NFTs minteados: ${events.length}`);
    // Get the last event
    const lastEvent = events[events.length - 1];
    console.log(`Último ID de token minteado: ${lastEvent.args.tokenId}`);
    console.log(`Dueño del último token: ${lastEvent.args.to}`);
  } else {
    console.log("Aún no se han minteado NFTs");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 