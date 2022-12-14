import React, {useEffect, useState} from "react";

const Card = ({hash}) => {
  console.log('hash inside card', hash);
  
  let MyNFTFactory;
  let MyNFTContract;  
  
  const handleMint = async (hash) => {
    console.log('http://localhost:3000/mint/${hash}', `http://localhost:3000/mint/${hash}`);
    fetch(`http://localhost:3000/mint/${hash}`)
      .then(response => response.json())
      .then(data => console.log(data));
    // we need to call the backend and send the image hash i.e. card.src
    // to it then look it up in the dictionary and have the info dynamically sent to mint function to call it with
    // we also need to send the msg.sender to mint it to the right person 
  }
  
  return (
    <div className="col">
            <div className="card" style={{width: "18rem"}}>
            <img src={`https://cloudflare-ipfs.com/ipfs/${hash}`} className="card-img-top" alt="..." />
            <div className="card-body text-center">
              <h5 className="card-title text-center">Card title</h5>
              <p className="card-text">Some quick example</p>
              <button className="btn btn-primary" onClick={() => handleMint(hash)}>Mint NFT</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Card;




