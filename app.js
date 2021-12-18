var web3Instance = new Web3(
  Web3.givenProvider || Web3.currentProvider || "https://rinkeby.infura.io"
);

var ABI = [
  {
    inputs: [],
    name: "retrieve",
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
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

var contractAddress = "0x2e5c4043061f591eb85526163122f8d892f84325";
var contract = new web3Instance.eth.Contract(ABI, contractAddress);

var number = document.getElementById("number");
var inpt = document.getElementById("inpt");
var btn = document.getElementById("btn");

contract.methods.retrieve
  .call()
  .call()
  .then((value) => {
    number.innerHTML = value;
  });

btn.addEventListener("click", () => {
  web3Instance.eth.getAccounts().then((accounts) => {
    contract.methods
      .store(inpt.value)
      .send({ from: accounts[0] })
      .then(() => {
        contract.methods
          .retrieve()
          .call()
          .then((value) => {
            number.innerHTML = value;
          });
      });
  });
});
