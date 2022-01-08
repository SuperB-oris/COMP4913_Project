var Web3 = require("web3");
var url = "https://eth-mainnet.alchemyapi.io/v2/Xu9uMsmxCBBT1g0d8_XsT-_qxbSQm0jz";
const Web3Client = new Web3(new Web3.providers.HttpProvider(url));

// The minimum ABI required to get the ERC20 Token balance
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const usdcAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const walletAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

const contract1 = new Web3Client.eth.Contract(minABI, wethAddress);

async function getBalance_weth() {
  const result_weth = await contract1.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  
  const format_weth = Web3Client.utils.fromWei(result_weth); // 29803630.997051883414242659

  console.log("amount of weth: " + format_weth);

}

const contract2 = new Web3Client.eth.Contract(minABI, usdcAddress);

async function getBalance_usdc() {
  const result_usdc = await contract2.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  
  const format_usdc = Web3Client.utils.fromWei(result_usdc, 'mwei'); // 29803630.997051883414242659

  console.log("amount of usdc: " + format_usdc);

}

getBalance_weth();
getBalance_usdc();
