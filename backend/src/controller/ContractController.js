import dotenv from 'dotenv'
dotenv.config({ path: './.env' });

import ContractAbi from '../utils/Validate.json';
import Web3 from 'web3';

const web3 = new Web3(process.env.RPC);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = ContractAbi.abi;
const myContract = new web3.eth.Contract(contractABI, contractAddress);

export default myContract;