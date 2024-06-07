"use client";
import Loading from "@/app/loading";
import Image from "next/image";
import { useState } from "react";
import ProfilePictureModal from "./profile_picture";

const SettingsForm = () => {
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("Username");
    const [email, setEmail] = useState("Email");
    const [newPassword, setNewPassword] = useState("New Password");
    const [password, setPassword] = useState("Password");
    const [confirmPassword, setConfirmPassword] = useState("Confirm Password");
    const [show, setShow] = useState(false);

    if (loading) {
        return Loading();
    }

    return (
        <div className="w-full">
            {!disable && (<ProfilePictureModal show={show} setShow={setShow}/>)}
            <div className="w-full flex justify-end">
                <button className={!disable?"bg-yellow-400 hover:bg-yellow-600 text-bitBrown font-bold py-2 px-4 rounded":"border border-white text-white rounded py-2 px-4"} onClick={() => setDisable(!disable)}>{disable ? "Edit" : "Cancel"}</button>
            </div>
            <form className="w-full flex flex-col items-center">
                <div className="w-full h-full flex items-center justify-center">
                    <Image src="/images/robot1.png" alt="logo" width={400} height={400} className="rounded-full border border-yellow-400 hover:cursor-pointer" onClick={()=>{
                        if(!disable){
                            setShow(true);
                        }
                    }}/>
                </div>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col items-center">
                        <input type="text" className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={username} disabled={disable} />
                        <input type="email" className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={email} disabled={disable} />
                        <input type="password" className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={password} disabled={disable} />
                        <input type="password" className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={newPassword} disabled={disable} />
                        <input type="password" className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={confirmPassword} disabled={disable} />
                        {!disable && (<button type="submit" className="bg-yellow-400 hover:bg-yellow-600 text-bitBrown font-bold py-2 px-4 rounded" disabled={disable}>Save</button>)}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SettingsForm;
