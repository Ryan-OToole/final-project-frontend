import CreateWallet from './components/CreateWallet'
import React, {useEffect, useState} from 'react';
import ConnectWallet from './components/ConnectWallet';
import { ethers, Signer } from "ethers";
// import MyToken from "./assets-contract/MyToken.json";
import diverCard from "./assets/Diver.png";
import dreamRhodesCard from "./assets/DreamRhodes.png";
import Melo82Card from "./assets/Melo82.png";
import metalPopcornCard from "./assets/MetalPopcorn.png";
import midtermCard from "./assets/Midterm.png";
import nasaInfoCard from "./assets/NASAInfo.png";
import nmtCard from "./assets/NMT.png";
import remnantCard from "./assets/Remnant.png";
import ribbonGirlCard from "./assets/RibbonGirl.png";
import rivalCard from "./assets/Rival.png";
import sentryCard from "./assets/Sentry.png";
import SquidPortalCard from "./assets/SquidPortal.png";
import throedeCard from "./assets/THROEDE.png";
import fahkoffCard from "./assets/FAHKOFF.png";
import KSWCard from "./assets/KSW.png";
import Card from './components/Card';



export default function Home() {

  const ERC20VOTES_ADDRESS = "0x0CBBA32981898231078CDAD4c621D734492CF02D";
  const CARDS = [diverCard, dreamRhodesCard, Melo82Card, metalPopcornCard, midtermCard, nasaInfoCard, nmtCard, remnantCard, ribbonGirlCard, rivalCard, sentryCard, SquidPortalCard, throedeCard, fahkoffCard, KSWCard];

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
    return CARDS.map( card => {
      return <Card card={card} />
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


