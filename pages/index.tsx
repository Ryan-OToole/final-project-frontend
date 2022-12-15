import CreateWallet from './components/CreateWallet'
import React, {useEffect, useState} from 'react';
import ConnectWallet from './components/ConnectWallet';
import { ethers, Signer } from "ethers";
import CARDSOBJ from './dictionary';
import Card from './components/Card';
import NavBar from './components/NavBar';
import About from './components/About';
import BigCard from './components/BigCard';
import { MyNFT } from "../typechain-types";

export default function Home() {  
  const [pageSelected, setPageSelected] = useState("MetaGallery");
  const [selectedCard, setSelectedCard] = useState("");

  const [wallet, setWallet] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState<MyNFT | null>(null)
  const [isMinting, setIsMinting] = useState(false);


  useEffect(() => {
    const mintReceipt = async (sender, tokenId) => {
      console.log('i am the event being emitted be happy');
      console.log('address', sender);
      console.log('tokenId', Number(tokenId));
      setIsMinting(false);
      alert(`Hey there! You've just minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on Opensea. Here's the link: https://testnets.opensea.io/assets/goerli/0xeBDEb607031B7cD3fC11805e84e0136C8C2375cD/${tokenId.toNumber()}`)

      // alert('i am the event being emitted be happy');
    }
    if (contract) {
      contract.on("MintReceipt", mintReceipt);
    }
  }, [contract]);

  const mapCards = () => {
    let cardArray: any[] = [];
    for (let card in CARDSOBJ) {
      cardArray.push(CARDSOBJ[card]);
    }
    return cardArray.map( hash => {
      return <Card key={hash} setSelectedCard={setSelectedCard} selectedCard={selectedCard} hash={hash} wallet={wallet} />
    });
  }

  // useEffect(() => {

  //   test();
  // }, [pageSelected])

  const test = async () => {
    console.log('contract', contract);
    if (contract) {
      // transaction failed after await need to debug and figure out why 
      // this logic is not working trying to pull hashes from backend
      const test = await contract.checkForUsersNFTs();
      await test.wait();
      console.log('test', test);
    }
    else {
      alert('Please connect to Metamask to see your collection');
    }
  }


  const mapCollection = () => {


    // let cardArray: any[] = [];
    // for (let card in CARDSOBJ) {
    //   cardArray.push(CARDSOBJ[card]);
    // }
    // return cardArray.map( hash => {
    //   return <Card key={hash} setSelectedCard={setSelectedCard} selectedCard={selectedCard} hash={hash} wallet={wallet} />
    // });
  }

  

  return (
    <div>
      <button onClick={test}>TEST ME TEST ME</button>
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

{
      wallet && (pageSelected === "Collection")
        ?
        <div className="grid-container">
          {/* <p>Your wallet address is: {walletAddress}</p> */}
          <div className={`gallery-grid transition-blur ${selectedCard ? "conditional-blur" : null}`}>
          {mapCollection()}
          </div>
        </div>

      : null}

      {!wallet && ((pageSelected === "MetaGallery") || (pageSelected === "Collection")) ?
        <div className={`px-4 py-5 my-5 text-center`}>
          <h1 className="display-5 fw-bold">
            <br />

            {pageSelected === "MetaGallery" ? "To Browse Mintable Cards..." : null}
            {pageSelected === "Collection" ? "To See Your Collection..." : null}
            <br />

            <span className="purple-text">Connect Your Wallet</span></h1>
            <br />
            <br />
            <br />
            <br />


          <div className="col-lg-6 mx-auto">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <CreateWallet setWallet={setWallet} />
              <br />
              <ConnectWallet setWallet={setWallet} setContract={setContract} />
            </div>
          </div>
        </div>
      : null}

      { selectedCard ?
        <BigCard isMinting={isMinting} setIsMinting={setIsMinting} selectedCard={selectedCard} setSelectedCard={setSelectedCard} wallet={wallet} contract={contract}/>
      : null } 
    </div>
  )
}


