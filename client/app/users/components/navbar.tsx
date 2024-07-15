"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { homeSharp, logOutSharp, menuOutline, newspaperOutline, peopleCircleSharp, settingsSharp, storefrontSharp, timerOutline } from "ionicons/icons";
import Image from "next/image";
import StudyTimer from "./study-timer";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userOptionsOpen, setUserOptionsOpen] = useState(false);
    const [openStudyTimer, setOpenStudyTimer] = useState(false);
    const currentPath = usePathname();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleUserOptions = () => {
        setUserOptionsOpen(!userOptionsOpen);
    }

    return (
        <>
            <nav className="w-full overflow-hidden z-50" onMouseLeave={() => {
                if (userOptionsOpen) {
                    setUserOptionsOpen(false);
                }
            }} onAuxClick={()=>
                {if(isDropdownOpen){
                setIsDropdownOpen(false);
            }}}>
                <div className="w-full flex flex-wrap items-center justify-center mx-auto p-4">
                    <div className="hidden md:flex items-center">
                        <Image src="/images/Bit.gif" alt="logo" width={50} height={50} className="rounded-full" />
                    </div>
                    <div className="hidden w-full md:block md:w-auto ml-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <Link href="/users/groups"><li className={`ms-4 me-4 ${currentPath === "/users/groups" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                                Groups
                            </li></Link>
                            <Link href="/users/forums"><li className={`ms-4 me-4 ${currentPath === "/users/forums" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                                Forums
                            </li></Link>
                            <li className={`ms-4 me-4 rounded-lg py-2 px-6 mt-6 hover:bg-yellow-400 hover:text-black hover:border-black hover:rounded-full hover:cursor-pointer`} onClick={() => setOpenStudyTimer(true)}>
                                <IonIcon icon={timerOutline} className="text-2xl text-white" />
                            </li>
                            <li className={`ms-4 me-4 rounded-lg px-4 py-2 mt-4 hover:bg-yellow-400 hover:text-black hover:border-black hover:rounded-full`} onClick={toggleUserOptions}>
                                <Image src="/images/robot1.png" alt="logo" width={50} height={50} className="rounded-full border border-yellow-400" />
                            </li>
                        </ul>
                    </div>


                    <div className="md:hidden z-50 w-full flex items-center justify-between" id="navbar-dropdown">
                        <div className="cursor-pointer" onClick={toggleDropdown}>
                            <IonIcon icon={menuOutline} className="text-4xl text-white" />
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                            <Image src="/images/Bit.gif" alt="logo" width={50} height={50} className="rounded-full" />
                        </div>
                    </div>
                    {isDropdownOpen && (
                        <ul className="fixed top-14 bg-bitBrown w-full font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">   
                            <Link href="/users/groups"><li className={`ms-4 me-4 ${currentPath === "/users/groups" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                                <IonIcon icon={peopleCircleSharp}></IonIcon> Groups
                            </li></Link>
                            <Link href="/users/forums"><li className={`ms-4 me-4 ${currentPath === "/users/forums" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                                <IonIcon icon={newspaperOutline}></IonIcon> Forums
                            </li></Link>
                            <li className={`ms-4 me-4 rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black hover:cursor-pointer`} onClick={() => setOpenStudyTimer(true)}>
                                <IonIcon icon={timerOutline} /> Study Timer
                            </li>
                            <Link href="/users/settings"><li className={`ms-4 me-4 ${currentPath === "/users/settings" ? "bg-yellow-400 border border-bitBrown text-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                                <IonIcon icon={settingsSharp}></IonIcon> Settings
                            </li></Link>
                            <Link href="/uers/logout"><li className={`ms-4 me-4 ${currentPath === "/users/logout" ? "border border-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 hover:bg-white hover:text-black hover:border-black`}>
                                <IonIcon icon={logOutSharp}></IonIcon> LogOut
                            </li></Link>
                        </ul>
                    )}
                </div>
                <div className="w-full fixed top-24 right-0 flex justify-end p-4">
                    {userOptionsOpen && (
                        <ul className="z-10 bg-yellow-400 w-1/5 rounded-lg py-4">
                            <Link href="/users/settings">
                                <li className={`ms-4 me-4 ${currentPath === "/users/settings" ? "border border-bitBrown" : ""} text-bitBrown rounded-lg px-4 py-2 mt-4 hover:bg-bitBrown hover:text-yellow-400`}>
                                    <IonIcon icon={settingsSharp}></IonIcon> Settings
                                </li>
                            </Link>
                            <Link href="/users/logout">
                                <li className={`ms-4 me-4 ${currentPath === "/users/logout" ? "border border-bitBrown" : ""} rounded-lg px-4 py-2 mt-4 text-bitBrown hover:bg-bitBrown hover:text-black hover:text-yellow-400`}>
                                    <IonIcon icon={logOutSharp}></IonIcon> LogOut
                                </li>
                            </Link>
                        </ul>
                    )}
                </div>

            </nav>
            <StudyTimer show={openStudyTimer} setShow={setOpenStudyTimer} />
        </>
    );
}

export default NavBar;