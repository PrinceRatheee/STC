"use client";
import React from "react";
import "../styles/promotion.css";
import Image from "next/image";

const Promotion = () => {
  return (
    <div className="pb-20">
      <div className="flex flex-wrap flex-col promotion items-center container w-1/3 pt-20">
        <h1 className="text-center mb-4">Become a Crypto Trader in Seconds</h1>
        <p className="text-center">
          Cryptocurrency markets have seen an increase in volume in recent
          weeks, which is a great opportunity for new traders.
        </p>
      </div>
      <div className="grid grid-cols-2 container w-3/4 mt-16 gap-8">
        <div className="inline-block">
          <div className="flex flex-wrap gap-8 promotion-card pl-8 py-6 items-center">
            <div className="max-w-xs w-1/2 flex flex-wrap items-center">
              <h3 className="promotion-h3 mb-4">Learn Crypto</h3>
              <p className="promotion-p">
                Trade Bitcoin, Ethereum, USDT and most of other altcoins using
                our crypto trading app.
              </p>
            </div>
            <div className="grid place-items-center ">
              <Image
                src="/stocks-344.png"
              
                width={130}
                height={130}
              />
            </div>
          </div>
        </div>
        <div className="inline-block">
          <div className="flex flex-wrap gap-8 promotion-card pl-8 py-6 ">
            <div className="max-w-xs w-1/2">
              <h3 className="promotion-h3 mb-4">Buy Crypto</h3>
              <p className="promotion-p">
                Trade Bitcoin, Ethereum, USDT and most of other altcoins using
                our crypto trading app.
              </p>
            </div>
            <div className="grid place-items-center ">
              <Image
                src="/wallet-iuh.png"
                
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
        <div className="inline-block flex flex-wrap gap-8 promotion-card pl-8 py-6">
          <div className="max-w-xs w-1/2">
            <h3 className="promotion-h3 mb-4"> Work Secure</h3>
            <p className="promotion-p">
              Trade Bitcoin, Ethereum, USDT and most of other altcoins using our
              crypto trading app.
            </p>
          </div>
          <div className="grid place-items-center ">
            <Image src="/security.png" width={120} height={120} />
          </div>
        </div>
        <div className="inline-block">
          <div  className="flex flex-wrap gap-8 promotion-card pl-8 py-6">
            <div className="max-w-xs w-1/2">
              <h3 className="promotion-h3 mb-4"> Trade Anywhere</h3>
              <p className="promotion-p">
                Trade Bitcoin, Ethereum, USDT and most of other altcoins using
                our crypto trading app.{" "}
              </p>
            </div>
            <div className="grid place-items-center ">
              <Image
                src="/worldwide.png"
               
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
