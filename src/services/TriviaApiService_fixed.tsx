import React, { useState, useEffect } from 'react';
import '../styles/TriviaApiService.css';

// واجهة لتخزين الأسئلة المترجمة
interface TranslatedQuestion {
  id: string;
  categoryId: string;
  categoryName: string;
  difficulty: number;
  question: string;
  answer: string;
  options?: string[];
}

const TriviaApiService: React.FC<{
  onQuestionsLoaded: (questions: TranslatedQuestion[]) => void;
}> = ({ onQuestionsLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // فك ترميز HTML
  const decodeHtmlEntities = (text: string): string => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#[0-9]+;/g, match => {
        const dec = parseInt(match.match(/&#([0-9]+);/)?.[1] || '0', 10);
        return String.fromCharCode(dec);
      });
    return textArea.value;
  };

  // تحويل مستوى الصعوبة من API إلى نقاط
  const mapDifficultyToPoints = (difficulty: string): number => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 200;
      case 'medium':
        return 400;
      case 'hard':
        return 600;
      default:
        return 200;
    }
  };

  // تحويل فئة السؤال إلى معرف فئة في تطبيقنا
  const mapCategoryToId = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      'General Knowledge': 'general',
      'Entertainment: Books': 'literature',
      'Entertainment: Film': 'movies',
      'Entertainment: Music': 'music',
      'Entertainment: Television': 'entertainment',
      'Entertainment: Video Games': 'games',
      'Science & Nature': 'science',
      'Science: Computers': 'technology',
      'Science: Mathematics': 'mathematics',
      'Mythology': 'mythology',
      'Sports': 'sports',
      'Geography': 'geography',
      'History': 'history',
      'Politics': 'politics',
      'Art': 'art',
      'Celebrities': 'celebrities',
      'Animals': 'animals',
      'Vehicles': 'vehicles',
      'Entertainment: Comics': 'comics',
      'Science: Gadgets': 'gadgets',
      'Entertainment: Japanese Anime & Manga': 'anime',
      'Entertainment: Cartoon & Animations': 'cartoons',
      'Entertainment: Board Games': 'board_games',
      'Food & Drink': 'food',
      'Health & Medicine': 'health',
      'Religion & Mythology': 'religion'
    };
    
    // تحليل النص للبحث عن كلمات مفتاحية دينية
    const religiousKeywords = [
      'religion', 'religious', 'islam', 'muslim', 'quran', 'bible', 'church', 'mosque', 'temple', 
      'prayer', 'worship', 'faith', 'belief', 'god', 'allah', 'jesus', 'muhammad', 'prophet', 
      'holy', 'sacred', 'spiritual', 'divine', 'heaven', 'hell', 'afterlife', 'soul', 'spirit',
      'ritual', 'ceremony', 'festival', 'holiday', 'sabbath', 'ramadan', 'eid', 'christmas', 
      'easter', 'passover', 'hanukkah', 'diwali', 'buddhism', 'hinduism', 'judaism', 'christianity'
    ];
    
    // تحقق إذا كان النص يحتوي على كلمات مفتاحية دينية
    const lowerCaseCategory = category.toLowerCase();
    for (const keyword of religiousKeywords) {
      if (lowerCaseCategory.includes(keyword.toLowerCase())) {
        return 'religion';
      }
    }
    
    return categoryMap[category] || 'general';
  };

  // تحويل فئة السؤال إلى اسم فئة بالعربية
  const mapCategoryToArabicName = (categoryId: string): string => {
    const categoryMap: { [key: string]: string } = {
      'general': 'معلومات عامة',
      'literature': 'أدب',
      'entertainment': 'ترفيه وفنون',
      'science': 'علوم',
      'technology': 'تكنولوجيا',
      'mathematics': 'رياضيات',
      'history': 'تاريخ',
      'sports': 'رياضة',
      'geography': 'جغرافيا',
      'food': 'طعام وطبخ',
      'religion': 'دين وثقافة',
      'animals': 'حيوانات',
      'health': 'صحة وطب',
      'music': 'موسيقى',
      'movies': 'أفلام وسينما',
      'politics': 'سياسة',
      'art': 'فنون',
      'celebrities': 'مشاهير',
      'vehicles': 'مركبات',
      'games': 'ألعاب',
      'comics': 'قصص مصورة',
      'gadgets': 'أجهزة',
      'anime': 'أنمي ومانجا',
      'cartoons': 'رسوم متحركة',
      'board_games': 'ألعاب لوحية',
      'mythology': 'أساطير'
    };
    
    return categoryMap[categoryId] || 'معلومات عامة';
  };

  // ترجمة النص (محاولة تعريب بسيطة)
  const translateText = async (text: string, isAnswer: boolean = false): Promise<string> => {
    // فك ترميز HTML أولاً
    const decodedText = decodeHtmlEntities(text);
    
    // إذا كان النص هو الإجابة، لا تقم بترجمته (غالباً أسماء أو أرقام)
    if (isAnswer) {
      return decodedText;
    }

    // قائمة بالترجمات الشائعة
    const commonTranslations: { [key: string]: string } = {
      'What is the capital of': 'ما هي عاصمة',
      'Who wrote': 'من كتب',
      'Which country': 'أي دولة',
      'What year': 'في أي سنة',
      'Who is': 'من هو',
      'What is': 'ما هو',
      'How many': 'كم عدد',
      'Which of the following': 'أي مما يلي',
      'True or False': 'صح أم خطأ',
      'In which year': 'في أي سنة',
      'Which sport': 'أي رياضة',
      'Which planet': 'أي كوكب',
      'Who won': 'من فاز',
      'What does': 'ماذا يعني',
      'Where is': 'أين يقع',
      'When did': 'متى حدث',
      'Which city': 'أي مدينة',
      'What was': 'ما كان',
      'Who played': 'من لعب دور',
      'Which element': 'أي عنصر',
      'What color': 'ما لون',
      'How long': 'كم مدة',
      'Which animal': 'أي حيوان',
      'What are': 'ما هي',
      'Who directed': 'من أخرج',
      'Which movie': 'أي فيلم',
      'What game': 'أي لعبة',
      'Which band': 'أي فرقة',
      'What musical instrument': 'أي آلة موسيقية',
      'Which language': 'أي لغة',
      'What food': 'أي طعام',
      'Which scientist': 'أي عالم',
      'What invention': 'أي اختراع',
      'Which war': 'أي حرب',
      'What river': 'أي نهر',
      'Which mountain': 'أي جبل',
      'What ocean': 'أي محيط',
      'Which president': 'أي رئيس',
      'What disease': 'أي مرض',
      'Which artist': 'أي فنان',
      'What painting': 'أي لوحة',
      'Which book': 'أي كتاب',
      'What currency': 'أي عملة',
      'Which company': 'أي شركة',
      'What brand': 'أي علامة تجارية',
      'Which university': 'أي جامعة',
      'What subject': 'أي موضوع',
      'Which theory': 'أي نظرية',
      'What law': 'أي قانون',
      'The term': 'مصطلح',
      'In the movie': 'في فيلم',
      'According to Greek mythology': 'وفقًا للأساطير اليونانية',
      'What is the chemical symbol for': 'ما هو الرمز الكيميائي لـ',
      'Which famous battle': 'أي معركة شهيرة',
      'What is the largest': 'ما هو أكبر',
      'What is the smallest': 'ما هو أصغر',
      'Who painted': 'من رسم',
      'What is the main ingredient in': 'ما هو المكون الرئيسي في',
      'Which author wrote': 'أي مؤلف كتب',
      'What is the highest': 'ما هو أعلى',
      'What is the longest': 'ما هو أطول',
      'What is the national animal of': 'ما هو الحيوان الوطني لـ',
      'Which actor played': 'أي ممثل لعب دور',
      'What is the currency of': 'ما هي عملة',
      'Which continent': 'أي قارة',
      'What is the population of': 'كم يبلغ عدد سكان',
      'Who discovered': 'من اكتشف',
      'What is the boiling point of water in Celsius': 'ما هي درجة غليان الماء بالدرجة المئوية',
      'What is the freezing point of water in Celsius': 'ما هي درجة تجمد الماء بالدرجة المئوية',
      'Which is the only mammal capable of true flight': 'ما هو الثديي الوحيد القادر على الطيران الحقيقي',
      'What is the name of the longest river in Africa': 'ما اسم أطول نهر في أفريقيا',
      'What is the square root of': 'ما هو الجذر التربيعي لـ'
    };
    
    // محاولة استبدال العبارات الشائعة
    let translatedText = decodedText;
    let translationFound = false;
    for (const [english, arabic] of Object.entries(commonTranslations)) {
      // استخدام تعبير منتظم للبحث عن العبارة الإنجليزية في بداية النص (مع تجاهل حالة الأحرف)
      const regex = new RegExp(`^${english.replace(/[.*+?^${}()|[\\]\]/g, '\\$&')}(\\s+|\\?|$)`, 'i');
      if (regex.test(decodedText)) {
        // استبدال العبارة الإنجليزية بالعبارة العربية مع الحفاظ على باقي النص
        translatedText = decodedText.replace(regex, `${arabic}$1`);
        translationFound = true;
        break; // التوقف بعد العثور على أول تطابق
      }
    }
    
    // إذا لم يتم العثور على ترجمة، يتم إرجاع النص الأصلي (بعد فك الترميز)
    // لا نضيف "ما هو" بشكل افتراضي
    return translatedText;
  };

  // قائمة احتياطية من الفئات والأسئلة لضمان وجود 12 فئة على الأقل
  // تأكد من أن كل فئة تحتوي على 6 أسئلة على الأقل (2 لكل مستوى صعوبة)
  const getFallbackCategories = (): { [key: string]: TranslatedQuestion[] } => {
    return {
      'general': [
        { id: 'fallback_general_1', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي أكبر دولة في العالم من حيث المساحة؟', answer: 'روسيا' },
        { id: 'fallback_general_2', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي عملة اليابان؟', answer: 'الين' },
        { id: 'fallback_general_3', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 400, question: 'ما هو أطول نهر في العالم؟', answer: 'نهر النيل' },
        { id: 'fallback_general_4', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 400, question: 'ما هو أكبر محيط في العالم؟', answer: 'المحيط الهادئ' },
        { id: 'fallback_general_5', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 600, question: 'ما هي أكثر لغة يتحدث بها الناس في العالم؟', answer: 'الماندرين الصينية' },
        { id: 'fallback_general_6', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 600, question: 'ما هو اسم أعمق نقطة في المحيطات؟', answer: 'خندق ماريانا' }
      ],
      'history': [
        { id: 'fallback_history_1', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'في أي عام وقعت الحرب العالمية الأولى؟', answer: '1914' },
        { id: 'fallback_history_2', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'من بنى الأهرامات في مصر؟', answer: 'الفراعنة' },
        { id: 'fallback_history_3', categoryId: 'history', categoryName: 'تاريخ', difficulty: 400, question: 'من هو أول رئيس للولايات المتحدة الأمريكية؟', answer: 'جورج واشنطن' },
        { id: 'fallback_history_4', categoryId: 'history', categoryName: 'تاريخ', difficulty: 400, question: 'ما هي الحضارة التي ازدهرت في بلاد ما بين النهرين؟', answer: 'الحضارة السومرية/البابلية' },
        { id: 'fallback_history_5', categoryId: 'history', categoryName: 'تاريخ', difficulty: 600, question: 'ما اسم المعاهدة التي أنهت الحرب العالمية الأولى؟', answer: 'معاهدة فرساي' },
        { id: 'fallback_history_6', categoryId: 'history', categoryName: 'تاريخ', difficulty: 600, question: 'من هو القائد المغولي الذي أسس إمبراطورية واسعة؟', answer: 'جنكيز خان' }
      ],
      'geography': [
        { id: 'fallback_geography_1', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي عاصمة اليابان؟', answer: 'طوكيو' },
        { id: 'fallback_geography_2', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي أكبر قارة في العالم؟', answer: 'آسيا' },
        { id: 'fallback_geography_3', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 400, question: 'ما هو أعلى جبل في العالم؟', answer: 'جبل إيفرست' },
        { id: 'fallback_geography_4', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 400, question: 'أين يقع نهر الأمازون؟', answer: 'أمريكا الجنوبية' },
        { id: 'fallback_geography_5', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 600, question: 'ما هي أكبر صحراء في العالم؟', answer: 'الصحراء الكبرى' },
        { id: 'fallback_geography_6', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 600, question: 'ما هي الدولة التي تقع في قارتين؟', answer: 'روسيا/تركيا' }
      ],
      'science': [
        { id: 'fallback_science_1', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو العنصر الكيميائي الأكثر وفرة في الكون؟', answer: 'الهيدروجين' },
        { id: 'fallback_science_2', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو الكوكب الأقرب إلى الشمس؟', answer: 'عطارد' },
        { id: 'fallback_science_3', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هي وحدة قياس القوة في النظام الدولي؟', answer: 'نيوتن' },
        { id: 'fallback_science_4', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هي سرعة الضوء في الفراغ؟', answer: 'حوالي 300,000 كم/ثانية' },
        { id: 'fallback_science_5', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'ما هو قانون نيوتن الثالث للحركة؟', answer: 'لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه' },
        { id: 'fallback_science_6', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'من هو العالم الذي وضع نظرية النسبية؟', answer: 'ألبرت أينشتاين' }
      ],
      'sports': [
        { id: 'fallback_sports_1', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'كم عدد اللاعبين في فريق كرة القدم؟', answer: '11' },
        { id: 'fallback_sports_2', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'ما هي الدولة التي فازت بكأس العالم لكرة القدم 2022؟', answer: 'الأرجنتين' },
        { id: 'fallback_sports_3', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'في أي رياضة يستخدم المضرب والريشة؟', answer: 'الريشة الطائرة' },
        { id: 'fallback_sports_4', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'ما اسم أسرع رجل في العالم؟', answer: 'يوسين بولت' },
        { id: 'fallback_sports_5', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'كم مرة أقيمت دورة الألعاب الأولمبية في اليابان؟', answer: '4 مرات' },
        { id: 'fallback_sports_6', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'ما هي الرياضة التي يلعبها ليبرون جيمس؟', answer: 'كرة السلة' }
      ],
      'religion': [
        { id: 'fallback_religion_1', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو الكتاب المقدس للديانة الإسلامية؟', answer: 'القرآن الكريم' },
        { id: 'fallback_religion_2', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو شهر الصيام عند المسلمين؟', answer: 'رمضان' },
        { id: 'fallback_religion_3', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'من هو أول الخلفاء الراشدين في الإسلام؟', answer: 'أبو بكر الصديق' },
        { id: 'fallback_religion_4', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'ما هي الديانة التي يؤمن بها معظم سكان الهند؟', answer: 'الهندوسية' },
        { id: 'fallback_religion_5', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'كم عدد الأركان في الإسلام؟', answer: 'خمسة' },
        { id: 'fallback_religion_6', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'ما هو اسم المكان المقدس لليهود في القدس؟', answer: 'حائط المبكى' }
      ],
      'technology': [
        { id: 'fallback_technology_1', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'من هو مؤسس شركة مايكروسوفت؟', answer: 'بيل غيتس' },
        { id: 'fallback_technology_2', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو اسم أشهر محرك بحث على الإنترنت؟', answer: 'جوجل' },
        { id: 'fallback_technology_3', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو لغة البرمجة الأكثر استخداماً في تطوير الويب؟', answer: 'جافاسكريبت' },
        { id: 'fallback_technology_4', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو اسم أول قمر صناعي أطلق إلى الفضاء؟', answer: 'سبوتنيك 1' },
        { id: 'fallback_technology_5', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'ما هو اسم أول حاسوب إلكتروني في العالم؟', answer: 'إنياك (ENIAC)' },
        { id: 'fallback_technology_6', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'من هو مخترع الهاتف؟', answer: 'ألكسندر غراهام بيل' }
      ],
      'music': [
        { id: 'fallback_music_1', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'ما هي الآلة الموسيقية التي تعتبر ملكة الآلات الموسيقية؟', answer: 'البيانو' },
        { id: 'fallback_music_2', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'من هي المغنية التي تلقب بـ "كوكب الشرق"؟', answer: 'أم كلثوم' },
        { id: 'fallback_music_3', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'من هو مؤلف السيمفونية التاسعة؟', answer: 'بيتهوفن' },
        { id: 'fallback_music_4', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'ما هي الآلة الموسيقية التي تشتهر بها اسكتلندا؟', answer: 'مزمار القربة' },
        { id: 'fallback_music_5', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'كم عدد النوتات الموسيقية الأساسية؟', answer: 'سبع نوتات' },
        { id: 'fallback_music_6', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'من هو ملك موسيقى البوب؟', answer: 'مايكل جاكسون' }
      ],
      'movies': [
        { id: 'fallback_movies_1', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'من هو مخرج فيلم تيتانيك؟', answer: 'جيمس كاميرون' },
        { id: 'fallback_movies_2', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'ما هو اسم الفيلم الذي تدور أحداثه في مدرسة هوغوورتس للسحر؟', answer: 'هاري بوتر' },
        { id: 'fallback_movies_3', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'ما هو الفيلم الذي حصل على أكبر عدد من جوائز الأوسكار؟', answer: 'تيتانيك / بن هور / سيد الخواتم: عودة الملك (11)' },
        { id: 'fallback_movies_4', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'من هو الممثل الذي لعب دور "الجوكر" في فيلم "فارس الظلام"؟', answer: 'هيث ليدجر' },
        { id: 'fallback_movies_5', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'من هو الممثل الذي لعب دور جاك سبارو في سلسلة أفلام قراصنة الكاريبي؟', answer: 'جوني ديب' },
        { id: 'fallback_movies_6', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'ما هو أول فيلم رسوم متحركة طويل من إنتاج ديزني؟', answer: 'سنو وايت والأقزام السبعة' }
      ],
      'literature': [
        { id: 'fallback_literature_1', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف رواية الحرب والسلام؟', answer: 'ليو تولستوي' },
        { id: 'fallback_literature_2', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'ما هو اسم الكتاب الذي يضم قصص ألف ليلة وليلة؟', answer: 'ألف ليلة وليلة' },
        { id: 'fallback_literature_3', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف مسرحية هاملت؟', answer: 'وليام شكسبير' },
        { id: 'fallback_literature_4', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف رواية "دون كيشوت"؟', answer: 'ميغيل دي سرفانتس' },
        { id: 'fallback_literature_5', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'من هو الأديب العربي الذي لقب بأمير الشعراء؟', answer: 'أحمد شوقي' },
        { id: 'fallback_literature_6', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'ما هي أول رواية في التاريخ؟', answer: 'قصة غنجي (اليابان)' }
      ],
      'food': [
        { id: 'fallback_food_1', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو الطبق الوطني للمكسيك؟', answer: 'التاكو' },
        { id: 'fallback_food_2', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو المكون الرئيسي في طبق السوشي الياباني؟', answer: 'الأرز' },
        { id: 'fallback_food_3', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو أصل القهوة؟', answer: 'إثيوبيا' },
        { id: 'fallback_food_4', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو الطبق الإيطالي الشهير المصنوع من المعكرونة واللحم المفروم وصلصة الطماطم؟', answer: 'بولونيز' },
        { id: 'fallback_food_5', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هو الجبن الفرنسي الذي يشتهر برائحته القوية؟', answer: 'روكفور' },
        { id: 'fallback_food_6', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هي التوابل الأغلى في العالم؟', answer: 'الزعفران' }
      ],
      'animals': [
        { id: 'fallback_animals_1', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 200, question: 'ما هو أسرع حيوان بري في العالم؟', answer: 'الفهد' },
        { id: 'fallback_animals_2', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 200, question: 'ما هو أكبر حيوان على وجه الأرض؟', answer: 'الحوت الأزرق' },
        { id: 'fallback_animals_3', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 400, question: 'كم عدد قلوب الأخطبوط؟', answer: 'ثلاثة قلوب' },
        { id: 'fallback_animals_4', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 400, question: 'ما هو الحيوان الذي ينام وعيناه مفتوحتان؟', answer: 'الدولفين' },
        { id: 'fallback_animals_5', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 600, question: 'ما هو الحيوان الوحيد الذي لا يستطيع القفز؟', answer: 'الفيل' },
        { id: 'fallback_animals_6', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 600, question: 'ما هو الطائر الذي يستطيع الطيران للخلف؟', answer: 'الطنان' }
      ],
      // إضافة فئات احتياطية إضافية لضمان التنوع والعدد
      'art': [
        { id: 'fallback_art_1', categoryId: 'art', categoryName: 'فنون', difficulty: 200, question: 'من رسم لوحة الموناليزا؟', answer: 'ليوناردو دافنشي' },
        { id: 'fallback_art_2', categoryId: 'art', categoryName: 'فنون', difficulty: 200, question: 'ما هو اسم أشهر متحف فني في باريس؟', answer: 'متحف اللوفر' },
        { id: 'fallback_art_3', categoryId: 'art', categoryName: 'فنون', difficulty: 400, question: 'ما هو الفن الذي يستخدم الخط العربي كعنصر أساسي؟', answer: 'فن الخط' },
        { id: 'fallback_art_4', categoryId: 'art', categoryName: 'فنون', difficulty: 400, question: 'من هو الفنان الإسباني الشهير بلوحاته السريالية؟', answer: 'سلفادور دالي' },
        { id: 'fallback_art_5', categoryId: 'art', categoryName: 'فنون', difficulty: 600, question: 'من هو الفنان الهولندي الذي قطع أذنه؟', answer: 'فينسنت فان جوخ' },
        { id: 'fallback_art_6', categoryId: 'art', categoryName: 'فنون', difficulty: 600, question: 'ما هو اسم التقنية الفنية التي تستخدم نقاط صغيرة من الألوان؟', answer: 'التنقيطية' }
      ],
      'games': [
        { id: 'fallback_games_1', categoryId: 'games', categoryName: 'ألعاب', difficulty: 200, question: 'ما هي اللعبة التي يتم فيها بناء هياكل باستخدام المكعبات؟', answer: 'ماين كرافت' },
        { id: 'fallback_games_2', categoryId: 'games', categoryName: 'ألعاب', difficulty: 200, question: 'ما هو اسم الشخصية الرئيسية في سلسلة ألعاب سوبر ماريو؟', answer: 'ماريو' },
        { id: 'fallback_games_3', categoryId: 'games', categoryName: 'ألعاب', difficulty: 400, question: 'ما هي لعبة الشطرنج؟', answer: 'لعبة لوحية استراتيجية' },
        { id: 'fallback_games_4', categoryId: 'games', categoryName: 'ألعاب', difficulty: 400, question: 'ما هي الشركة التي طورت لعبة "فورتنايت"؟', answer: 'Epic Games' },
        { id: 'fallback_games_5', categoryId: 'games', categoryName: 'ألعاب', difficulty: 600, question: 'ما هي أول لعبة فيديو تجارية ناجحة؟', answer: 'بونغ (Pong)' },
        { id: 'fallback_games_6', categoryId: 'games', categoryName: 'ألعاب', difficulty: 600, question: 'ما هو اسم الجهاز الذي تنتجه شركة سوني للألعاب؟', answer: 'بلاي ستيشن' }
      ]
    };
  };

  // جلب الأسئلة من API
  const fetchQuestions = async () => {
    setProgress(10);
    let allQuestions: TranslatedQuestion[] = [];
    
    try {
      // جلب الأسئلة من The Trivia API
      const triviaApiResponse = await fetch('https://the-trivia-api.com/api/questions?limit=100');
      setProgress(25);
      
      if (triviaApiResponse.ok) {
        const triviaApiData = await triviaApiResponse.json();
        const triviaApiQuestions = await Promise.all(triviaApiData.map(async (q: any, index: number) => {
          const categoryId = mapCategoryToId(q.category);
          const categoryName = mapCategoryToArabicName(categoryId);
          const difficulty = mapDifficultyToPoints(q.difficulty);
          const translatedQuestion = await translateText(q.question);
          const translatedAnswer = await translateText(q.correctAnswer, true); // لا تترجم الإجابة
          
          return {
            id: `trivia_api_${index}`,
            categoryId,
            categoryName,
            difficulty,
            question: translatedQuestion,
            answer: translatedAnswer
          };
        }));
        allQuestions = [...allQuestions, ...triviaApiQuestions];
      } else {
        console.warn('فشل في جلب الأسئلة من The Trivia API');
      }
      setProgress(40);
      
      // جلب الأسئلة من Open Trivia DB
      const openTdbResponse = await fetch('https://opentdb.com/api.php?amount=100&type=multiple');
      setProgress(55);
      
      if (openTdbResponse.ok) {
        const openTdbData = await openTdbResponse.json();
        const openTdbQuestions = await Promise.all(openTdbData.results.map(async (q: any, index: number) => {
          const categoryId = mapCategoryToId(q.category);
          const categoryName = mapCategoryToArabicName(categoryId);
          const difficulty = mapDifficultyToPoints(q.difficulty);
          const translatedQuestion = await translateText(q.question);
          const translatedAnswer = await translateText(q.correct_answer, true); // لا تترجم الإجابة
          
          return {
            id: `open_tdb_${index}`,
            categoryId,
            categoryName,
            difficulty,
            question: translatedQuestion,
            answer: translatedAnswer
          };
        }));
        allQuestions = [...allQuestions, ...openTdbQuestions];
      } else {
        console.warn('فشل في جلب الأسئلة من Open Trivia DB');
      }
      setProgress(70);
      
      // تجميع الأسئلة حسب الفئة
      const categorizedQuestions: { [key: string]: TranslatedQuestion[] } = {};
      allQuestions.forEach(q => {
        if (!categorizedQuestions[q.categoryId]) {
          categorizedQuestions[q.categoryId] = [];
        }
        // التأكد من عدم إضافة أسئلة مكررة (نفس السؤال ونفس الإجابة)
        if (!categorizedQuestions[q.categoryId].some(existingQ => existingQ.question === q.question && existingQ.answer === q.answer)) {
          categorizedQuestions[q.categoryId].push(q);
        }
      });
      
      // التحقق من عدد الفئات المتوفرة
      let availableCategoryIds = Object.keys(categorizedQuestions);
      
      // الحد الأدنى المطلوب من الفئات
      const MIN_REQUIRED_CATEGORIES = 12;
      
      console.log(`عدد الفئات المتوفرة من API بعد إزالة التكرار: ${availableCategoryIds.length}`);
      
      // الحصول على جميع الفئات الاحتياطية
      const fallbackCategories = getFallbackCategories();
      const fallbackCategoryIds = Object.keys(fallbackCategories);
      
      // إذا كان عدد الفئات أقل من الحد الأدنى المطلوب، أضف فئات من القائمة الاحتياطية
      if (availableCategoryIds.length < MIN_REQUIRED_CATEGORIES) {
        const missingCount = MIN_REQUIRED_CATEGORIES - availableCategoryIds.length;
        console.log(`عدد الفئات الناقصة: ${missingCount}`);
        
        // المرحلة الأولى: إضافة الفئات الاحتياطية التي لم تظهر بعد
        const unusedFallbackCategoryIds = fallbackCategoryIds
          .filter(categoryId => !availableCategoryIds.includes(categoryId));
        
        console.log(`عدد الفئات الاحتياطية غير المستخدمة: ${unusedFallbackCategoryIds.length}`);
        
        // خلط الفئات الاحتياطية لضمان التنوع
        const shuffledUnusedCategories = [...unusedFallbackCategoryIds]
          .sort(() => Math.random() - 0.5);
        
        // إضافة فئات احتياطية غير مستخدمة
        for (let i = 0; i < Math.min(missingCount, shuffledUnusedCategories.length); i++) {
          const categoryIdToAdd = shuffledUnusedCategories[i];
          // التأكد من أن الفئة الاحتياطية تحتوي على أسئلة كافية
          if (fallbackCategories[categoryIdToAdd] && fallbackCategories[categoryIdToAdd].length >= 6) {
             categorizedQuestions[categoryIdToAdd] = fallbackCategories[categoryIdToAdd];
          } else {
             console.warn(`الفئة الاحتياطية ${categoryIdToAdd} لا تحتوي على أسئلة كافية (6).`);
          }
        }
        
        // تحديث قائمة الفئات المتاحة
        availableCategoryIds = Object.keys(categorizedQuestions);
        console.log(`عدد الفئات بعد إضافة الفئات الاحتياطية غير المستخدمة: ${availableCategoryIds.length}`);
        
        // المرحلة الثانية: إذا كان العدد لا يزال أقل من المطلوب، أضف نسخ من الفئات الاحتياطية الموجودة
        if (availableCategoryIds.length < MIN_REQUIRED_CATEGORIES) {
          console.log(`لا يزال عدد الفئات أقل من المطلوب، إضافة نسخ من الفئات الاحتياطية`);
          
          // قائمة بجميع الفئات الاحتياطية المتاحة (التي تحتوي على 6 أسئلة)
          const validFallbackCategoryIds = fallbackCategoryIds.filter(id => fallbackCategories[id].length >= 6);
          
          // عدد الفئات الإضافية المطلوبة
          let additionalNeeded = MIN_REQUIRED_CATEGORIES - availableCategoryIds.length;
          let extraIndex = 1;
          
          // إنشاء فئات جديدة بأسماء مختلفة قليلاً
          while (additionalNeeded > 0 && validFallbackCategoryIds.length > 0) {
            // اختيار فئة عشوائية من الفئات الاحتياطية الصالحة
            const sourceIndex = (extraIndex - 1) % validFallbackCategoryIds.length;
            const sourceCategoryId = validFallbackCategoryIds[sourceIndex];
            
            // إنشاء معرف جديد للفئة
            const newCategoryId = `${sourceCategoryId}_extra_${extraIndex}`;
            
            // نسخ الأسئلة من الفئة المصدر مع تعديل المعرفات
            const sourceQuestions = fallbackCategories[sourceCategoryId];
            const categoryName = sourceQuestions[0].categoryName; // اسم الفئة الأصلية
            
            // إنشاء نسخة من الأسئلة مع تعديل المعرفات واسم الفئة
            const copiedQuestions = sourceQuestions.map((q, qIndex) => ({
              ...q,
              id: `${q.id}_copy_${extraIndex}_${qIndex}`,
              categoryId: newCategoryId,
              categoryName: `${categoryName} ${extraIndex}` // إضافة رقم للتمييز
            }));
            
            // إضافة الفئة الجديدة
            categorizedQuestions[newCategoryId] = copiedQuestions;
            additionalNeeded--;
            extraIndex++;
          }
        }
      }
      
      // تحقق نهائي من عدد الفئات
      availableCategoryIds = Object.keys(categorizedQuestions);
      console.log(`العدد النهائي للفئات قبل الفلترة: ${availableCategoryIds.length}`);

      // فلترة الفئات النهائية للتأكد من أن كل فئة تحتوي على 6 أسئلة على الأقل
      const finalCategorizedQuestions: { [key: string]: TranslatedQuestion[] } = {};
      availableCategoryIds.forEach(catId => {
        if (categorizedQuestions[catId] && categorizedQuestions[catId].length >= 6) {
          finalCategorizedQuestions[catId] = categorizedQuestions[catId];
        } else {
          console.warn(`الفئة ${catId} تم استبعادها لعدم احتوائها على 6 أسئلة.`);
        }
      });

      // إذا كان عدد الفئات النهائية أقل من المطلوب بعد الفلترة، حاول مرة أخرى باستخدام الفئات الاحتياطية فقط
      if (Object.keys(finalCategorizedQuestions).length < MIN_REQUIRED_CATEGORIES) {
         console.warn(`عدد الفئات الصالحة (${Object.keys(finalCategorizedQuestions).length}) أقل من 12 بعد الفلترة. استخدام الفئات الاحتياطية فقط.`);
         const fallbackCats = getFallbackCategories();
         Object.keys(fallbackCats).forEach(catId => {
           if (fallbackCats[catId] && fallbackCats[catId].length >= 6) {
             finalCategorizedQuestions[catId] = fallbackCats[catId];
           }
         });
         // قد نحتاج لإضافة نسخ إذا كان العدد لا يزال أقل من 12
         let finalFallbackKeys = Object.keys(finalCategorizedQuestions);
         let fallbackNeeded = MIN_REQUIRED_CATEGORIES - finalFallbackKeys.length;
         let fallbackExtraIndex = 1;
         const validFallbackIds = finalFallbackKeys; // استخدم المفاتيح الموجودة بالفعل

         while (fallbackNeeded > 0 && validFallbackIds.length > 0) {
            const sourceIndex = (fallbackExtraIndex - 1) % validFallbackIds.length;
            const sourceCategoryId = validFallbackIds[sourceIndex];
            const newCategoryId = `${sourceCategoryId}_extra_fb_${fallbackExtraIndex}`;
            const sourceQuestions = finalCategorizedQuestions[sourceCategoryId]; // استخدم الأسئلة الموجودة بالفعل
            const categoryName = sourceQuestions[0].categoryName.replace(/ \d+$/, ''); // إزالة الرقم الإضافي إن وجد

            const copiedQuestions = sourceQuestions.map((q, qIndex) => ({
              ...q,
              id: `${q.id}_copy_fb_${fallbackExtraIndex}_${qIndex}`,
              categoryId: newCategoryId,
              categoryName: `${categoryName} ${fallbackExtraIndex}`
            }));
            finalCategorizedQuestions[newCategoryId] = copiedQuestions;
            fallbackNeeded--;
            fallbackExtraIndex++;
         }
      }

      console.log(`العدد النهائي للفئات الصالحة: ${Object.keys(finalCategorizedQuestions).length}`);
      
      // إعادة تجميع الأسئلة من جميع الفئات النهائية الصالحة
      allQuestions = Object.values(finalCategorizedQuestions).flat();
      
      setProgress(100);
      
      // إرسال الأسئلة إلى المكون الأب
      onQuestionsLoaded(allQuestions);

    } catch (error) {
      console.error('Error fetching or processing questions:', error);
      
      // في حالة الفشل الكلي، استخدم جميع الأسئلة الاحتياطية الصالحة
      const fallbackCategories = getFallbackCategories();
      const finalFallbackQuestions: { [key: string]: TranslatedQuestion[] } = {};
      Object.keys(fallbackCategories).forEach(catId => {
        if (fallbackCategories[catId] && fallbackCategories[catId].length >= 6) {
          finalFallbackQuestions[catId] = fallbackCategories[catId];
        }
      });

      // قد نحتاج لإضافة نسخ إذا كان العدد لا يزال أقل من 12
      let finalFallbackKeys = Object.keys(finalFallbackQuestions);
      let fallbackNeeded = MIN_REQUIRED_CATEGORIES - finalFallbackKeys.length;
      let fallbackExtraIndex = 1;
      const validFallbackIds = finalFallbackKeys;

      while (fallbackNeeded > 0 && validFallbackIds.length > 0) {
         const sourceIndex = (fallbackExtraIndex - 1) % validFallbackIds.length;
         const sourceCategoryId = validFallbackIds[sourceIndex];
         const newCategoryId = `${sourceCategoryId}_extra_fb_${fallbackExtraIndex}`;
         const sourceQuestions = finalFallbackQuestions[sourceCategoryId];
         const categoryName = sourceQuestions[0].categoryName.replace(/ \d+$/, '');

         const copiedQuestions = sourceQuestions.map((q, qIndex) => ({
           ...q,
           id: `${q.id}_copy_fb_${fallbackExtraIndex}_${qIndex}`,
           categoryId: newCategoryId,
           categoryName: `${categoryName} ${fallbackExtraIndex}`
         }));
         finalFallbackQuestions[newCategoryId] = copiedQuestions;
         fallbackNeeded--;
         fallbackExtraIndex++;
      }

      const fallbackQuestionsFlat = Object.values(finalFallbackQuestions).flat();
      console.log(`استخدام الأسئلة الاحتياطية فقط بسبب خطأ: ${Object.keys(finalFallbackQuestions).length} فئة`);
      onQuestionsLoaded(fallbackQuestionsFlat);
    }
  };

  return (
    <div className="loading-container">
      <h2>جاري تحميل الأسئلة...</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}%</p>
    </div>
  );
};

export default TriviaApiService;

