import React, {useEffect, useState} from "react";

const Card = ({hash, setSelectedCard, selectedCard, wallet}) => {
  
  let MyNFTFactory;
  let MyNFTContract;  
  
  // const handleMint = async (hash, wallet) => {
  //   fetch(`http://localhost:3000/mint/${hash}/${wallet}`)
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  //   // we need to call the backend and send the image hash i.e. card.src
  //   // to it then look it up in the dictionary and have the info dynamically sent to mint function to call it with
  //   // we also need to send the msg.sender to mint it to the right person 
  // }
  
  return (
    <div className="col" onClick={() => setSelectedCard(hash)}>
      <div className="small-card">
        <img src={`https://cloudflare-ipfs.com/ipfs/${hash}`} className="small-card-img" alt="..." />
          {/* <div className="card-body text-center">
            <h5 className="card-title text-center">Card title</h5>
            <p className="card-text">Some quick example</p>
            <button className="btn btn-primary" onClick={() => handleMint(hash)}>Mint NFT</button>
          </div> */}
        </div>
      </div>
    )
  }
  
  export default Card;




