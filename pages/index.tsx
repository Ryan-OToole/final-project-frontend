import CreateWallet from './components/CreateWallet'
import React, {useEffect, useState} from 'react';
import ConnectWallet from './components/ConnectWallet';
import { ethers, Signer } from "ethers";
import CARDSOBJ from './dictionary';
import Card from './components/Card';
import NavBar from './components/NavBar';
import About from './components/About';
import BigCard from './components/BigCard';

export default function Home() {
  // const ERC20VOTES_ADDRESS = "0x432d28bC81Cd9437736cE4Bc8e2e04eEcFcA5B7a";
  // need to move this to call to backend for single source of truth / synchonicity
  
  const [pageSelected, setPageSelected] = useState("MetaGallery");
  const [selectedCard, setSelectedCard] = useState("");

  const [wallet, setWallet] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState();

  // const pullWalletUp = async (wallet: any) => {
  //   console.log('wallet', wallet);
  //   const balanceBN = await wallet.getBalance();
  //   const balance = ethers.utils.formatEther(balanceBN);
  //   // const tokenContract = new ethers.Contract(ERC20VOTES_ADDRESS, MyToken.abi, wallet);
  //   // const walletAddress = await wallet.getAddress();
  //   setWalletAddress(walletAddress);
  //   setWallet(wallet);
  //   setBalance(Number(balance));
  // }

  const mapCards = () => {
    let cardArray: any[] = [];
    for (let card in CARDSOBJ) {
      cardArray.push(CARDSOBJ[card]);
    }
    return cardArray.map( hash => {
      return <Card key={hash} setSelectedCard={setSelectedCard} selectedCard={selectedCard} hash={hash} wallet={wallet} />
    });
  }

  return (
    <div>
      <NavBar pageSelected={pageSelected} setPageSelected={setPageSelected} setSelectedCard={setSelectedCard}/>

      {pageSelected === "About" ? <About /> : null}

      {
      wallet && (pageSelected === "MetaGallery")
        ?
        <div className="grid-container">
          {/* <p>Your wallet address is: {walletAddress}</p> */}
          <div className={`gallery-grid transition-blur ${selectedCard ? "conditional-blur" : null}`}>
          {mapCards()}
          </div>
        </div>

      : null}

      {!wallet && (pageSelected === "MetaGallery") ?
        <div className={`px-4 py-5 my-5 text-center`}>
          <h1 className="display-5 fw-bold">To Get Started<br />Connect Your Wallet</h1>
          <div className="col-lg-6 mx-auto">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <CreateWallet setWallet={setWallet} />
              <ConnectWallet setWallet={setWallet} setContract={setContract} />
            </div>
          </div>
        </div>
      : null}

      { selectedCard ?
        <BigCard selectedCard={selectedCard} setSelectedCard={setSelectedCard} wallet={wallet} contract={contract}/>
      : null } 
    </div>
  )
}


