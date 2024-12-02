const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const BasketballScoreCounter = await hre.ethers.getContractFactory("BasketballScoreCounter");
  
  // Deploy the contract
  const basketballScoreCounter = await BasketballScoreCounter.deploy();
  
  // Wait for the contract to be deployed
  await basketballScoreCounter.deployed();

  // Log the contract address
  console.log(`BasketballScoreCounter deployed to: ${basketballScoreCounter.address}`);
}

// Run the main function and catch any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
