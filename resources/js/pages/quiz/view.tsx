import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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

    const currentQuestion = questions[currentQuestionIndex];

    // Shuffle the options for each question
    useEffect(() => {
        if (currentQuestion) {
            const shuffled = [...currentQuestion.options];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
            }
            setShuffledOptions(shuffled);
        }
    }, [currentQuestion]);

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
            // End the quiz after 5 questions
            setQuizFinished(true);
        }
    };

    if (!currentQuestion) return <p>Loading question...</p>;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quiz" />
            <div className="relative mx-auto max-w-xl p-5">
                {!quizFinished ? (
                    <>
                        <div className="absolute top-0 right-0 rounded border border-black bg-white p-2 text-sm text-gray-600">You're on a 5 day streak!</div>
                        <Card>
                            <CardHeader>
                                <CardTitle>{currentQuestion.question}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {shuffledOptions.map((option) => (
                                    <Button
                                        key={option}
                                        onClick={() => handleAnswerClick(option)}
                                        disabled={selectedAnswer !== null}
                                        className={`my-2 w-full text-left text-black ${
                                            selectedAnswer === null
                                                ? 'bg-gray-200 hover:bg-gray-300'
                                                : option === currentQuestion.correctAnswer
                                                    ? 'bg-green-400'
                                                    : selectedAnswer === option
                                                        ? 'bg-red-400'
                                                        : 'bg-gray-200'
                                        }`}
                                    >
                                        {option}
                                    </Button>
                                ))}
                                {selectedAnswer && (
                                    <div className="mt-5 bg-gray-100 p-3">
                                        <strong>Explanation:</strong> {currentQuestion.explanation}
                                    </div>
                                )}
                                {selectedAnswer && (
                                    <Button onClick={handleNextQuestion} className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600">
                                        Next Question
                                    </Button>
                                )}
                                <div className="mt-5">
                                    <strong>Score:</strong> {score} / 5
                                </div>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <Card>
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
