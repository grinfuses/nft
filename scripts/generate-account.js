const { ethers } = require("ethers");

async function main() {
    const wallet = ethers.Wallet.createRandom();
    console.log("Nueva cuenta generada:");
    console.log("Dirección:", wallet.address);
    console.log("Llave privada:", wallet.privateKey);
    console.log("\nCopia estos valores en tu archivo .env");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 