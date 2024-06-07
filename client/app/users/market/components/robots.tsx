"use client";
import { useState } from "react";
import PurchaseModal from "./purchase-modal";
import RobotCardCarousel from "./robot-cards";

const Robots = () => {
    const [show,setShow]=useState(false);
    const robotData=[
        {
            id:"1",
            title:"Robot 1",
            price:100,
            image:"/images/robot1.png"
        },
        {
            id:"2",
            title:"Robot 2",
            price:200,
            image:"/images/robot2.png"
        },
        {
            id:"3",
            title:"Robot 3",
            price:300,
            image:"/images/robot3.png"
        },
        {
            id:"4",
            title:"Robot 4",
            price:400,
            image:"/images/robot4.png"
        },
        {
            id:"5",
            title:"Robot 5",
            price:500,
            image:"/images/robot5.png"
        },
        {
            id:"6",
            title:"Robot 6",
            price:600,
            image:"/images/robot6.png"
        },
        {
            id:"7",
            title:"Robot 7",
            price:700,
            image:"/images/robot7.png"
        },
        {
            id:"8",
            title:"Robot 8",
            price:800,
            image:"/images/robot8.png"
        },
        {
            id:"9",
            title:"Robot 9",
            price:900,
            image:"/images/robot9.png"
        },
        {
            id:"10",
            title:"Robot 10",
            price:1000,
            image:"/images/robot10.png"
        },
    ]

    return ( 
        <div className={`w-full ${show?"blur":""}`}>
            <div className="w-full flex justify-start text-white font-bold ms-6">
                <h1 className="text-4xl font-bold">Purchase Your Avatar</h1>
            </div>
            <PurchaseModal show={show} setShow={setShow} />
            <RobotCardCarousel data={robotData} items_count={robotData.length} setShow={setShow}/>
        </div>
     );
}
 
export default Robots;