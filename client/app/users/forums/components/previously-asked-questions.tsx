"use client";
import { IonIcon } from "@ionic/react";
import { chatboxEllipsesSharp } from "ionicons/icons";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import Comments from "../../groups/[id]/components/comments";
import usePagination from "@/app/hooks/usePagination";
import Pagination from "../../components/pagination";
import { getAllForumPosts } from "@/app/lib/requests";

const PreviouslyAsked = () => {
    
    const [loading,setLoading]=useState(false);
    const [forumMaterials,setForumMaterials]=useState([]);
    useEffect(()=>{
        setLoading(true);
        getAllForumPosts().then((response)=>{
            if(response.status===200){
                response.json().then((data)=>{
                    setForumMaterials(data);
                    setLoading(false);
                })
            }
        }
        )
    },[]);
    const [showComments, setShowComments] = useState(Array(forumMaterials.length).fill(false));


    const toggleComments = (index:number) => {
        if(showComments[index]){
            setShowComments(Array(forumMaterials.length).fill(false));
            return;
        }
        const newShowComments = Array(forumMaterials.length).fill(false);
        newShowComments[index] = !newShowComments[index];
        setShowComments(newShowComments);
    }

    const {currentPage,getCurrentItems,totalPages,handlePageChange}=usePagination(4,forumMaterials);
    const items= getCurrentItems();

    return ( 
            <div className="w-full m-4">
            <h1 className="text-3xl">Existing Questions Answered</h1>
            <div className={`w-full flex justify-end`}>
            </div>
            <Card className="w-full z-0">
                <Card.Body>
                    {forumMaterials.map((post:any,index)=>(
                        <Card key={post._id} className="mb-2 rounded-xl shadow-lg p-2 bg-white m-4">
                            <Card.Header className="w-full bg-yellow-400 text-bitBrown p-2">
                                <div className="w-full">
                                 <h1 className="font-bold text-2xl">
                                    {post.question}
                                 </h1>
                                 <h2 className="font-semibold text-xl">
                                    {post.user.username}
                                 </h2>
                                 <p className="text-gray-400 text-lg">{new Date(post.timestamp).toLocaleDateString()}</p>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-8 text-bitBrown">
                                {post.answer}
                            </Card.Body>
                        </Card>
                    ))}
                </Card.Body>
            </Card>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
     );
}
 
export default PreviouslyAsked;