import React, {useEffect, useState} from "react";

const NavBar = () => {
  
  return (
    <div>
      <div className="fwbox">
        <div className="header">TraydPost</div>
      </div>
      <div className="fwbox">
        <div className="nav-button">
          About
          <div className="underline"></div>
        </div>
        <div className="nav-button">
          MetaGallery
          <div className="underline"></div>
        </div>
        <div className="nav-button">
          Collection
          <div className="underline"></div>
          </div>
      </div>
    </div>
    )
  }
  
  export default NavBar;