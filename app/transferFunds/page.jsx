"use client";
import axios from "axios";
import React,{useState,useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const [balance, setBalance] = useState("");
  const [cryptoNumber,setCryptoNumber]=useState(0);
  const [address,setAddress]=useState("");
  const FetchData = async () => {
    const res = await axios.get("/api/users/dashboard");
    setBalance(res.data.data.balance);
    
  };
  useEffect(() => {
    FetchData();
  
    
  }, [])

  const sendCrypto=async()=>{
    try {
        console.log("frontend");
        if(cryptoNumber<=0){

            toast.error("Transfer amount should be grater than 0 $");
            return null;

        }
        const data={
            amount:cryptoNumber,
            address:address
        }
        const res=await axios.post("/api/users/transfer",data);
        const response = await axios.get("/api/users/dashboard");
        setBalance(response.data.data.balance);
        toast.success(`${cryptoNumber} $ has been transfered to ${address}`)

    } catch (error) {
        toast.error("Failed to transfer funds, try again later");
        console.log(error);
    }
  }
  
  const FetchBalance=()=>{
    
    return(
      
      <>
        <p>Avbl: {`${balance} $`}</p>
      </>
    )
  }
  return (
    <div className="flex flex-col w-[20rem] mt-[10vh] container gap-[1.5rem]">
      <Toaster position="top-center" />
      <div>
        <h1 className="merriweather-font font-bold text-[2rem]">
          Transfer Funds
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
          onChange={(e)=>setAddress(e.target.value)}
        />
      </div>
      <div className="flex gap-[1rem]">
        <div className="flex items-center">
          <h2 className="merriweather-font font-bold text-[1rem]">
            Amount (usd)
          </h2>
        </div>
        <input
          type="Number"
          name={cryptoNumber}
          className="border-2 border-zinc-300  px-[0.5rem] py-[0.6rem]  "
          id="amount"
          onChange={(e)=>setCryptoNumber(e.target.value)}
        />
      </div>

      <div>
        <button className="px-12 py-4 text-base  firstSectionBtn  bg-primary-orange w-[100%] text-white rounded-[0.5rem]"
            onClick={sendCrypto}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default page;
