"use client";
import axios from "axios";
import React,{useState} from "react";
import {useRouter} from "next/navigation";
import toast,{Toaster} from "react-hot-toast";
import Link from "next/link";
// import { connect } from "mongoose";


// connect();
const page = () => {
  const router=useRouter();
  const [user,setUser]=useState({
    email:"",
    password:""
  });

  const onSignIn=async()=>{
    
    console.log("jk");
    try {
      console.log(user);
      
      const response=await axios.post("/api/users/signin",user);
      

      toast.success(response.data.message);
      console.log("Signed in Succesfully");
      router.push("/trading");
    } catch (error) {
      console.log("Signin failed",error.message);
      toast.error(error.message);
    }
   
  };
  return (
    <>
      <div className="flex flex-col w-[20rem] mt-[10vh] container gap-[1.5rem]">
        <Toaster position="top-center"/>
        <div>
          <h1 className="merriweather-font font-bold text-[2rem]">Login</h1>
        </div>

        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Email Id</h2>
          <input
            type="text"
            className="border-2 border-zinc-300  px-[1rem] py-[0.6rem]  "
            name={user.email}
            id="email"
            onChange={(e)=>setUser({...user,email:e.target.value})}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Password</h2>
          <input
            type="password"
            className="border-2 border-zinc-300   px-[1rem] py-[0.6rem] "
            name={user.password}
            id="password"
            onChange={(e)=>setUser({...user,password:e.target.value})}
          />
        </div>

        <div>
          <p className="text-gray-500">
            Don&apos;t have any account!{" "}
          </p>
          <Link href="/signup"><span className="text-orange-500">Sign Up</span></Link>
        </div>
        <div>
          <button 
            className="px-12 py-4 text-base  firstSectionBtn  bg-primary-orange w-[100%] text-white rounded-[0.5rem]"
            onClick={onSignIn}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
