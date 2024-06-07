import Image from "next/image";
import UserDisplay from "./components/user-display";
import StudyConsistency from "./components/study-consistency";
import SavedNotes from "./components/saved-notes";
import UploadNotes from "./components/upload-notes";

const UsersPage = () => {
    return (
        <main className="min-h-screen min-w-screen p-12 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
                <Image src="/images/robot1.png" alt="logo" width={400} height={400} className="rounded-full border border-yellow-400" />
            </div>
            <div className="w-full flex flex-col md:flex-row mt-6">
                <div className="md:w-1/2 w-full">
                    <UserDisplay username="Mirza Md Azwad" open={true} active={true} rating={1200} rank="gold" />
                </div>
                <div className="md:w-1/2 w-full">
                    <StudyConsistency />
                </div>
            </div>
            <div className="w-full">
                <SavedNotes/>
            </div>
            <div className="w-full">
                <UploadNotes/>
            </div>
        </main>
    );
}

export default UsersPage;
