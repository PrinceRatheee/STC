"use client";
import Image from "next/image";
import React from "react";
import "../styles/testimonials.css";

const Testimonial = () => {
  return (
    <div>
      <div className="flex flex-col container max-w-5xl  pt-20 pb-20">
        <div className="flex flex-wrap gap-16">
          <div>
            <Image
              src="/Crypto-Coin-and-Wallet-3D-Icon-1-1024x993.png"
              width={350}
              height={250}
            />
          </div>
          <div className="flex flex-col max-w-lg gap-6  ">
            <p className="testimonials-p1 ">Testimonials</p>
            <h3 className="testimonials-h3">
              Millions of user around the world
            </h3>
            <p className="testimonials-p2">
              It's an exciting time to become a trader
            </p>



            <div>
              <button className="px-12 py-4 text-base  learnMoreBtn mt-8  rounded-full  ">
                Learn More
              </button>
            </div>
          </div>
        </div>


        {/* Reaction cards */}
        <div className="flex flex-wrap gap-4 justify-between mt-12">
          <div className="bg-white flex flex-col max-w-xs px-8 pt-8 pb-6 gap-4 reaction-card">
            <p>⭐⭐⭐⭐⭐</p>
            <p className="reaction-cardsp1">
              “Great! This is one of the best crypto trading apps I have ever
              used before.”
            </p>
            <div className="flex justify-between mt-12">
              <div >
                <h4 className="reaction-cardsh1">Aman Malik</h4>
                <p className="reaction-cardsp2">Developer</p>
              </div>
              <div>
                <Image
                  src="/Crypto-Coin-and-Wallet-3D-Icon-1-1024x993.png"
                  width={40}
                  height={30}
                />
              </div>
            </div>
          </div>
          <div className="bg-white flex flex-col max-w-xs px-8 pt-8 pb-6 gap-4 reaction-card">
            <p>⭐⭐⭐⭐⭐</p>
            <p className="reaction-cardsp1">
              “Great! Compared to everything else I've ever used, this is the
              best broking site for crypto.”
            </p>
            <div className="flex justify-between mt-4">
              <div >
                <h4 className="reaction-cardsh1">Prince Rathi</h4>
                <p className="reaction-cardsp2">Trader</p>
              </div>
              <div>
                <Image
                  src="/Crypto-Coin-and-Wallet-3D-Icon-1-1024x993.png"
                  width={40}
                  height={30}
                />
              </div>
            </div>
          </div>
          <div className="bg-white flex flex-col max-w-xs px-8 pt-8 pb-6 gap-4 rounded-md reaction-card">
            <p>⭐⭐⭐⭐⭐</p>
            <p className="reaction-cardsp1 ">
            “Great! This is one of the best apps I have ever used before.”
            </p>
            <div className="flex justify-between mt-12">
              <div >
                <h4 className="reaction-cardsh1">Devender Singh</h4>
                <p className="reaction-cardsp2">Frontend Developer</p>
              </div>
              <div>
                <Image
                  src="/Crypto-Coin-and-Wallet-3D-Icon-1-1024x993.png"
                  width={40}
                  height={30}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
