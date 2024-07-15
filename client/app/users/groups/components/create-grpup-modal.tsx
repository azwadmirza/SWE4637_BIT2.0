"use client";

import { createGroup } from "@/app/lib/requests";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "react-bootstrap";

interface IModalProps{
  show:boolean;
  setShow:React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupModal = ({show,setShow}:IModalProps) => {
    const [groupName,setGroupName]=useState("");
   const router=useRouter();

    const handleSubmit=async()=>{
        const id=localStorage.getItem("id");
        const res=await createGroup({
            name:groupName,
            creator:id
        });
        const data=await res.json();
        console.log("created",data);
        if(data.hasOwnProperty("name")){
            router.push("/users/groups/"+data._id);
        }
        setShow(false);

    }
  return (
    <Modal show={show} className="fixed md:top-48 top-24 left-4 md:left-12 lg:left-96 bg-white text-bitBrown lg:w-1/2 w-11/12 rounded-xl" onHide={()=>setShow(false)}>
      <Modal.Header className="bg-yellow-400 text-bitBrown text-xl p-4 rounded-xl">
        Create Group
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="w-full flex justify-content-center border-none p-8">
          <input type="text" placeholder="Group Name" value={groupName} onChange={(e)=>setGroupName(e.target.value)} className="w-full px-4 border border-bitBrown rounded-xl bg-white text-bitBrown"/>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-yellow-400 text-bitBrown flex justify-end rounded-xl">
        <button className="text-yellow-400 bg-bitBrown hover:bg-yellow-600 hover:text-bitBrown p-2 m-4 rounded-lg " onClick={()=>handleSubmit()}>
          Create
        </button>
        <button className="text-yellow-400 bg-bitBrown hover:bg-yellow-600 hover:text-bitBrown p-2 m-4 rounded-lg " onClick={()=>setShow(false)}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;
