// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const main = async () => {
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("pokemon");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("dragonite", {
    value: ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain dragonite.pokemon");

  txn = await domainContract.setRecord(
    "dragonite",
    "https://www.pokemon.com/el/pokedex/dragonite"
  );
  await txn.wait();
  console.log("Set record for dragonite.pokemon");

  const address = await domainContract.getAddress("dragonite");
  console.log("Owner of domain dragonite:", address);

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", ethers.utils.formatEther(balance));
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
