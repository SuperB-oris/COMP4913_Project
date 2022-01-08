from web3 import Web3
import requests
import json

class ContractProxy:
    def __init__(self):
        self.w3 = None
        self.etherscan_token = 'W4RT39CXDNI32GWPQ8K72DYUTSFMPCF5BB';
        
    def init(self, infura_token, etherscan_token):
        self.w3 = Web3(Web3.HTTPProvider(f'https://mainnet.infura.io/v3/{infura_token}'))
        self.etherscan_token = etherscan_token
        self.pair_contract_abi = self.get_contract_abi("0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8")
        self.token_contract_abi = self.get_contract_abi("0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0")
        
    def get_contract_abi(self, contract_address):
        ret = requests.get(f"https://api.etherscan.io/api?module=contract&action=getabi&address={contract_address}&apikey={self.etherscan_token}")
#         print(f"https://api.etherscan.io/api?module=contract&action=getabi&address={contract_address}&apikey={self.etherscan_token}")
        try:
            abi = json.loads(ret.json()["result"])
            return abi
        except Exception as e:
            print(e)
            print(ret.json())
            raise e
    
    def get_contract(self, contract_address):
        contract_abi = self.get_contract_abi(contract_address)
        return self.w3.eth.contract(Web3.toChecksumAddress(contract_address), abi=contract_abi)
    
    def get_pair_contract(self, contract_address):
        return self.w3.eth.contract(Web3.toChecksumAddress(contract_address), abi=self.pair_contract_abi)
    
    def get_token_contract(self, contract_address):
        return self.w3.eth.contract(Web3.toChecksumAddress(contract_address), abi=self.token_contract_abi)
    
    def get_token_symbol_by_address(self, contract_address):
        
        if contract_address == "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359":
            return "SAI"
        elif contract_address == "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2":
            return "MKR"
            
        
        contract = self.get_token_contract(contract_address)
        try:
            symbol = contract.functions.symbol().call()
        except:
            print(f"address:{contract_address}")
            return None
        return symbol
    
cp = ContractProxy()
ETHERSCAN_TOKEN = "..." # your etherscan token
INFURA_TOKEN2 = "..." # your infura token
cp.init(INFURA_TOKEN2, ETHERSCAN_TOKEN)

contract = cp.get_contract("0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8")

contract.functions.liquidity().call()