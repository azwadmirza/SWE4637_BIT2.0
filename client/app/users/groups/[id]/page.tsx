import Image from "next/image";
import dynamic from "next/dynamic";
import Posts from "./components/posts";

export default function GroupPage() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-between p-12 overflow-hidden">
        <div className="mt-24 full flex items-center justify-center">
                <div className="relative" style={{ width: '100vw', height: '25vh' }}>
                    <Image
                        src="/images/bgimg.jpg"
                        alt="logo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-xl z-0"
                    />
                </div>
            </div>
      <Posts/>
    </main>
  );
}