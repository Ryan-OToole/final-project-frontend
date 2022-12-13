import React, { useState } from 'react';
import { ethers } from "ethers";

declare global {
    interface Window{
        ethereum: any
    }
}
  
const ConnectWallet = (props: any) => {
    const connect = async () => {
        console.log('hi')
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
                const wallet = provider.getSigner();
                props.pullWalletUp(wallet);
            }   
    
        }
        catch (e) {
            console.log('error', e);
        }
        
    }

    return (
        <div>
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3" onClick={connect}>Connect Wallet</button>
        </div>
    )
}


export default ConnectWallet;