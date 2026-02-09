import { useEffect, useReducer } from 'react';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';
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
export default function App() {
  const [
    { questions, status, index, answer, points, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);
  const maxPossiblePoints = questions.reduce(
    (acc, cur) => (acc += cur.points),
    0,
  );

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
            <Progress
              numOfQuestion={questions.length}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                numOfQuestions={questions.length}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoint={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
