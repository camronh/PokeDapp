pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequester.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pokemon is ERC1155, RrpRequester, Ownable {
    mapping(bytes32 => address) requestIdToAddress;
    mapping(bytes32 => bool) public incomingFulfillments;
    mapping(address => PokemonInfo[]) public pokedex;
    mapping(address => Battle) public battles;

    enum Status {
        PENDING,
        OPEN,
        IN_PROGRESS,
        COMPLETED
    }

    struct Battle {
        address challenger;
        PokemonInfo challengerPokemon;
        address opponent;
        PokemonInfo opponentPokemon;
        uint256 bet;
        Status status;
    }

    struct PokemonInfo {
        uint256 id;
        string name;
        uint256 hp;
        uint256 attack;
    }

    address constant airnodeWalletAddress =
        0x256Cc6AF530C64910A07f7B8813F73B8e77df91D;

    address constant sponsorWallet = 0x683f5344ea130476F022A52f21F93AFA28365ea6;

    bytes constant parameters =
        abi.encode(
            bytes32("1SS"),
            bytes32("_path"),
            "id,name,attributes.0.value,attributes.1.value",
            bytes32("_type"),
            "uint256,string,uint256,uint256"
        );

    modifier ownsPokemon(uint256 _pokeDexIndex) {
        require(
            pokedex[msg.sender].length > _pokeDexIndex,
            "You don't have that many pokemon"
        );
        _;
    }

    constructor(address airnodeAddress)
        public
        RrpRequester(airnodeAddress)
        ERC1155(
            "https://c48103b6k8.execute-api.us-east-1.amazonaws.com/latest/metadata/{id}.json"
        )
    {}

    function requestRandomPokemon() external {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnodeWalletAddress,
            0x8bdb645ddcc6e95cc3e81aa5833c7e28042f4fa4eeb49b1de56d5fabd50e1657,
            airnodeWalletAddress,
            sponsorWallet,
            address(this),
            this.mint.selector,
            parameters
        );
        incomingFulfillments[requestId] = true;
        requestIdToAddress[requestId] = msg.sender;
    }

    function mint(bytes32 requestId, bytes calldata data)
        external
        onlyAirnodeRrp
    {
        require(incomingFulfillments[requestId], "No such request made");
        delete incomingFulfillments[requestId];
        (uint256 id, string memory name, uint256 hp, uint256 attack) = abi
            .decode(data, (uint256, string, uint256, uint256));

        _mint(requestIdToAddress[requestId], id, 1, "");
        pokedex[requestIdToAddress[requestId]].push(
            PokemonInfo(id, name, hp, attack)
        );
    }

    function ownerMint(
        uint256 _pokemonId,
        address _mintTo,
        uint256 _attack
    ) external onlyOwner {
        // uint256 randomNumber = abi.decode(data, (uint256));
        _mint(_mintTo, _pokemonId, 1, "");
        pokedex[_mintTo].push(
            PokemonInfo(_pokemonId, "PokemonName", 50, _attack)
        );
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
                    Strings.toString(_tokenId)
                )
            );
    }

    function ownersPokedex(address _address)
        public
        view
        returns (PokemonInfo[] memory)
    {
        return pokedex[_address];
    }

    function proposeBattle(uint256 _pokeDexIndex)
        public
        payable
        ownsPokemon(_pokeDexIndex)
    {
        require(msg.value >= 1, "Bet must be greater than 0");
        require(
            battles[msg.sender].status == Status.PENDING,
            "You already have a battle open"
        );

        PokemonInfo memory pokemon = pokedex[msg.sender][_pokeDexIndex];
        // require(pokemon.id, "No such pokemon");
        Battle memory _battle = Battle(
            msg.sender,
            pokemon,
            msg.sender,
            PokemonInfo(0, "", 0, 0),
            msg.value,
            Status.OPEN
        );
        battles[msg.sender] = _battle;
    }

    function challenge(address challenger, uint256 _pokeDexIndex)
        public
        payable
        ownsPokemon(_pokeDexIndex)
    {
        require(battles[challenger].status == Status.OPEN, "Battle not open");
        PokemonInfo memory pokemon = pokedex[msg.sender][_pokeDexIndex];
        // require(pokemon.id, "No such pokemon");
        Battle memory _battle = battles[challenger];
        require(msg.value == _battle.bet, "Bet must match");
        _battle.opponent = msg.sender;
        _battle.opponentPokemon = pokemon;
        _battle.status = Status.IN_PROGRESS;
        battles[challenger] = _battle;
    }

    function battle(address _challenger) public {
        Battle memory _battle = battles[_challenger];
        require(_battle.status == Status.IN_PROGRESS, "Battle not in progress");
        require(
            msg.sender == _challenger || msg.sender == _battle.opponent,
            "Only participants can call this function"
        );
        bool challengerWin = _battle.challengerPokemon.attack >
            _battle.opponentPokemon.attack;
        delete battles[_challenger];
        if (challengerWin) {
            (bool sent, bytes memory data) = _challenger.call{
                value: _battle.bet * 2
            }("");
            require(sent, "Failed to send Ether");
        } else {
            (bool sent, bytes memory data) = _battle.opponent.call{
                value: _battle.bet * 2
            }("");
            require(sent, "Failed to send Ether");
        }
    }
}
