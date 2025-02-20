import React from "react";
import logo from "../../../assets/logo/logom.png";
import facebook from "../../../assets/social/facebook.png";
import instagram from "../../../assets/social/instagram.png";
import whatsapp from "../../../assets/social/whatsapp.png";
import linkedin from "../../../assets/social/linkedin.png";
import youtube from "../../../assets/social/youtube.png";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHeadset,
  FaEnvelope,
} from "react-icons/fa";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="footer py-14 px-10 bg-gray-900 text-base-content">
        <FadeInAnimation custom={1}>
          <aside>
            <img
              loading="lazy"
              className="w-25 md:w-32"
              src={logo}
              alt="Logo"
            />
            <br />
            <p className="-mt-3 text-base font-semibold">
              Let's Conquer Together
            </p>
            <div className="flex justify-center space-x-4 mt-5 py-4">
              <Link to="#">
                <img className="w-8" src={facebook} alt="Facebook" />
              </Link>
              <Link to="#">
                <img className="w-8" src={instagram} alt="Instagram" />
              </Link>
              <Link to="#">
                <img className="w-8" src={whatsapp} alt="WhatsApp" />
              </Link>
              <Link to="#">
                <img className="w-8" src={linkedin} alt="LinkedIn" />
              </Link>
              <Link to="#">
                <img className="w-8" src={youtube} alt="YouTube" />
              </Link>
            </div>
          </aside>
        </FadeInAnimation>
        <FadeInAnimation custom={2}>
          <nav>
            <header className="font-bold text-xl mb-3 text-white">
              Contact Us
            </header>
            <div className="flex flex-col space-y-3 text-base text-white">
              <p className="flex items-center gap-1">
                <FaMapMarkerAlt />
                Nuh, Mewat, Haryana 122107
              </p>
              <p className="flex items-center gap-1">
                <FaPhoneAlt />
                +91 9389678954
              </p>
              <p className="flex items-center gap-1">
                <FaHeadset />
                +91 7050068050
              </p>
              <p className="flex items-center gap-1">
                <FaEnvelope />
                Mewatsports@inqury.com
              </p>
            </div>
          </nav>
        </FadeInAnimation>
        <FadeInAnimation custom={3}>
          <nav>
            <header className="font-bold text-xl mb-3 text-white">
              Quick Links
            </header>
            <div className="flex flex-col space-y-3 text-base text-white">
              <Link className="link link-hover hover:text-amber-500">Home</Link>
              <Link className="link link-hover hover:text-amber-500">
                About Us
              </Link>
              <Link className="link link-hover hover:text-amber-500">
                Programmes
              </Link>
              <Link className="link link-hover hover:text-amber-500">
                Instructors
              </Link>
            </div>
          </nav>
        </FadeInAnimation>
        <FadeInAnimation custom={4}>
          <form>
            <header className="font-bold text-xl mb-3 text-white">
              Newsletter
            </header>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="text-base text-white">
                  Enter your email address
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered w-full"
                />
                <button className="btn bg-amber-500 hover:bg-amber-600 text-white absolute top-0 right-0 rounded-l-none">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </form>
        </FadeInAnimation>
      </footer>
      <div className="footer-center p-6 bg-gray-900 text-base-content border-t border-slate-500">
        <p>
          Copyright © {year} - All rights reserved. Developed by{" "}
          <a
            href="https://zuridox.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:underline"
          >
            Zuridox
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
