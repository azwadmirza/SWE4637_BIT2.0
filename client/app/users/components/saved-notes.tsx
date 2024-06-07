import CardCarousel, { IData } from "./card-carousel";

const SavedNotes = () => {
    const cardData: IData[] = [
        { image: "/images/Bit.png", title: "Card 1", description: "This is card 1" },
        { image: "/images/Bit.png", title: "Card 2", description: "This is card 2" },
        { image: "/images/Bit.png", title: "Card 3", description: "This is card 3" },
        { image: "/images/Bit.png", title: "Card 4", description: "This is card 4" },
        { image: "/images/Bit.png", title: "Card 5", description: "This is card 5" },
        { image: "/images/Bit.png", title: "Card 3", description: "This is card 3" },
        { image: "/images/Bit.png", title: "Card 4", description: "This is card 4" },
        { image: "/images/Bit.png", title: "Card 5", description: "This is card 5" },
        { image: "/images/Bit.png", title: "Card 3", description: "This is card 3" },
        { image: "/images/Bit.png", title: "Card 4", description: "This is card 4" },
        { image: "/images/Bit.png", title: "Card 5", description: "This is card 5" },
        { image: "/images/Bit.png", title: "Card 3", description: "This is card 3" },
        { image: "/images/Bit.png", title: "Card 4", description: "This is card 4" },
        { image: "/images/Bit.png", title: "Card 5", description: "This is card 5" }
    ];
    
    return ( 
        <div className="w-full p-8 shadow-xl font-semibold">
            <CardCarousel data={cardData} title={"Saved Notes"} items_count={4}/>
        </div>
     );
}
 
export default SavedNotes;