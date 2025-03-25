const fs = require('fs');
const path = require('path');

const BASE_IMAGE_CID = 'QmWqAgeMjf6UQyaFZMVtvd2h6y7RonaU9P1ffZuCe1753U';

// Create metadata directory if it doesn't exist
const metadataDir = path.join(__dirname, '../metadata');
if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir);
}

// Base metadata template from 1.json
const metadata = {
    name: "LEP #1",
    description: "LEP NFT Collection by Luisa Estudillo",
    image: `ipfs://${BASE_IMAGE_CID}`,
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
    ],
    external_url: `https://lime-binding-buzzard-28.mypinata.cloud/ipfs/${BASE_IMAGE_CID}`
};

// Write metadata file
fs.writeFileSync(
    path.join(metadataDir, '1.json'),
    JSON.stringify(metadata, null, 2)
);

console.log('Generated metadata for NFT #1'); 