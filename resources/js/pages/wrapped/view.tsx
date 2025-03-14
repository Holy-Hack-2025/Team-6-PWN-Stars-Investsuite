import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLatestNetWorth from '@/hooks/useLatestNetWorth'; 
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface Card {
    title: string;
    description: string;
    highlightText?: string;  // Optional property for text like 450.12!
    highlightTextClass?: string; // Custom class for styling the highlight text
    extraText?: string; // Optional property for extra text like 2%
    extraTextClass?: string; // Custom class for styling the extra text
    isAllTimeHigh?: boolean; // Boolean to indicate if this is an all-time high
    topText?: string;
    subtitle?: string;
    sampleData?: string; // sampleData is passed as a JSON string
}

interface Props {
    cards: Card[];
}

export default function Wrapped({ cards }: Props) {
    const { latestNetWorth, loading, error } = useLatestNetWorth();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

    const handleScreenClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const screenWidth = window.innerWidth;
        const clickX = event.clientX;

        if (clickX < screenWidth / 2) {
            // Clicked on left half (Go Back)
            if (currentIndex > 0) {
                setDirection('backward');
                setCurrentIndex(currentIndex - 1);
            }
        } else {
            // Clicked on right half (Go Forward)
            if (currentIndex < cards.length - 1) {
                setDirection('forward');
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    // Function to render the PieChart based on sampleData
    const renderPieChart = (data: string) => {
        const parsedData = JSON.parse(data); // Parse the JSON string to an object
        return (
            <PieChart width={600} height={600}>
                <Pie
                    data={parsedData}
                    dataKey="count"
                    nameKey="sector"
                    cx="50%"
                    cy="50%"
                    outerRadius={120} // Adjusted outer radius to make the pie chart smaller
                    label
                    labelLine={false} // Prevent the label lines from extending outside
                >
                    {parsedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        );
    };

    return (
        <AppLayout>
            <Head title="Wrapped" />
            <div
                className="flex justify-center items-center h-screen bg-black text-white"
                onClick={handleScreenClick} // Detect left or right click
            >
                <div className="w-full h-full relative cursor-pointer overflow-hidden bg-[#EEC2BE]">
                    <AnimatePresence custom={direction} initial={false}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial={{ x: direction === 'forward' ? '100%' : '-100%' }} // Slide in from the left or right
                            animate={{ x: 0 }} // Slide to the center
                            exit={{ opacity: 0 }} // Fade out
                            transition={{
                                duration: 0.5,
                                type: 'spring',
                                stiffness: 120,
                                damping: 30,
                            }}
                            className="absolute w-full h-full flex flex-col justify-center items-center bg-[url('/background1.jpg')] rounded-none shadow-xl z-10"
                        >
                            {/* Title */}
                            <span className="absolute text-3xl top-10">
                                {cards[currentIndex].topText}
                            </span>

                            <h2 className="text-3xl font-bold text-center relative mb-4">
                                <span className="title-text">{cards[currentIndex].title}</span>
                                {cards[currentIndex].highlightText && (
                                    <div
                                        className={cards[currentIndex].highlightTextClass || "text-5xl font-bold text-center mt-6"}
                                    >
                                        {cards[currentIndex].highlightText}
                                    </div>
                                )}
                                {cards[currentIndex].extraText && (
                                    <div
                                        className={cards[currentIndex].extraTextClass || "text-3xl font-bold text-center mt-2 text-green-500"}
                                    >
                                        {cards[currentIndex].extraText}
                                    </div>
                                )}
                            </h2>

                            {/* Subtitle - Conditionally render if it exists */}
                            {cards[currentIndex].subtitle && (
                                <span className="text-2xl text-center mb-6">
                                    {cards[currentIndex].subtitle}
                                </span>
                            )}
                            {/* Description - Positioned higher */}
                            <p className="absolute bottom-34 left-1/2 text-center max-width">
                                {cards[currentIndex].description}
                            </p>
                            {currentIndex === 2 ? <div className="absolute top-0 left-10">
                                <img src="/icon9.png" alt="Icon" className="w-40 h-40" />
                            </div> : ""}

                            {/* Navigation Dots - Positioned below the description */}
                            <div className="absolute bottom-16 flex gap-2">
                                {cards.map((_, index) => (
                                    <div key={index} className="relative w-3 h-3 flex justify-center items-center">
                                        {/* Inactive Dot */}
                                        <div
                                            className={`absolute w-3 h-3 rounded-full border border-white transition-all duration-300`}
                                        />

                                        {/* Active Dot with 0.6s Delayed Fill-Up Animation */}
                                        {index === currentIndex && (
                                            <motion.div
                                                className="absolute w-3 h-3 bg-white rounded-full"
                                                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}  // Start empty (100% inset from top)
                                                animate={{ clipPath: "inset(0% 0% 0% 0%)" }} // Fill from bottom to top
                                                transition={{
                                                    duration: 1,
                                                    ease: "easeOut",
                                                    delay: 0.6, // Wait 0.6 seconds before animation starts
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Conditionally render the PieChart */}
                            {cards[currentIndex].sampleData && renderPieChart(cards[currentIndex].sampleData)}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </AppLayout>
    );
}
