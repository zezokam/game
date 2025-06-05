import React, { useEffect, useState } from 'react';
import '../styles/GameBoard.css';
import { TranslatedQuestion } from '../services/TriviaApiService';

interface GameBoardProps {
  questions: TranslatedQuestion[];
  onGameEnd: (score: number) => void;
}

interface QuestionState {
  [key: string]: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ questions, onGameEnd }) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<TranslatedQuestion | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<QuestionState>({});
  const [gameOver, setGameOver] = useState(false);
  const [categories, setCategories] = useState<{ [key: string]: TranslatedQuestion[] }>({});

  // تنظيم الأسئلة حسب الفئة عند تحميل المكون
  useEffect(() => {
    const categorizedQuestions: { [key: string]: TranslatedQuestion[] } = {};
    
    questions.forEach(question => {
      if (!categorizedQuestions[question.categoryId]) {
        categorizedQuestions[question.categoryId] = [];
      }
      categorizedQuestions[question.categoryId].push(question);
    });
    
    setCategories(categorizedQuestions);
  }, [questions]);

  // التحقق من انتهاء اللعبة
  useEffect(() => {
    const totalAnswered = Object.values(answeredQuestions).filter(Boolean).length;
    if (totalAnswered >= 36 && !gameOver) {
      setGameOver(true);
      onGameEnd(score);
    }
  }, [answeredQuestions, score, onGameEnd, gameOver]);

  // فتح سؤال محدد
  const openQuestion = (question: TranslatedQuestion) => {
    setCurrentQuestion(question);
    setShowQuestion(true);
    setAnswer('');
    setIsCorrect(null);
  };

  // التحقق من الإجابة
  const checkAnswer = () => {
    if (!currentQuestion) return;
    
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = currentQuestion.answer.toLowerCase();
    
    // التحقق من الإجابة الصحيحة
    const isAnswerCorrect = userAnswer === correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    
    // تحديث النتيجة إذا كانت الإجابة صحيحة
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + currentQuestion.difficulty);
    }
    
    // تسجيل السؤال كمجاب عليه
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));
  };

  // إغلاق شاشة السؤال والعودة إلى اللوحة الرئيسية
  const closeQuestion = () => {
    setShowQuestion(false);
  };

  // إعادة تشغيل اللعبة
  const restartGame = () => {
    setScore(0);
    setAnsweredQuestions({});
    setGameOver(false);
  };

  // تحديد لون زر السؤال بناءً على مستوى الصعوبة
  const getButtonClass = (difficulty: number) => {
    return `question-button question-button-${difficulty}`;
  };

  return (
    <div className="game-board">
      <div className="game-header">
        <div className="score-display">النقاط: {score}</div>
      </div>

      {/* عرض الفئات والأسئلة */}
      {Object.keys(categories).map(categoryId => {
        const categoryQuestions = categories[categoryId];
        if (categoryQuestions.length === 0) return null;
        
        // تنظيم الأسئلة حسب مستوى الصعوبة
        const questionsByDifficulty: { [key: number]: TranslatedQuestion[] } = {};
        categoryQuestions.forEach(q => {
          if (!questionsByDifficulty[q.difficulty]) {
            questionsByDifficulty[q.difficulty] = [];
          }
          questionsByDifficulty[q.difficulty].push(q);
        });
        
        return (
          <div key={categoryId} className="category-container">
            <div className="category-header">
              <h2 className="category-title">{categoryQuestions[0].categoryName}</h2>
            </div>
            
            {/* عرض الأسئلة حسب مستوى الصعوبة */}
            {[200, 400, 600].map(difficulty => (
              <div key={`${categoryId}-${difficulty}`}>
                <div className="questions-grid">
                  {questionsByDifficulty[difficulty]?.slice(0, 2).map((question) => (
                    <button
                      key={question.id}
                      className={getButtonClass(difficulty)}
                      onClick={() => openQuestion(question)}
                      disabled={answeredQuestions[question.id]}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* شاشة انتهاء اللعبة */}
      {gameOver && (
        <div className="game-over">
          <h2>انتهت اللعبة!</h2>
          <p>مجموع نقاطك: {score}</p>
          <button className="restart-button" onClick={restartGame}>
            العب مرة أخرى
          </button>
        </div>
      )}

      {/* شاشة السؤال */}
      {showQuestion && currentQuestion && (
        <div className="question-screen">
          <div className="question-container">
            <div className="question-header">
              <div className="question-category">{currentQuestion.categoryName}</div>
              <div className="question-points">{currentQuestion.difficulty} نقطة</div>
            </div>
            <div className="question-text">{currentQuestion.question}</div>
            
            {isCorrect === null ? (
              <>
                <input
                  type="text"
                  className="answer-input"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="اكتب إجابتك هنا..."
                  autoFocus
                />
                <button className="answer-button" onClick={checkAnswer}>
                  تحقق من الإجابة
                </button>
              </>
            ) : (
              <>
                <div className={`result-message ${isCorrect ? 'correct-answer' : 'wrong-answer'}`}>
                  {isCorrect ? 'إجابة صحيحة!' : `إجابة خاطئة! الإجابة الصحيحة هي: ${currentQuestion.answer}`}
                </div>
                <button className="continue-button" onClick={closeQuestion}>
                  استمر
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
