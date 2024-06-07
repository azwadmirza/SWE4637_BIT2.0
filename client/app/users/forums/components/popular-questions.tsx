"use client";
import { IonIcon } from "@ionic/react";
import { addSharp, arrowDownSharp, arrowUp, arrowUpSharp, chatboxEllipsesSharp } from "ionicons/icons";
import { Card } from "react-bootstrap";
import { useState } from "react";
import Comments from "../../groups/[id]/components/comments";
import usePagination from "@/app/hooks/usePagination";
import Pagination from "../../components/pagination";

const FAQ = () => {
    const sampleFAQWithUsernameAndDatetime=[
        {
            id:1,
            question:"question 1",
            answer:"answer 1",
            username:"user1",
            datetime:"2021-10-01T00:00:00"
        },
        {
            id:2,
            question:"question 2",
            answer:"answer 2",
            username:"user2",
            datetime:"2021-10-02T00:00:00"
        },
        {
            id:3,
            question:"question 3",
            answer:"answer 3",
            username:"user3",
            datetime:"2021-10-03T00:00:00"
        },
    ]
    
    const [showComments, setShowComments] = useState(Array(sampleFAQWithUsernameAndDatetime.length).fill(false));

    const samplecommentsWithUsernameAndDatetime=[
        {
            id:1,
            title:"title 1",
            content:"content 1",
            username:"user1",
            datetime:"2021-10-01T00:00:00"
        },
        {
            id:2,
            title:"title 2",
            content:"content 2",
            username:"user2",
            datetime:"2021-10-02T00:00:00"
        },
        {
            id:3,
            title:"title 3",
            content:"content 3",
            username:"user3",
            datetime:"2021-10-03T00:00:00"
        },
    ]

    const toggleComments = (index:number) => {
        if(showComments[index]){
            setShowComments(Array(sampleFAQWithUsernameAndDatetime.length).fill(false));
            return;
        }
        const newShowComments = Array(sampleFAQWithUsernameAndDatetime.length).fill(false);
        newShowComments[index] = !newShowComments[index];
        setShowComments(newShowComments);
    }

    const {currentPage,getCurrentItems,totalPages,handlePageChange}=usePagination(4,sampleFAQWithUsernameAndDatetime);
    const items= getCurrentItems();

    return ( 
            <div className="w-full m-4">
            <h1 className="text-3xl">FAQ</h1>
            <div className={`w-full flex justify-end`}>
            </div>
            <Card className="w-full z-0">
                <Card.Body>
                    {items.map((post,index)=>(
                        <Card key={post.id} className="mb-2 rounded-xl shadow-lg p-2 bg-white m-4">
                            <Card.Header className="w-full bg-yellow-400 text-bitBrown p-2">
                                <div className="w-full">
                                 <h1 className="font-bold text-2xl">
                                    {post.question}
                                 </h1>
                                 <h2 className="font-semibold text-xl">
                                    {post.username}
                                 </h2>
                                 <p className="text-gray-400 text-lg">{new Date(post.datetime).toLocaleDateString()}</p>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-8 text-bitBrown">
                                {post.answer}
                            </Card.Body>
                            <Card.Footer className="w-full">
                                <div className="flex bg-yellow-400 text-bitBrown p-2">
                                <button className="flex bg-bitBrown text-white p-2 m-4 rounded-lg text-green-600 selected:text-green-400 hover:text-green-400">
                                    <p>20</p>
                                    <IonIcon icon={arrowUpSharp}/>
                                </button>
                                <button className="flex bg-bitBrown text-white p-2 m-4 rounded-lg text-red-600 selected:text-red-400 hover:text-red-400">
                                    <p>10</p>
                                    <IonIcon icon={arrowDownSharp}/>
                                </button>
                                <button className="flex bg-bitBrown text-white p-2 m-4 rounded-lg ms-2" onClick={()=>toggleComments(index)}>
                                    <p>10</p>
                                    <IonIcon icon={chatboxEllipsesSharp} className="text-white"/>
                                </button>
                                </div>
                                {showComments[index] && (<Comments disable={false} comments={samplecommentsWithUsernameAndDatetime}/>)}
                            </Card.Footer>
                        </Card>
                    ))}
                </Card.Body>
            </Card>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
            </div>
     );
}
 
export default FAQ;