import React from 'react';
import '../index.css';

export default function Progress({
  numOfQuestion,
  index,
  points,
  maxPossiblePoints,
}) {
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
