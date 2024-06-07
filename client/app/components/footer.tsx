"use client";
import { logoFacebook, logoInstagram, logoYoutube, logoLinkedin, logoGithub, logoGooglePlaystore } from "ionicons/icons";
import Icon from './icon';

const Footer = () => {
    return (
        <div className="bottom-0 w-full flex items-center justify-center">
            <div className="block text-white px-4 pb-4">
          <div className="flex">
            <ul className="flex justify-between items-center px-4 py-2">
              <li className="px-2 cursor-pointer underline hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown">About Us</li>
              <li className="px-2 cursor-pointer underline hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown">FAQ</li>
              <li className="px-2 cursor-pointer underline hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown">Contact Us</li>
            </ul>
          </div>
          <div className="flex">
            <ul className="flex justify-between items-center px-4 py-2">
              <li className="px-2 cursor-pointer  hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown"><Icon type={logoFacebook} className="text-2xl"></Icon></li>
              <li className="px-2 cursor-pointer  hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown"><Icon type={logoInstagram} className="text-2xl"></Icon></li>
              <li className="px-2 cursor-pointer  hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown"><Icon type={logoYoutube} className="text-2xl"></Icon></li>
              <li className="px-2 cursor-pointer  hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown"><Icon type={logoLinkedin} className="text-2xl"></Icon></li>
              <li className="px-2 cursor-pointer  hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown"><Icon type={logoGithub} className="text-2xl"></Icon></li>
              <li className="px-2 cursor-pointer  hover:bg-yellow-400 hover:rounded-lg hover:text-bitBrown"><Icon type={logoGooglePlaystore} className="text-2xl"></Icon></li>
            </ul>
          </div>
          </div>
        </div>
    );
}

export default Footer;