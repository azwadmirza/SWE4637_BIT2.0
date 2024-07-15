"use client";
import { addCommentToPost } from "@/app/lib/requests";
import Loading from "@/app/loading";
import { IonIcon } from "@ionic/react";
import { arrowDownSharp, arrowUp, arrowUpSharp, chatboxEllipsesSharp, sendSharp } from "ionicons/icons";
import { useState } from "react";
import { Card } from "react-bootstrap";

interface IComment {
    id: number;
    content: string;
    username: string;
    timestamp: string;
    totalUpvotes: number;
    totalDownvotes: number;
}

interface ICommentProps {
    id?: any;
    postId?: any;
    index?: number;
    posts?: any[];
    setPosts?: any;
    comments: IComment[];
    disable: boolean;
}

const Comments = ({ id, postId, posts, setPosts, index, comments, disable }: ICommentProps) => {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        await addCommentToPost(id, postId, {
            user: localStorage.getItem("id"),
            content: comment
        }).then((res) => res.json()).then((data) => {
            console.log(data);
        })
        setComment("");
        setLoading(false);
        window.location.reload();
    }


    

    if (loading) {
        return Loading();
    }

    return (
        <Card className="w-full">
            <Card.Body>
                {!disable && (<div className="w-full flex m-4">
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a Public Comment" className="w-full px-4 border border-bitBrown rounded-xl bg-white text-bitBrown" />
                    <IonIcon onClick={() => handleSubmit()} icon={sendSharp} className="text-white bg-bitBrown p-4 mx-12 rounded-xl shadow-md hover:cursor-pointer hover:text-bitBrown hover:bg-white"></IonIcon>
                </div>)}
                {comments.map((comment: any) => (
                    <Card key={comment._id} className="mb-2 rounded-xl shadow-lg p-2 bg-white m-4">
                        <Card.Header className="w-full bg-yellow-400 text-bitBrown p-2">
                            <div className="w-full">
                                <h4 className="font-semibold text-md">
                                    {comment.user.username}
                                </h4>
                                <p className="text-gray-400 text-sm">{new Date(comment.timestamp).toLocaleDateString()}</p>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-8 text-bitBrown">
                            {comment.content}
                        </Card.Body>
                    </Card>
                ))}
            </Card.Body>
        </Card>
    );
}

export default Comments;