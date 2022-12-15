import React, {useEffect, useState} from "react";

const NavBar = ({pageSelected, setPageSelected, setSelectedCard}) => {

  function handleNavigate(target) {
    if (pageSelected !== target) {
      setSelectedCard("")
      setPageSelected(target);
    }
  }
  
  return (
    <div className="header-nav-bkgd">
    <div className="mwbox">
      <div className="header">
        TraydP<span>∅</span>st
      </div>
    </div>
    <div className="mwbox">
      <div onClick={() => handleNavigate("About")} className={`nav-button ${pageSelected === "About" ? "selected-page" : null}`}>
        About
        <div className={`underline ${pageSelected === "About" ? "selected-underline" : null}`}></div>
      </div>
      <div onClick={() => handleNavigate("Presentation")} className={`nav-button ${pageSelected === "Presentation" ? "selected-page" : null}`}>
        Presentation
        <div className={`underline ${pageSelected === "Presentation" ? "selected-underline" : null}`}></div>
      </div>
      <div onClick={() => handleNavigate("MetaGallery")} className={`nav-button ${pageSelected === "MetaGallery" ? "selected-page" : null}`}>
        MetaGallery
        <div className={`underline ${pageSelected === "MetaGallery" ? "selected-underline" : null}`}></div>
      </div>
      <div onClick={() => handleNavigate("Collection")} className={`nav-button ${pageSelected === "Collection" ? "selected-page" : null}`}>
        Collection
        <div className={`underline ${pageSelected === "Collection" ? "selected-underline" : null}`}></div>
      </div>
    </div>
  </div>
    )
  }
  
  export default NavBar;