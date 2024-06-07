"use client";
import { IonIcon } from "@ionic/react";
import GroupCardCarousel from "./group-cards";
import { addCircleOutline, peopleCircleOutline } from "ionicons/icons";

const Groups = () => {
    const groups = [
        {
            "id": "1",
            "title": "Data Structure and Algorithms",
            "image": "/images/Bit.png",
            "creator": "John Doe"
        },
        {
            "id": "2",
            "title": "Introduction to Machine Learning",
            "image": "/images/Bit.png",
            "creator": "Jane Smith"
        },
        {
            "id": "3",
            "title": "Web Development Basics",
            "image": "/images/Bit.png",
            "creator": "Alice Johnson"
        },
        {
            "id": "4",
            "title": "Advanced JavaScript",
            "image": "/images/Bit.png",
            "creator": "Bob Brown"
        },
        {
            "id": "5",
            "title": "Database Management Systems",
            "image": "/images/Bit.png",
            "creator": "Charlie Davis"
        },
        {
            "id": "6",
            "title": "Data Structure and Algorithms",
            "image": "/images/Bit.png",
            "creator": "John Doe"
        },
        {
            "id": "7",
            "title": "Introduction to Machine Learning",
            "image": "/images/Bit.png",
            "creator": "Jane Smith"
        },
        {
            "id": "8",
            "title": "Web Development Basics",
            "image": "/images/Bit.png",
            "creator": "Alice Johnson"
        },
        {
            "id": "9",
            "title": "Advanced JavaScript",
            "image": "/images/Bit.png",
            "creator": "Bob Brown"
        },
        {
            "id": "10",
            "title": "Database Management Systems",
            "image": "/images/Bit.png",
            "creator": "Charlie Davis"
        },
        {
            "id": "11",
            "title": "Data Structure and Algorithms",
            "image": "/images/Bit.png",
            "creator": "John Doe"
        },
        {
            "id": "12",
            "title": "Introduction to Machine Learning",
            "image": "/images/Bit.png",
            "creator": "Jane Smith"
        },
        {
            "id": "13",
            "title": "Web Development Basics",
            "image": "/images/Bit.png",
            "creator": "Alice Johnson"
        },
        {
            "id": "14",
            "title": "Advanced JavaScript",
            "image": "/images/Bit.png",
            "creator": "Bob Brown"
        },
        {
            "id": "15",
            "title": "Database Management Systems",
            "image": "/images/Bit.png",
            "creator": "Charlie Davis"
        },
        {
            "id": "16",
            "title": "Data Structure and Algorithms",
            "image": "/images/Bit.png",
            "creator": "John Doe"
        },
        {
            "id": "17",
            "title": "Introduction to Machine Learning",
            "image": "/images/Bit.png",
            "creator": "Jane Smith"
        },
        {
            "id": "18",
            "title": "Web Development Basics",
            "image": "/images/Bit.png",
            "creator": "Alice Johnson"
        },
        {
            "id": "19",
            "title": "Advanced JavaScript",
            "image": "/images/Bit.png",
            "creator": "Bob Brown"
        },
        {
            "id": "20",
            "title": "Database Management Systems",
            "image": "/images/Bit.png",
            "creator": "Charlie Davis"
        },
        {
            "id": "21",
            "title": "Data Structure and Algorithms",
            "image": "/images/Bit.png",
            "creator": "John Doe"
        },
        {
            "id": "22",
            "title": "Introduction to Machine Learning",
            "image": "/images/Bit.png",
            "creator": "Jane Smith"
        },
        {
            "id": "23",
            "title": "Web Development Basics",
            "image": "/images/Bit.png",
            "creator": "Alice Johnson"
        },
        {
            "id": "24",
            "title": "Advanced JavaScript",
            "image": "/images/Bit.png",
            "creator": "Bob Brown"
        },
        {
            "id": "25",
            "title": "Database Management Systems",
            "image": "/images/Bit.png",
            "creator": "Charlie Davis"
        }
    ];
    
      
    return (
        <div className="w-full">
            <div className="w-full flex justify-end p-4">
                <button className="bg-bitBrown text-white p-2 m-2 rounded-lg"><IonIcon icon={addCircleOutline}></IonIcon> Create Group</button>
                <button className="bg-bitBrown text-white p-2 m-2 rounded-lg"><IonIcon icon={peopleCircleOutline}></IonIcon> Join Group</button>
            </div>
            <GroupCardCarousel data={groups} items_count={12}/>
        </div>
      );
}
 
export default Groups;