"use client";
import { IonIcon } from "@ionic/react";
import { arrowDownSharp, arrowUp, arrowUpSharp, chatboxEllipsesSharp, sendSharp } from "ionicons/icons";
import { Card } from "react-bootstrap";

interface IComment{
    id:number;
    title:string;
    content:string;
    username:string;
    datetime:string;
}

interface ICommentProps{
    comments:IComment[];
    disable:boolean;
}

const Comments = ({comments,disable}:ICommentProps) => {


    return ( 
            <Card className="w-full">
                <Card.Body>
                    {!disable && (<div className="w-full flex m-4">
                    <input type="text" placeholder="Add a Public Comment" className="w-full px-4 border border-bitBrown rounded-xl bg-white text-bitBrown"/>
                    <IonIcon icon={sendSharp} className="text-white bg-bitBrown p-4 mx-12 rounded-xl shadow-md hover:cursor-pointer hover:text-bitBrown hover:bg-white"></IonIcon>
                    </div>)}
                    {comments.map((comment)=>(
                        <Card key={comment.id} className="mb-2 rounded-xl shadow-lg p-2 bg-white m-4">
                            <Card.Header className="w-full bg-yellow-400 text-bitBrown p-2">
                                <div className="w-full">
                                 <h3 className="font-bold text-lg">
                                    {comment.title}
                                 </h3>
                                 <h4 className="font-semibold text-md">
                                    {comment.username}
                                 </h4>
                                 <p className="text-gray-400 text-sm">{new Date(comment.datetime).toLocaleDateString()}</p>
                                </div>
                            </Card.Header>
                            <Card.Body className="p-8 text-bitBrown">
                                {comment.content}
                            </Card.Body>
                            <Card.Footer className="flex bg-yellow-400 text-bitBrown p-2">
                                <button className="flex bg-bitBrown text-white p-2 m-4 rounded-lg text-green-600 selected:text-green-400 hover:text-green-400">
                                    <p>20</p>
                                    <IonIcon icon={arrowUpSharp}/>
                                </button>
                                <button className="flex bg-bitBrown text-white p-2 m-4 rounded-lg text-red-600 selected:text-red-400 hover:text-red-400">
                                    <p>10</p>
                                    <IonIcon icon={arrowDownSharp}/>
                                </button>
                            </Card.Footer>
                        </Card>
                    ))}
                </Card.Body>
            </Card>
     );
}
 
export default Comments;