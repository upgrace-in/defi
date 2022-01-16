function printValues(obj) {
  for (var k in obj) {
    if (obj[k] instanceof Object) {
      printValues(obj[k]);
    } else {
      document.write(obj[k] + "<br>");
    }
  }
}

var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  )
);

const BN = web3.utils.BN;
const chefAddress = "0xD95214bd19492186E2e9EbD70EC043D28AEE861d";
const tokenAddress = "0x35c77BEfA581Ae0F3861ceF24e7350aF5239c2c5";
const uni1 = "0x35c77BEfA581Ae0F3861ceF24e7350aF5239c2c5";

var ethconnected = false;
var ethaddress = "0x";
var balance = 0;
var user_address;
var currentPageToken = "0x35c77BEfA581Ae0F3861ceF24e7350aF5239c2c5";
var currentPagePoolID = 0;
var currentPageWalletBalance = 0;
var currentPageStaked = 0;
var currentPageReward = 0;

var prices = {
  takeusd: -1,
  takeeth: -1,
  ethusd: -1,
  linketh: -1,
  usdceth: -1,
  susdeth: -1,
  yfieth: -1,
};

var pools = [
  [
    "0x35c77BEfA581Ae0F3861ceF24e7350aF5239c2c5",
    "MetaSeer Pool",
    "https://pancakeswap.info/token/0x35c77BEfA581Ae0F3861ceF24e7350aF5239c2c5",
    1,
    0,
    0,
    "https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x35c77BEfA581Ae0F3861ceF24e7350aF5239c2c5",
  ],
];
var loadedpools = 0;
var totalPoolWeight = 1;
const uniswapABI = [
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const erc20ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const stakeABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EmergencyWithdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "_unlockblock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "endBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "i", type: "uint256" }],
    name: "getAddresses",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAddressesLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastRewardBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "massupdate",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minimum_deposit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "ownerwithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "rewardBalanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardaddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardperblock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "stakeBalanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeaddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalpoolstacked",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "userAddresses",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

const chefABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "pendingTakeout",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "takeoutPerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardDebt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function connectWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    conn = await window.ethereum.enable();

    window.ethereum.on("networkChanged", function (networkId) {
      web3.eth.net.getNetworkType().then(function (e) {
        if (e !== "private") {
          web3.eth.getChainId().then(function (e) {
            alert(
              "Incorrect network. Your current chain Id is 0x" +
                e +
                ",Please connected to Binance Smart Chain"
            );
          });
        }
      });
    });

    web3.eth.net.getNetworkType().then(function (e) {
      if (e !== "private") {
        web3.eth.getChainId().then(function (e) {
          alert(
            "Incorrect network. Your current chain Id is 0x" +
              e +
              ", Please connected to Binance Smart Chain"
          );
        });
      }
    });

    ethconnected = conn.length > 0;
    if (ethconnected) {
      ethaddress = conn[0];
    }
    updateConnectStatus();

    return true;
  }
}

function updateConnectStatus() {
  if (ethconnected) {
    $("body").addClass("web3");
  }
  // getBalance(ethaddress);
  // getstaked(ethaddress);
}

// Functions
function approveSpend() {
  var contract = new web3.eth.Contract(erc20ABI, currentPageToken);
  contract.methods
    .approve(
      chefAddress,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .send({ from: user_address })
    .then(function (err, transactionHash) {
      if (err) {
        console.log(err);
      } else {
        alert(
          "Please wait until the approve transaction confirm to stake your pool token. You can refresh the page to update."
        );
      }
    });
}

function addToPool() {
  var contract = new web3.eth.Contract(stakeABI, chefAddress);
  var amount = $("#stake_amount").val();
  if (amount == "") {
    alert("Please enter amount");
    $("#stake_amount").focus();
    $("#stake_amount").css("border", "1px solid red");
  } else {
    // var amt = BigInt((amount * Math.pow(10, 18)))
    var amt = (amount * Math.pow(10, 18)).toFixedSpecial(0);
    contract.methods
      .stake(String(amt))
      .send({ from: user_address }, function (err, transactionHash) {
        if (err) {
          console.log("Cancelled");
        } else {
          alert(
            "Please wait until the transaction confirm to add your pool. You can refresh the page to update"
          );
          location.reload();
        }
      });
  }
}

function removeFromPool() {
  var contract = new web3.eth.Contract(stakeABI, chefAddress);
  var amount = prompt("Amount to withdraw", 0);
  var amt = (amount * Math.pow(10, 18)).toFixedSpecial(0);
  contract.methods
    .unstake(String(amt))
    .send({ from: user_address }, function (err, transactionHash) {
      console.log(transactionHash);
    });
}

function claimReward() {
  var contract = new web3.eth.Contract(stakeABI, chefAddress);
  contract.methods
    .claim()
    .send({ from: user_address })
    .then(function (err, transactionHash) {
      //some code
      console.log(transactionHash);
      alert("Transaction Complete: " + transactionHash);
    });
}
// Funtions

function init() {
  connectWeb3();
}

$(document).ready(function () {
  init();
});

Number.prototype.toFixedSpecial = function (n) {
  var str = this.toFixed(n);
  if (str.indexOf("e+") === -1) return str;

  // if number is in scientific notation, pick (b)ase and (p)ower
  str = str
    .replace(".", "")
    .split("e+")
    .reduce(function (p, b) {
      return p + Array(b - p.length + 2).join(0);
    });

  if (n > 0) str += "." + Array(n + 1).join(0);

  return str;
};
