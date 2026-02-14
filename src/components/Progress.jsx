import React from 'react';
import '../index.css';
import { useQuiz } from '../contexts/QuizContext';

export default function Progress() {
  const { numOfQuestion, index, points, maxPossiblePoints } = useQuiz();
  return (
    <header className="progress">
      <progress max={numOfQuestion} value={index} />
      <p>
        Questions{' '}
        <strong>
          {index + 1} / {numOfQuestion}
        </strong>
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
