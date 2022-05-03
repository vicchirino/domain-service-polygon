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
      ).to.be.revertedWith("The domain name is already taken");
    });

    it("should revert the transaction if value sent isn't enough", async function () {
      const Domains = await ethers.getContractFactory("Domains");
      const domains = await Domains.deploy("pokemon");
      await domains.deployed();

      await expect(
        domains.register("foo", { value: ethers.utils.parseEther("0") })
      ).to.be.revertedWith("Not enough Matic paid");
    });
  });
});
