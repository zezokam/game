import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import GameSetup from './components/GameSetup';
import CategorySelection from './components/CategorySelection';
import GameBoard from './components/GameBoard';
import QuestionScreen from './components/QuestionScreen';
import GameResults from './components/GameResults';
import TriviaApiService from './services/TriviaApiService';
import './App.css';

// تعريف واجهات للأنواع المستخدمة
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

// دالة لخلط الأسئلة بشكل عشوائي
const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// تعريف واجهة للأسئلة المجلوبة من API
interface ApiQuestion {
  id: string;
  categoryId: string;
  categoryName: string;
  difficulty: number;
  question: string;
  answer: string;
  options?: string[];
}

// دالة لتحويل الأسئلة المجلوبة من API إلى تنسيق متوافق مع اللعبة
const convertApiQuestionsToGameFormat = (apiQuestions: ApiQuestion[]): Category[] => {
  // تجميع الأسئلة حسب الفئة
  const questionsByCategory: { [key: string]: Question[] } = {};
  
  apiQuestions.forEach((q: ApiQuestion) => {
    if (!questionsByCategory[q.categoryId]) {
      questionsByCategory[q.categoryId] = [];
    }
    
    questionsByCategory[q.categoryId].push({
      id: q.id,
      question: q.question,
      answer: q.answer,
      difficulty: q.difficulty
    });
  });
  
  // تحويل إلى تنسيق الفئات المطلوب
  const categories = Object.keys(questionsByCategory).map(categoryId => {
    return {
      id: categoryId,
      name: apiQuestions.find((q: ApiQuestion) => q.categoryId === categoryId)?.categoryName || categoryId,
      questions: questionsByCategory[categoryId]
    };
  });
  
  return categories;
};

// دالة لتنظيم الأسئلة حسب مستوى الصعوبة وضمان وجود عدد كافٍ من الأسئلة لكل مستوى
// تم تعديل هذه الدالة لضمان عدم استبعاد أي فئة حتى لو لم تتوفر جميع مستويات الصعوبة
const organizeQuestionsByDifficulty = (categories: Category[], selectedCategoryIds: string[]): Category[] => {
  // نسخة من الفئات للعمل عليها
  const workingCategories = [...categories];
  
  // تأكد من أن جميع الفئات المختارة موجودة في القائمة
  const selectedCategories = selectedCategoryIds.map(catId => {
    const existingCategory = workingCategories.find(cat => cat.id === catId);
    
    if (existingCategory) {
      return existingCategory;
    } else {
      // إذا لم تكن الفئة موجودة، ابحث عن فئة بديلة
      console.warn(`الفئة ${catId} غير موجودة في قائمة الفئات المتاحة، سيتم استبدالها`);
      
      // استخدام أول فئة متاحة كبديل
      const alternativeCategory = workingCategories.find(cat => !selectedCategoryIds.includes(cat.id));
      
      if (alternativeCategory) {
        return {
          ...alternativeCategory,
          id: catId, // استخدام معرف الفئة المختارة
          name: alternativeCategory.name // الاحتفاظ باسم الفئة البديلة
        };
      } else {
        // إذا لم توجد فئة بديلة، أنشئ فئة فارغة
        return {
          id: catId,
          name: `فئة ${catId}`,
          questions: []
        };
      }
    }
  });
  
  // تنظيم الأسئلة حسب مستوى الصعوبة لكل فئة مختارة
  return selectedCategories.map((category: Category) => {
    const questions = [...category.questions];
    
    // تقسيم الأسئلة حسب مستوى الصعوبة
    let easyQuestions = questions.filter((q: Question) => q.difficulty === 200);
    let mediumQuestions = questions.filter((q: Question) => q.difficulty === 400);
    let hardQuestions = questions.filter((q: Question) => q.difficulty === 600);
    
    // إذا لم تكن هناك أسئلة من مستوى معين، استخدم أسئلة من المستويات الأخرى
    const allQuestions = [...questions];
    
    // التأكد من وجود عدد كافٍ من الأسئلة لكل مستوى صعوبة
    // إذا لم يكن هناك عدد كافٍ، قم بتعديل مستوى الصعوبة لبعض الأسئلة
    if (easyQuestions.length < 2) {
      // إذا لم يكن هناك أسئلة سهلة كافية، استخدم بعض الأسئلة المتوسطة كأسئلة سهلة
      const neededEasyQuestions = 2 - easyQuestions.length;
      let additionalEasyQuestions: Question[] = [];
      
      if (mediumQuestions.length > 0) {
        additionalEasyQuestions = mediumQuestions.slice(0, Math.min(neededEasyQuestions, mediumQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 200
        }));
        mediumQuestions = mediumQuestions.slice(Math.min(neededEasyQuestions, mediumQuestions.length));
      } else if (hardQuestions.length > 0) {
        additionalEasyQuestions = hardQuestions.slice(0, Math.min(neededEasyQuestions, hardQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 200
        }));
        hardQuestions = hardQuestions.slice(Math.min(neededEasyQuestions, hardQuestions.length));
      } else if (allQuestions.length > 0) {
        // إذا لم تكن هناك أسئلة متوسطة أو صعبة، استخدم أي أسئلة متاحة
        const remainingQuestions = allQuestions.filter(q => !easyQuestions.some(eq => eq.id === q.id));
        additionalEasyQuestions = remainingQuestions.slice(0, Math.min(neededEasyQuestions, remainingQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 200
        }));
      }
      
      easyQuestions = [...easyQuestions, ...additionalEasyQuestions];
    }
    
    if (mediumQuestions.length < 2) {
      // إذا لم يكن هناك أسئلة متوسطة كافية، استخدم بعض الأسئلة الصعبة كأسئلة متوسطة
      const neededMediumQuestions = 2 - mediumQuestions.length;
      let additionalMediumQuestions: Question[] = [];
      
      if (hardQuestions.length > 0) {
        additionalMediumQuestions = hardQuestions.slice(0, Math.min(neededMediumQuestions, hardQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 400
        }));
        hardQuestions = hardQuestions.slice(Math.min(neededMediumQuestions, hardQuestions.length));
      } else if (easyQuestions.length > 2) {
        // إذا كان هناك أكثر من 2 أسئلة سهلة، استخدم الزائدة كأسئلة متوسطة
        const extraEasyQuestions = easyQuestions.slice(2);
        additionalMediumQuestions = extraEasyQuestions.slice(0, Math.min(neededMediumQuestions, extraEasyQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 400
        }));
        easyQuestions = easyQuestions.slice(0, 2);
      } else if (allQuestions.length > 0) {
        // إذا لم تكن هناك أسئلة سهلة أو صعبة كافية، استخدم أي أسئلة متاحة
        const usedQuestionIds = [...easyQuestions, ...mediumQuestions, ...hardQuestions].map(q => q.id);
        const remainingQuestions = allQuestions.filter(q => !usedQuestionIds.includes(q.id));
        additionalMediumQuestions = remainingQuestions.slice(0, Math.min(neededMediumQuestions, remainingQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 400
        }));
      }
      
      mediumQuestions = [...mediumQuestions, ...additionalMediumQuestions];
    }
    
    if (hardQuestions.length < 2) {
      // إذا لم يكن هناك أسئلة صعبة كافية، استخدم بعض الأسئلة المتوسطة كأسئلة صعبة
      const neededHardQuestions = 2 - hardQuestions.length;
      let additionalHardQuestions: Question[] = [];
      
      if (mediumQuestions.length > 2) {
        // إذا كان هناك أكثر من 2 أسئلة متوسطة، استخدم الزائدة كأسئلة صعبة
        const extraMediumQuestions = mediumQuestions.slice(2);
        additionalHardQuestions = extraMediumQuestions.slice(0, Math.min(neededHardQuestions, extraMediumQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 600
        }));
        mediumQuestions = mediumQuestions.slice(0, 2);
      } else if (easyQuestions.length > 2) {
        // إذا كان هناك أكثر من 2 أسئلة سهلة، استخدم الزائدة كأسئلة صعبة
        const extraEasyQuestions = easyQuestions.slice(2);
        additionalHardQuestions = extraEasyQuestions.slice(0, Math.min(neededHardQuestions, extraEasyQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 600
        }));
        easyQuestions = easyQuestions.slice(0, 2);
      } else if (allQuestions.length > 0) {
        // إذا لم تكن هناك أسئلة سهلة أو متوسطة كافية، استخدم أي أسئلة متاحة
        const usedQuestionIds = [...easyQuestions, ...mediumQuestions, ...hardQuestions].map(q => q.id);
        const remainingQuestions = allQuestions.filter(q => !usedQuestionIds.includes(q.id));
        additionalHardQuestions = remainingQuestions.slice(0, Math.min(neededHardQuestions, remainingQuestions.length)).map((q: Question) => ({
          ...q,
          difficulty: 600
        }));
      }
      
      hardQuestions = [...hardQuestions, ...additionalHardQuestions];
    }
    
    // خلط الأسئلة بشكل عشوائي
    easyQuestions = shuffleArray(easyQuestions);
    mediumQuestions = shuffleArray(mediumQuestions);
    hardQuestions = shuffleArray(hardQuestions);
    
    // اختيار عدد محدد من كل مستوى صعوبة (2 من كل مستوى)
    const selectedEasy = easyQuestions.slice(0, Math.min(2, easyQuestions.length));
    const selectedMedium = mediumQuestions.slice(0, Math.min(2, mediumQuestions.length));
    const selectedHard = hardQuestions.slice(0, Math.min(2, hardQuestions.length));
    
    // دمج الأسئلة المختارة
    const organizedQuestions = [...selectedEasy, ...selectedMedium, ...selectedHard];
    
    // إذا لم يكن هناك أسئلة كافية، استخدم أي أسئلة متاحة
    if (organizedQuestions.length < 6 && allQuestions.length > 0) {
      const usedQuestionIds = organizedQuestions.map(q => q.id);
      const remainingQuestions = allQuestions.filter(q => !usedQuestionIds.includes(q.id));
      const additionalQuestions = remainingQuestions.slice(0, Math.min(6 - organizedQuestions.length, remainingQuestions.length));
      organizedQuestions.push(...additionalQuestions);
    }
    
    // إنشاء نسخة جديدة من الفئة مع الأسئلة المنظمة
    return {
      ...category,
      questions: organizedQuestions
    };
  });
};

interface GameStats {
  highestPoints: number;
  totalQuestions: number;
}

function App() {
  // Game states
  const [gameState, setGameState] = useState<'home' | 'setup' | 'category-selection' | 'game-board' | 'question' | 'results' | 'loading'>('home');
  
  // Game data
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [team1Name, setTeam1Name] = useState('الفريق الأول');
  const [team2Name, setTeam2Name] = useState('الفريق الثاني');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question & {categoryId: string} | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    highestPoints: 0,
    totalQuestions: 0
  });
  
  // معالجة الأسئلة المجلوبة من API
  const handleApiQuestionsLoaded = (apiQuestions: ApiQuestion[]) => {
    // تحويل الأسئلة إلى تنسيق اللعبة
    const apiCategories = convertApiQuestionsToGameFormat(apiQuestions);
    
    // تحديث قائمة الفئات
    setCategories(apiCategories);
    
    // الانتقال إلى شاشة الإعداد
    setGameState('setup');
  };

  // بدء لعبة جديدة
  const startGame = () => {
    // تحميل الأسئلة من API أولاً
    setGameState('loading');
    resetGame();
  };

  // Reset game state
  const resetGame = () => {
    setSelectedCategories([]);
    setTeam1Score(0);
    setTeam2Score(0);
    setCurrentTeam(1);
    setAnsweredQuestions([]);
    setGameStats({
      highestPoints: 0,
      totalQuestions: 0
    });
  };

  // Handle team setup
  const handleTeamSetup = (team1: string, team2: string) => {
    setTeam1Name(team1 || 'الفريق الأول');
    setTeam2Name(team2 || 'الفريق الثاني');
    setGameState('category-selection');
  };

  // Handle category selection
  const handleCategorySelection = (categoryIds: string[]) => {
    console.log("الفئات المختارة:", categoryIds);
    setSelectedCategories(categoryIds);
    
    // حساب إجمالي عدد الأسئلة
    let totalQuestionsCount = 0;
    
    // تنظيم الأسئلة حسب مستوى الصعوبة وضمان وجود عدد كافٍ من الأسئلة لكل مستوى
    const organizedCategories = organizeQuestionsByDifficulty(categories, categoryIds);
    
    // حساب إجمالي عدد الأسئلة بعد التنظيم
    organizedCategories.forEach((cat: Category) => {
      totalQuestionsCount += cat.questions.length;
    });
    
    setGameStats(prev => ({
      ...prev,
      totalQuestions: totalQuestionsCount
    }));
    
    setGameState('game-board');
  };

  // Handle question selection
  const handleSelectQuestion = (categoryId: string, questionId: string) => {
    // تحقق من أن السؤال لم يتم الإجابة عليه مسبقاً
    if (!answeredQuestions.includes(questionId)) {
      // تنظيم الأسئلة حسب مستوى الصعوبة وضمان وجود عدد كافٍ من الأسئلة لكل مستوى
      const organizedCategories = organizeQuestionsByDifficulty(categories, selectedCategories);
      
      const category = organizedCategories.find((cat: Category) => cat.id === categoryId);
      if (category) {
        const question = category.questions.find((q: Question) => q.id === questionId);
        if (question) {
          setCurrentQuestion({ ...question, categoryId });
          setGameState('question');
          
          // تحديث أعلى نقاط في سؤال واحد إذا كان هذا السؤال أعلى
          if (question.difficulty > gameStats.highestPoints) {
            setGameStats(prev => ({
              ...prev,
              highestPoints: question.difficulty
            }));
          }
        }
      }
    }
  };

  // Handle question answered
  const handleQuestionAnswered = (teamIndex: number, points: number) => {
    if (currentQuestion) {
      // Mark question as answered immediately
      setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
      
      // Update scores based on which team answered correctly
      if (teamIndex === 1) {
        setTeam1Score(team1Score + points);
      } else if (teamIndex === 2) {
        setTeam2Score(team2Score + points);
      }
      // If teamIndex is 0 (no one), no points are added
      
      // Switch teams
      setCurrentTeam(currentTeam === 1 ? 2 : 1);
      
      // Return to game board
      setGameState('game-board');
    }
  };

  // End the game and show results
  const handleEndGame = () => {
    setGameState('results');
  };

  // Return to home
  const returnToHome = () => {
    setGameState('home');
    resetGame();
  };

  // Check if all questions have been answered
  useEffect(() => {
    if (gameState === 'game-board' && selectedCategories.length > 0) {
      // تنظيم الأسئلة حسب مستوى الصعوبة وضمان وجود عدد كافٍ من الأسئلة لكل مستوى
      const organizedCategories = organizeQuestionsByDifficulty(categories, selectedCategories);
      
      let totalQuestions = 0;
      organizedCategories.forEach((cat: Category) => {
        totalQuestions += cat.questions.length;
      });
      
      if (answeredQuestions.length === totalQuestions && totalQuestions > 0) {
        handleEndGame();
      }
    }
  }, [answeredQuestions, gameState, selectedCategories, categories]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>سين جيم</h1>
      </header>

      <main className="app-content">
        {gameState === 'home' && (
          <HomePage onStartGame={startGame} />
        )}

        {gameState === 'setup' && (
          <GameSetup 
            onSubmit={handleTeamSetup} 
          />
        )}

        {gameState === 'category-selection' && (
          <CategorySelection 
            categories={categories}
            team1Name={team1Name}
            team2Name={team2Name}
            onCategoriesSelected={handleCategorySelection}
          />
        )}

        {gameState === 'loading' && (
          <TriviaApiService onQuestionsLoaded={handleApiQuestionsLoaded} />
        )}

        {gameState === 'game-board' && (
          <GameBoard 
            categories={categories}
            selectedCategories={selectedCategories}
            team1Name={team1Name}
            team2Name={team2Name}
            team1Score={team1Score}
            team2Score={team2Score}
            currentTeam={currentTeam}
            onSelectQuestion={handleSelectQuestion}
            onEndGame={handleEndGame}
            answeredQuestions={answeredQuestions}
          />
        )}

        {gameState === 'question' && currentQuestion && (
          <QuestionScreen 
            question={currentQuestion.question}
            answer={currentQuestion.answer}
            difficulty={currentQuestion.difficulty}
            categoryName={categories.find(cat => cat.id === currentQuestion.categoryId)?.name || ''}
            team1Name={team1Name}
            team2Name={team2Name}
            currentTeam={currentTeam}
            onQuestionAnswered={handleQuestionAnswered}
          />
        )}

        {gameState === 'results' && (
          <GameResults 
            team1Name={team1Name}
            team2Name={team2Name}
            team1Score={team1Score}
            team2Score={team2Score}
            totalQuestions={gameStats.totalQuestions}
            highestPoints={gameStats.highestPoints}
            onPlayAgain={returnToHome}
          />
        )}
      </main>
    </div>
  );
}

export default App;
