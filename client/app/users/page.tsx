import Image from "next/image";
import UserDisplay from "./components/user-display";
import StudyConsistency from "./components/study-consistency";


const UsersPage = async() => {

    return (
        <main className="min-h-screen min-w-screen p-12 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
                <Image src="/images/robot1.png" alt="logo" width={400} height={400} className="rounded-full border border-yellow-400" />
            </div>
            <div className="w-full flex justify-content-center items-center">
                <UserDisplay />
            </div>
        </main>
    );
}

export default UsersPage;
