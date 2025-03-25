const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xe2A18d5097652bBe27d561C34aD5dE6b8552D6e6";
    const NFTCollection = await ethers.getContractFactory("NFTCollection");
    const contract = NFTCollection.attach(contractAddress);

    // Verificar el tokenURI
    const tokenURI = await contract.tokenURI(1);
    console.log("TokenURI:", tokenURI);
    
    // Convertir a URL HTTP para verificar
    const httpURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
    console.log("URL HTTP:", httpURL);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 