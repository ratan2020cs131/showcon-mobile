require('dotenv')
const ContractAbi = require('../utils/Validate.json');
const Web3 = require('web3');
const web3 = new Web3(process.env.RPC);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = ContractAbi.abi;
const myContract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = myContract;