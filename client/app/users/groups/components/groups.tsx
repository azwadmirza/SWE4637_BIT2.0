"use client";
import { IonIcon } from "@ionic/react";
import GroupCardCarousel from "./group-cards";
import { addCircleOutline, peopleCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getGroups } from "@/app/lib/requests";
import Loading from "@/app/loading";
import CreateGroupModal from "./create-grpup-modal";

const Groups = () => {
    const [loading,setLoading]=useState(false);
    const [groups,setGroups]=useState([]);
    const [show,setShow]=useState(false);

    const fetchGroups=async()=>{
        setLoading(true);
        const res=await getGroups();
        const data=await res.json();
        console.log(data);
        setGroups(data);
        setLoading(false);
    }


    useEffect(()=>{
        fetchGroups();
    },[]);

    if(loading){
        return (
            <div className="w-full flex justify-center items-center">
                <Loading/>
            </div>
        );
    }
      
    return (
        <div className={`w-full ${show?"blur":""}`}>
            <CreateGroupModal show={show} setShow={setShow}/>
            <div className="w-full flex justify-end p-4">
                <button className="bg-bitBrown text-white p-2 m-2 rounded-lg" onClick={()=>setShow(true)}><IonIcon icon={addCircleOutline}></IonIcon> Create Group</button>
            </div>
            <GroupCardCarousel data={groups} items_count={12}/>
        </div>
      );
}
 
export default Groups;