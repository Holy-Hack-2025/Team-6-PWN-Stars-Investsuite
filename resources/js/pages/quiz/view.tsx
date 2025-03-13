import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quiz',
        href: '/quiz',
    },
];

interface QuestionType {
    question: string;
    correctAnswer: string;
    options: string[];
explanation: string;
}

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType|null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string|null>(null);
    const [shuffledOptions, setShuffledOptions] = useState<string[]|null>([]);
  
    // Fetch questions from JSON file
    useEffect(() => {
      fetch("/questions.json")
        .then((response) => response.json())
        .then((data: QuestionType[]) => {
          const randomQuestion = data[Math.floor(Math.random() * data.length)];
          setCurrentQuestion(randomQuestion);
          setShuffledOptions([...randomQuestion.options].sort(() => Math.random() - 0.5));
        });
    }, []);
  
    if (!currentQuestion) return <p>Loading question...</p>;
  
    const handleAnswerClick = (answer: string) => {
      setSelectedAnswer(answer);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quiz" />
            <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
                <h2>{currentQuestion.question}</h2>
                {shuffledOptions?.map((option) => (
                    <button
                    key={option}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                    className={`block w-full px-4 py-2 my-2 text-left rounded-md border 
                        ${selectedAnswer === null ? "bg-gray-200 hover:bg-gray-300" :
                        option === currentQuestion.correctAnswer ? "bg-green-400 text-white" :
                        selectedAnswer === option ? "bg-red-400 text-white" : "bg-gray-200"}
                    `}
                    // style={{
                    //     display: "block",
                    //     margin: "10px 0",
                    //     padding: "10px",
                    //     width: "100%",
                    //     textAlign: "left",
                    //     backgroundColor:
                    //     selectedAnswer === null
                    //         ? "#f0f0f0"
                    //         : option === currentQuestion.correctAnswer
                    //         ? "lightgreen"
                    //         : selectedAnswer === option
                    //         ? "lightcoral"
                    //         : "#f0f0f0",
                    //     cursor: selectedAnswer === null ? "pointer" : "default",
                    //     border: "1px solid #ccc",
                    // }}
                    >
                    {option}
                    </button>
                ))}
                {selectedAnswer && (
                    <div style={{ marginTop: "20px", padding: "10px", background: "#e0e0e0" }}>
                     <strong>Explanation:</strong> {currentQuestion.explanation} 
                    </div>
                )}
                </div>
        </AppLayout>
    );
}
