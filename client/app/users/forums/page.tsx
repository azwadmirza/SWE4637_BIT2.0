import AskQuestion from "./components/ask-question";
import PopularQuestionsAndResponses from "./components/popular-questions";
import PreviouslyAsked from "./components/previously-asked-questions";

const ForumsPage = () => {
    return ( 
        <main className="flex min-h-screen min-w-screen flex-col items-center justify-between p-12">
            <div className="w-full flex justify-start text-white font-bold ms-6">
                <AskQuestion/>
            </div>
            <div className="w-full flex justify-start text-white font-bold ms-6">
                <PreviouslyAsked/>
            </div>
            <div className="w-full flex justify-start text-white font-bold ms-6">
                <PopularQuestionsAndResponses/>
            </div>
        </main>
     );
}
 
export default ForumsPage;