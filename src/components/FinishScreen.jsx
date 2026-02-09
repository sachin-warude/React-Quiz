import React from 'react';

export default function FinishScreen({ points, maxPossiblePoint, dispatch }) {
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
