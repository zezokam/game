import React, { useState, useEffect } from 'react';
import '../styles/CategorySelection.css';

interface CategorySelectionProps {
  categories: {
    id: string;
    name: string;
    questions: {
      id: string;
      question: string;
      answer: string;
      difficulty: number;
    }[];
  }[];
  team1Name: string;
  team2Name: string;
  onCategoriesSelected: (categoryIds: string[]) => void;
  onBack?: () => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  categories,
  team1Name,
  team2Name,
  onCategoriesSelected
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [team1Categories, setTeam1Categories] = useState<string[]>([]);
  const [team2Categories, setTeam2Categories] = useState<string[]>([]);
  const [selectionTeam, setSelectionTeam] = useState<number>(1);
  const [displayedCategories, setDisplayedCategories] = useState<typeof categories>([]);
  const [error, setError] = useState<string | null>(null);
  
  // عدد الفئات المطلوب اختيارها لكل فريق
  const categoriesPerTeam = 3;
  // إجمالي عدد الفئات المطلوب اختيارها
  const totalRequiredCategories = categoriesPerTeam * 2;
  // الحد الأدنى لعدد الفئات التي يجب عرضها للاختيار
  const minDisplayCategories = 12;
  
  // اختيار فئات عشوائية للعرض عند تحميل المكون
  useEffect(() => {
    if (categories.length > 0) {
      // التأكد من أن الفئات تحتوي على أسئلة كافية (6 أسئلة على الأقل)
      const validCategories = categories.filter(cat => cat.questions.length >= 6);
      
      console.log(`عدد الفئات الصالحة: ${validCategories.length}`);
      
      if (validCategories.length < minDisplayCategories) {
        setError(`عدد الفئات المتاحة (${validCategories.length}) أقل من الحد الأدنى المطلوب (${minDisplayCategories}). يرجى تحديث الصفحة للمحاولة مرة أخرى.`);
        
        // حتى في حالة وجود خطأ، نعرض جميع الفئات المتاحة
        setDisplayedCategories(validCategories);
      } else {
        setError(null);
        
        // خلط الفئات بشكل عشوائي
        const shuffledCategories = [...validCategories].sort(() => Math.random() - 0.5);
        
        // عرض جميع الفئات المتاحة (على الأقل 12 فئة)
        setDisplayedCategories(shuffledCategories);
        
        console.log(`تم عرض ${shuffledCategories.length} فئة`);
      }
    } else {
      setError("لا توجد فئات متاحة. يرجى تحديث الصفحة للمحاولة مرة أخرى.");
    }
  }, [categories]);
  
  // التحقق من اكتمال الاختيار
  const isSelectionComplete = team1Categories.length === categoriesPerTeam && team2Categories.length === categoriesPerTeam;
  
  // معالجة اختيار الفئة
  const handleCategoryClick = (categoryId: string) => {
    // التحقق من أن الفئة لم يتم اختيارها مسبقاً
    if (!selectedCategories.includes(categoryId)) {
      // إضافة الفئة إلى الفريق الحالي
      if (selectionTeam === 1 && team1Categories.length < categoriesPerTeam) {
        setTeam1Categories([...team1Categories, categoryId]);
        setSelectedCategories([...selectedCategories, categoryId]);
        
        // التبديل إلى الفريق الثاني إذا اكتمل اختيار الفريق الأول
        if (team1Categories.length === categoriesPerTeam - 1) {
          setSelectionTeam(2);
        }
      } else if (selectionTeam === 2 && team2Categories.length < categoriesPerTeam) {
        setTeam2Categories([...team2Categories, categoryId]);
        setSelectedCategories([...selectedCategories, categoryId]);
      }
    }
  };
  
  // معالجة إرسال الاختيارات
  const handleSubmit = () => {
    if (isSelectionComplete) {
      onCategoriesSelected([...team1Categories, ...team2Categories]);
    }
  };
  
  // الحصول على اسم الفريق الحالي
  const getCurrentTeamName = () => {
    return selectionTeam === 1 ? team1Name : team2Name;
  };
  
  // الحصول على عدد الفئات المتبقية للاختيار
  const getRemainingCategories = () => {
    return selectionTeam === 1 
      ? categoriesPerTeam - team1Categories.length 
      : categoriesPerTeam - team2Categories.length;
  };

  return (
    <div className="category-selection">
      <h2>اختيار الفئات</h2>
      
      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>تحديث الصفحة</button>
        </div>
      ) : (
        <>
          <div className="selection-info">
            <div className="current-team">
              <span>دور الفريق: </span>
              <strong>{getCurrentTeamName()}</strong>
            </div>
            <div className="remaining-categories">
              <span>الفئات المتبقية: </span>
              <strong>{getRemainingCategories()}</strong>
            </div>
            <div className="total-selected">
              <span>إجمالي الفئات المختارة: </span>
              <strong>{selectedCategories.length} من {totalRequiredCategories}</strong>
            </div>
          </div>
          
          <div className="categories-grid">
            {displayedCategories.map(category => (
              <div 
                key={category.id}
                className={`category-card ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
                onClick={() => !selectedCategories.includes(category.id) && handleCategoryClick(category.id)}
              >
                <div className="category-icon">
                  {getCategoryIcon(category.id)}
                </div>
                <h3>{category.name}</h3>
                <span className="question-count">{category.questions.length} سؤال</span>
                
                {team1Categories.includes(category.id) && (
                  <div className="team-badge team1-badge">{team1Name}</div>
                )}
                
                {team2Categories.includes(category.id) && (
                  <div className="team-badge team2-badge">{team2Name}</div>
                )}
              </div>
            ))}
          </div>
          
          <div className="selection-actions">
            <button 
              className="start-game-btn" 
              onClick={handleSubmit}
              disabled={!isSelectionComplete}
            >
              بدء اللعبة
            </button>
          </div>
          
          {!isSelectionComplete && selectedCategories.length > 0 && (
            <div className="selection-hint">
              <p>يجب اختيار {totalRequiredCategories} فئات ({categoriesPerTeam} لكل فريق) قبل بدء اللعبة</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// دالة مساعدة للحصول على أيقونة مناسبة لكل فئة
const getCategoryIcon = (categoryId: string): string => {
  const icons: {[key: string]: string} = {
    general: '📚',
    history: '🏛️',
    geography: '🌍',
    sports: '⚽',
    entertainment: '🎭',
    science: '🔬',
    religion: '☪️',
    literature: '📝',
    technology: '💻',
    food: '🍽️',
    animals: '🐾',
    health: '🩺',
    music: '🎵',
    movies: '🎬',
    art: '🎨',
    politics: '🏛️',
    celebrities: '🌟',
    mythology: '🔱',
    vehicles: '🚗',
    anime_manga: '🇯🇵',
    games: '🎮',
    mathematics: '🔢',
    board_games: '🎲',
    comics: '📊',
    gadgets: '📱',
    anime: '🇯🇵',
    cartoons: '📺'
  };
  
  return icons[categoryId] || '❓';
};

export default CategorySelection;
