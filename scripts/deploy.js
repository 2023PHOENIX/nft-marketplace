const hre = require("hardhat");

async function main() {

  const NFTMarketplace = await hre.ethers.getContractFactory('NFTMarketplace');
  const nftMarketPlace = await NFTMarketplace.deploy();

  await nftMarketPlace.deployed();
  console.log("this contract has been deployed" ,nftMarketPlace.address);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
