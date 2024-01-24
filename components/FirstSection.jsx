"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FirstSection = () => {
  return (
    <div className="pb-8">
      <div className="flex flex-wrap gap-16 flexCenter items-center justify-center">
        {/* Left Part */}
        <div className="w-4/12 flex-col flex-wrap ">
          <div>
            <h1 className="firstSectionHeading mb-4">
              Buy & Sell Crypto Safely
            </h1>
          </div>
          <div>
            <p className="firstSectionPara mb-8">
              Trade Bitcoin, Etherium, USDT and all other cypto coins on our
              Trading App.
            </p>
          </div>
          <Link href="/signup" >
            
            <button className="px-12 py-4 text-base  firstSectionBtn  bg-primary-orange rounded-full  text-white">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right part */}
        <div>
          <Image src="/crypto-bg-img.png" width={600} height={500} />
        </div>
      </div>

      {/* procedure */}
      <div className="flex   content-center gap-8">
        <div className="bg-white procedure-top  container w-3/4 flex flex-wrap items-center justify-center gap-16 pt-16 pb-8 mt-16">
          <div className="flex flex-wrap ">
            <Image
              src="/lock-crypto.png"
              width={100}
              height={80}
              className="flex"
            />
            <div className="flex flex-wrap flex-col">
              <h3>Register</h3>

              <p>Register now to our exchange.</p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <Image src="/wallet-crypto-icon.png" width={100} height={80} />
            <div className="flex flex-wrap flex-col">
              <h3>Connect Your Wallet</h3>
              <p>Connect your wallet and transfer crypto.</p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <Image src="/earning-trading.png" width={100} height={80} />
            <div className="flex flex-wrap flex-col">
              <h3>Start Trading</h3>

              <p>Trade in all the cryptos worldwide with atmost safety.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Mobile  */}
      <div className=" flex terms-mobile flex-wrap mt-40 container w-3/4 gap-32 items-center">
        {/* left side  */}
        <div>
          <Image src="/cryptophone.png" width={400} height={600} />
        </div>

        <div className="w-6/12">
          <p>WHAT WE DO</p>
          <h1 className="mt-8 mb-8">Trade Crypto On Your Terms. Anywhere.</h1>
          <p>
            Invest in Bitcoin, Ethereum, USDT, and other cryptocurrencies using
            our crypto trading app. The Bitcoin and cryptocurrency markets have
            experienced a surge in volume recently, making it an exciting time
            to become a trader.
          </p>

          <div>
            <button className="px-12 py-4 text-base  learnMoreBtn mt-8  rounded-full ">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* venture Capitalist  */}
      <div className="flex flex-wrap justify-between w-2/4 container mt-8 ">
        <div>
          <Image src="/logo-1-crypto-300x83.png" width={100} height={13} />
        </div>
        <div>
          <Image src="/logo-23-crypto-6-300x74.png" width={100} height={13} />
        </div>
        <div>
          <Image src="/logo-crypto-3-300x74.png" width={100} height={13} />
        </div>
        <div>
          <Image src="/logo-crypto-5-300x69.png" width={100} height={13} />
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
