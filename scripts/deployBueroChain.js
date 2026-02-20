const { ethers } = require("hardhat");

/**
 * Despliega BueroChainNFT en Sepolia para uso en clase.
 *
 * Configuración:
 *   - NAME       Nombre del contrato (aparece en MetaMask y OpenSea)
 *   - SYMBOL     Símbolo (3-4 letras)
 *   - BASE_URI   URI base de metadatos en IPFS (debe terminar en /)
 *   - MAX_SUPPLY Número máximo de NFTs minteable (1 por alumno + margen)
 *
 * Uso:
 *   npx hardhat run scripts/deployBueroChain.js --network sepolia
 */

const NAME       = "BueroChain NFT";
const SYMBOL     = "BUERO";
const BASE_URI   = "ipfs://QmVKN4SWZAMeGnHZGvC69zszugnTznFXaWGM7GCdWcwEVX/";  // sustituir por tu CID
const MAX_SUPPLY = 50;  // cambia al número de alumnos + margen

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Desplegando con la cuenta:", deployer.address);
    console.log("Balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    const Factory = await ethers.getContractFactory("BueroChainNFT");
    const contract = await Factory.deploy(NAME, SYMBOL, BASE_URI, MAX_SUPPLY);
    await contract.waitForDeployment();

    const address = await contract.getAddress();
    console.log("\n✅ BueroChainNFT desplegado en:", address);
    console.log("   Nombre:     ", NAME);
    console.log("   Símbolo:    ", SYMBOL);
    console.log("   Max supply: ", MAX_SUPPLY);
    console.log("   Base URI:   ", BASE_URI);
    console.log("\n🔗 Etherscan Sepolia:");
    console.log("   https://sepolia.etherscan.io/address/" + address);
    console.log("\n📋 Copia esta dirección en BueroChain > sepolia.html > NFT_CONTRACT_ADDRESS");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
