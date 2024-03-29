"use client";

import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async ()=>{ 
    console.log("hello");
    // e.preventDefault();
    try {
      console.log(user);
      console.log("Frontend");
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      router.push("/signin");
    } catch (error) {
      console.log("Signup failed ", error.message);
      toast.error(error.message);
    }

   }

  return (
    <>
      <div className="flex flex-col w-[20rem] mt-[10vh] container gap-[1.5rem]">
        <div>
          <h1 className="merriweather-font font-bold text-[2rem]">
            Create Your Account
          </h1>
        </div>
        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Username</h2>
          <input
            type="text"
            className="border-2 border-zinc-300  px-[1rem] py-[0.6rem] "
            value={user.username}
            id="username"
            
            onChange={(e) => setUser({...user,username:e.target.value})}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Email Id</h2>
          <input
            type="text"
            className="border-2 border-zinc-300  px-[1rem] py-[0.6rem]  "
            value={user.email}
            id="email"
            
            onChange={(e) => setUser({...user,email:e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="merriweather-font font-bold text-[1rem]">Password</h2>
          <input
            type="password"
            className="border-2 border-zinc-300   px-[1rem] py-[0.6rem] "
            id="password"
            value={user.password}
            
            onChange={(e) => setUser({...user,password: e.target.value })}
          />
        </div>

        <div>
          <p className="text-gray-500">
            By creating an account, I agree to{" "}
            <span className="text-orange-400">
              {" "}
              STC&apos;s Terms & Services{" "}
            </span>{" "}
            and Privacy Policy.
          </p>
        </div>
        <div>
          <p className="text-gray-500">
            Already a User!{" "}
          </p>
          <Link href="/signin"><span className="text-orange-500">Sign In</span></Link>
        </div>
        <div>
          <button type="submit"
          className="px-12 py-4 text-base  firstSectionBtn  bg-primary-orange w-[100%] text-white rounded-[0.5rem]"
          onClick={onSignup}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
