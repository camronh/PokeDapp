// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Pokemon is ERC1155 {
    constructor()
        public
        ERC1155(
            "https://c48103b6k8.execute-api.us-east-1.amazonaws.com/latest/metadata/{id}.json"
        )
    {}

    function mint(uint256 _pokemonId) public {
        require(_pokemonId < 899);
        _mint(msg.sender, _pokemonId, 1, "");
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "https://c48103b6k8.execute-api.us-east-1.amazonaws.com/latest/metadata/",
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }
}
