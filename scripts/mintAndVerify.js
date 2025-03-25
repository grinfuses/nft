const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xe2A18d5097652bBe27d561C34aD5dE6b8552D6e6";
    const NFTCollection = await ethers.getContractFactory("NFTCollection");
    const contract = NFTCollection.attach(contractAddress);

    // Mintear un token
    console.log("Mintando un nuevo token...");
    const mintPrice = await contract.mintPrice();
    const tx = await contract.mintNFT(await contract.signer.getAddress(), {
        value: mintPrice
    });
    await tx.wait();
    console.log("Token minteado exitosamente!");

    // Verificar el tokenURI
    const tokenURI = await contract.tokenURI(1);
    console.log("\nTokenURI:", tokenURI);
    
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