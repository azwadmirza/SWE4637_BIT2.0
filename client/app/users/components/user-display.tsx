"use client";
import { useEffect, useState } from "react";

interface IUserDisplay{
    open:boolean;
    username:string;
    active:boolean;
    rating:number;
    rank:string;
}

const UserDisplay = ({open,username,active,rating,rank}:IUserDisplay) => {
    const [titleColor,setTitleColor]=useState("text-gray-200");
    useEffect(()=>{
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
      className={`origin-left font-medium text-xl duration-200 ${
        !open && "scale-0"
      } ${titleColor}`}
    >
      {username}
      {active && (<div className="bg-green-800 border-2 border-green-950 rounded-xl flex xl:w-1/4 w-1/2">
        <div className="py-1 px-2">
        <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
        </div>
        <span className="text-sm text-white">Available</span>
      </div>)}
    </h1>
    </div>
  );
};

export default UserDisplay;
