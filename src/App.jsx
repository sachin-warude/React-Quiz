import { useEffect, useReducer } from 'react';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
const initalState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'start':
      return { ...state, status: 'active' };
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
    case 'error':
      return { ...state, status: 'error' };
    default:
      return state;
  }
}
export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initalState,
  );
  console.log(points);
  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'error', payload: err.message }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numOfQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
