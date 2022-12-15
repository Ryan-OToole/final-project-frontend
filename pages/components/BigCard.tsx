import React, {useEffect, useState, useCallback} from "react";

const BigCard = ({selectedCard, setSelectedCard, wallet, contract}) => {
  console.log('selectedCard inside Bigcard', selectedCard);
  console.log('wallet inside Bigcard', wallet);
  
  
  let MyNFTFactory;
  let MyNFTContract;  
  
  const handleMint = async () => {
    const tx = await contract.safeMint("Diver", selectedCard, 837, 19, 2, 11, 13);
    await tx.wait();
    console.log("tx", tx);
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




