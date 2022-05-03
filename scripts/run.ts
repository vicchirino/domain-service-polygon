const { ethers } = require("hardhat");

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners();
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("pokemon");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by: ", owner.address);

  const txn = await domainContract.register("pikachu", {
    value: ethers.utils.parseEther("0.5"),
  });
  await txn.wait();

  const address = await domainContract.getAddress("pikachu");

  console.log("Owner of domain pikachu", address);

  const balance = await ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance: ", ethers.utils.formatEther(balance));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
