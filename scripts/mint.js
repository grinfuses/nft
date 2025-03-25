const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xB3fc16A52faf764CCCCd55066b250428F31617D5";
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