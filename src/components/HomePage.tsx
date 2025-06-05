import React from 'react';
import '../styles/HomePage.css';

interface HomePageProps {
  onStartGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="game-title">سين جيم</h1>
        <p className="game-description">
          لعبة أسئلة وأجوبة ممتعة للعب مع العائلة والأصدقاء
        </p>
        <div className="button-container">
          <button className="start-game-btn" onClick={onStartGame}>
            ابدأ اللعبة
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
