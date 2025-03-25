// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTCollection is ERC721, Ownable {
    using Strings for uint256;
    
    uint256 private _tokenIds;
    uint256 public mintPrice = 0.01 ether;
    uint256 public maxSupply = 1;
    string private _baseTokenURI;
    
    constructor(
        string memory _name,
        string memory _symbol,
        string memory baseURI
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }
    
    function mintNFT(address recipient) public payable returns (uint256) {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(_tokenIds < maxSupply, "Max supply reached");
        
        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        
        return newItemId;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721: URI query for nonexistent token");
        return _baseURI();
    }
    
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function setMintPrice(uint256 _price) public onlyOwner {
        mintPrice = _price;
    }
    
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
} 