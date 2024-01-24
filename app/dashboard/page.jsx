"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SingleCoin } from "../../config/api";

import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Succesfull");
      router.push("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/dashboard");
      console.log("dashboard data from token", res.data);
      setData(res.data.data);
      setCryptoBalance(res.data.data.balance);
      res.data.data.holdings.map(async (holding) => {
        setCryptoBalance(cryptoBalance + holding.amount);
      });
    } catch (error) {
      console.log("Error occured at frontend of dashboard");
      console.log(error);
    }
  };
 

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <div className="w-[70%] bg-gray-100 rounded-3xl  mx-auto py-[2rem] px-[3rem] mt-[2rem] mb-[4rem]">
        <div className="flex   justify-between ">
          
          <div className="flex flex-col justify-center">
            <div>
              <h3 className="text-gray-600 text-[0.8rem]">Username</h3>
            </div>
            <h3 className="font-semibold">{data?.username}</h3>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 w-[0.1rem] h-[4.5rem] "></div>
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h3 className="text-gray-600 text-[0.8rem]">UserId</h3>
            </div>
            <h3 className="font-semibold ">{data?._id}</h3>
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h3 className="text-gray-600 text-[0.8rem]">Type</h3>
            </div>
            <h3 className="font-semibold text-[0.8rem]">Personal</h3>
          </div>
         
        </div>
        <div className="flex gap-[5rem]">
          <div className="flex flex-col">
            <h1 className="text-[1.2rem] font-semibold">Estimated Balance</h1>
            <h1 className="text-[2.3rem] font-bold">
              =${data?.balance + cryptoBalance}
            </h1>
          </div>
          <div className="flex flex-col ">
            <div>
              <h1 className="text-[1.2rem] font-bold text-center text-gray-600">
                Composition
              </h1>
            </div>
            <div className="flex gap-[3rem]">
              <div className="text-gray-600">
                <h3 className="text-[1rem] font-semibold">Cash</h3>
                <h3>
                  = ${data?.balance}
                  <span>
                    {" "}
                    (≈{" "}
                    {(
                      (data?.balance / (data?.balance + cryptoBalance)) *
                      100
                    ).toFixed(4)}
                    %)
                  </span>
                </h3>
              </div>
              <div className="text-gray-600">
                <h3 className="text-[1rem] font-semibold">Assets</h3>
                <h3>
                  = ${cryptoBalance}
                  <span>
                    {" "}
                    (≈
                    {(
                      (cryptoBalance / (data?.balance + cryptoBalance)) *
                      100
                    ).toFixed(4)}
                    %)
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <button
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            onClick={logout}
          >
            Logout
          </button>
      </div>

      <Container>
        <h1 className="text-[2.2rem] font-bold pl-[2rem] mb-[2rem]">
          {" "}
          Your Assets:
        </h1>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Number",  "Amount", "", ""].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.holdings?.map((row) => {
                return (
                  <TableRow
                    onClick={(e) => {
                      // Check if the click originated from the "Withdraw" button
                      if (!e.target.closest("button")) {
                        router.push(`/trading/${row.coinId}`);
                      }
                    }}
                    className="row hover:bg-gray-100 cursor-pointer"
                    key={row.coinId}
                  >
                    <TableCell component="th" scope="row" className="flex ">
                      <Link href={`/trading/${row.id}`}>
                        <div className="py-[0.6rem]">
                          <span>{row.coinId.toUpperCase()}</span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.stakeNo}</TableCell>
                    
                    <TableCell align="right">
                      ${row.amount.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <button
                          className="px-[1rem] py-[0.5rem] bg-white hover:bg-[#EEBC1D] border-solid border-2 hover:text-white transition-all duration-75 cursor-pointer z-10"
                          onClick={() => router.push(`/transfer/${row.coinId}`)}
                        >
                          Withdraw
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <button
                          className="px-[1rem] py-[0.5rem] bg-white hover:bg-[#EEBC1D] border-solid border-2 hover:text-white transition-all duration-75 cursor-pointer z-10"
                          onClick={() => router.push(`/trading/${row.coinId}`)}
                        >
                          Trade
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
        <h1 className="text-[2.5rem] font-bold ml-[15rem] mt-[4rem] ">Transaction History:</h1>
      <div className="flex flex-wrap w-[70%] mt-[1rem] container gap-[2rem]">
        {data?.history?.map((historyData)=>(
          <> 
            <div className="flex flex-col bg-gray-100 rounded-2xl px-[2rem] py-[3rem] ">
               <h3 className="font-semibold text-gray-500">Amount: ${historyData.amount}</h3>
               <h3 className="font-semibold text-gray-500">Reciever: {historyData.receiver}</h3>
               <h3 className="font-semibold text-gray-500">Date: {historyData.date}</h3>

            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default page;
