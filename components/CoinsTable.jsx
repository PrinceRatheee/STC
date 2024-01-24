"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CoinsTable = () => {
  const router = useRouter();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const currency = "usd";
  const symbol = "$";

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  // console.log("coins");
  // console.log(coins);
  // console.log("coins");

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <Container>
        <h4 className="text-center m-[18px] merriweather-font">
          Cryptocurrencies
        </h4>

        <TextField
          label="Search here for crypto.."
          variant="outlined"
          className="mb-[20px] w-[100%]"
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {[, "Coin", "Price", "24h change", "Market Cap", ""].map(
                    (head) => (
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
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    // console.log("row id");
                    // console.log(row.id);
                    return (
                      <TableRow
                        // onClick={() => router.push(`/trading/${row.id}`)}
                        className="row"
                        key={row.name}
                      >
                      
                        <TableCell
                          component="th"
                          scope="row"
                          className="flex gap-[15px]"
                        >
                          <div className="flex flex-col">
                            <Link href={`/trading/${row.id}`}>
                              <img
                                src={row?.image}
                                alt={row.name}
                                className="w-[3rem] mb-[10px]"
                              />
                            </Link>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                          </div>
                          <div
                            className="flex items-center"
                            // style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgba(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}{" "}
                          M
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-center items-center">
                            <button
                              className="px-[1rem] py-[0.5rem] bg-white hover:bg-[#EEBC1D] border-solid border-2 hover:text-white transition-all duration-75 cursor-pointer "
                              onClick={() => router.push(`/transfer/${row.id}`)}
                            >
                              Withdraw
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default CoinsTable;
