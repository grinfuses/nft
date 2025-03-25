const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0xb74E40164f18fb48dfAEA83c2a682942e415D0E5";
    const NFTCollection = await ethers.getContractFactory("NFTCollection");
    const contract = NFTCollection.attach(contractAddress);

    // Actualizar el baseURI al nuevo CID
    const newBaseURI = "ipfs://QmWqAgeMjf6UQyaFZMVtvd2h6y7RonaU9P1ffZuCe1753U";
    console.log("Actualizando baseURI a:", newBaseURI);
    
    const tx = await contract.setBaseURI(newBaseURI);
    await tx.wait();
    
    console.log("BaseURI actualizado exitosamente!");
    
    // Verificar el nuevo tokenURI
    const tokenURI = await contract.tokenURI(1);
    console.log("\nNuevo tokenURI:", tokenURI);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 