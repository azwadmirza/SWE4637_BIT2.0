"use client";
import { IonIcon } from "@ionic/react";
import { addSharp, arrowDownSharp, arrowUpSharp, chatboxEllipsesSharp } from "ionicons/icons";
import { Card } from "react-bootstrap";
import Comments from "./comments";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { getGroupById } from "@/app/lib/requests";
import { useQuill } from "../hooks/useQuill";

const MakePost = dynamic(() => import("./post"), { ssr: false });

const Posts = () => {
    const {getStringFromHtml}=useQuill();
    const [posts, setPosts] = useState([]);
    const [groupName,setGroupName]=useState("");
    const {id} = useParams();

    useEffect(()=>{
        getGroupById(id).then(res=>res.json()).then(data=>{
            console.log(data);
            setPosts(data.posts);
            setGroupName(data.name);
        });
    },[]);

    const [showComments, setShowComments] = useState(Array(posts.length).fill(false));
    const [showPost, setShowPost] = useState(false);

    const toggleComments = (index: number) => {
        if (showComments[index]) {
            setShowComments(Array(posts.length).fill(false));
            return;
        }
        const newShowComments = Array(posts.length).fill(false);
        newShowComments[index] = !newShowComments[index];
        setShowComments(newShowComments);
    }

    return (
        <div className={`w-full ${showPost ? "blur" : ""}`}>
            <div className="w-full flex justify-start text-white font-bold ms-6">
                <h1 className="text-4xl font-bold">{groupName}</h1>
            </div>
            <div className={`w-full flex justify-end`}>
                <button className="bg-yellow-400 text-bitBrown hover:bg-yellow-600 p-2 m-4 rounded-lg " onClick={() => setShowPost(true)}>
                    <IonIcon icon={addSharp}></IonIcon> Create Post
                </button>
            </div>
            <div className="w-full flex items-center justify-content-center p-4 m-4">
                <MakePost id={id} show={showPost} setShow={setShowPost} />
            </div>
            <Card className="w-full z-0">
                <Card.Body>
                    {posts && posts.map((post:any, index) => (
                        <Card key={post._id} className="mb-2 rounded-xl shadow-lg p-2 bg-white m-4">
                            <Card.Header className="w-full bg-yellow-400 text-bitBrown p-2">
                                <div className="w-full">
                                    <h2 className="font-semibold text-xl">
                                        {post.user.username}
                                    </h2>
                                    <p className="text-gray-400 text-lg">{new Date(post.timestamp).toLocaleDateString()}</p>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-8 text-bitBrown">
                                <div className="w-full" dangerouslySetInnerHTML={{__html:post.content}}>
                                </div>
                            </Card.Body>
                            <Card.Footer className="w-full">
                                    <button className="flex bg-bitBrown text-white p-2 m-4 rounded-lg ms-2" onClick={() => toggleComments(index)}>
                                        <p>{post.comments.length}</p>
                                        <IonIcon icon={chatboxEllipsesSharp} className="text-white" />
                                    </button>
                                {posts.length>0 && showComments[index] && (<Comments id={id} postId={post._id} index={index} posts={posts} setPosts={setPosts} disable={false} comments={post.comments} />)}
                            </Card.Footer>
                        </Card>
                    ))}
                </Card.Body>
            </Card>
        </div>
    );
}

export default Posts;