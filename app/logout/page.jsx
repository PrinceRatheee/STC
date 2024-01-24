"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



const page = () => {
    const router=useRouter();
    const logout=async()=>{
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout Succesfull');
            router.push("/");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
  return (
    <div className=" flex flex-col items-center justify-center min-h-screenpy-2">
        <button 
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            onClick={logout}
        >Logout</button>
    </div>
  )
}

export default page