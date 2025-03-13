import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Fetch questions from JSON file
  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => {
        const randomQuestion = data[Math.floor(Math.random() * data.length)];
        setCurrentQuestion(randomQuestion);
        setShuffledOptions([...randomQuestion.options].sort(() => Math.random() - 0.5));
      });
  }, []);

  if (!currentQuestion) return <p>Loading question...</p>;

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>{currentQuestion.question}</h2>
      {shuffledOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleAnswerClick(option)}
          disabled={selectedAnswer !== null}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            textAlign: "left",
            backgroundColor:
              selectedAnswer === null
                ? "#f0f0f0"
                : option === currentQuestion.correctAnswer
                ? "lightgreen"
                : selectedAnswer === option
                ? "lightcoral"
                : "#f0f0f0",
            cursor: selectedAnswer === null ? "pointer" : "default",
            border: "1px solid #ccc",
          }}
        >
          {option}
        </button>
      ))}
      {selectedAnswer && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#e0e0e0" }}>
          <strong>Explanation:</strong> {currentQuestion.explanation}
          <br />
          <p>Refresh the page for a new question!</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
