import React, {useState} from "react";
import { ethers } from "ethers";

const CreateWallet = (props: any) => {

    const createRandomWallet = async () => {
        const provider = ethers.getDefaultProvider("goerli", {
            alchemy: process.env.ALCHEMY_API_KEY,
            infura: process.env.INFURA_API_KEY,
            etherscan: process.env.ETHERSCAN_API_KEY,
        });
        const wallet = await ethers.Wallet.createRandom().connect(provider);
        props.setWallet(wallet);
    }
    return (
        <div>
            <button type="button" className="btn btn-secondary btn-lg px-4 gap-3" onClick={createRandomWallet}>Create</button>
        </div>
    )
}

export default CreateWallet;