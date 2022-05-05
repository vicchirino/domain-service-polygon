import { expect } from "chai";
import { ethers } from "hardhat";

describe("Domains", function () {
  describe("register", () => {
    it("should register a new domain if value sent is enough", async function () {
      const [owner] = await ethers.getSigners();
      const Domains = await ethers.getContractFactory("Domains");
      const domains = await Domains.deploy("pokemon");
      await domains.deployed();

      await domains.register("foo", { value: ethers.utils.parseEther("1") });

      expect(await domains.getAddress("foo")).to.equal(owner.address);
    });

    it("should revert the transaction if the domain is already taken", async function () {
      const [owner, randomPerson] = await ethers.getSigners();
      const Domains = await ethers.getContractFactory("Domains");
      const domains = await Domains.deploy("pokemon");
      await domains.deployed();

      await domains.register("foo", { value: ethers.utils.parseEther("1") });

      expect(await domains.getAddress("foo")).to.equal(owner.address);

      await expect(
        domains
          .connect(randomPerson)
          .register("foo", { value: ethers.utils.parseEther("1") })
      ).to.be.revertedWith("AlreadyRegistered()");
    });

    it("should revert the transaction if value sent isn't enough", async function () {
      const Domains = await ethers.getContractFactory("Domains");
      const domains = await Domains.deploy("pokemon");
      await domains.deployed();

      await expect(
        domains.register("foo", { value: ethers.utils.parseEther("0") })
      ).to.be.revertedWith(`InvalidAmount()`);
    });

    it("should revert the transaction if the name is longer than 10", async function () {
      const Domains = await ethers.getContractFactory("Domains");
      const domains = await Domains.deploy("pokemon");
      await domains.deployed();

      await expect(
        domains.register("doremifasollasi", {
          value: ethers.utils.parseEther("1"),
        })
      ).to.be.revertedWith("InvalidName");
    });
  });

  describe("withdraw", () => {
    it("should withdraw if i'm the contract owner", async function () {
      const [owner] = await ethers.getSigners();
      const Domains = await ethers.getContractFactory("Domains");
      const domains = await Domains.deploy("pokemon");
      await domains.deployed();

      await domains.register("foo", { value: ethers.utils.parseEther("1") });

      const contractBalance = await ethers.provider.getBalance(domains.address);
      const ownerBalance = await ethers.provider.getBalance(owner.address);

      expect(Number(contractBalance)).to.be.greaterThan(0);

      await domains.connect(owner).withdraw();

      const contractBalanceAfterTxn = await ethers.provider.getBalance(
        domains.address
      );
      const ownerBalanceAfterTxn = await ethers.provider.getBalance(
        owner.address
      );

      expect(Number(contractBalanceAfterTxn)).to.be.equal(0);
      expect(Number(ownerBalanceAfterTxn)).to.be.greaterThan(
        Number(ownerBalance)
      );
    });

    it("should fail if i'm not the contract owner", async function () {
      const [, otherUser] = await ethers.getSigners();
      const Domains = await ethers.getContractFactory("Domains");
      const domains = await Domains.deploy("pokemon");
      await domains.deployed();

      const contractBalance = await ethers.provider.getBalance(domains.address);

      await expect(domains.connect(otherUser).withdraw()).to.be.revertedWith(
        "Not the owner"
      );

      const contractBalanceAfterTxn = await ethers.provider.getBalance(
        domains.address
      );

      expect(Number(contractBalanceAfterTxn)).to.be.equal(
        Number(contractBalance)
      );
    });
  });
});
