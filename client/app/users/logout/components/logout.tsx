"use client";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

const Logout = () => {
    localStorage.clear();
    const router=useRouter();
    router.push("/");
    return ( 
        <Loading/>
     );
}
 
export default Logout;