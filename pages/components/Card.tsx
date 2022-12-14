import React, {useEffect, useState} from "react";

const Card = ({card}) => {
  
  let MyNFTFactory;
  let MyNFTContract;  
  
  const handleMint = async (hash) => {
    console.log('hash', hash);
    fetch(`http://localhost:3000/mint/${hash}`)
      .then(response => response.json())
      .then(data => console.log(data));
    // we need to call the backend and send the image hash i.e. card.src
    // to it then look it up in the dictionary and have the info dynamically sent to mint function to call it with
    // we also need to send the msg.sender to mint it to the right person 







    // console.log('handling mint');
    // MyNFTFactory = ethers.getContractFactory("MyNFT");
    // MyNFTContract = MyNFTFactory.deploy();
    // await MyNFTContract.deployed();
    // const tx = await MyNFTContract.safeMint("0x1ce750e83B91D00b6cCe3ae6feBe71420feAa5FF", "Diver", "QmQMQwwyYue8kpvaHintYsDhphrjdm6rh5MwT7W6fkVBXW", 10, 7, 222, 189, 194);
    // console.log('tx', tx);
    // console.log("Contract deployed to:", MyNFTContract.address);
  }
  
  return (
    <div className="col">
            <div className="card" style={{width: "18rem"}}>
            <img src={card.src} className="card-img-top" alt="..." />
            <div className="card-body text-center">
              <h5 className="card-title text-center">Card title</h5>
              <p className="card-text">Some quick example</p>
              <button className="btn btn-primary" onClick={() => handleMint(card.src)}>Mint NFT</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Card;




