App = {
  web3: null,
  receiver: null,
  contracts: {},
  currentAccount:null,
  url: 'http://127.0.0.1:8545',
  network_id: 5777, // for local,
  handler:null,
  address: "0x3f4BEC71985655A125fe1Ff93777644D8bb7F43D",

  
  init: function() {
      return App.initWeb3();
  },

  initWeb3: function () {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
    } 
    
    else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3 = new Web3(App.url)
    }
  
    ethereum.enable();

    return App.initContract();
  },

  initContract: function () {
      PaperContract = new App.web3.eth.Contract(App.abi, App.address, {});
  
      console.log(PaperContract);
      
      return App.BindEvents();
      
  },

  BindEvents: function() {
      $(document).on('click', '#Login', function(){// working
           App.init()
        });

      $(document).on('click', '#Store', function(){// working
       App.insertDocument(jQuery("#unique_code").val(), jQuery("#username").val(), jQuery("#document").val());
    });
    $(document).on('click', '#Retrieve', function(){// working
      App.getDocument(jQuery("#unique_code").val());
   });
  },


insertDocument: async function(ID, username, doc){// create is working
  let accounts = await App.web3.eth.getAccounts()
  console.log(accounts[0])

  if (accounts[0] == "undefined"){
    alert("Please Connect to Metamask")
  }

  var deploy = await PaperContract.methods.addConsumer(ID,username,doc).send({from: accounts[0]})
  // var result = await PaperContract.methods.getBalance(accounts[0]).call()
  // console.log(result)     
  if(deploy){
    await PaperContract.methods.rewardConsumer(accounts[0],10000).send({from: accounts[0]})
    console.log("Transaction Successful")
    console.log(deploy)
    if(deploy.status == 1)

    
    alert("Thank You. Your information was stored successfully. Please save your key below to gain access to your information")
    else
    alert("There was an issue storing your information, please try again")

  }
},

getDocument: async function(ID){// create is working
let accounts = await App.web3.eth.getAccounts()
console.log(accounts[0])

if (accounts[0] == "undefined"){
  alert("Please Connect to Metamask")
}

// var deploy = await PaperContract.methods.getConsumer(ID).send({from: accounts[0]})
var deploy = await PaperContract.methods.getConsumer(ID).send({from: accounts[0]})
var result = await PaperContract.methods.getConsumer(ID).call({from: accounts[0]})
var balance = await PaperContract.methods.getBalance(accounts[0]).call({from: accounts[0]})
console.log(balance)
 
if(deploy){
  console.log("Transaction Successful")
  console.log(result)
  console.log("YOUR BALANCE IS BELOW")
  console.log(balance)
  if(deploy.status == 1)
  alert("Thank You. Your information can be found below\r\n" + "Name: " + result[0] + "\r\n" + "Document: " + result[1] + "\r\n" + "Your current token balance is: " + balance)
  else
  alert("There was an issue, please try again")

}
},

// WEBSITE ABI 
abi:[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "consumer_unique_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "user_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "type_document",
				"type": "string"
			}
		],
		"name": "addConsumer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "rewardConsumer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "str2",
				"type": "string"
			}
		],
		"name": "compare",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "consumer_unique_id",
				"type": "string"
			}
		],
		"name": "getConsumer",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "number",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
};


$(function () {
  $(window).load(function () {
    console.log("CONTRACT COMPLETE");
    App.init();
  });
});