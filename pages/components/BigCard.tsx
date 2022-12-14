import React, {useEffect, useState, useCallback} from "react";

const BigCard = ({selectedCard, setSelectedCard}) => {
  console.log('selectedCard inside card', selectedCard);
  
  let MyNFTFactory;
  let MyNFTContract;  
  
  const handleMint = async (selectedCard, e) => {
    // console.log('http://localhost:3000/mint/${selectedCard}', `http://localhost:3000/mint/${selectedCard}`);
    fetch(`http://localhost:3000/mint/${selectedCard}`)
      .then(response => response.json())
      .then(data => console.log(data));
    // we need to call the backend and send the image selectedCard i.e. card.src
    // to it then look it up in the dictionary and have the info dynamically sent to mint function to call it with
    // we also need to send the msg.sender to mint it to the right person 
  }


  // The following three bits allow user to close big card by hitting escape key.
  function closeSelected() {
    setSelectedCard("")
  }
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      closeSelected();
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div className="big-card-container">
        <div className="big-img-container">

            <div className="panel big-card-details">
              <div className="force-wide">XOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXO</div>
              <h5 className="interior-item detail-text-header">Butterfly Talisman (placehodler)</h5>
              <div className="sub-panel">
                <ul className="card-attributes">
                  <li className="attribute-title">Duration: </li>
                  <p className="attribute-value">To Do</p>
                  <li className="attribute-title">Body: </li>
                  <p className="attribute-value">To Do</p>
                  <li className="attribute-title">Tail: </li>
                  <p className="attribute-value">To Do</p>
                  <li className="attribute-title">Loudness: </li>
                  <p className="attribute-value">To Do</p>
                  <li className="attribute-title">Dynamics: </li>
                  <p className="attribute-value">To Do</p>

                </ul>
              </div>
              <div className="action-button-positioning">
                <button className="btn btn-success interior-item action-button mint-button animate" onClick={() => handleMint()}>Mint</button>
              </div>
            </div>

            <div className="img-and-button">
                <img className="big-image" src={`https://cloudflare-ipfs.com/ipfs/${selectedCard}`} alt="..."></img>
                <div onClick={() => closeSelected()} className="back-button">X</div>
            </div>

            <div className="panel big-card-actions">
              <div className="force-wide">XOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXO</div>
              <h5 className="interior-item detail-text-header">Currently Circulating</h5>
              <div className="sub-panel">
                <ul className="wallet-list">
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                  <p className="wallet-item">Example Wallet</p>
                </ul>

              </div>
              <div className="action-button-positioning">
                <button className="btn btn-secondary interior-item action-button" onClick={() => alert("trade button here.")}>Trade</button>
              </div>
            </div>

        </div>
    </div>
    )
  }
  
  export default BigCard;




