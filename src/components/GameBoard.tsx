import React, { useEffect } from 'react';
import '../styles/GameBoard.css';

interface Question {
  id: string;
  question: string;
  answer: string;
  difficulty: number;
}

interface Category {
  id: string;
  name: string;
  questions: Question[];
}

interface GameBoardProps {
  categories: Category[];
  selectedCategories: string[];
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  currentTeam: number;
  onSelectQuestion: (categoryId: string, questionId: string) => void;
  onEndGame: () => void;
  answeredQuestions: string[];
}

const GameBoard: React.FC<GameBoardProps> = ({
  categories,
  selectedCategories,
  team1Name,
  team2Name,
  team1Score,
  team2Score,
  currentTeam,
  onSelectQuestion,
  onEndGame,
  answeredQuestions
}) => {
  const filteredCategories = categories.filter(cat => selectedCategories.includes(cat.id));
  
  // حساب عدد الأسئلة المتبقية
  const totalQuestions = filteredCategories.reduce((acc, cat) => acc + cat.questions.length, 0);
  const remainingQuestions = totalQuestions - answeredQuestions.length;
  
  // التحقق مما إذا كانت جميع الأسئلة قد تمت الإجابة عليها
  const allQuestionsAnswered = remainingQuestions === 0;

  // تحديد مستويات الصعوبة المطلوبة
  const difficultyLevels = [200, 400, 600];
  
  // الانتقال التلقائي إلى صفحة النتائج عند انتهاء جميع الأسئلة
  useEffect(() => {
    if (allQuestionsAnswered) {
      onEndGame();
    }
  }, [allQuestionsAnswered, onEndGame]);

  // تنظيم الأسئلة حسب الفئة والصعوبة
  const getQuestionsForCategory = (categoryId: string, difficulty: number, column: number): Question | null => {
    const category = filteredCategories.find(cat => cat.id === categoryId);
    if (!category) return null;
    
    const questionsForDifficulty = category.questions.filter(q => q.difficulty === difficulty);
    // الحصول على السؤال المناسب للعمود (0 أو 1)
    return questionsForDifficulty.length > column ? questionsForDifficulty[column] : null;
  };
  
  // التحقق مما إذا كان السؤال قد تمت الإجابة عليه
  const isQuestionAnswered = (questionId: string): boolean => {
    return answeredQuestions.includes(questionId);
  };

  // أيقونات للفئات
  const categoryIcons: { [key: string]: string } = {
    'general': '🌍',
    'history': '📜',
    'geography': '🗺️',
    'sports': '⚽',
    'entertainment': '🎭',
    'science': '🔬',
    'religion': '☪️',
    'literature': '📚',
    'technology': '💻',
    'food': '🍽️',
    'art': '🎨',
    'music': '🎵',
    'movies': '🎬',
    'animals': '🐾',
    'health': '🏥',
  };

  return (
    <div className="game-board-container">
      <div className="game-header">
        <h1 className="game-title">سين جيم</h1>
        
        <div className="remaining-questions-counter">
          <span className="questions-count">{remainingQuestions}</span>
          <span className="questions-label">سؤال متبقي</span>
        </div>
      </div>

      <div className="game-scores-bar">
        <div className={`team-score-box ${currentTeam === 1 ? 'active-team' : ''}`}>
          <div className="team-label">{team1Name}</div>
          <div className="score-value">{team1Score}</div>
        </div>
        
        <div className="turn-indicator">
          <div className="turn-badge">دورك</div>
        </div>
        
        <div className={`team-score-box ${currentTeam === 2 ? 'active-team' : ''}`}>
          <div className="team-label">{team2Name}</div>
          <div className="score-value">{team2Score}</div>
        </div>
      </div>

      <div className="game-content">
        <div className="categories-container">
          {filteredCategories.map(category => (
            <div key={category.id} className="category-block">
              <div className="category-header">
                <div className="category-icon">
                  {categoryIcons[category.id.split('-')[0]] || '❓'}
                </div>
                <h3 className="category-title">{category.name}</h3>
              </div>
              
              {difficultyLevels.map(difficulty => (
                <div key={`${category.id}-${difficulty}`} className="difficulty-row">
                  <div className="difficulty-label">{difficulty} نقطة</div>
                  <div className="questions-pair">
                    {[0, 1].map(column => {
                      const question = getQuestionsForCategory(category.id, difficulty, column);
                      const isAnswered = question && isQuestionAnswered(question.id);
                      
                      return (
                        <button
                          key={`${category.id}-${difficulty}-${column}`}
                          className={`question-button difficulty-${difficulty} ${isAnswered ? 'answered' : ''}`}
                          onClick={() => question && !isAnswered && onSelectQuestion(category.id, question.id)}
                          disabled={!question || isAnswered === true}
                        >
                          <div className="question-content">
                            <span className="question-number">{column + 1}</span>
                            {isAnswered && <span className="answered-mark">✓</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
