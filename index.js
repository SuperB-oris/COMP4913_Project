var Web3 = require("web3");
var url = "wss://eth-mainnet.alchemyapi.io/v2/Xu9uMsmxCBBT1g0d8_XsT-_qxbSQm0jz";
var web3 = new Web3(new Web3.providers.WebsocketProvider(url));

const subscription = web3.eth.subscribe("pendingTransactions");

   var init = function () {
    subscription.on("data", (txHash) => {
      setTimeout(async () => {
        try {
          let tx = await web3.eth.getTransaction(txHash);
          if (tx === null) { return null;}

            Object.entries(tx);
            if (tx.to == '0xE592427A0AEce92De3Edee1F18E0157C05861564') {
              if(tx.input.toString().length == 522){
                //let params = web3.eth.abi.decodeParameters(['bytes32', 'address', 'uint256', 'uint256', 'uint256'], tx.input);
                //console.log('input: ' + params);}
                //Function: exactOutputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))
                const the_array = tx.input.split("");
                let token_in = '0x' + the_array.slice(34,74).join('');  
                console.log("tokenIn: " + token_in);//34
                let token_out = '0x' + the_array.slice(98,138).join('');
                console.log("tokenOut: " + token_out);
                //let fee = toArray(the_array.slice(139,226));
                //let filtered = remove_zero(fee);
                console.log("fee: 3000");
                let recipient = '0x' + the_array.slice(226,266).join('');
                console.log("recipient: " + recipient);
                let deadline = the_array.slice(322,330).join('');
                console.log("deadline:" + parseInt(deadline,16));
                let amountIn = the_array.slice(375,393).join('');
                console.log("amountIn: " + parseInt(amountIn,16));
                let amountOutMin = the_array.slice(442,458).join('');
                console.log("amountOutMin: " + parseInt(amountOutMin,16));
                let sqrtPriceLimitX96 = 0;
                console.log("sqrtPriceLimitX96: " + sqrtPriceLimitX96 + "\n");
                
              }
                                                                     
              }
        } catch (err) {
          console.error(err);
        }
      });
    });
  };

   init();

   function toArray() {
    return Array.prototype.slice.call(arguments);
  }
   function remove_zero(x){
     var index = x.indexOf(0);
     if(index !== -1){
       x.splice(index,1);
     }
   
    }
