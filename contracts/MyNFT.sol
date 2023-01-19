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

    mapping(address => uint256[]) public nftHolders;
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    CharacterAttributes[] allCardsInGame;
    // string[] yourCardsInGame;

    mapping(address => string[]) public yourCardsInGameMapping;

    event MintReceipt(address sender, uint256 tokenId);

    struct CharacterAttributes {
        string name;
        string imageURI;
        uint percievedLoudness;
        uint tailLength;
        uint bodyLength;
        uint dynamicRange;
        uint duration;
        bool redeemed;
    }

    constructor() ERC721("MyToken", "MTK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
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
        bool _redeemed
    ) public onlyRole(MINTER_ROLE) {
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
        emit MintReceipt(msg.sender, tokenId);
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
        uint256 redeemed = convertBoolToNumber(charAttributes.redeemed);
        string memory redeemedString = Strings.toString(redeemed);
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
                redeemedString,
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
        card.redeemed = true;
    }

    function checkRedemptionStatus(uint256 tokenId) public view returns (bool) {
        CharacterAttributes memory card = nftHolderAttributes[tokenId];
        return card.redeemed;
    }

    function convertBoolToNumber(
        bool redeemed
    ) public pure returns (uint256 redeemedBinary) {
        if (redeemed == true) {
            return 1;
        } else {
            return 0;
        }
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

// function checkForUsersNFTs()
//     public
//     returns (string[] memory yoCardsInGame)
// {
//     uint256[] memory nftArray = nftHolders[msg.sender];
//     if (nftArray[0] > 0) {
//         for (uint i = 0; i < nftArray.length; i++) {
//             CharacterAttributes memory nft = nftHolderAttributes[
//                 nftArray[i]
//             ];
//             yourCardsInGame.push(nft.imageURI);
//         }
//         return yourCardsInGame;
//     } else {
//         return yourCardsInGame;
//     }
// }
