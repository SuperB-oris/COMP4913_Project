var Web3 = require("web3");
var url = "wss://eth-mainnet.alchemyapi.io/v2/Xu9uMsmxCBBT1g0d8_XsT-_qxbSQm0jz";
var web3 = new Web3(new Web3.providers.WebsocketProvider(url));

function subscribeToTxs() {
    return web3.eth.subscribe('pendingTransactions', (err, txHash) => {
        if (err) {
            throw(err);
        }
    })
    .on("data", function(txHash){
        return web3.eth.getTransaction(txHash, (err, returnedValue) => {
            if (err) {
                // error handling
            }
            if (returnedValue && (returnedValue.to === '0xE592427A0AEce92De3Edee1F18E0157C05861564')) {
                console.log(`TransactionHash: ${returnedValue.hash}`);
            }
        })
    })};