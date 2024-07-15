"use client";
import Loading from "@/app/loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProfilePictureModal from "./profile_picture";
import { updateProfile } from "@/app/lib/requests";

const SettingsForm = () => {
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error,setError]=useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    if (loading) {
        return Loading();
    }

    useEffect(()=>{
        setUsername(`${localStorage.getItem("username")}}`);
        setEmail(`${localStorage.getItem("email")}`)
    },[])

    

    const handleSubmit = async (e: any) => {
        setError("");
        e.preventDefault();
        setLoading(true);
        if(password!==confirmPassword){
            setError("New Password and Confirm Password must match");
            setLoading(false);
            return;
        }
        if(password!=="" && newPassword!=="" && confirmPassword!==""){
            await updateProfile({
                userId: localStorage.getItem("id"),
                username: username?username:localStorage.getItem("username"),
                email: email?email:localStorage.getItem("email"),
                password: password,
                newPassword: newPassword,
            }).then((res)=>{
                if(res.status===200){
                    res.json().then((data)=>{
                        setUsername(data.username);
                        setEmail(data.email);
                        setPassword("");
                        setConfirmPassword("");
                        setNewPassword("");
                    }).catch((err)=>{
                        setError(err);
                    })
                    setLoading(false);
                }
                else{
                    setError("An unexpected error occured");
                    setLoading(false);
                }
            })
        }
        else{
            await updateProfile({
                userId: localStorage.getItem("id"),
                username: username?username:localStorage.getItem("username"),
                email: email?email:localStorage.getItem("email"),
            }).then((res)=>{
                if(res.status===200){
                    res.json().then((data)=>{
                        setUsername(data.username);
                        setEmail(data.email);
                        setPassword("");
                        setConfirmPassword("");
                        setNewPassword("");
                    }).catch((err)=>{
                        setError(err);
                    })
                    setLoading(false);
                }
                else{
                    setError("An unexpected error occured");
                    setLoading(false);
                }
            })
        }

        
    }

    return (
        <div className="w-full text-bitBrown">
            {!disable && (<ProfilePictureModal show={show} setShow={setShow}/>)}
            <div className="w-full flex justify-end">
                <button className={!disable?"bg-yellow-400 hover:bg-yellow-600 text-bitBrown font-bold py-2 px-4 rounded":"border border-white text-white rounded py-2 px-4"} onClick={() => setDisable(!disable)}>{disable ? "Edit" : "Cancel"}</button>
            </div>
            <form className="w-full flex flex-col items-center">
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col items-center">
                        <input type="text" value={username?username:""} onChange={(e)=>setUsername(e.target.value)} className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={username?username:"Username"} disabled={disable} />
                        <input type="email" value={email?email:""} onChange={(e)=>setEmail(e.target.value)} className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={email?email:"Email"} disabled={disable} />
                        <input type="password" value={password?password:""} onChange={(e)=>setPassword(e.target.value)} className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={password} disabled={disable} />
                        <input type="password" value={newPassword?newPassword:""} onChange={(e)=>setNewPassword(e.target.value)} className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={newPassword} disabled={disable} />
                        <input type="password" value={confirmPassword?confirmPassword:""} onChange={(e)=>setConfirmPassword(e.target.value)} className="p-2 m-4 md:w-3/5 w-full rounded-xl" placeholder={confirmPassword} disabled={disable} />
                        {!disable && (<button type="submit" className="bg-yellow-400 hover:bg-yellow-600 text-bitBrown font-bold py-2 px-4 rounded" disabled={disable}>Save</button>)}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SettingsForm;
