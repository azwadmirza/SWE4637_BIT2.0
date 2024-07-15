"use client";
import ReactQuill from "react-quill";
import { useQuill } from "../hooks/useQuill";
import "react-quill/dist/quill.snow.css"; 
import { Modal } from "react-bootstrap";
import { addPostToGroup } from "@/app/lib/requests";
import { useState } from "react";
import Loading from "@/app/loading";

interface IModalProps{
  id:string|string[];
  show:boolean;
  setShow:React.Dispatch<React.SetStateAction<boolean>>;
}

const MakePost = ({id,show,setShow}:IModalProps) => {
  const {
    content,
    setContent,
    contentModules,
  } = useQuill();

  const [loading,setLoading]=useState(false);
   
  const handleSubmit=async()=>{
    setLoading(true);
    await addPostToGroup(id,{
      user:localStorage.getItem("id"),
      content:content
    }).then((res)=>res.json()).then((data)=>{console.log(data);
      window.location.reload();
    });
    setShow(false);
    setLoading(false);
    
  }

  if(loading){
    return (
      <Loading/>
    )
  }

  return (
    <Modal show={show} className="fixed md:top-48 top-24 left-4 md:left-12 lg:left-96 bg-white text-bitBrown lg:w-1/2 w-11/12 rounded-xl" onHide={()=>setShow(false)}>
      <Modal.Header className="bg-yellow-400 text-bitBrown text-xl p-4 rounded-xl">
        Add a Post
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="w-full flex justify-content-center border-none h-[320px]">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(content, delta, source, editor) => {
              setContent(editor.getHTML());
            }}
            modules={contentModules}
            placeholder="Write a post..."
            className="rounded-xl bg-white text-black h-[200px]"
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-yellow-400 text-bitBrown flex justify-end rounded-xl">
        <button className="text-yellow-400 bg-bitBrown hover:bg-yellow-600 hover:text-bitBrown p-2 m-4 rounded-lg " onClick={()=>handleSubmit()}>
          Post
        </button>
        <button className="text-yellow-400 bg-bitBrown hover:bg-yellow-600 hover:text-bitBrown p-2 m-4 rounded-lg " onClick={()=>setShow(false)}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default MakePost;
