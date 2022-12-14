// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/Base64.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721, ERC721Burnable, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256) public nftHolders;
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    CharacterAttributes[] allCardsInGame;

    struct CharacterAttributes {
        string name;
        string imageURI;
        uint percievedLoudness;
        uint tailLength;
        uint bodyLength;
        uint dynamicRange;
        uint duration;
    }

    constructor() ERC721("MyToken", "MTK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(
        address to,
        string memory _name,
        string memory _imageURI,
        uint256 _percievedLoudness,
        uint256 _tailLength,
        uint256 _bodyLength,
        uint256 _dynamicRange,
        uint256 _duration
    ) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        nftHolders[to] = tokenId;
        nftHolderAttributes[tokenId] = CharacterAttributes({
            name: _name,
            imageURI: _imageURI,
            percievedLoudness: _percievedLoudness,
            tailLength: _tailLength,
            bodyLength: _bodyLength,
            dynamicRange: _dynamicRange,
            duration: _duration
        });
        console.log(
            "Minted NFT w/ tokenId %s and characterIndex %s",
            tokenId,
            _name
        );
        allCardsInGame.push(nftHolderAttributes[tokenId]);
        _tokenIdCounter.increment();
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        CharacterAttributes memory charAttributes = nftHolderAttributes[
            _tokenId
        ];
        string memory percievedLoudness = Strings.toString(
            charAttributes.percievedLoudness
        );
        string memory tailLength = Strings.toString(charAttributes.tailLength);
        string memory bodyLength = Strings.toString(charAttributes.bodyLength);
        string memory duration = Strings.toString(charAttributes.duration);
        string memory dynamicRange = Strings.toString(
            charAttributes.dynamicRange
        );

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                charAttributes.name,
                " -- NFT #: ",
                Strings.toString(_tokenId),
                '", "description": "This is an NFT that lets people play and trade for a Sonic Game!", "image": "ipfs://',
                charAttributes.imageURI,
                '", "attributes": [ { "trait_type": "Percieved Loudness", "value": ',
                percievedLoudness,
                '}, { "trait_type": "Tail Length", "value": ',
                tailLength,
                '}, { "trait_type": "Body Length", "value": ',
                bodyLength,
                '}, { "trait_type": "Dynamic Range", "value": ',
                dynamicRange,
                '},  { "trait_type": "Duration", "value": ',
                duration,
                "} ]}"
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
