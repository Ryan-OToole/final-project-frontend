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
  const [contract, setContract] = useState<MyNFT | null>(null)
  const [isMinting, setIsMinting] = useState(false);
  const [collection, setCollection] = useState<string[] | null>(null);
  // const [walletAddress, setWalletAddress] = useState("");
  // const [balance, setBalance] = useState(0);


  useEffect(() => {
    const mintReceipt = async (sender, tokenId, imageURI) => {
      // i need to make a mapping of imageURI to tokenID
      // when someone clicks on big card from their collection
      // i reference the mapping with imageURI grab then tokenId
      // this will allow me to call the redeem function with
      // the correct tokenId

      // since frontend doesnt have persistence I need to make two 
      // mapping on Solidity side to go
      console.log('wallet', wallet);
      console.log('event emitted address', sender);
      console.log('event emitted tokenId', Number(tokenId));
      console.log('event emitted imageURI', imageURI)
      setIsMinting(false);
      alert(`Hey there! You've just minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on Opensea. Here's the link: https://testnets.opensea.io/assets/goerli/0x47FA2BA44BE29D9f99AdB826094F544649c8d607/${tokenId.toNumber()}`)
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

  useEffect(() => {
    const checkForUsersNFTs = async () => {
      console.log('contract', contract);
      if (contract) {
        const ipfsHashArray = await contract.checkForUsersNFTs();
        setCollection(ipfsHashArray);
        console.log('ipfsHashArray', ipfsHashArray);
      }
      else {
        alert('Please connect to Metamask to see your collection');
      }
    }

    checkForUsersNFTs();
  }, [pageSelected])



  const mapCollection = () => {
    let cardArray: any[] = [];
    for (let card in collection) {
      cardArray.push(collection[card]);
    }
    return cardArray.map( hash => {
      return <Card key={hash} setSelectedCard={setSelectedCard} selectedCard={selectedCard} hash={hash} wallet={wallet}  />
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
        <BigCard isMinting={isMinting} setIsMinting={setIsMinting} selectedCard={selectedCard} setSelectedCard={setSelectedCard} wallet={wallet} contract={contract} pageSelected={pageSelected}/>
      : null } 
    </div>
  )
}


