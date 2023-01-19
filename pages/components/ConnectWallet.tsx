import React, { useState } from 'react';
import { ethers } from "ethers";
import * as myNFTJson from "../assets2/MyNFT.json";

declare global {
    interface Window{
        ethereum: any
    }
}
  
const ConnectWallet = (props: any) => {
    let signer;
    const connect = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert('download metamask to connect wallet');
                return;
            }
            else {
                let chainId = await ethereum.request({ method: 'eth_chainId' });
                const goerliChainId = "0x5";
                if (chainId !== goerliChainId) {
                  alert("You are not connected to the Goerli Test Network!");
                }
                const accounts = await ethereum.request({ method: "eth_requestAccounts"});
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                
                // contract instance should be stored in backend and fetched with API call 
                const myNFTFactory = new ethers.Contract("0x740D7f099F79209AAd47d50d3893F887f3203e11", myNFTJson.abi, signer);
                props.setContract(myNFTFactory);
                props.setWallet(signer);
                // props.pullWalletUp(wallet);
            }   
        }
        catch (e) {
            console.log('error', e);
        }
        
    }

    return (
        <div>
            <button type="button" className="btn btn-success btn-lg px-4 gap-3" onClick={connect}>Connect</button>
        </div>
    )
}


export default ConnectWallet;