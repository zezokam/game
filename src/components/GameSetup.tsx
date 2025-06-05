import React, { useState, useEffect } from 'react';
import '../styles/GameSetup.css';

interface GameSetupProps {
  onSubmit: (team1: string, team2: string) => void;
  onBack?: () => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onSubmit }) => {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // التحقق من صحة النموذج
  useEffect(() => {
    setIsFormValid(team1Name.trim() !== '' && team2Name.trim() !== '');
  }, [team1Name, team2Name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(team1Name, team2Name);
    }
  };

  return (
    <div className="game-setup">
      <h2>إعداد اللعبة</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="team1">اسم الفريق الأول:</label>
          <input
            type="text"
            id="team1"
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
            placeholder="أدخل اسم الفريق الأول"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="team2">اسم الفريق الثاني:</label>
          <input
            type="text"
            id="team2"
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
            placeholder="أدخل اسم الفريق الثاني"
            required
          />
        </div>
        
        <div className="buttons">
          <button 
            type="submit" 
            className={`submit-btn ${!isFormValid ? 'disabled' : ''}`}
            disabled={!isFormValid}
          >
            بدء اللعبة
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameSetup;
