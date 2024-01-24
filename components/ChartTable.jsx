"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { useEffect, useState, useLayoutEffect } from "react";

import { CircularProgress } from "@mui/material";
import { chartDays } from "../config/data";
import { HistoricalChart } from "../config/api";

const ChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer height={"90%"}>
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey="prices"
          stroke="#14ffec"
          strokeWidth={"1px"}
          dot={false}
        />
        <XAxis dataKey="date" />
        <YAxis dataKey="prices" domain={["auto", "auto"]} />
        <Tooltip cursor={false} />
        
      </LineChart>
    </ResponsiveContainer>
  );
};

const ChartTable = ({ coinId },{coinPrice}) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(15);
  const currency = "usd";
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coinId, days, currency));
      // console.log("chart data", data);
      setflag(true);
      // console.log(data);
      let convertedData = data.prices.map((item) => {
        return {
          date: new Date(item[0]).toLocaleDateString,
          prices: item[1],
        };
      });
      setHistoricData(convertedData);
      // console.log("coin Price",coinPrice);
      // console.log("hist");
    } catch (error) {
      console.log("error chart");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days, coinId]);

  // console.log(coin);
  return (
    
    <>
    <div className="w-[90vw] h-[90vh] flex flex-col container justify-center mt-[5rem]">
      <ChartComponent data={historicData} />
      <div>
        <h3 className="text-center">Timeframe</h3>
      </div>
      <div className="w-[60%] flex justify-around self-center">
        <button
          className={`w-[7rem] border-solid border-2 border-orange-500 rounded-md py-[0.5rem] ${
            days === 1 ? `bg-orange-500 text-white` : ``
          }`}
          onClick={() => setDays(1)}
        >
          1 Day
        </button>
        <button
          select
          className={`w-[7rem] border-solid border-2 border-orange-500 rounded-md py-[0.5rem] ${
            days === 15 ? `bg-orange-500 text-white` : ``
          }`}
          onClick={() => setDays(15)}
        >
          15 Day
        </button>
        <button
          className={`w-[7rem] border-solid border-2 border-orange-500 rounded-md py-[0.5rem] ${
            days === 30 ? `bg-orange-500 text-white` : ``
          }`}
          onClick={() => setDays(30)}
        >
          30 Day
        </button>
        <button
          className={`w-[7rem] border-solid border-2 border-orange-500 rounded-md py-[0.5rem] ${
            days === 365 ? `bg-orange-500 text-white` : ``
          }`}
          onClick={() => setDays(365)}
        >
          1 Year
        </button>
      </div>
    </div>
      
    </>
  );
};

export default ChartTable;
