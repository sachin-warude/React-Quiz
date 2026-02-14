import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function FinishScreen() {
  const { points, maxPossiblePoint, dispatch } = useQuiz();
  const percentage = (points / maxPossiblePoint) * 100;
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {maxPossiblePoint} (
        {Math.ceil(percentage)} %)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </>
  );
}
