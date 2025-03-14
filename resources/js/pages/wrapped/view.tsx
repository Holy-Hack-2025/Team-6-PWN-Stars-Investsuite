import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
    title: string;
    description: string;
    subtitle?: string; // Add subtitle as an optional property
    highlightText?: string;
    highlightTextClass?: string;
    extraText?: string;
    extraTextClass?: string;
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
            if (currentIndex < cards.length - 1) {
                setDirection('forward');
                setCurrentIndex(currentIndex + 1);
            }
        }
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
                            <h2 className="text-3xl font-bold text-center relative mb-4">
                                <span className="title-text">
                                    {cards[currentIndex].title}
                                </span>
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
                                <span className="text-2xl text-center">
                                    {cards[currentIndex].subtitle}
                                </span>
                            )}

                            {/* Description - Positioned higher */}
                            <p className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-lg whitespace-nowrap">
                                {cards[currentIndex].description}
                            </p>

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
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </AppLayout>
    );
}