import React, { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function Timer() {
  const { dispatch, secondRemaining } = useQuiz();
  const min = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: 'tic' }), 1000);
    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 ? '0' : ''}
      {min}: {seconds < 10 ? '0' : ''}
      {seconds}
    </div>
  );
}
