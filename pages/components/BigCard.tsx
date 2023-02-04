import { MissingStaticPage } from "next/dist/shared/lib/utils";
import React, {useEffect, useState, useCallback} from "react";
import REVERSELOOKUP from '../dictionary_reverse';
import ROTATION from '../dictionary_rotation';

const BigCard = ({selectedCard, setSelectedCard, wallet, contract, isMinting, setIsMinting, pageSelected}) => {
  // console.log('selectedCard inside Bigcard', selectedCard);
  // console.log('wallet inside Bigcard', wallet);

  // console.log(REVERSELOOKUP);
  
  const [redeemed, setRedeemed] = useState<boolean>(false);
  const [tokenID, setSelectedTokenID] = useState<Number | null>(null);
  const [collection, setCollection] = useState<string[] | null>(null);
  let MyNFTFactory;
  let MyNFTContract;

  // console.log(REVERSELOOKUP[selectedCard]);
  
  const handleMint = async () => {
    setIsMinting(true);
    const tx = await contract.safeMint(REVERSELOOKUP[selectedCard], selectedCard, 837, 19, 2, 11, 13, 0);
    await tx.wait();
    // console.log("tx", tx);
    // const tx2 = await contract.nftHolderAttributes[]
  }


  // The following three bits allow user to close big card by hitting escape key.
  function closeSelected() {
    setSelectedCard("")
  }
  function seek(direction) {
    console.log("seek called")
    for (let i = 0; i < ROTATION.length; i++) {
      if (ROTATION[i] === selectedCard) {
        if (direction === "back") {
          setSelectedCard("")
          setSelectedCard(ROTATION[(i - 1)]);
        } else if (direction === "forward") {
          setSelectedCard("")
          setSelectedCard(ROTATION[(i + 1)]);
        }
      }
    }
  }
  const keyPressed = useCallback((event) => {
    if (event.key === "Escape") {
      closeSelected();
    }
    if (event.key === "ArrowLeft") {
      seek("back");
    }
    if (event.key === "ArrowRight") {
      seek("forward");
    }
  }, []);
  useEffect(() => {

    document.addEventListener("keydown", keyPressed, false);
    document.addEventListener("keydown", keyPressed, false);


    return () => {
      document.removeEventListener("keydown", keyPressed, false);
      document.removeEventListener("keydown", keyPressed, false);
    };
  }, []);

  let randomLength = Math.floor(Math.random() * 3);
  let bodyLength = Math.floor(Math.floor(Math.random() * 55) * randomLength / 10) * 10 + 10;
  let tailLength = Math.floor(Math.floor(Math.random() * 70) * randomLength / 10) * 10 + 10;
  let totalLength = bodyLength + tailLength;

  let randomWalletsLength = Math.floor(Math.random() * 10);

  const redeemCard = async () => {
    if (tokenID) {
      const redeemed = await contract.switchRedeemed(tokenID);
      await redeemed.wait();
      const status = await contract.checkRedemptionStatus(tokenID);
      console.log('redemption status:', Number(status));
      if (Number(status) === 1) {
        setRedeemed(true);
      }
      if (Number(status) === 0) { 
        setRedeemed(false);
      }
    }
  }

  useEffect(() => {
    const checkRedemptionStatus = async () => {
      const usersTokenIDs = await contract.checkForUsersTokenIDs();
      console.log('usersTokenIDs', usersTokenIDs);
      let ImageURIsToTokenIDs = {};
      for (let tokenID of usersTokenIDs) {
        const mapping = await contract.nftHolderAttributes(Number(tokenID));
        console.log('mapping', mapping[1]);
        ImageURIsToTokenIDs[mapping[1]] = tokenID;
      }
      let tokenIDToRedeem: number = Number(ImageURIsToTokenIDs[selectedCard]);
      setSelectedTokenID(tokenIDToRedeem);
      console.log('tokenIDToRedeem', tokenIDToRedeem);
      let redeemed: number;
      if (contract && pageSelected === "Collection") {
        // need to unhardcode 
        const status = await contract.checkRedemptionStatus(tokenIDToRedeem);
        if (Number(status) === 1) {
          setRedeemed(true);
        }
        if (Number(status) === 0) { 
          setRedeemed(false);
        }
      }
    }
    checkRedemptionStatus();
  }, [selectedCard]);

  return (
    <div className="big-card-container">
      {/* <button onClick={redeemCard}>Redeem Me Now</button> */}
        <div className="big-img-container">

            <div className="panel big-card-details">
              <div className="force-wide">XOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXO</div>
              <div className="circle"></div>
              <h5 className="interior-item detail-text-header">{REVERSELOOKUP[selectedCard]}</h5>
              <div className="sub-panel">
                <ul className="card-attributes">
                  <li className="attribute-title">Duration: </li>
                  <p className="attribute-value">{totalLength}ms</p>
                  <li className="attribute-title">Body: </li>
                  <p className="attribute-value">{bodyLength}ms</p>
                  <li className="attribute-title">Tail: </li>
                  <p className="attribute-value">{tailLength}ms</p>
                  <li className="attribute-title">Loudness: </li>
                  <p className="attribute-value">-{Math.floor(Math.random() * 5) * randomLength} LUFs</p>
                  <li className="attribute-title">Dynamics: </li>
                  <p className="attribute-value">-{Math.floor(Math.random() * 10) * randomLength}db</p>
                  <li className="attribute-title">Redeemed: </li>
                  <p className="attribute-value">{`${redeemed}`}</p>
                </ul>
              </div>
              <div className="action-button-positioning">
                { pageSelected === "Collection" ?
                  <button className="btn btn-success interior-item action-button mint-button animate" onClick={() => {!redeemed ? redeemCard() : null }}>{redeemed ? "Redeemed" : "Redeem"}</button>
                : null }
                { pageSelected !== "Collection" ?
                  <button className="btn btn-success interior-item action-button mint-button animate" onClick={() => handleMint()}>Mint</button>
                : null }
              </div>
            </div>

            <div className="img-and-button">
                <img className="big-image" src={`https://cloudflare-ipfs.com/ipfs/${selectedCard}`} alt="..."></img>
                <div onClick={() => closeSelected()} className="back-button"><span>esc</span></div>
            </div>

            <div className="panel big-card-actions">
              <div className="force-wide">XOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXO</div>
              <div className="circle"></div>
              <h5 className="interior-item detail-text-header">Circulating</h5>
              <div className="sub-panel">
                <ul className="wallet-list">
                  {randomWalletsLength > 0 ? <a className="wallet-item">0x2D6131a98A3fA7B6dD8Ae63A5B8AF01ba8258594</a> : null}
                  {randomWalletsLength > 1 ? <a className="wallet-item">0xf07ba2229b4da47895ce0a4ab4298ad7f8cb3a4d</a> : null}
                  {randomWalletsLength > 2 ? <a className="wallet-item">0xf07ba2229b4da47895ce0a4ab4298ad7f8cb3a4d</a> : null}
                  {randomWalletsLength > 3 ? <a className="wallet-item">0x0b7a434782792b539623fd72a428838ea4173b22</a> : null}
                  {randomWalletsLength > 4 ? <a className="wallet-item">0xe4feb387cb1daff4bf9108581b116e5fa737bea2</a> : null}
                  {randomWalletsLength > 5 ? <a className="wallet-item">0xcfe2cd1e76ef398b137f9ec8031b87982e18e4ac</a> : null}
                  {randomWalletsLength > 6 ? <a className="wallet-item">0x44c1767ed909e808cee9a92d016ce3956d60871f</a> : null}
                  {randomWalletsLength > 7 ? <a className="wallet-item">0x8b2b41b8f353aa4e440d1550242623670aa5b784</a> : null}
                  {randomWalletsLength > 8 ? <a className="wallet-item">0x3bcf58fc7b242285c692b7568406f9adf22703b0</a> : null}
                  {randomWalletsLength > 9 ? <a className="wallet-item">0xc5f1d05d25b1a296d2c545ef98b296b7dc110132</a> : null}

                </ul>

              </div>
              <div className="action-button-positioning">
                <button className="btn btn-secondary interior-item action-button" onClick={() => alert("This is a stretch goal we are still working on!! Sorry :]")}>Trade</button>
              </div>
              
            </div>


        </div>

          <div className="spacer5"></div>
          <div className="spacer5"></div>
          <div className="spacer5"></div>
          <div className="nudge-bigger">
            <div className="circle"></div>
          </div>
          {isMinting ?
            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          : null}
    </div>
    )
  }
  
  export default BigCard;




