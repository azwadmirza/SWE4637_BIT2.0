"use client";
import { IonIcon } from "@ionic/react";
import { addSharp, arrowDownSharp, arrowUp, arrowUpSharp, chatboxEllipsesSharp } from "ionicons/icons";
import { Card } from "react-bootstrap";
import Comments from "./comments";
import { useState } from "react";

import dynamic from "next/dynamic";

const MakePost = dynamic(() => import("./post"), { ssr: false });

const Posts = () => {
    const samplePostsWithUsernameAndDatetime=[
        {
            id:1,
            title:"Title 1",
            content:"Content 1",
            username:"user1",
            datetime:"2021-10-01T00:00:00"
        },
        {
            id:2,
            title:"Title 2",
            content:"Content 2",
            username:"user2",
            datetime:"2021-10-02T00:00:00"
        },
        {
            id:3,
            title:"Title 3",
            content:"Content 3",
            username:"user3",
            datetime:"2021-10-03T00:00:00"
        },
    ]
    
    const [showComments, setShowComments] = useState(Array(samplePostsWithUsernameAndDatetime.length).fill(false));
    const [showPost, setShowPost] = useState(false);

    const samplecommentsWithUsernameAndDatetime=[
        {
            id:1,
            title:"Title 1",
            content:"Content 1",
            username:"user1",
            datetime:"2021-10-01T00:00:00"
        },
        {
            id:2,
            title:"Title 2",
            content:"Content 2",
            username:"user2",
            datetime:"2021-10-02T00:00:00"
        },
        {
            id:3,
            title:"Title 3",
            content:"Content 3",
            username:"user3",
            datetime:"2021-10-03T00:00:00"
        },
    ]

    const toggleComments = (index:number) => {
        if(showComments[index]){
            setShowComments(Array(samplePostsWithUsernameAndDatetime.length).fill(false));
            return;
        }
        const newShowComments = Array(samplePostsWithUsernameAndDatetime.length).fill(false);
        newShowComments[index] = !newShowComments[index];
        setShowComments(newShowComments);
    }

    return ( 
            <div className={`w-full ${showPost?"blur":""}`}>
            <div className={`w-full flex justify-end`}>
            <button className="bg-yellow-400 text-bitBrown hover:bg-yellow-600 p-2 m-4 rounded-lg " onClick={()=>setShowPost(true)}>
                <IonIcon icon={addSharp}></IonIcon> Create Post
            </button>
            </div>
            <div className="w-full flex items-center justify-content-center p-4 m-4">
                <MakePost show={showPost} setShow={setShowPost}/>
            </div>
            <Card className="w-full z-0">
                <Card.Body>
                    {samplePostsWithUsernameAndDatetime.map((post,index)=>(
                        <Card key={post.id} className="mb-2 rounded-xl shadow-lg p-2 bg-white m-4">
                            <Card.Header className="w-full bg-yellow-400 text-bitBrown p-2">
                                <div className="w-full">
                                 <h1 className="font-bold text-2xl">
                                    {post.title}
                                 </h1>
                                 <h2 className="font-semibold text-xl">
                                    {post.username}
                                 </h2>
                                 <p className="text-gray-400 text-lg">{new Date(post.datetime).toLocaleDateString()}</p>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-8 text-bitBrown">
                                {post.content}
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
            </div>
     );
}
 
export default Posts;