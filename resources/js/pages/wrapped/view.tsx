import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
}

interface Props {
    cards: Card[];
}

export default function Wrapped({ cards }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Move to the next card when clicked
    const goToNextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <AppLayout>
            <Head title="Wrapped" />
            <div
                className="flex justify-center items-center h-screen bg-black text-white"
                onClick={goToNextCard} // Handle click event to go to the next card
            >
                <div className="w-full h-full relative cursor-pointer">
                    <AnimatePresence>
                        <motion.div
                            key={currentIndex}
                            initial={{ x: '100%' }} // Start off-screen to the right
                            animate={{ x: 0 }} // Slide in from the right
                            exit={{ x: '-100%' }} // Exit completely off-screen to the left
                            transition={{
                                duration: 0.5, // Slide duration
                                type: 'spring', // Use spring for natural motion
                                stiffness: 120, // Adjust stiffness for smoother movement
                                damping: 30, // Adjust damping for less bounce
                                delay: 0.2, // Slightly longer delay before the next card enters
                            }}
                            className="absolute w-full h-full flex flex-col justify-center items-center bg-[#EEC2BE] rounded-none shadow-xl z-10"
                        >
                            {/* Title: Render title with optional highlightText */}
                            
                            <span className="absolute text-3xl top-10">
                                    {cards[currentIndex].topText}
                            </span>

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

                                {/* Conditionally render "All Time High" */}
                                {cards[currentIndex].isAllTimeHigh && (
                                    <div
                                        className={cards[currentIndex].extraTextClass || "text-3xl font-bold text-center mt-2 text-green-500"}
                                    >
                                        {cards[currentIndex].extraText}
                                    </div>
                                )}
                            </h2>
                            <span className="text-2xl text-center">
                                {cards[currentIndex].subtitle}
                            </span>

                            {/* Description: Positioned at a higher point and making sure the text wraps */}
                            <p className="absolute bottom-50 width-80 text-2xl text-center">
                                {cards[currentIndex].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </AppLayout>
    );
}
