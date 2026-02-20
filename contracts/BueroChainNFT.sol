// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BueroChainNFT
 * @dev NFT educativo para clase de blockchain — sin precio de minteo (solo gas)
 * @notice Cada alumno puede mintear 1 NFT gratuito en Sepolia testnet
 */
contract BueroChainNFT is ERC721, Ownable {
    uint256 private _tokenIds;
    uint256 public maxSupply;
    string private _baseTokenURI;

    event Minted(address indexed recipient, uint256 indexed tokenId);

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI,
        uint256 supply
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseURI;
        maxSupply = supply;
    }

    /**
     * @notice Mintea un NFT gratis (solo gas). Cualquiera puede llamar a esta función.
     * @param recipient Dirección que recibirá el NFT (normalmente msg.sender)
     * @return tokenId El ID del token minteado
     */
    function mintNFT(address recipient) public returns (uint256) {
        require(_tokenIds < maxSupply, "Max supply alcanzado");
        _tokenIds++;
        _mint(recipient, _tokenIds);
        emit Minted(recipient, _tokenIds);
        return _tokenIds;
    }

    /**
     * @notice Devuelve el número de NFTs minteados hasta ahora
     */
    function totalMinted() public view returns (uint256) {
        return _tokenIds;
    }

    /**
     * @notice URI base para los metadatos (IPFS)
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @notice Actualiza la URI base (solo owner)
     */
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    /**
     * @notice Cambia el maxSupply (solo owner, no puede bajar del total minteado)
     */
    function setMaxSupply(uint256 newSupply) public onlyOwner {
        require(newSupply >= _tokenIds, "No se puede reducir por debajo del total minteado");
        maxSupply = newSupply;
    }
}
