"use client";

import { useMemo } from "react";
import { Card } from "react-bootstrap";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { cashSharp, ellipsisHorizontalOutline, ellipsisVerticalSharp } from "ionicons/icons";

export interface IData {
    id:string;
    title: string;
    price: number;
}

interface IRobotCardCarousel {
    data: IData[];
    items_count:number;
    setShow:(show: boolean, index: number) => void;
}

const RobotCardCarousel = ({ data,items_count,setShow }: IRobotCardCarousel) => {
    const {currentPage,totalPages,handlePageChange,getCurrentItems}=usePagination(items_count,data);
    const items = useMemo(() => getCurrentItems(), [currentPage, data]);
    if(!items){
        return Loading();
    }
    return (
        <div className="w-full container p-8 m-auto">
            <div className="flex justify-center items-center space-x-4 flex-col md:flex-row flex-wrap md:gap-4">
                {items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="lg:w-1/5 w-full m-4 hover:scale-110 hover:cursor-pointer rounded-xl shadow-md bg-yellow-400 text-bitBrown" onClick={()=>setShow(true,itemIndex)}>
                    <Card.Header>
                        <div className="w-full flex justify-between">
                                <Card.Text className="p-2 m-2">{item.title}</Card.Text>
                        </div>
                    </Card.Header>
                    <Card.Img variant="top" className="rounded-xl w-full" src={item.image} />
                    <Card.Body className="p-4">
                        <Card.Text className="p-2 m-2 text-2xl"><IonIcon icon={cashSharp}></IonIcon> <span className="font-semibold">{item.price}</span></Card.Text>
                    </Card.Body>
                </Card>
                
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
};

export default RobotCardCarousel;
