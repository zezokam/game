import React from 'react';
import '../styles/GameResults.css';

interface GameResultsProps {
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  gameStats: {
    highestPoints: number;
    totalQuestions: number;
  };
  onPlayAgain: () => void;
  onHome: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({
  team1Name,
  team2Name,
  team1Score,
  team2Score,
  gameStats,
  onPlayAgain,
  onHome
}) => {
  // تحديد الفريق الفائز
  const team1IsWinner = team1Score > team2Score;
  const team2IsWinner = team2Score > team1Score;
  const isTie = team1Score === team2Score;
  
  // تحديد اسم الفريق الفائز
  const winnerName = team1IsWinner ? team1Name : team2IsWinner ? team2Name : '';
  
  // حساب عدد الأسئلة التي تمت الإجابة عليها (افتراضياً جميع الأسئلة)
  const answeredQuestions = gameStats.totalQuestions;
  
  return (
    <div className="game-results">
      <h2 className="results-title">نتائج اللعبة</h2>
      
      {isTie ? (
        <div className="tie-announcement">
          <div className="tie-icon">🤝</div>
          <h3>تعادل!</h3>
          <p>لقد تعادل الفريقان بنتيجة {team1Score} نقطة</p>
        </div>
      ) : (
        <div className="winner-trophy">
          <div className="trophy-icon">🏆</div>
          <p className="winner-announcement">الفائز هو</p>
          <h3 className="winner-name">{winnerName}</h3>
        </div>
      )}
      
      <div className="results-container">
        <div className={`team-result ${team1IsWinner ? 'winner' : ''}`}>
          <h3>{team1Name}</h3>
          <div className="score-circle">
            <span className="score">{team1Score}</span>
          </div>
          {team1IsWinner && <div className="winner-medal">🥇</div>}
        </div>
        
        <div className="vs">VS</div>
        
        <div className={`team-result ${team2IsWinner ? 'winner' : ''}`}>
          <h3>{team2Name}</h3>
          <div className="score-circle">
            <span className="score">{team2Score}</span>
          </div>
          {team2IsWinner && <div className="winner-medal">🥇</div>}
        </div>
      </div>
      
      <div className="game-stats">
        <h4>إحصائيات اللعبة</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">عدد الأسئلة</span>
            <span className="stat-value">{answeredQuestions}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">أعلى نقاط في سؤال</span>
            <span className="stat-value">{gameStats.highestPoints}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">مجموع النقاط</span>
            <span className="stat-value">{team1Score + team2Score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">الفارق</span>
            <span className="stat-value">{Math.abs(team1Score - team2Score)}</span>
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="play-again-btn" onClick={onPlayAgain}>
          <span className="btn-icon">🎮</span>
          لعب مرة أخرى
        </button>
        <button className="home-btn" onClick={onHome}>
          <span className="btn-icon">🏠</span>
          الصفحة الرئيسية
        </button>
      </div>
      
      {/* إضافة تأثير الكونفيتي للاحتفال */}
      {!isTie && (
        <div className="confetti-container">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
      )}
    </div>
  );
};

export default GameResults;
