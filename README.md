# LEP NFT Collection

Este proyecto es una colección de NFTs de arte digital.

## Descripción

Colección de NFTs que representa obras de arte digital, desplegada en la red Sepolia de Ethereum.

## Tecnologías Utilizadas

- Solidity
- Hardhat
- OpenZeppelin
- Ethers.js
- IPFS (Pinata)

## Configuración del Proyecto

1. Clonar el repositorio:
```bash
git clone <tu-repo-url>
cd nft
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` y configurar las variables de entorno:
```bash
SEPOLIA_URL=<tu-url-de-sepolia>
PRIVATE_KEY=<tu-private-key>
PINATA_API_KEY=<tu-api-key>
PINATA_API_SECRET=<tu-api-secret>
```

## Despliegue

Para desplegar el contrato en Sepolia:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Minteo de NFTs

Para mintear un nuevo NFT:

```bash
npx hardhat run scripts/mint.js --network sepolia
```

## Contratos Desplegados

- Red: Sepolia
- Dirección del Contrato: `0xB3fc16A52faf764CCCCd55066b250428F31617D5`
- Colección en OpenSea: [Ver en OpenSea](https://opensea.io/assets/sepolia/0xB3fc16A52faf764CCCCd55066b250428F31617D5)

## Seguridad

- No subir archivos `.env` al repositorio
- No compartir claves privadas
- No compartir API keys
- Usar siempre `.gitignore`

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

La Licencia MIT es una licencia de software permisiva que permite:
- Uso comercial
- Modificación
- Distribución
- Uso privado

La única condición es incluir el aviso de copyright y la licencia en cualquier copia del software/código. 
