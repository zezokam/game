import React, { useState, useEffect } from 'react';
import '../styles/TriviaApiService.css';
import { getLocalQuestions, getAllLocalQuestions } from './local_questions';

// واجهة لتخزين الأسئلة
export interface TranslatedQuestion {
  id: string;
  categoryId: string;
  categoryName: string;
  difficulty: number;
  question: string;
  answer: string;
  options?: string[];
}

interface TriviaApiServiceProps {
  onQuestionsLoaded: (questions: TranslatedQuestion[]) => void;
}

const TriviaApiService: React.FC<TriviaApiServiceProps> = ({ onQuestionsLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    prepareQuestions();
  }, []);

  // تحضير الأسئلة للعبة
  const prepareQuestions = async () => {
    setProgress(10);
    
    // الحصول على الأسئلة العربية المخزنة مسبقاً
    const arabicQuestions = getAllLocalQuestions();
    
    // خلط الأسئلة بشكل عشوائي لضمان عدم تكرارها بنفس الترتيب في كل مرة
    const shuffledQuestions = shuffleArray(arabicQuestions);
    
    setProgress(100);
    console.log(`تم تحضير ${shuffledQuestions.length} سؤال عربي من ${Object.keys(getLocalQuestions()).length} فئة.`);
    
    // إرسال الأسئلة إلى المكون الرئيسي
    onQuestionsLoaded(shuffledQuestions);
  };

  // دالة لخلط الأسئلة بشكل عشوائي
  const shuffleArray = <T extends unknown>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className="trivia-api-service">
      {progress < 100 && (
        <div className="loading-container">
          <h2>جاري تحميل الأسئلة...</h2>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default TriviaApiService;
