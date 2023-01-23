// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/Base64.sol";
import "hardhat/console.sol";

contract MyNFT is ERC721, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256[]) public nftHolders;
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    CharacterAttributes[] allCardsInGame;
    // string[] yourCardsInGame;

    mapping(address => string[]) public yourCardsInGameMapping;

    event MintReceipt(address sender, uint256 tokenId, string imageURI);

    struct CharacterAttributes {
        string name;
        string imageURI;
        uint percievedLoudness;
        uint tailLength;
        uint bodyLength;
        uint dynamicRange;
        uint duration;
        uint redeemed;
    }

    constructor() ERC721("MyToken", "MTK") {
        _tokenIdCounter.increment();
    }

    function safeMint(
        string memory _name,
        string memory _imageURI,
        uint256 _percievedLoudness,
        uint256 _tailLength,
        uint256 _bodyLength,
        uint256 _dynamicRange,
        uint256 _duration,
        uint256 _redeemed
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        nftHolders[msg.sender].push(tokenId);
        nftHolderAttributes[tokenId] = CharacterAttributes({
            name: _name,
            imageURI: _imageURI,
            percievedLoudness: _percievedLoudness,
            tailLength: _tailLength,
            bodyLength: _bodyLength,
            dynamicRange: _dynamicRange,
            duration: _duration,
            redeemed: _redeemed
        });
        yourCardsInGameMapping[msg.sender].push(_imageURI);
        console.log(
            "Minted NFT w/ tokenId %s and characterIndex %s",
            tokenId,
            _name
        );
        allCardsInGame.push(nftHolderAttributes[tokenId]);
        emit MintReceipt(msg.sender, tokenId, _imageURI);
        _tokenIdCounter.increment();
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        // change this to storage and see if opensea update works
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
        string memory redeemed = Strings.toString(charAttributes.redeemed);
        string memory one = Strings.toString(1);

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
                '},{ "trait_type": "Redeemed", "value": ',
                redeemed,
                ', "max_value":',
                one,
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

    function checkForUsersNFTs()
        public
        view
        returns (string[] memory yoCardsInGame)
    {
        return yourCardsInGameMapping[msg.sender];
    }

    function switchRedeemed(uint256 tokenId) public {
        CharacterAttributes storage card = nftHolderAttributes[tokenId];
        card.redeemed = 1;
    }

    function checkRedemptionStatus(
        uint256 tokenId
    ) public view returns (uint256) {
        CharacterAttributes memory card = nftHolderAttributes[tokenId];
        return card.redeemed;
    }
}
