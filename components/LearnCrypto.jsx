"use client";
import React from "react";
import "../styles/learnCrypto.css";

const LearnCrypto = () => {
  return (
    <div>
      <div className="flex flex-wrap container max-w-6xl   pt-20 pb-10  justify-between">
        <div className="flex flex-col max-w-lg">
          <p className="learncrypto-p1">LEARN CRYPTO</p>
          <h1 className="learncrypto-h1 mt-4">
            Read our crypto trading guide for beginners
          </h1>
        </div>
        <div className="flex flex-col max-w-lg">
          <p className="learncrypto-p2">
            The Bitcoin and cryptocurrency markets have experienced a surge in
            volume recently, making it an exciting time to become a trader.
          </p>
          <button className="mt-4 learncrypto-btn flex gap-4">
            Veiw all guides
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnCrypto;
