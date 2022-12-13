import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config({ path: ".env" });

const config: HardhatUserConfig = {
  paths: { tests: "tests"},
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.INFURA_API_GOERLI,
      accounts: [process.env.METAMASK_KEY_GOERLI ?? ""],
    },
  },
};

export default config;
