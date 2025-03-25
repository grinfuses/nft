const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretKey = process.env.PINATA_SECRET_KEY;

async function uploadFileToIPFS(filePath) {
    const formData = new FormData();
    const fileStream = fs.createReadStream(filePath);
    
    formData.append('file', fileStream);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretKey
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        throw error;
    }
}

async function main() {
    try {
        // Upload metadata file
        console.log("Subiendo metadata a IPFS...");
        const metadataPath = path.join(__dirname, '../metadata/1.json');
        const metadataResult = await uploadFileToIPFS(metadataPath);
        console.log("Metadata CID:", metadataResult.IpfsHash);
        
        // Connect to Sepolia network
        const { ethers } = require("hardhat");
        const [deployer] = await ethers.getSigners();
        console.log("Conectado con la dirección:", deployer.address);
        
        // Get the network
        const network = await ethers.provider.getNetwork();
        console.log("Red conectada:", network.name);
        
        // Update the contract with new baseURI
        const contractAddress = "0x4CA84e0d5b302b80F8048d00399cB7cf86153aEB"; // Dirección en Sepolia
        const NFTCollection = await ethers.getContractFactory("NFTCollection");
        const contract = NFTCollection.attach(contractAddress);
        
        console.log("Actualizando baseURI en el contrato...");
        const newBaseURI = `ipfs://${metadataResult.IpfsHash}`;
        console.log("Nuevo baseURI:", newBaseURI);
        
        const tx = await contract.setBaseURI(newBaseURI);
        console.log("Transacción enviada:", tx.hash);
        console.log("Esperando confirmación...");
        
        await tx.wait();
        console.log("BaseURI actualizado exitosamente");
        
        // Verificar el tokenURI del NFT
        try {
            const tokenURI = await contract.tokenURI(1);
            console.log("Token URI del NFT #1:", tokenURI);
        } catch (error) {
            console.log("No se pudo obtener el tokenURI. Es posible que el NFT #1 aún no haya sido minteado.");
        }
        
    } catch (error) {
        console.error("Error:", error.message || error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 