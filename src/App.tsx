import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import TriviaApiService, { TranslatedQuestion } from './services/TriviaApiService';

function App() {
  const [questions, setQuestions] = useState<TranslatedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  // استقبال الأسئلة من خدمة TriviaApiService
  const handleQuestionsLoaded = (loadedQuestions: TranslatedQuestion[]) => {
    setQuestions(loadedQuestions);
    setIsLoading(false);
    setGameStarted(true);
  };

  // معالجة انتهاء اللعبة
  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    setGameEnded(true);
    setGameStarted(false);
  };

  // إعادة تشغيل اللعبة
  const restartGame = () => {
    setGameEnded(false);
    setGameStarted(true);
  };

  return (
    <div className="App" dir="rtl">
      <header className="App-header">
        <h1>سين وجيم</h1>
      </header>

      {isLoading && (
        <TriviaApiService onQuestionsLoaded={handleQuestionsLoaded} />
      )}

      {gameStarted && questions.length > 0 && (
        <GameBoard questions={questions} onGameEnd={handleGameEnd} />
      )}

      {gameEnded && (
        <div className="game-summary">
          <h2>انتهت اللعبة!</h2>
          <p>مجموع نقاطك: {finalScore}</p>
          <button className="restart-button" onClick={restartGame}>
            العب مرة أخرى
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
