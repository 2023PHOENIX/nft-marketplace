const hre = require("hardhat");

async function main() {

  const NFTMarketplace = await hre.ethers.getContractFactory('NFTMarketplace');
  const nftMarketPlace = await NFTMarketplace.deploy();

  await nftMarketPlace.deployed();
  console.log("this contract has been deployed" ,nftMarketPlace.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
