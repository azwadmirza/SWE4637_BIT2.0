"use client";
import { Modal } from "react-bootstrap";

interface IModalProps{
  show:boolean;
  setShow:React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePictureModal = ({show,setShow}:IModalProps) => {
   

  return (
    <Modal show={show} className="fixed md:top-48 top-24 left-4 md:left-12 lg:left-96 bg-white text-bitBrown lg:w-1/2 w-11/12 rounded-xl" onHide={()=>setShow(false)}>
      <Modal.Header className="bg-yellow-400 text-bitBrown text-xl p-4 rounded-xl">
        Change Profile Picture
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="w-10/12 m-4 flex justify-content-center items-center">
          <label htmlFor="file-input" className="text-bitBrown">Add an Image File</label>
          <input type="file" accept="image/*" id="file-input" name="file-input" placeholder="Add a Title" className="w-full px-4 border border-bitBrown rounded-xl bg-white text-bitBrown"/>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-yellow-400 text-bitBrown flex justify-end rounded-xl">
        <button className="text-yellow-400 bg-bitBrown hover:bg-yellow-600 hover:text-bitBrown p-2 m-4 rounded-lg " onClick={()=>setShow(false)}>
          Upload
        </button>
        <button className="text-yellow-400 bg-bitBrown hover:bg-yellow-600 hover:text-bitBrown p-2 m-4 rounded-lg " onClick={()=>setShow(false)}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfilePictureModal;
