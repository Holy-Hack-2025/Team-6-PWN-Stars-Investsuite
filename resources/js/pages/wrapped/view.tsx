import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

interface Card {
    title: string;
    description: string;
    highlightText?: string; // Optional property for text like 450.12!
    highlightTextClass?: string; // Custom class for styling the highlight text
    extraText?: string; // Optional property for extra text like 2%
    extraTextClass?: string; // Custom class for styling the extra text
    isAllTimeHigh?: boolean; // Boolean to indicate if this is an all-time high
    topText?: string;
    subtitle?: string;
    sampleData?: string; // sampleData is passed as a JSON string
    percentGreen?: string;
    percentRed?: string;
}

interface Props {
    cards: Card[];
}

export default function Wrapped({ cards }: Props) {
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
            if (currentIndex < cards.length - 2) {
                setDirection('forward');
                setCurrentIndex(currentIndex + 1);
            } else {
                router.visit('/dashboard');
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
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                        // Positioning the label higher by adjusting the cy (center y-coordinate)
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 30; // Move labels higher
                        const x = cx + radius * Math.cos(midAngle * RADIAN);
                        const y = cy + radius * Math.sin(midAngle * RADIAN);

                        return (
                            <text
                                x={x}
                                y={y} // Adjusted to move the labels higher
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#fff"
                                fontSize="12" // Adjust font size if necessary
                            >
                                {parsedData[index].sector}
                            </text>
                        );
                    }}
                >
                    {parsedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    verticalAlign="top" // Align the legend vertically at the top
                    height={50} // Adjust the height of the legend container
                    wrapperStyle={{
                        position: 'absolute',
                        top: '520px', // Adjust the position to move the legend higher
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                />
            </PieChart>
        );
    };

    return (
        <AppLayout>
            <Head title="Wrapped" />
            <div
                className="z-[999] flex h-screen items-center justify-center bg-black text-white"
                onClick={handleScreenClick} // Detect left or right click
            >
                <div className="relative h-full w-full cursor-pointer overflow-hidden bg-[#EEC2BE]">
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
                            className="absolute z-10 flex h-full w-full flex-col items-center justify-center rounded-none bg-[url('/background1.jpg')] shadow-xl"
                        >
                            {/* Title */}
                            <span className="absolute top-10 text-3xl">{cards[currentIndex].topText}</span>

                            {currentIndex === 0 ? (
                                <div className="absolute top-5 right-[-30px]">
                                    <img src="/icon5.png" alt="Icon" className="w-30" />
                                </div>
                            ) : (
                                ''
                            )}
                            {currentIndex === 6 ? (
                                <div className="absolute top-5 left-[-30px]">
                                    <img src="/icon5.png" alt="Icon" className="w-30" />
                                </div>
                            ) : (
                                ''
                            )}
                            {currentIndex === 5 ? (
                                <div className="absolute bottom-15 left-[-30px]">
                                    <img src="/icon5.png" alt="Icon" className="w-30" />
                                </div>
                            ) : (
                                ''
                            )}

                            <h2 className="relative mb-4 text-center text-3xl font-bold">
                                <span className="title-text">{cards[currentIndex].title}</span>
                                {cards[currentIndex].highlightText && (
                                    <div className={cards[currentIndex].highlightTextClass || 'mt-6 text-center text-5xl font-bold'}>
                                        {cards[currentIndex].highlightText}
                                    </div>
                                )}
                                {cards[currentIndex].extraText && (
                                    <div className={cards[currentIndex].extraTextClass || 'mt-2 text-center text-3xl font-bold text-[#24B758]'}>
                                        {cards[currentIndex].extraText}
                                    </div>
                                )}
                            </h2>

                            {/* Subtitle - Conditionally render if it exists */}
                            {cards[currentIndex].subtitle && <span className="mb-6 text-center text-2xl">{cards[currentIndex].subtitle}</span>}
                            {cards[currentIndex].percentGreen && (
                                <span className="mb-6 text-center text-2xl text-[#24B758]">{cards[currentIndex].percentGreen}</span>
                            )}
                            {cards[currentIndex].percentRed && (
                                <span className="mb-6 text-center text-2xl text-[#C02A2C]">{cards[currentIndex].percentRed}</span>
                            )}
                            {/* Description - Positioned higher */}
                            <p className="max-width absolute bottom-34 left-5 text-center text-2xl">{cards[currentIndex].description}</p>
                            {currentIndex === 2 ? (
                                <div className="center absolute top-30">
                                    <img src="/icon9.png" alt="Icon" className="h-50 w-50" />
                                </div>
                            ) : (
                                ''
                            )}

                            {/* Navigation Dots - Positioned below the description */}
                            <div className="absolute bottom-16 flex gap-2">
                                {cards.map((_, index) => (
                                    <div key={index} className="relative flex h-3 w-3 items-center justify-center">
                                        {/* Inactive Dot */}
                                        <div className={`absolute h-3 w-3 rounded-full border border-white transition-all duration-300`} />

                                        {/* Active Dot with 0.6s Delayed Fill-Up Animation */}
                                        {index === currentIndex && (
                                            <motion.div
                                                className="absolute h-3 w-3 rounded-full bg-white"
                                                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }} // Start empty (100% inset from top)
                                                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }} // Fill from bottom to top
                                                transition={{
                                                    duration: 1,
                                                    ease: 'easeOut',
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
