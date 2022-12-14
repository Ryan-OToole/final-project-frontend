import CreateWallet from './components/CreateWallet'
import React, {useEffect, useState} from 'react';
import ConnectWallet from './components/ConnectWallet';
import { ethers, Signer } from "ethers";
import CARDSOBJ from './dictionary';
import Card from './components/Card';

export default function Home() {

  const ERC20VOTES_ADDRESS = "0x432d28bC81Cd9437736cE4Bc8e2e04eEcFcA5B7a";
  // need to move this to call to backend for single source of truth / synchonicity
  


  const [wallet, setWallet] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [tokenContract, setTokenContract] = useState();

  const pullWalletUp = async (wallet: any) => { 
    const balanceBN = await wallet.getBalance();
    const balance = ethers.utils.formatEther(balanceBN);
    // const tokenContract = new ethers.Contract(ERC20VOTES_ADDRESS, MyToken.abi, wallet);
    const walletAddress = await wallet.getAddress();
    setWalletAddress(walletAddress);
    setWallet(wallet);
    setBalance(Number(balance));
  }

  const mapCards = () => {
    let cardArray: any[] = [];
    for (let card in CARDSOBJ) {
      cardArray.push(CARDSOBJ[card]);
    }
    console.log('CARDSOBJ', CARDSOBJ);
    console.log('cardArray', cardArray);
    return cardArray.map( hash => {
      console.log('hash', hash);
      return <Card hash={hash} />
    });
  }

  return (
    <div>
      {
      wallet 
        ?
        <div>
          <p>Your wallet address is: {walletAddress}</p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {mapCards()}
          </div>
        </div>

        :
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">Lottery Contract Example Project</h1>
          <div className="col-lg-6 mx-auto">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <CreateWallet pullWalletUp={pullWalletUp} />
              <ConnectWallet pullWalletUp={pullWalletUp} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}


