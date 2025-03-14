import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        if (answer === currentQuestion.correctAnswer) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    if (!currentQuestion) return <p>Loading question...</p>;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quiz" />
            <div className="mx-auto max-w-xl p-5">
                <Card>
                    <CardHeader>
                        <CardTitle>{currentQuestion.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {currentQuestion.options.map((option) => (
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
            </div>
        </AppLayout>
    );
}
