"use client";
import React from "react";
import "../styles/nav.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Nav = () => {
  const router=useRouter();
  return (
    <div >
      <div className="flex flex-wrap justify-between py-4  px-12  nav ">
        <div className="inline-block brand">
          <Link href="/trading">
            <h1>STC</h1>
          </Link>
        </div>
        <div className=" flex gap-12 justify-between items-center">
          <h3 className="navlink" onClick={()=>router.push("/trading")}>Market</h3>
          <h3 className="navlink" onClick={()=>router.push("/transferFunds")}>Transfer Funds</h3>
          <h3 className="navlink" onClick={()=>router.push("/dashboard")}>Portfolio</h3>
          {/* <Link href="/signin">
            <button className="px-6 py-2  signInBtn   rounded-3xl   ">
              Login
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
