import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answersList, setIsAnswersList] = useState({});

  const handleAnswerClick = (answer, index) => {
    if (!isAnswered) {
      setSelectedAnswerIndex(index);
      setIsAnswered(true);
      if (answer.isCorrect) {
        setCorrectAnswersCount(correctAnswersCount + 1);
        setIsAnswersList(prev => {
            return{
                ...prev,
                [currentQuestionIndex]: 'checked'
            }
        })
      }
      else{
        setIsAnswersList(prev => {
            return{
                ...prev,
                [currentQuestionIndex]: 'failed'
            }
        })
      }
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setCorrectAnswersCount(0);
    setIsAnswered(false);
    setIsAnswersList({})
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <article className="quiz-container">
      {currentQuestion ? (
        <>
          <p className='question-counter'>{`Question ${currentQuestionIndex+1} of ${questions.length}`}</p>
          <h2>{currentQuestion.question}</h2>
          <ul>
            {currentQuestion.answers.map((answer, index) => (
              <li
                key={index}
                className={`answer ${
                  selectedAnswerIndex === index
                    ? answer.isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => handleAnswerClick(answer, index)}
              >
                {answer.text}
              </li>
            ))}
          </ul>
          {isAnswered && (
            <button className='button next' onClick={nextQuestion}>
              {currentQuestionIndex < questions.length - 1
                ? 'Next'
                : 'See Results'}
            </button>
          )}
          <ul className='progress-list'>
            {questions.map((_, indx) => {
                return (
                <li key={`${indx}`}
                 className={`progress-item ${indx === currentQuestionIndex && 'current'}
                 ${answersList[indx] === 'checked' && 'checked'}
                 ${answersList[indx] === 'failed' && 'failed'}`}>
                 </li>)
            })}
          </ul>
        </>
      ) : (
        <div className="results">
          <h2>You got {correctAnswersCount} out of {questions.length} correct!</h2>
          <span className='success-rate'>
            {Math.floor(correctAnswersCount / questions.length * 100)}%
          </span>
          <button className='button' onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </article>
  );
};

export default Quiz;