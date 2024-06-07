"use client";
import "react-quill/dist/quill.snow.css"; 
import { Modal } from "react-bootstrap";

interface IModalProps{
  show:boolean;
  setShow:React.Dispatch<React.SetStateAction<boolean>>;
}

const PurchaseModal = ({show,setShow}:IModalProps) => {
   

  return (
    <Modal show={show} className="fixed md:top-48 top-24 left-4 md:left-12 lg:left-96 bg-white text-bitBrown lg:w-1/2 w-11/12 rounded-xl" onHide={()=>setShow(false)}>
      <Modal.Header className="bg-yellow-400 text-bitBrown text-xl p-4 rounded-xl">
        Add a Post
      </Modal.Header>
      <Modal.Body className="p-4 font-bold text-2xl">
        Are you sure you want to purchase this avatar?
      </Modal.Body>
      <Modal.Footer className="bg-yellow-400 text-bitBrown flex justify-end rounded-xl">
        <button className="text-yellow-400 bg-bitBrown hover:bg-yellow-600 hover:text-bitBrown p-2 m-4 rounded-lg " onClick={()=>setShow(false)}>
          Confirm
        </button>
        <button className="text-yellow-400 bg-bitBrown hover:bg-yellow-600 hover:text-bitBrown p-2 m-4 rounded-lg " onClick={()=>setShow(false)}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
