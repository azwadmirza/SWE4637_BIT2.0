"use client";

import { useMemo, useState } from "react";
import { Card, Carousel } from "react-bootstrap";
import usePagination from "../hooks/usePagination";
import Pagination from "./pagination";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

export interface IData {
    title: string;
    description: string;
    image: string;
}

interface ICardCarousel {
    title:string;
    data: IData[];
    items_count:number;
}

const CardCarousel = ({ title,data,items_count }: ICardCarousel) => {
    const router=useRouter();
    const {currentPage,totalPages,handlePageChange,getCurrentItems}=usePagination(items_count,data);
    const items = useMemo(() => getCurrentItems(), [currentPage, data]);
    if(!items){
        return Loading();
    }
    return (
        <div className="w-full container p-8 m-auto">
            <h1 className="text-2xl m-8 ps-12 font-semibold">{title}</h1>
            <div className="flex justify-center items-center space-x-4 flex-col md:flex-row flex-wrap md:gap-4">
                {items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="lg:w-1/5 w-1/2 m-4 hover:scale-110 hover:cursor-pointer rounded-xl shadow-md bg-yellow-400 text-bitBrown" onClick={()=>router.push(`/users/notes/${item._id}`)}>
                        <Card.Img variant="top" className="rounded-xl w-full" src={item.image} />
                        <Card.Body className="p-4">
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
};

export default CardCarousel;
