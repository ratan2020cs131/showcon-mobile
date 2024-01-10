const hre = require('hardhat');

const main = async ()=>{
  const Validate = await hre.ethers.getContractFactory('Validate');
  const validate = await Validate.deploy();

  await validate.deployed();

  console.log("Validate contract deployed to: ", validate.address);
}

const runMain=async()=>{
  try{
    await main();
    process.exit(0);
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}

runMain();