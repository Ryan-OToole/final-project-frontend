import React, {useEffect, useState} from "react";

const Card = ({card}) => {
  
  let MyNFTFactory;
  let MyNFTContract;  
  
  const handleMint = async () => {
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
              <button className="btn btn-primary" onClick={handleMint}>Mint NFT</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Card;
  
  
  // const MyNFT = await MyNFTFactory.deploy();
  // await MyNFT.deployed();
  // const tx = await MyNFT.safeMint("0x1ce750e83B91D00b6cCe3ae6feBe71420feAa5FF", "Diver", "QmQMQwwyYue8kpvaHintYsDhphrjdm6rh5MwT7W6fkVBXW", 10, 7, 222, 189, 194);
  // console.log('tx', tx);
  // console.log("Contract deployed to:", MyNFT.address);
  // const test = await MyNFT.tokenURI(0);
  // console.log("Token URI:", test);
  // const testicle = await MyNFT.tokenURI(1);
  // console.log("Token URI:", testicle);
  
  
  // const ballotContractFactory = new Ballot__factory(signer);
  // const ballotContract = (await ballotContractFactory.attach(
    //   process.argv[2]
    // )) as Ballot;





    // useEffect(() => {
    //   try {
    //     const getNFTContract = async () => {
    //       MyNFTFactory = await ethers.getContractFactory('MyToken');
    //       MyNFTContract = await MyNFTFactory.deploy();
    //       await MyNFTContract.deployed();
    //       const tx = await MyNFTContract.safeMint("0x1ce750e83B91D00b6cCe3ae6feBe71420feAa5FF", "Diver", "QmQMQwwyYue8kpvaHintYsDhphrjdm6rh5MwT7W6fkVBXW", 10, 7, 222, 189, 194);
    //       console.log('tx', tx);
    //       console.log('MyNFTFactory', MyNFTFactory);
    //   }
    //   getNFTContract();
    // }
    //   catch (error) {
    //     console.log('error', error);
    //   }  
    
    // }, []);