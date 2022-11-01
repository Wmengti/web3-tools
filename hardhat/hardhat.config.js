require('@nomicfoundation/hardhat-toolbox');
require('hardhat-deploy');
require('@ethersproject/abi');
require('dotenv').config();
// require('@nomiclabs/hardhat-waffle');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;

const { ProxyAgent, setGlobalDispatcher } = require('undici');
const proxyAgent = new ProxyAgent('http://127.0.0.1:7890');
setGlobalDispatcher(proxyAgent);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkeby: {
      chainId: 4,
      accounts: [PRIVATE_KEY],
      url: RINKEBY_RPC_URL,
      blockConfirmations: 6,
    },
    goerli: {
      chainId: 5,
      accounts: [PRIVATE_KEY],
      url: GOERLI_RPC_URL,
      blockConfirmations: 6,
    },
  },
  solidity: '0.8.17',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  },
};
