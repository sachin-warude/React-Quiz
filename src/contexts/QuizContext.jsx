import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
const initalState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secondRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondRemaining: state.questions.length * 30,
      };
    case 'newAnswer': {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return { ...state, status: 'finished' };
    case 'restart':
      return { ...initalState, questions: state.questions, status: 'ready' };
    case 'tic':
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? 'finished' : state.status,
      };
    case 'error':
      return { ...state, status: 'error' };
    default:
      return state;
  }
}

const QuizContext = createContext();
function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  const numOfQuestions = questions.length;
  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'error', payload: err.message }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondRemaining,
        maxPossiblePoints,
        dispatch,
        numOfQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('useQuiz must be used within QuizProvider');
  return context;
}

export { QuizProvider, useQuiz };
