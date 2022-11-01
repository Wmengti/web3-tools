const { verify } = require('../utils/verify');
const { writeFile } = require('../utils/writeFile');
const { developmentChains } = require('../helper-hardhat-config');
const fs = require('fs');
const { ethers } = require('hardhat');

const hre = require('hardhat');

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const addressPath = './constants/disperseAddress.json';
  const abiPath = './constants/disperseAbi.json';

  args = [];
  const disperse = await deploy('Disperse', {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  writeFile(addressPath, chainId, disperse.address);

  const DisperseContract = await ethers.getContract('Disperse');
  fs.writeFileSync(
    abiPath,
    DisperseContract.interface.format(ethers.utils.FormatTypes.json)
  );

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(disperse.address, args);
  }
};

module.exports.tags = ['disperse', 'all'];
