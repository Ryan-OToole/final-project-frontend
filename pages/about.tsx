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
  
  return (
    
    <div>
      <div className="header-nav-bkgd">
        <div className="mwbox">
          <div className="header">TraydPost</div>
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
      <div className="main-title">Vision</div>
      <div className="sm-divider"></div>
      <div className="text-section">
        Built with <span>creatives</span> in mind, TraydPost was made to demonstrate the tools
        that <span>digital asset marketplaces</span> and <span>game developers</span> need
        to bring their visions to web 3.0.
      </div>

      <div className="fwbox img-row">
        <Image className="gif" alt="pee" src={PlanetariyumTrailer} />
        <Image className="gif" alt="pee" src={PlanetariyumTrailer} />
        <Image className="gif" alt="pee" src={PlanetariyumTrailer} />
      </div>

      <div className="med-divider"></div>
      <div className="spacer5"></div>

      <div className="main-title">Meet Our Team</div>
      <div className="fwbox img-row">
        <Image className="avatar" alt="pee" src={AvRyan} />
        <Image className="avatar" alt="pee" src={AvElliot} />
        <Image className="avatar" alt="pee" src={AvAlbert} />
      </div>
      <div className="fwbox img-row">
        <div className="personal-details-box">
          Ryan Otoole

          <br />
          <div className="link-icons-container">
            <Image className="link-icon nudge-smaller" alt="pee" src={IconOctocat} />
            <Image className="link-icon" alt="pee" src={IconLinkedIn} />
            <Image className="link-icon" alt="pee" src={IconAirplane} />
          </div>

        </div>
        <div className="personal-details-box">
          Elliot Mangini

          <br />
          <div className="link-icons-container">
            <Image className="link-icon nudge-smaller" alt="pee" src={IconOctocat} />
            <Image className="link-icon" alt="pee" src={IconLinkedIn} />
            <Image className="link-icon" alt="pee" src={IconAirplane} />
          </div>
          
          </div>
        <div className="personal-details-box">
          Albert Forest Jr.

          <br />
          <div className="link-icons-container">
            <Image className="link-icon nudge-smaller" alt="pee" src={IconOctocat} />
            <Image className="link-icon" alt="pee" src={IconLinkedIn} />
            <Image className="link-icon" alt="pee" src={IconAirplane} />
          </div>
          
          </div>
      </div>


      
    </div>
    )
  }
  
  export default About;