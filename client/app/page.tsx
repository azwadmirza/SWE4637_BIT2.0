import Footer from "./components/footer";
import NavBar from "./components/navbar";

export default function Home() {
  return (
    <>
    <NavBar/>
    <main className="bg-my_bg_image bg-cover background-media flex min-h-screen min-w-screen flex-col items-center justify-between p-12 overflow-hidden">
      <div className="w-full flex justify-end">
        <div className="block w-full md:w-1/4 backdrop-blur-md md:backdrop-blur-none px-4 py-4 mt-12 md:mt-48 text-right rounded-lg">
          <h1 className="text-white text-4xl font-bold">
            Reach your goals;
          </h1>
          <br />
          <div>
            <span className="font-fredoka text-yellow-500 text-4xl">Bit.</span>
            <span className="font-fredoka text-white text-4xl"> by </span>
            <span className="font-fredoka text-yellow-500 text-4xl">Bit.</span>
          </div>
          <br />
          <div className="flex justify-center md:justify-start lg:justify-start font-bold text-base text-white">
            A platform by the students, of the students, and for the students to learn in a fun and effective way
          </div>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}