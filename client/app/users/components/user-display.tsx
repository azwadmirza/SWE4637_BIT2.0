"use client";
import { getUser } from "@/app/lib/requests";
import { useEffect, useState } from "react";

interface IUserDisplay{

}

const UserDisplay = ({}:IUserDisplay) => {
    const [titleColor,setTitleColor]=useState("text-gray-200");
    const [username,setUsername]=useState("User");
    const [rank,setRank]=useState("bronze");
    
    const rating=1000;
    const fetchUser=async()=>{
        const response=await getUser();
        const data=await response.json();
        console.log(data);
        setUsername(data.user.username);
    }
    useEffect(()=>{
        fetchUser();
        switch(rank){
            case "bronze":
                setTitleColor("text-bronze-500");
                break;
            case "silver":
                setTitleColor("text-zinc-400");
                break;
            case "gold":
                setTitleColor("text-yellow-500");
                break;
            case "platinum":
                setTitleColor("text-gray-200");
                break;
            case "diamond":
                setTitleColor("text-blue-200");
                break;
            default:
                setTitleColor("text-white");
                break;
        }
    },[rank])
  return (
    <div className="w-full p-8">
      <div className={`text-sm ${titleColor}`}>
                {rating}
      </div>
      <h1
      className={`origin-left font-medium text-xl duration-200 ${titleColor}`}
    >
      {username}
    </h1>
    </div>
  );
};

export default UserDisplay;
