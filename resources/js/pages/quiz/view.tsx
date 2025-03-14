import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

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

interface Props {
    questions: QuestionType[];
}

export default function Quiz({ questions }: Props) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState<number>(0);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [quizFinished, setQuizFinished] = useState<boolean>(false);
    const [longAnswers, setLongAnswers] = useState<boolean[]>([]);

    const currentQuestion = questions[currentQuestionIndex];

    // Shuffle the options for each question
    useEffect(() => {
        if (currentQuestion) {
            const shuffled = [...currentQuestion.options];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setShuffledOptions(shuffled);
        }
    }, [currentQuestion]);

    // Check if any answers need extra space
    useEffect(() => {
        const checkLongAnswers = () => {
            const tempLongAnswers = shuffledOptions.map((option) => {
                const tempSpan = document.createElement('span');
                tempSpan.style.visibility = 'hidden';
                tempSpan.style.position = 'absolute';
                tempSpan.style.width = '100px'; // Adjust width based on real layout
                tempSpan.style.whiteSpace = 'normal';
                tempSpan.innerText = option;
                document.body.appendChild(tempSpan);
                const isLong = tempSpan.clientHeight > 24; // If text wraps to second line
                document.body.removeChild(tempSpan);
                return isLong;
            });
            setLongAnswers(tempLongAnswers);
        };
        checkLongAnswers();
    }, [shuffledOptions]);

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        if (answer === currentQuestion.correctAnswer) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 4) {
            setSelectedAnswer(null);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    if (!currentQuestion) return <p>Loading question...</p>;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quiz" />
            <div className="relative mx-auto max-w-xl p-5">
                {!quizFinished ? (
                    <Card className="min-h-[400px]">
                        <CardHeader>
                            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {shuffledOptions.map((option, index) => (
                                <Button
                                    key={option}
                                    onClick={() => handleAnswerClick(option)}
                                    disabled={selectedAnswer !== null}
                                    className={`my-2 w-full text-left text-black rounded-lg px-5 break-words whitespace-normal flex items-center ${
                                        longAnswers[index] ? 'py-6' : 'py-4' // Makes bigger if text wraps
                                    } ${
                                        selectedAnswer === null
                                            ? 'bg-gray-200 hover:bg-gray-300'
                                            : option === currentQuestion.correctAnswer
                                                ? 'bg-green-400'
                                                : selectedAnswer === option
                                                    ? 'bg-red-400'
                                                    : 'bg-gray-200'
                                    }`}
                                >
                                    <span className="block max-w-full break-words">{option}</span>
                                </Button>
                            ))}
                            {selectedAnswer && (
                                <div className="mt-5 bg-gray-100 p-3 rounded-lg">
                                    <strong>Explanation:</strong> {currentQuestion.explanation}
                                </div>
                            )}
                            {selectedAnswer && (
                                <Button onClick={handleNextQuestion} className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-3">
                                    Next Question
                                </Button>
                            )}
                            <div className="mt-5">
                                <strong>Score:</strong> {score} / 5
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="min-h-[400px]">
                        <CardHeader>
                            <CardTitle>Quiz Finished!</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center text-2xl font-bold">
                                Your final score: {score} / 5
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-lg text-gray-600">Come back tomorrow for another quiz!</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
