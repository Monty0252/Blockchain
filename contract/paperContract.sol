// SPDX-License-Identifier: UNLICENSED
// Solidity program
pragma solidity ^0.8.17;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";


contract MyContract is ERC20{
    uint public number;
    address owner;

    modifier onlyOwner() 
            { 
                require(msg.sender == owner);
            _   ;
            }

    constructor() ERC20("Paper", "VV") {        
        _mint(msg.sender,0*10**18);
        owner = msg.sender;
    }    
   
     // ERC20 Methods
     //
            
           function rewardConsumer(address receiver,uint amount) public onlyOwner
           {
                
                 _mint(receiver,amount);    
           }
            
            function getBalance(address _id) public view  returns(uint256 balance)
           {
               balance = balanceOf(_id);
           }


            // Structure of Consumer
    struct Consumer{
        
        // State variables
        string consumer_unique_id;
        string user_name;
        string type_document;

    }

    Consumer []consum;

    // Function to add consumer details
    function addConsumer(
        string memory consumer_unique_id, 
        string memory user_name,
        string memory type_document)public{
        Consumer memory c =Consumer(consumer_unique_id, user_name, type_document);
        consum.push(c);
    }

    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    
    // Function to get inf about the consumer
    function getConsumer(
         string memory consumer_unique_id
    ) public view returns(
        string memory,
        string memory){
        uint i;
        for(i=0; i<consum.length; i++)
        {
            Consumer memory c =consum[i];
            //Checking if the consumer ID exists
            
             if(compare(c.consumer_unique_id, consumer_unique_id) == true){
                 return(c.user_name, c.type_document);
             }
        }
        
        // If the consumer id deosn't exist then return Not Found
        return("Not Found", "Not Found");
    }


}