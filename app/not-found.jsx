"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function NotFound() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col gap-[1rem] min-h-[90vh] items-center justify-center ">
      <h3 className="font-bold text-[4rem] mb-[-1rem]">404</h3>
      <p className="text-gray-500">You are lost. You are on the wrong page.</p>
      

      <button
        className="bg-red-500 hover:bg-red-600  py-[0.6rem] w-[10rem]   text-white rounded-xl cursor-pointer flex justify-center "
        onClick={() => {
          router.push("/");
        }}
      >
        Go Back To Home
      </button>
    </div>
  );
}
