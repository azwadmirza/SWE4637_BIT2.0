"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { closeOutline, menuOutline } from "ionicons/icons";
import Image from "next/image";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currentPath = usePathname();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="w-full overflow-hidden" onMouseLeave={()=>setIsDropdownOpen(false)}>
            <div className="w-full flex flex-wrap items-center justify-center mx-auto p-4">
                <div className="hidden md:flex items-center">
        <Image src="/images/Bit.gif" alt="logo" width={50} height={50} className="rounded-full" />
    </div>
    <div className="hidden w-full md:block md:w-auto ml-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <Link href="/"><li className={`ms-4 me-4 ${currentPath === "/" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>Home</li></Link>
            <Link href="/login"><li className={`ms-4 me-4 ${currentPath === "/login" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                Login
            </li></Link>
            <Link href="/register"><li className={`ms-4 me-4 ${currentPath === "/register" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                Register
            </li></Link>
        </ul>
    </div>

    <div className="md:hidden w-full flex items-center justify-between" id="navbar-dropdown">
            <div className="cursor-pointer" onClick={toggleDropdown}>
                <IonIcon icon={menuOutline} className="text-4xl text-white" />
            </div>
            <div className="flex-grow flex items-center justify-center">
                <Image src="/images/Bit.gif" alt="logo" width={50} height={50} className="rounded-full" />
            </div>
        </div>
        {isDropdownOpen && (
            <ul className="w-full font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                <Link href="/"><li className={`ms-4 me-4 ${currentPath === "/" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>Home</li></Link>
                <Link href="/login"><li className={`ms-4 me-4 ${currentPath === "/login" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                    Login
                </li></Link>
                <Link href="/register"><li className={`ms-4 me-4 ${currentPath === "/register" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                    Register
                </li></Link>
            </ul>
        )}
            </div>
        </nav>
    );
}

export default NavBar;