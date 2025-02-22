import React from "react";
import TypingEffect from "../TypingEffect/TypingEffect";
import Carousel from "../Carosuel/Carousel";

const Banner = () => {
  return (
    <>
      <div
        className="hero min-h-screen !px-0"
        style={{
          backgroundImage: "url(https://img.freepik.com/free-vector/realistic-abstract-football-background_52683-67578.jpg?t=st=1740224851~exp=1740228451~hmac=2d08f550652eef2b6f2387bd4a6ddea4201729bb8a9591f7022318c863446299&w=1800)",
        }}
      >
        <div className="hero-overlay bg-opacity-60 dark:bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="grid grid-cols-1 md:grid-cols-2 pt-16 gap-24">
            <div>
              <TypingEffect />
            </div>
            <div>
              {/* <Carousel /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
