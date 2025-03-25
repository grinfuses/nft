const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x4CA84e0d5b302b80F8048d00399cB7cf86153aEB";
    const NFTCollection = await ethers.getContractFactory("NFTCollection");
    const contract = NFTCollection.attach(contractAddress);

    // Verificar el tokenURI del token #1
    const tokenURI = await contract.tokenURI(1);
    console.log("Token URI del NFT #1:", tokenURI);

    // Intentar obtener los metadatos
    const axios = require('axios');
    try {
        // Convertir ipfs:// a https://ipfs.io/ipfs/
        const httpUrl = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
        console.log("URL HTTP:", httpUrl);
        
        const response = await axios.get(httpUrl);
        console.log("\nMetadatos del NFT:");
        console.log(JSON.stringify(response.data, null, 2));

        // Intentar obtener la imagen
        const imageUrl = response.data.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
        console.log("\nURL de la imagen:", imageUrl);
    } catch (error) {
        console.error("Error al obtener metadatos:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 