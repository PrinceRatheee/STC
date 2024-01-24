"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { SingleCoin } from "../../../config/api";
import toast, { Toaster } from "react-hot-toast";

const page = ({ params }) => {
  const [balance, setBalance] = useState(0);
  const [cryptoNumber, setCryptoNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [coin, setCoin] = useState([]);
  const FetchBalance = () => {
    return (
      <>
        <p>Avbl: {`${balance} ${params.id}`}</p>
      </>
    );
  };
  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(params.id));
    setCoin(data);
    const response = await axios.get("/api/users/dashboard");
    response.data.data.holdings.map((crypto)=>{
        if(crypto.coinId===params.id){
            setBalance(crypto.stakeNo);
            return null;
        }
    })
  };
//   console.log(coin?.market_data?.current_price?.usd, "coin frontend");

  const withdrawcrypto=async()=>{
    try {
        if(cryptoNumber<=0){
            toast.error("Amount should be greater than 0");
            return null;
        }
        if(address.length<=0){
            toast.error("Please enter the address correctly");
            return null;
        }
        if(cryptoNumber>balance){
            toast.error("You don't have sufficient balance");
            return null;
        }
        const cryptoData={
            stakeNo:cryptoNumber,
            amount:(cryptoNumber)*(coin?.market_data?.current_price?.usd),
            address:address,
            coinId:params.id
        }
        const res=await axios.post("/api/users/widthdraw",cryptoData);
        console.log("frontedn");
        toast.success(`${cryptoNumber} $ has been transefered to ${address}`);
        
        const response = await axios.get("/api/users/dashboard");
        response.data.data.holdings.map((crypto)=>{
            if(crypto.coinId===params.id){
                setBalance(crypto.stakeNo);
                return null;
            }
        })
    } catch (error) {
        console.log("Error occured in frontend for transfering crypto");
        console.log(error);
    }
    
    
  }
  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <div className="flex flex-col w-[20rem] mt-[10vh] container gap-[1.5rem]">
      <Toaster position="top-center" />
      <div>
        <h1 className="merriweather-font font-bold text-[2rem]">
          Transfer {params.id}
        </h1>
      </div>
      <div>
        <FetchBalance />
      </div>

      <div className="flex flex-col">
        <h2 className="merriweather-font font-bold text-[1rem]">Address:</h2>
        <input
          type="text"
          className="border-2 border-zinc-300  px-[1rem] py-[0.6rem]  "
          id="address"
          name={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex gap-[1rem]">
        <div className="flex items-center">
          <h2 className="merriweather-font font-bold text-[1rem]">
            Amount ({params.id})
          </h2>
        </div>
        <input
          type="Number"
          name={cryptoNumber}
          className="border-2 border-zinc-300  px-[0.5rem] py-[0.6rem]  "
          id="amount"
          onChange={(e) => setCryptoNumber(e.target.value)}
        />
      </div>
      <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Rate
            </h2>
            <p>
              {`${coin?.market_data?.current_price?.usd}`}<span className="font-bold ml-2">USD</span>
            </p>
        </div>
        <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Total
            </h2>
            <p>
              {`${(cryptoNumber)*(coin?.market_data?.current_price?.usd)}`}<span className="font-bold ml-2">USD</span>
            </p>
        </div>

      <div>
        <button className="px-12 py-4 text-base  firstSectionBtn  bg-primary-orange w-[100%] text-white rounded-[0.5rem]" onClick={withdrawcrypto}>
          Send
        </button>
      </div>
    </div>
  );
};

export default page;
