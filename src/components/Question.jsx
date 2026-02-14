import { useQuiz } from '../contexts/QuizContext';
import '../index.css';

function Question() {
  const { questions, answer, dispatch, index } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <div className="options">
        {questions[index].options.map((option, i) => (
          <button
            className={`btn btn-option ${i === answer ? 'answer' : ''} ${hasAnswered ? (i === questions[index].correctOption ? 'correct' : ' wrong') : ''}`}
            key={option}
            onClick={() => dispatch({ type: 'newAnswer', payload: i })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
