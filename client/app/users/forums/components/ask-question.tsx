"use client";
import { postQuery } from "@/app/lib/requests";
import Loading from "@/app/loading";
import { useState } from "react";
import { set } from "react-hook-form";

const AskQuestion = () => {
    const [question,setQuestion]=useState("");
    const [response,setResponse]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        setLoading(true);
        if(question===""){
            setError("Question cannot be empty");
            return;
        }
        const response=await postQuery(question);
        const data=await response.text();
        const jsonObjects = data.split('\n');
        jsonObjects.pop();
        const parsedObjects = jsonObjects.map(jsonString => JSON.parse(jsonString));
        let index=0;
        let result="";
        while(parsedObjects[index].done!==true){
            result+=parsedObjects[index].response+"\n";
            index++;
        }
        setResponse(result);
        setLoading(false);
        
    }


    return (  
        <div className="w-full">
            <div className="w-full flex justify-start text-white font-bold ms-6">
                <h1 className="text-4xl font-bold">Ask a Question</h1>
            </div>
            {!loading && (<div className="w-full flex justify-center mt-4">
                <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                    {error!=="" && (<div className="w-full bg-red-200 text-red-600 border border-red-600">{error}</div>)}
                    <textarea className="w-full p-2 border-2 text-bitBrown border-black rounded-lg mt-4" value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="Content"/>
                    <button className="w-full bg-yellow-400 hover:bg-yellow-600 text-bitBrown rounded-lg p-2 mt-4" onClick={()=>handleSubmit}>Submit</button>
                </form>
            </div>)}
            {loading && (<Loading/>)}
            {response!=="" && (<div className="w-full">
                <h1 className="text-xl">Response</h1>
                <div className="w-full flex justify-start bg-yellow-400 text-bitBrown rounded-xl p-8">
                    {response}
                </div>
            </div>)}
        </div>
    );
}
 
export default AskQuestion;