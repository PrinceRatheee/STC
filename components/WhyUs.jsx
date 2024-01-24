"use client";
import Image from "next/image";
import React from "react";
import "../styles/whyus.css";

const WhyUs = () => {
  return (
    <div>
      <div className="flex flex-wrap container max-w-5xl pt-20 justify-between pb-10">
        <div className="flex flex-col gap-4 flex-wrap max-w-md">
          <p className="whyus-p1">WHY US</p>
          <h3 className="whyus-h3">
            We got everything you need to start trading
          </h3>
          <p className="whyus-p2">
            The Bitcoin and cryptocurrency markets have experienced a surge in
            volume recently, making it an exciting time to become a trader.
          </p>
          <div className="flex gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="whyus-svg w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="list-p">Top trading platform</p>
          </div>
          <div className="flex gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="whyus-svg w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="list-p">Secure payments</p>
          </div>
          <div className="flex gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="whyus-svg w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="list-p">Easy to start trading</p>
          </div>
        </div>
        <div>
          <Image src="/opwejf.png" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
