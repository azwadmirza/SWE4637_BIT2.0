"use client";
import { useEffect, useState } from "react";


const getDatesFor52Weeks = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 52 * 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().slice(0, 10));
    }
    return dates.reverse();
};

function differenceBetweenDates(date1: Date, date2: Date): number {
    const date1Milliseconds = date1.getTime();
    const date2Milliseconds = date2.getTime();
    const differenceInMilliseconds = Math.abs(date2Milliseconds - date1Milliseconds);
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 3600 * 24));

    return differenceInDays;
}

const getWeekNumber = (date:Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const diff = differenceBetweenDates(date,oneJan);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.ceil((diff + oneJan.getDay() * oneDay) / (oneDay * 7));
};

const getColor = (contributions:number) => {

    if (contributions >= 12) return 'bg-green-700';
    if (contributions >= 10) return 'bg-green-600';
    if (contributions >= 8) return 'bg-green-500';
    if (contributions >= 4) return 'bg-green-400';
    if (contributions >= 2) return 'bg-green-300';
    if (contributions >= 1) return 'bg-green-200';
    return 'bg-gray-600';
};

const StudyConsistency = () => {

    const [contributions, setContributions] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState<number|null>(null);

    useEffect(() => {
        console.log(contributions);
    }, [contributions]);

    const dates = getDatesFor52Weeks();
    const contributionsMap = new Map<string,number>();

    if (contributions) {
        contributions.forEach((contribution:any) => {
            const date = new Date(contribution.date).toISOString().slice(0, 10);
            contributionsMap.set(date,(contributionsMap.get(date)||0)+1)
        });
    }

    return (
        <>
            <div className="rounded-md shadow-md p-8">
                <div className="text-xl font-semibold m-2 text-white p-6">
                    Study Sessions
                </div>
                <div className="grid grid-cols-7 gap-1 md:grid-cols-7 md:gap-2">
                    {[...Array(52)].map((_, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-7 gap-1 md:grid-cols-7 md:gap-2">
                            {[...Array(7)].map((_, colIndex) => {
                                const dateIndex = rowIndex * 7 + colIndex;
                                const date = dates[dateIndex];
                                const weekNumber = getWeekNumber(new Date(date));
                                const contributions = contributionsMap.get(date) || 0;
                                const colorClass = getColor(contributions);

                                return (
                                    <div className="relative" key={colIndex}>
                                        <div
                                            className={`w-4 h-4 ${colorClass} me-2`}
                                            title={`${contributions} study sessions on ${date}`}
                                            onMouseEnter={() => setHoveredIndex(colIndex)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default StudyConsistency;