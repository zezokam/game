import React, { useState, useEffect } from 'react';
import '../styles/QuestionScreen.css';

interface QuestionScreenProps {
  question: {
    id: string;
    question: string;
    answer: string;
    difficulty: number;
  };
  team1Name: string;
  team2Name: string;
  currentTeam: number;
  onAnswered: (teamIndex: number, points: number) => void;
  onBack: () => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  team1Name,
  team2Name,
  currentTeam,
  onAnswered,
  onBack
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTeamOptions, setShowTeamOptions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // دقيقتان (120 ثانية)
  const [timerActive, setTimerActive] = useState(true);
  
  // تشغيل المؤقت عند عرض السؤال
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      // عند انتهاء الوقت، عرض الإجابة تلقائياً
      setShowAnswer(true);
      setShowTeamOptions(true);
      setTimerActive(false);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, timerActive]);

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setShowTeamOptions(true);
    setTimerActive(false); // إيقاف المؤقت عند عرض الإجابة
  };

  const handleTeamAnswer = (teamIndex: number) => {
    // إذا كان الاختيار "لا أحد" (teamIndex = 0) أو انتهى الوقت، فلا يتم إضافة أي نقاط
    const pointsToAdd = (teamIndex === 0 || timeLeft === 0) ? 0 : question.difficulty;
    onAnswered(teamIndex, pointsToAdd);
  };

  const handleBack = () => {
    onBack();
  };
  
  // تنسيق الوقت المتبقي (دقائق:ثواني)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // تحديد لون المؤقت بناءً على الوقت المتبقي
  const getTimerColor = () => {
    if (timeLeft > 60) return '#7fb069'; // أخضر
    if (timeLeft > 30) return '#e6a157'; // برتقالي
    return '#d66853'; // أحمر
  };

  return (
    <div className="question-screen">
      <div className="question-container">
        <div className="question-header">
          <h2>السؤال ({question.difficulty} نقطة)</h2>
          <div 
            className="timer" 
            style={{ color: getTimerColor() }}
          >
            <div className="timer-icon">⏱️</div>
            <div className="timer-text">{formatTime(timeLeft)}</div>
          </div>
        </div>
        
        <div className="current-team">
          <span>دور الفريق: </span>
          <strong>{currentTeam === 1 ? team1Name : team2Name}</strong>
        </div>
        
        <div className="question-text">{question.question}</div>
        
        {!showAnswer && (
          <button className="show-answer-btn" onClick={handleShowAnswer}>
            عرض الإجابة
          </button>
        )}
        
        {showAnswer && (
          <div className="answer-container">
            <h3>الإجابة الصحيحة</h3>
            <div className="answer-text">{question.answer}</div>
          </div>
        )}
        
        {showTeamOptions && (
          <div className="team-options">
            <h3>من أجاب السؤال؟</h3>
            <div className="team-buttons">
              <button 
                className={`team-button ${currentTeam === 1 ? 'current-team' : ''}`} 
                onClick={() => handleTeamAnswer(1)}
              >
                {team1Name}
              </button>
              <button 
                className={`team-button ${currentTeam === 2 ? 'current-team' : ''}`} 
                onClick={() => handleTeamAnswer(2)}
              >
                {team2Name}
              </button>
              <button 
                className="team-button no-team" 
                onClick={() => handleTeamAnswer(0)}
              >
                لا أحد
              </button>
            </div>
          </div>
        )}
        
        <button className="back-btn" onClick={handleBack}>
          العودة للوحة اللعب
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;
