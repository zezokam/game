import React, { useState } from 'react';
import '../styles/AddQuestionForm.css';

interface AddQuestionFormProps {
  onAddQuestion: (question: any) => void;
  categories: any[];
  onClose: () => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ onAddQuestion, categories, onClose }) => {
  const [categoryId, setCategoryId] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryId || !question || !answer) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    const newQuestion = {
      id: `custom_${Date.now()}`,
      categoryId,
      difficulty,
      question,
      answer
    };
    
    onAddQuestion(newQuestion);
    
    // إعادة تعيين النموذج
    setCategoryId('');
    setQuestion('');
    setAnswer('');
    setDifficulty(100);
  };

  return (
    <div className="add-question-form">
      <h2>إضافة سؤال جديد</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">الفئة</label>
          <select 
            id="category" 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">اختر الفئة</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="question">السؤال</label>
          <textarea 
            id="question" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="answer">الإجابة</label>
          <input 
            type="text" 
            id="answer" 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="difficulty">مستوى الصعوبة</label>
          <select 
            id="difficulty" 
            value={difficulty} 
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
            required
          >
            <option value={100}>سهل (100 نقطة)</option>
            <option value={200}>متوسط (200 نقطة)</option>
            <option value={300}>صعب (300 نقطة)</option>
          </select>
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="submit-button">إضافة السؤال</button>
          <button type="button" className="cancel-button" onClick={onClose}>إلغاء</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionForm;
