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
    if (!text) return '';
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
  const mapDifficultyToPoints = (difficulty: string | number): number => {
    if (typeof difficulty === 'number') {
        // Handle jService value (1-10 scale, approximate mapping)
        if (difficulty <= 3) return 200;
        if (difficulty <= 7) return 400;
        return 600;
    }
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 200;
      case 'medium':
        return 400;
      case 'hard':
        return 600;
      default:
        return 200; // Default to easy if unknown
    }
  };

  // تحويل فئة السؤال إلى معرف فئة في تطبيقنا
  const mapCategoryToId = (category: string): string => {
    if (!category) return 'general'; // Default category if none provided
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
      'Religion & Mythology': 'religion',
      // Add mappings for potential jService categories (lowercase)
      'science': 'science',
      'history': 'history',
      'literature': 'literature',
      'geography': 'geography',
      'art': 'art',
      'music': 'music',
      'food': 'food',
      'animals': 'animals',
      'sports': 'sports',
      'television': 'entertainment',
      'movies': 'movies',
      'u.s. history': 'history',
      'world history': 'history',
      'technology': 'technology',
      'mythology': 'mythology',
      'religion': 'religion',
      'nature': 'science',
      'people': 'celebrities', // Approximate mapping
      'business & industry': 'general', // Approximate mapping
      'transportation': 'vehicles',
      'games': 'games',
      'pop culture': 'entertainment',
      'the bible': 'religion',
      'american history': 'history',
      'world geography': 'geography',
      'ancient history': 'history',
      'mathematics': 'mathematics',
      'physics': 'science',
      'chemistry': 'science',
      'biology': 'science',
    };

    const lowerCaseCategory = category.toLowerCase();

    // Check direct mapping first
    if (categoryMap[category]) {
        return categoryMap[category];
    }
    // Check lowercase mapping
    if (categoryMap[lowerCaseCategory]) {
        return categoryMap[lowerCaseCategory];
    }

    // تحليل النص للبحث عن كلمات مفتاحية دينية
    const religiousKeywords = [
      'religion', 'religious', 'islam', 'muslim', 'quran', 'bible', 'church', 'mosque', 'temple',
      'prayer', 'worship', 'faith', 'belief', 'god', 'allah', 'jesus', 'muhammad', 'prophet',
      'holy', 'sacred', 'spiritual', 'divine', 'heaven', 'hell', 'afterlife', 'soul', 'spirit',
      'ritual', 'ceremony', 'festival', 'holiday', 'sabbath', 'ramadan', 'eid', 'christmas',
      'easter', 'passover', 'hanukkah', 'diwali', 'buddhism', 'hinduism', 'judaism', 'christianity'
    ];

    // تحقق إذا كان النص يحتوي على كلمات مفتاحية دينية
    for (const keyword of religiousKeywords) {
      if (lowerCaseCategory.includes(keyword.toLowerCase())) {
        return 'religion';
      }
    }

    // Default to general if no specific mapping found
    return 'general';
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

  // ترجمة النص (محاولة تعريب بسيطة - تم إزالة إضافة "ما هو")
  const translateText = async (text: string, isAnswer: boolean = false): Promise<string> => {
    // فك ترميز HTML أولاً
    const decodedText = decodeHtmlEntities(text);

    // إذا كان النص هو الإجابة، لا تقم بترجمته أو تعديله
    if (isAnswer) {
      return decodedText;
    }

    // قائمة بالترجمات الشائعة لبدايات الأسئلة
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
      'What is the square root of': 'ما هو الجذر التربيعي لـ',
      // Add more common question starters here
    };

    // محاولة استبدال العبارات الشائعة في بداية النص فقط
    let translatedText = decodedText;
    for (const [english, arabic] of Object.entries(commonTranslations)) {
      // استخدام تعبير منتظم للبحث عن العبارة الإنجليزية في بداية النص (مع تجاهل حالة الأحرف)
      // Ensure the match is at the beginning and followed by space or question mark
      const regex = new RegExp(`^${english.replace(/[.*+?^${}()|[\/]\]/g, '\\$&')}(\s+|\?|$)`, 'i');
      if (regex.test(decodedText)) {
        // استبدال العبارة الإنجليزية بالعبارة العربية مع الحفاظ على باقي النص
        translatedText = decodedText.replace(regex, (match, p1) => `${arabic}${p1}`);
        // Return immediately after first successful translation
        return translatedText;
      }
    }

    // إذا لم يتم العثور على ترجمة، يتم إرجاع النص الأصلي (بعد فك الترميز)
    // لا نضيف "ما هو" أو أي شيء آخر
    return decodedText;
  };

  // قائمة احتياطية من الفئات والأسئلة لضمان وجود 12 فئة على الأقل
  // تأكد من أن كل فئة تحتوي على 6 أسئلة على الأقل (2 لكل مستوى صعوبة)
  const getFallbackCategories = (): { [key: string]: TranslatedQuestion[] } => {
    // (Fallback categories remain the same as before, ensuring 6 questions per category)
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
    setProgress(0);
    let allQuestions: TranslatedQuestion[] = [];
    const MIN_REQUIRED_CATEGORIES = 12;
    const QUESTIONS_PER_CATEGORY = 6;

    try {
      // --- المصدر الأول: The Trivia API ---
      try {
        const triviaApiResponse = await fetch('https://the-trivia-api.com/api/questions?limit=100');
        setProgress(prev => prev + 15);
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
      } catch (error) {
        console.warn('خطأ أثناء جلب الأسئلة من The Trivia API:', error);
      }
      setProgress(30);

      // --- المصدر الثاني: Open Trivia DB ---
      try {
        const openTdbResponse = await fetch('https://opentdb.com/api.php?amount=50&type=multiple'); // Reduced amount
        setProgress(prev => prev + 15);
        if (openTdbResponse.ok) {
          const openTdbData = await openTdbResponse.json();
          if (openTdbData.results) {
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
          }
        } else {
          console.warn('فشل في جلب الأسئلة من Open Trivia DB');
        }
      } catch (error) {
        console.warn('خطأ أثناء جلب الأسئلة من Open Trivia DB:', error);
      }
      setProgress(60);

      // --- المصدر الثالث: jService ---
      try {
        const jServiceResponse = await fetch('https://jservice.io/api/random?count=100');
        setProgress(prev => prev + 15);
        if (jServiceResponse.ok) {
          const jServiceData = await jServiceResponse.json();
          const jServiceQuestions = await Promise.all(jServiceData
            .filter((q: any) => q.question && q.answer && q.category?.title) // Filter out invalid questions
            .map(async (q: any, index: number) => {
              const categoryId = mapCategoryToId(q.category.title);
              const categoryName = mapCategoryToArabicName(categoryId);
              // jService uses 'value' for difficulty, map it
              const difficulty = mapDifficultyToPoints(q.value || 3); // Default difficulty if value is missing
              const translatedQuestion = await translateText(q.question);
              // jService answers often contain HTML or extra info, clean it
              const cleanedAnswer = decodeHtmlEntities(q.answer.replace(/<[^>]*>/g, '').trim());
              const translatedAnswer = await translateText(cleanedAnswer, true); // لا تترجم الإجابة

              return {
                id: `jservice_${q.id || index}`,
                categoryId,
                categoryName,
                difficulty,
                question: translatedQuestion,
                answer: translatedAnswer
              };
            }));
          allQuestions = [...allQuestions, ...jServiceQuestions];
        } else {
          console.warn('فشل في جلب الأسئلة من jService');
        }
      } catch (error) {
        console.warn('خطأ أثناء جلب الأسئلة من jService:', error);
      }
      setProgress(90);

      // --- تجميع ومعالجة الأسئلة ---
      console.log(`إجمالي الأسئلة المجلوبة من جميع المصادر: ${allQuestions.length}`);

      // تجميع الأسئلة حسب الفئة
      const categorizedQuestions: { [key: string]: TranslatedQuestion[] } = {};
      allQuestions.forEach(q => {
        if (!q.question || !q.answer) return; // Skip questions without text or answer
        if (!categorizedQuestions[q.categoryId]) {
          categorizedQuestions[q.categoryId] = [];
        }
        // التأكد من عدم إضافة أسئلة مكررة (نفس السؤال)
        if (!categorizedQuestions[q.categoryId].some(existingQ => existingQ.question === q.question)) {
          categorizedQuestions[q.categoryId].push(q);
        }
      });

      // فلترة الفئات التي تحتوي على أقل من العدد المطلوب من الأسئلة
      const validCategorizedQuestions: { [key: string]: TranslatedQuestion[] } = {};
      Object.keys(categorizedQuestions).forEach(catId => {
        if (categorizedQuestions[catId].length >= QUESTIONS_PER_CATEGORY) {
          validCategorizedQuestions[catId] = categorizedQuestions[catId];
        } else {
           console.log(`استبعاد الفئة ${catId} (${mapCategoryToArabicName(catId)}) لعدم كفاية الأسئلة (${categorizedQuestions[catId].length})`);
        }
      });

      let finalCategorizedQuestions = { ...validCategorizedQuestions };
      let availableCategoryIds = Object.keys(finalCategorizedQuestions);

      console.log(`عدد الفئات الصالحة (>= ${QUESTIONS_PER_CATEGORY} أسئلة) من API: ${availableCategoryIds.length}`);

      // --- إضافة الفئات الاحتياطية إذا لزم الأمر ---
      const fallbackCategories = getFallbackCategories();
      const fallbackCategoryIds = Object.keys(fallbackCategories);

      if (availableCategoryIds.length < MIN_REQUIRED_CATEGORIES) {
        const missingCount = MIN_REQUIRED_CATEGORIES - availableCategoryIds.length;
        console.log(`عدد الفئات الناقصة: ${missingCount}. إضافة من الفئات الاحتياطية.`);

        // خلط الفئات الاحتياطية لضمان التنوع
        const shuffledFallbackIds = [...fallbackCategoryIds].sort(() => Math.random() - 0.5);

        let addedCount = 0;
        for (const fallbackId of shuffledFallbackIds) {
          if (addedCount >= missingCount) break;
          // إضافة الفئة الاحتياطية فقط إذا لم تكن موجودة بالفعل
          if (!finalCategorizedQuestions[fallbackId]) {
            finalCategorizedQuestions[fallbackId] = fallbackCategories[fallbackId];
            addedCount++;
          }
        }
        console.log(`تمت إضافة ${addedCount} فئة احتياطية.`);
      }

      // --- التحقق النهائي وإعادة التجميع ---
      availableCategoryIds = Object.keys(finalCategorizedQuestions);
      console.log(`العدد النهائي للفئات المتاحة للعرض: ${availableCategoryIds.length}`);

      // إذا كان العدد لا يزال أقل من المطلوب (نادر جداً)، سجل تحذير
      if (availableCategoryIds.length < MIN_REQUIRED_CATEGORIES) {
         console.warn(`تحذير: العدد النهائي للفئات (${availableCategoryIds.length}) أقل من المطلوب (${MIN_REQUIRED_CATEGORIES}). قد لا تظهر 12 فئة.`);
      }

      // إعادة تجميع الأسئلة من جميع الفئات النهائية
      allQuestions = Object.values(finalCategorizedQuestions).flat();

      setProgress(100);
      console.log(`إجمالي الأسئلة النهائية المتاحة: ${allQuestions.length}`);
      onQuestionsLoaded(allQuestions);

    } catch (error) {
      console.error('حدث خطأ عام أثناء جلب ومعالجة الأسئلة:', error);

      // --- في حالة الفشل الكلي، استخدم الفئات الاحتياطية فقط ---
      console.log('استخدام الفئات الاحتياطية فقط بسبب خطأ.');
      const fallbackCategories = getFallbackCategories();
      const fallbackQuestionsFlat = Object.values(fallbackCategories).flat();
      onQuestionsLoaded(fallbackQuestionsFlat);
      setProgress(100);
    }
  };

  return (
    <div className="loading-container">
      <h2>جاري تحميل الأسئلة من مصادر متعددة...</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}%</p>
    </div>
  );
};

export default TriviaApiService;

