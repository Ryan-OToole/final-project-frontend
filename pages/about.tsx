import React, {useEffect, useState} from "react";
import Image from 'next/image';

import PlanetariyumTrailer from './assets/gifs/PlanetariyumTrailer.gif';
import AvRyan from './assets/avatars/av_ryan.jpeg';
import AvElliot from './assets/avatars/av_elliot.jpeg';
import AvAlbert from './assets/avatars/av_albert.jpeg';

import IconOctocat from './assets/icons/octocat_icon.png';
import IconLinkedIn from './assets/icons/linkedin_icon.png';
import IconAirplane from './assets/icons/airplane_icon.png';




const About = () => {

  function copyEmail(e, string) {
    e.preventDefault();
    navigator.clipboard.writeText(string)
    .then(() => alert(`${string} copied to clipboard.`));
  }
  
  return (
    
    <div>
      <div className="header-nav-bkgd">
        <div className="mwbox">
          <div className="header">
            TraydP<span>∅</span>st
          </div>
        </div>
        <div className="mwbox">
          <div className="nav-button selected-page">
            About
            <div className="underline selected-underline"></div>
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

      <div className="spacer5"></div>
      <div className="spacer2"></div>
      <div className="main-title">Vision</div>
      <div className="sm-divider"></div>
      <div className="text-section">
        Built with <span>creatives</span> in mind, TraydPost was made to demonstrate the tools
        that <span>digital asset marketplaces</span> and <span>game developers</span> need
        to bring their ideas to web 3.0.
      </div>

      <div className="fwbox img-row">
        <Image className="gif" alt="pee" src={PlanetariyumTrailer} />
        <Image className="gif" alt="pee" src={PlanetariyumTrailer} />
        <Image className="gif" alt="pee" src={PlanetariyumTrailer} />
      </div>

      <div className="med-divider"></div>
      <div className="spacer5"></div>
      <div className="spacer5"></div>
      <div className="spacer2"></div>

      <div className="main-title">Meet Our Team</div>
      <div className="fwbox img-row">
        <Image className="avatar ryan" alt="pee" src={AvRyan} />
          <div className="quote ryan-quote">
              "WAGMI!"
          </div>
        <Image className="avatar elliot" alt="pee" src={AvElliot} />
          <div className="quote elliot-quote">
              "Sup, nerds!"
          </div>
        <Image className="avatar albert" alt="pee" src={AvAlbert} />
          <div className="quote albert-quote">
              "I'm Albert's quote!"
          </div>
      </div>
      <div className="fwbox img-row">
        <div className="personal-details-box">
          Ryan Otoole

          <br />
          <div className="link-icons-container">
            <a href="https://github.com/Ryan-OToole" target="_blank">
              <Image className="link-icon nudge-smaller" alt="pee" src={IconOctocat} />
            </a>
            <a href="https://www.linkedin.com/in/ryanjohnotoole/" target="_blank">
              <Image className="link-icon" alt="pee" src={IconLinkedIn} />
            </a>
            <Image onClick={(e) => copyEmail(e, "otoolerj@gmail.com")} className="link-icon" alt="pee" src={IconAirplane} />
          </div>

        </div>
        <div className="personal-details-box">
          Elliot Mangini

          <br />
          <div className="link-icons-container">
            <a href="https://github.com/elliotmangini" target="_blank">
              <Image className="link-icon nudge-smaller" alt="pee" src={IconOctocat} />
            </a>
            <a href="https://www.linkedin.com/in/elliotmangini/" target="_blank">
              <Image className="link-icon" alt="pee" src={IconLinkedIn} />
            </a>
            <Image onClick={(e) => copyEmail(e, "elliot.mangini@gmail.com")} className="link-icon" alt="pee" src={IconAirplane} />
          </div>
          
          </div>
        <div className="personal-details-box">
          Albert Forest Jr.

          <br />
          <div className="link-icons-container">
            <a href="https://github.com/virtualbushido" target="_blank">
              <Image className="link-icon nudge-smaller" alt="pee" src={IconOctocat} />
            </a>
            <a href="https://www.linkedin.com/in/albert-forest-jr-816017259/" target="_blank">
              <Image className="link-icon" alt="pee" src={IconLinkedIn} />
            </a>
              <Image onClick={(e) => copyEmail(e, "albertforestjr@protonmail.com")} className="link-icon" alt="pee" src={IconAirplane} />
          </div>
          
          </div>
      </div>


      
    </div>
    )
  }
  
  export default About;