import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/youtube_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={facebook_icon} alt=""/>
        <img src={instagram_icon} alt=""/>
        <img src={twitter_icon} alt=""/>
        <img src={youtube_icon} alt=""/>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Media Center</li>
        <li>Investor Relation</li>
        <li>jobs</li>
        <li>Terms of use</li>
        <li>Privacy</li>
        <li>Legal Notice</li>
        <li>Cookie Preference</li>
        <li>Corporate Information</li>
        <li>Contact US</li>
      </ul>
      <p className="copyright-text">Netflix.inc</p>
    </div>
  )
}

export default Footer