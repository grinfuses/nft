const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretKey = process.env.PINATA_SECRET_KEY;

async function pinJSONToIPFS(JSONBody) {
    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", JSONBody, {
            headers: {
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretKey,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function main() {
    try {
        // Usar el CID existente de la imagen
        const imageCID = "QmWqAgeMjf6UQyaFZMVtvd2h6y7RonaU9P1ffZuCe1753U";
        
        // Crear los metadatos
        const metadata = {
            name: "LEP #1",
            description: "LEP NFT Collection by Luisa Estudillo",
            image: `ipfs://${imageCID}`,
            attributes: [
                {
                    trait_type: "Artist",
                    value: "Luisa Estudillo"
                },
                {
                    trait_type: "Técnica",
                    value: "Técnica mixta sobre lienzo"
                },
                {
                    trait_type: "Año",
                    value: "2000"
                },
                {
                    trait_type: "Tamaño",
                    value: "81x20cms"
                }
            ]
        };
        
        // Subir los metadatos actualizados
        const metadataResult = await pinJSONToIPFS(metadata);
        
        console.log('\nMetadatos subidos a IPFS:');
        console.log('IPFS Hash:', metadataResult.IpfsHash);
        
        // Actualizar el baseTokenURI en el contrato
        const { ethers } = require("hardhat");
        const contractAddress = "0x99332B40eB24f8Eb448E2FF8Df8dA76690458700";
        const NFTCollection = await ethers.getContractFactory("NFTCollection");
        const contract = NFTCollection.attach(contractAddress);
        
        const tx = await contract.setBaseURI(`ipfs://${metadataResult.IpfsHash}`);
        await tx.wait();
        
        console.log('\nBase URI actualizado en el contrato');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 