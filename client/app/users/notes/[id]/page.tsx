import Image from "next/image";

const NotesPage = () => {
    return (
        <main className="min-h-screen min-w-screen overflow-hidden">
            <div className="w-full flex items-center justify-center">
                <div className="relative" style={{ width: '80vw', height: '25vh' }}>
                    <Image
                        src="/images/monstrosity.png"
                        alt="logo"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg border border-yellow-400"
                    />
                </div>

            </div>
            <div className="p-8 m-8">
                <h1 className="text-4xl font-bold text-yellow-400">Title</h1>
                <h2 className="text-2xl font-bold text-gray-400">Author</h2>
                <p className="text-lg text-white">Your notes will be displayed here</p>
            </div>
        </main>
    );
}

export default NotesPage;
