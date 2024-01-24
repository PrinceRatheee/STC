"use client";
import React, { useEffect, useState } from "react";
import { SingleCoin } from "../../../config/api";
import axios from "axios";


import ChartTable from "../../../components/ChartTable";
import toast, { Toaster } from "react-hot-toast";

const page = ({ params }) => {
  const [coin, setCoin] = useState([]);
  const [buyNumber, setBuyNumber] = useState(0);
  const [sellNumber, setSellNumber] = useState(0);
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const [balance, setBalance] = useState(0);

  const [buyData, setBuyData] = useState({
    coinId: "",
    stakeNo: 0,
    amount: 0,
  });
  const FetchBalance = () => {
    return (
      <>
        <p>Avbl: {`${balance} $`}</p>
      </>
    );
  };
  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(params.id));
    setCoin(data);
    setBuyData({ ...buyData, coinId: data.id });
    const res = await axios.get("/api/users/dashboard");
    setBalance(res.data.data.balance);
    console.log("data fetched from dashboard5656", res.data.data.holdings);
    res.data.data.holdings?.map((cryptoCoin) => {
      if (cryptoCoin.coinId === params.id) {
        console.log("45", cryptoCoin.coinId);
        setCryptoBalance(cryptoCoin.stakeNo);
      }
    });
    
  };

  console.log("coin data", coin);
  const FetchCryptoBalance = () => {
    return (
      <>
        <p>Avbl: {`${cryptoBalance} ${params.id}`}</p>
      </>
    );
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    FetchCryptoBalance();
  }, [cryptoBalance]);
  useEffect(() => {
    setBuyData({
      ...buyData,
      stakeNo: buyNumber,
      amount: buyNumber * coin?.market_data?.current_price?.usd,
    });
  }, [buyNumber]);

  const sellCoin = async () => {
    try {
      if (sellNumber <= 0) {
        toast.error(
          `Your Entered amount should be greater than 0 ${params.id}`
        );
        return null;
      }
      if (cryptoBalance < sellNumber) {
        toast.error(`Your available ${params.id} balance is low`);
        return null;
      }
      // console.log("coin data",coin);
      const sellData = {
        price: coin?.market_data?.current_price?.usd,
        cryptoNumber: sellNumber,
        cryptoId: params.id,
      };
      const res = await axios.post("/api/users/sellOrder", sellData);
      const response = await axios.get("/api/users/dashboard");
      setBalance(response.data.data.balance);
      setCryptoBalance(cryptoBalance - sellNumber);
      toast.success("Your coin has been sold");
    } catch (error) {
      console.log("sell12e3rte");
      console.log(error.message);
    }
  };
  const buyCoin = async () => {
    // const router=useRouter();
    try {
      if (buyNumber <= 0) {
        toast.error("Amount should be greater than 0");
        return null;
      }
      if (
        buyNumber * coin?.market_data?.current_price?.usd > balance ||
        buyNumber * coin?.market_data?.current_price?.usd == 0
      ) {
        toast.error("You available balance is low");
        // console.log("Your available balance is low")
        return null;
      }

      // console.log("buyData",buyData);
      const res = await axios.post("/api/users/buyOrder", buyData);
      const response = await axios.get("/api/users/dashboard");
      setBalance(response.data.data.balance);

      toast.success("Your coin has been bought");
    } catch (error) {
      console.log("dgfhfjlyytuiokl3");
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster position="top-center" />
      <div className="flex gap-[0.3rem] items-center w-[80%] container">
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          className="w-[5rem] mb-[10px]"
        />

        <h1 className=" flex items-center text-[2.2rem] font-bold">
          {coin.name}
        </h1>
        <div className="border-solid bg-green bg-opacity-[50%] text-green border-[#1c5a57] h-[1.5rem] px-[0.5rem] ">
          <h1 className="text-[#4bc9ba] ">{coin.symbol}</h1>
        </div>
        <div>
          {coin?.market_data?.price_change_percentage_24h > 0 ? (
            <>
              <h3 className="text-[#64CCC5] font-bold">
                {`+${coin?.market_data?.price_change_percentage_24h}`}%
              </h3>
            </>
          ) : (
            <>
              <h3 className="text-[#D80032] font-bold">
                {`${coin?.market_data?.price_change_percentage_24h}`}%
              </h3>
            </>
          )}
        </div>
      </div>
      <div className="flex w-[60%] justify-between container mb-[1rem]">
        <div className="flex flex-col">
          <div>
            <h3 className="text-gray-600 text-[1rem]">Price</h3>
          </div>
          <div>
            <h3 className="text-[1.2rem] font-bold">
              ${coin?.market_data?.current_price?.usd}
            </h3>
          </div>
        </div>
        <div className="flex flex-col ">
          <div>
            <h3 className="text-gray-600 text-[1rem]">Market Cap</h3>
          </div>
          <div>
            <h3 className="text-[1.2rem] font-bold">
              ${coin?.market_data?.market_cap?.usd}
            </h3>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h3 className="text-gray-600 text-[1rem]">Total Volume</h3>
          </div>
          <div>
            <h3 className="text-[1.2rem] font-bold">
              ${coin?.market_data?.total_volume?.usd}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex w-[60%] justify-between container mb-[1rem]">
        <div className="flex flex-col">
          <div>
            <h3 className="text-gray-600 text-[1rem]">Ranking</h3>
          </div>
          <div>
            <h3 className="text-[1.2rem] font-bold text-center">
              {coin.market_cap_rank}
            </h3>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h3 className="text-gray-600 text-[1rem]">Circulating Supply</h3>
          </div>
          <div>
            <h3 className="text-[1.2rem] font-bold ">
              {coin?.market_data?.circulating_supply}
            </h3>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <h3 className="text-gray-600 text-[1rem]">Max Supply</h3>
          </div>
          <div>
            <h3 className="text-[1.2rem] font-bold text-center">
              {coin?.market_data?.max_supply === null
                ? "0"
                : coin?.market_data?.max_supply}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex  justify-between w-[60%] container mt-[1rem]">
        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-col">
            <div>
              <h3 className="text-gray-600 text-[1rem]">Low 24H</h3>
            </div>
            <div>
              <h3 className="text-[1.2rem] font-bold ">
                ${coin?.market_data?.low_24h?.usd}
              </h3>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <h3 className="text-gray-600 text-[1rem]">High 24H</h3>
            </div>
            <div>
              <h3 className="text-[1.2rem] font-bold ">
                ${coin?.market_data?.high_24h?.usd}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[0.2rem]">
          <div>
            <h3 className="text-gray-600 text-[1rem]">Official Links</h3>
          </div>
          <div className="bg-gray-200 px-[0.8rem] py-[0.5rem]">
            <a href={coin.links?.blockchain_site[0]}>
              {coin.links?.blockchain_site[0]}
            </a>
          </div>
          <div className="bg-gray-200 px-[0.8rem] py-[0.5rem]">
            <a href={coin.links?.chat_url[1]}>{coin.links?.chat_url[1]}</a>
          </div>
        </div>
        <div className="flex flex-col gap-[0.2rem]">
          <div>
            <h3 className="text-gray-600 text-[1rem]">Sentiment</h3>
          </div>
          <div >
            <h3 className="text-green-400">↑{coin.sentiment_votes_up_percentage}%</h3>
          </div>
          <div>
            <h3 className="text-red-400">↓{coin.sentiment_votes_down_percentage}%</h3>
          </div>
        </div>
      </div>
      
      <br />

      <ChartTable coinId={params.id}  />

      <div className="flex justify-between">
        <div className="flex flex-col w-[25rem] mt-[10vh] container gap-[1.5rem]">
          <div>
            <h1 className="merriweather-font font-bold text-[2rem]">Buy</h1>
          </div>
          <div>
            <FetchBalance />
          </div>
          <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Price
            </h2>
            <p>
              {` ${coin?.market_data?.current_price?.usd}  `}
              <span className="font-bold ml-2">USD</span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="merriweather-font font-bold text-[1rem]">
              {`${params.id}`}
            </h2>
            <input
              type="number"
              className="border-2 border-zinc-300   px-[0.5rem] py-[0.6rem] "
              name={buyNumber}
              id="buynumber"
              onChange={(e) => setBuyNumber(e.target.value)}
            />
          </div>
          <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Total
            </h2>
            <p>
              {`${buyNumber * coin?.market_data?.current_price?.usd}`}
              <span className="font-bold ml-2">USD</span>
            </p>
          </div>
          <button
            className="px-12 py-2    bg-[#32d993] w-[100%] text-white rounded-sm items-center"
            onClick={buyCoin}
          >
            {`Buy ${params.id}`}
          </button>
        </div>
        <div className="flex flex-col w-[25rem] mt-[10vh] container gap-[1.5rem]">
          <div>
            <h1 className="merriweather-font font-bold text-[2rem]">Sell</h1>
          </div>
          <div>
            <FetchCryptoBalance />
          </div>
          <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Price
            </h2>
            <p>
              {` ${coin?.market_data?.current_price?.usd}  `}
              <span className="font-bold ml-2">USD</span>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="merriweather-font font-bold text-[1rem]">
              {`${params.id}`}
            </h2>
            <input
              type="number"
              className="border-2 border-zinc-300   px-[0.5rem] py-[0.6rem] "
              name={sellNumber}
              id="sellNumber"
              onChange={(e) => setSellNumber(e.target.value)}
            />
          </div>
          <div className="flex justify-between bg-[#f0f1f2] py-3 px-4">
            <h2 className="merriweather-font text-gray-400 text-[1rem]">
              Total
            </h2>
            <p>
              {`${sellNumber * coin?.market_data?.current_price?.usd}`}
              <span className="font-bold ml-2">USD</span>
            </p>
          </div>
          <button
            className="px-12 py-2   bg-[#f6465d] w-[100%] text-white rounded-sm items-center"
            onClick={sellCoin}
          >
            {`Sell ${params.id}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
