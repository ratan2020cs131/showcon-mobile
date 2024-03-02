require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.1",
  networks:{
    sepolia:{
      url:process.env.SEPOLIA_URL,
      accounts:[process.env.KEY]
    }
  }
};
