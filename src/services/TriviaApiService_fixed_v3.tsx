import React, { useState, useEffect } from 'react';
import '../styles/TriviaApiService.css';

// واجهة لتخزين الأسئلة
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
    prepareQuestions();
  }, []);

  // تحضير الأسئلة للعبة
  const prepareQuestions = async () => {
    setProgress(10);
    
    // الحصول على الأسئلة العربية المخزنة مسبقاً
    const arabicQuestions = getAllArabicQuestions();
    
    setProgress(100);
    console.log(`تم تحضير ${arabicQuestions.length} سؤال عربي من ${Object.keys(getAllArabicQuestions()).length} فئة.`);
    
    // إرسال الأسئلة إلى المكون الرئيسي
    onQuestionsLoaded(arabicQuestions);
  };

  // الحصول على جميع الأسئلة العربية المخزنة مسبقاً
  const getAllArabicQuestions = (): TranslatedQuestion[] => {
    // تجميع جميع الأسئلة من جميع الفئات
    return Object.values(getArabicCategoriesWithQuestions()).flat();
  };

  // الحصول على جميع الفئات العربية مع أسئلتها
  const getArabicCategoriesWithQuestions = (): { [key: string]: TranslatedQuestion[] } => {
    return {
      'general': [
        { id: 'general_1', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي أكبر دولة في العالم من حيث المساحة؟', answer: 'روسيا' },
        { id: 'general_2', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي عملة اليابان؟', answer: 'الين' },
        { id: 'general_3', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 400, question: 'ما هو أطول نهر في العالم؟', answer: 'نهر النيل' },
        { id: 'general_4', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 400, question: 'ما هو أكبر محيط في العالم؟', answer: 'المحيط الهادئ' },
        { id: 'general_5', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 600, question: 'ما هي أكثر لغة يتحدث بها الناس في العالم؟', answer: 'الماندرين الصينية' },
        { id: 'general_6', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 600, question: 'ما هو اسم أعمق نقطة في المحيطات؟', answer: 'خندق ماريانا' },
        { id: 'general_7', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي عاصمة أستراليا؟', answer: 'كانبرا' },
        { id: 'general_8', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 400, question: 'كم عدد القارات في العالم؟', answer: 'سبع قارات' },
      ],
      'history': [
        { id: 'history_1', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'في أي عام وقعت الحرب العالمية الأولى؟', answer: '1914' },
        { id: 'history_2', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'من بنى الأهرامات في مصر؟', answer: 'الفراعنة' },
        { id: 'history_3', categoryId: 'history', categoryName: 'تاريخ', difficulty: 400, question: 'من هو أول رئيس للولايات المتحدة الأمريكية؟', answer: 'جورج واشنطن' },
        { id: 'history_4', categoryId: 'history', categoryName: 'تاريخ', difficulty: 400, question: 'ما هي الحضارة التي ازدهرت في بلاد ما بين النهرين؟', answer: 'الحضارة السومرية/البابلية' },
        { id: 'history_5', categoryId: 'history', categoryName: 'تاريخ', difficulty: 600, question: 'ما اسم المعاهدة التي أنهت الحرب العالمية الأولى؟', answer: 'معاهدة فرساي' },
        { id: 'history_6', categoryId: 'history', categoryName: 'تاريخ', difficulty: 600, question: 'من هو القائد المغولي الذي أسس إمبراطورية واسعة؟', answer: 'جنكيز خان' },
        { id: 'history_7', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'في أي عام تأسست المملكة العربية السعودية؟', answer: '1932' },
        { id: 'history_8', categoryId: 'history', categoryName: 'تاريخ', difficulty: 400, question: 'من هو الخليفة الراشدي الثاني؟', answer: 'عمر بن الخطاب' },
      ],
      'geography': [
        { id: 'geography_1', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي عاصمة اليابان؟', answer: 'طوكيو' },
        { id: 'geography_2', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي أكبر قارة في العالم؟', answer: 'آسيا' },
        { id: 'geography_3', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 400, question: 'ما هو أعلى جبل في العالم؟', answer: 'جبل إيفرست' },
        { id: 'geography_4', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 400, question: 'أين يقع نهر الأمازون؟', answer: 'أمريكا الجنوبية' },
        { id: 'geography_5', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 600, question: 'ما هي أكبر صحراء في العالم؟', answer: 'الصحراء الكبرى' },
        { id: 'geography_6', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 600, question: 'ما هي الدولة التي تقع في قارتين؟', answer: 'روسيا/تركيا' },
        { id: 'geography_7', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي عاصمة المغرب؟', answer: 'الرباط' },
        { id: 'geography_8', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 400, question: 'ما هو المضيق الذي يفصل بين آسيا وأمريكا الشمالية؟', answer: 'مضيق بيرنغ' },
      ],
      'science': [
        { id: 'science_1', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو العنصر الكيميائي الأكثر وفرة في الكون؟', answer: 'الهيدروجين' },
        { id: 'science_2', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو الكوكب الأقرب إلى الشمس؟', answer: 'عطارد' },
        { id: 'science_3', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هي وحدة قياس القوة في النظام الدولي؟', answer: 'نيوتن' },
        { id: 'science_4', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هي سرعة الضوء في الفراغ؟', answer: 'حوالي 300,000 كم/ثانية' },
        { id: 'science_5', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'ما هو قانون نيوتن الثالث للحركة؟', answer: 'لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه' },
        { id: 'science_6', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'من هو العالم الذي وضع نظرية النسبية؟', answer: 'ألبرت أينشتاين' },
        { id: 'science_7', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو الغاز الذي نستنشقه للتنفس؟', answer: 'الأكسجين' },
        { id: 'science_8', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هو الحمض النووي المسؤول عن نقل الصفات الوراثية؟', answer: 'الحمض النووي (DNA)' },
      ],
      'sports': [
        { id: 'sports_1', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'كم عدد اللاعبين في فريق كرة القدم؟', answer: '11' },
        { id: 'sports_2', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'ما هي الدولة التي فازت بكأس العالم لكرة القدم 2022؟', answer: 'الأرجنتين' },
        { id: 'sports_3', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'في أي رياضة يستخدم المضرب والريشة؟', answer: 'الريشة الطائرة' },
        { id: 'sports_4', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'ما اسم أسرع رجل في العالم؟', answer: 'يوسين بولت' },
        { id: 'sports_5', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'كم مرة أقيمت دورة الألعاب الأولمبية في اليابان؟', answer: '4 مرات' },
        { id: 'sports_6', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'ما هي الرياضة التي يلعبها ليبرون جيمس؟', answer: 'كرة السلة' },
        { id: 'sports_7', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'ما هي الرياضة الأكثر شعبية في العالم؟', answer: 'كرة القدم' },
        { id: 'sports_8', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'كم عدد لاعبي كرة السلة في الملعب لكل فريق؟', answer: '5' },
      ],
      'religion': [
        { id: 'religion_1', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو الكتاب المقدس للديانة الإسلامية؟', answer: 'القرآن الكريم' },
        { id: 'religion_2', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو شهر الصيام عند المسلمين؟', answer: 'رمضان' },
        { id: 'religion_3', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'من هو أول الخلفاء الراشدين في الإسلام؟', answer: 'أبو بكر الصديق' },
        { id: 'religion_4', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'ما هي الديانة التي يؤمن بها معظم سكان الهند؟', answer: 'الهندوسية' },
        { id: 'religion_5', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'كم عدد الأركان في الإسلام؟', answer: 'خمسة' },
        { id: 'religion_6', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'ما هو اسم المكان المقدس لليهود في القدس؟', answer: 'حائط المبكى' },
        { id: 'religion_7', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو الركن الخامس من أركان الإسلام؟', answer: 'الحج' },
        { id: 'religion_8', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'من هو نبي المسيحية؟', answer: 'عيسى (المسيح)' },
      ],
      'technology': [
        { id: 'technology_1', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'من هو مؤسس شركة مايكروسوفت؟', answer: 'بيل غيتس' },
        { id: 'technology_2', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو اسم أشهر محرك بحث على الإنترنت؟', answer: 'جوجل' },
        { id: 'technology_3', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هي لغة البرمجة الأكثر استخداماً في تطوير الويب؟', answer: 'جافاسكريبت' },
        { id: 'technology_4', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو اسم أول قمر صناعي أطلق إلى الفضاء؟', answer: 'سبوتنيك 1' },
        { id: 'technology_5', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'ما هو اسم أول حاسوب إلكتروني في العالم؟', answer: 'إنياك (ENIAC)' },
        { id: 'technology_6', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'من هو مخترع الهاتف؟', answer: 'ألكسندر غراهام بيل' },
        { id: 'technology_7', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو نظام التشغيل الأكثر استخداماً في الهواتف الذكية؟', answer: 'أندرويد' },
        { id: 'technology_8', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو اسم الشركة التي طورت آيفون؟', answer: 'أبل' },
      ],
      'music': [
        { id: 'music_1', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'ما هي الآلة الموسيقية التي تعتبر ملكة الآلات الموسيقية؟', answer: 'البيانو' },
        { id: 'music_2', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'من هي المغنية التي تلقب بـ "كوكب الشرق"؟', answer: 'أم كلثوم' },
        { id: 'music_3', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'من هو مؤلف السيمفونية التاسعة؟', answer: 'بيتهوفن' },
        { id: 'music_4', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'ما هي الآلة الموسيقية التي تشتهر بها اسكتلندا؟', answer: 'مزمار القربة' },
        { id: 'music_5', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'كم عدد النوتات الموسيقية الأساسية؟', answer: 'سبع نوتات' },
        { id: 'music_6', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'من هو ملك موسيقى البوب؟', answer: 'مايكل جاكسون' },
        { id: 'music_7', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'ما هي الآلة الموسيقية ذات الأوتار الستة؟', answer: 'الجيتار' },
        { id: 'music_8', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'من هو مؤلف أوبرا عايدة؟', answer: 'جوزيبي فيردي' },
      ],
      'movies': [
        { id: 'movies_1', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'من هو مخرج فيلم تيتانيك؟', answer: 'جيمس كاميرون' },
        { id: 'movies_2', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'ما هو اسم الفيلم الذي تدور أحداثه في مدرسة هوغوورتس للسحر؟', answer: 'هاري بوتر' },
        { id: 'movies_3', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'ما هو الفيلم الذي حصل على أكبر عدد من جوائز الأوسكار؟', answer: 'تيتانيك / بن هور / سيد الخواتم: عودة الملك (11)' },
        { id: 'movies_4', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'من هو الممثل الذي لعب دور "الجوكر" في فيلم "فارس الظلام"؟', answer: 'هيث ليدجر' },
        { id: 'movies_5', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'من هو الممثل الذي لعب دور جاك سبارو في سلسلة أفلام قراصنة الكاريبي؟', answer: 'جوني ديب' },
        { id: 'movies_6', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'ما هو أول فيلم رسوم متحركة طويل من إنتاج ديزني؟', answer: 'سنو وايت والأقزام السبعة' },
        { id: 'movies_7', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'ما هو اسم الفيلم الذي يظهر فيه الشخصية الخيالية فورست غامب؟', answer: 'فورست غامب' },
        { id: 'movies_8', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'من هو بطل فيلم المصارع (Gladiator)؟', answer: 'راسل كرو' },
      ],
      'literature': [
        { id: 'literature_1', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف رواية الحرب والسلام؟', answer: 'ليو تولستوي' },
        { id: 'literature_2', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'ما هو اسم الكتاب الذي يضم قصص ألف ليلة وليلة؟', answer: 'ألف ليلة وليلة' },
        { id: 'literature_3', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف مسرحية هاملت؟', answer: 'وليام شكسبير' },
        { id: 'literature_4', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف رواية "دون كيشوت"؟', answer: 'ميغيل دي سرفانتس' },
        { id: 'literature_5', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'من هو الأديب العربي الذي لقب بأمير الشعراء؟', answer: 'أحمد شوقي' },
        { id: 'literature_6', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'ما هي أول رواية في التاريخ؟', answer: 'قصة غنجي (اليابان)' },
        { id: 'literature_7', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف كتاب كليلة ودمنة؟', answer: 'بيدبا (ترجمه ابن المقفع)' },
        { id: 'literature_8', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف رواية "الشيخ والبحر"؟', answer: 'إرنست همنغواي' },
      ],
      'food': [
        { id: 'food_1', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو الطبق الوطني للمكسيك؟', answer: 'التاكو' },
        { id: 'food_2', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو المكون الرئيسي في طبق السوشي الياباني؟', answer: 'الأرز' },
        { id: 'food_3', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو أصل القهوة؟', answer: 'إثيوبيا' },
        { id: 'food_4', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو الطبق الإيطالي الشهير المصنوع من المعكرونة واللحم المفروم وصلصة الطماطم؟', answer: 'بولونيز' },
        { id: 'food_5', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هو الجبن الفرنسي الذي يشتهر برائحته القوية؟', answer: 'روكفور' },
        { id: 'food_6', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هي التوابل الأغلى في العالم؟', answer: 'الزعفران' },
        { id: 'food_7', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو الطبق الوطني للسعودية؟', answer: 'الكبسة' },
        { id: 'food_8', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو المشروب الوطني لليابان؟', answer: 'الساكي' },
      ],
      'animals': [
        { id: 'animals_1', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 200, question: 'ما هو أسرع حيوان بري في العالم؟', answer: 'الفهد' },
        { id: 'animals_2', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 200, question: 'ما هو أكبر حيوان على وجه الأرض؟', answer: 'الحوت الأزرق' },
        { id: 'animals_3', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 400, question: 'كم عدد قلوب الأخطبوط؟', answer: 'ثلاثة قلوب' },
        { id: 'animals_4', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 400, question: 'ما هو الحيوان الذي ينام وعيناه مفتوحتان؟', answer: 'الدولفين' },
        { id: 'animals_5', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 600, question: 'ما هو الحيوان الوحيد الذي لا يستطيع القفز؟', answer: 'الفيل' },
        { id: 'animals_6', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 600, question: 'ما هو الطائر الذي يستطيع الطيران للخلف؟', answer: 'الطنان' },
        { id: 'animals_7', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 200, question: 'ما هو الحيوان الذي يستطيع تدوير رأسه 270 درجة؟', answer: 'البومة' },
        { id: 'animals_8', categoryId: 'animals', categoryName: 'حيوانات', difficulty: 400, question: 'ما هو الحيوان الذي يعتبر رمزاً للصين؟', answer: 'الباندا' },
      ],
      'art': [
        { id: 'art_1', categoryId: 'art', categoryName: 'فنون', difficulty: 200, question: 'من رسم لوحة الموناليزا؟', answer: 'ليوناردو دافنشي' },
        { id: 'art_2', categoryId: 'art', categoryName: 'فنون', difficulty: 200, question: 'ما هو اسم أشهر متحف فني في باريس؟', answer: 'متحف اللوفر' },
        { id: 'art_3', categoryId: 'art', categoryName: 'فنون', difficulty: 400, question: 'ما هو الفن الذي يستخدم الخط العربي كعنصر أساسي؟', answer: 'فن الخط' },
        { id: 'art_4', categoryId: 'art', categoryName: 'فنون', difficulty: 400, question: 'من هو الفنان الإسباني الشهير بلوحاته السريالية؟', answer: 'سلفادور دالي' },
        { id: 'art_5', categoryId: 'art', categoryName: 'فنون', difficulty: 600, question: 'من هو الفنان الهولندي الذي قطع أذنه؟', answer: 'فينسنت فان جوخ' },
        { id: 'art_6', categoryId: 'art', categoryName: 'فنون', difficulty: 600, question: 'ما هو اسم التقنية الفنية التي تستخدم نقاط صغيرة من الألوان؟', answer: 'التنقيطية' },
        { id: 'art_7', categoryId: 'art', categoryName: 'فنون', difficulty: 200, question: 'ما هو أشهر تمثال في العالم؟', answer: 'تمثال الحرية' },
        { id: 'art_8', categoryId: 'art', categoryName: 'فنون', difficulty: 400, question: 'من هو الفنان الذي رسم "ليلة النجوم"؟', answer: 'فينسنت فان جوخ' },
      ],
      'games': [
        { id: 'games_1', categoryId: 'games', categoryName: 'ألعاب', difficulty: 200, question: 'ما هي اللعبة التي يتم فيها بناء هياكل باستخدام المكعبات؟', answer: 'ماين كرافت' },
        { id: 'games_2', categoryId: 'games', categoryName: 'ألعاب', difficulty: 200, question: 'ما هو اسم الشخصية الرئيسية في سلسلة ألعاب سوبر ماريو؟', answer: 'ماريو' },
        { id: 'games_3', categoryId: 'games', categoryName: 'ألعاب', difficulty: 400, question: 'ما هي لعبة الشطرنج؟', answer: 'لعبة لوحية استراتيجية' },
        { id: 'games_4', categoryId: 'games', categoryName: 'ألعاب', difficulty: 400, question: 'ما هي الشركة التي طورت لعبة "فورتنايت"؟', answer: 'Epic Games' },
        { id: 'games_5', categoryId: 'games', categoryName: 'ألعاب', difficulty: 600, question: 'ما هي أول لعبة فيديو تجارية ناجحة؟', answer: 'بونغ (Pong)' },
        { id: 'games_6', categoryId: 'games', categoryName: 'ألعاب', difficulty: 600, question: 'ما هو اسم الجهاز الذي تنتجه شركة سوني للألعاب؟', answer: 'بلاي ستيشن' },
        { id: 'games_7', categoryId: 'games', categoryName: 'ألعاب', difficulty: 200, question: 'ما هي اللعبة الشهيرة التي تستخدم فيها الأحجار السوداء والبيضاء؟', answer: 'الجو (Go)' },
        { id: 'games_8', categoryId: 'games', categoryName: 'ألعاب', difficulty: 400, question: 'ما هو اسم الشخصية الخضراء في لعبة ماريو؟', answer: 'يوشي' },
      ],
      'health': [
        { id: 'health_1', categoryId: 'health', categoryName: 'صحة وطب', difficulty: 200, question: 'ما هو العضو المسؤول عن تنقية الدم في جسم الإنسان؟', answer: 'الكلى' },
        { id: 'health_2', categoryId: 'health', categoryName: 'صحة وطب', difficulty: 200, question: 'ما هو الفيتامين الذي ينتجه الجسم عند التعرض لأشعة الشمس؟', answer: 'فيتامين د' },
        { id: 'health_3', categoryId: 'health', categoryName: 'صحة وطب', difficulty: 400, question: 'ما هو العضو الأكبر في جسم الإنسان؟', answer: 'الجلد' },
        { id: 'health_4', categoryId: 'health', categoryName: 'صحة وطب', difficulty: 400, question: 'ما هو المرض الذي يسببه نقص الأنسولين؟', answer: 'السكري' },
        { id: 'health_5', categoryId: 'health', categoryName: 'صحة وطب', difficulty: 600, question: 'ما هو العدد الطبيعي لنبضات القلب في الدقيقة؟', answer: '60-100 نبضة' },
        { id: 'health_6', categoryId: 'health', categoryName: 'صحة وطب', difficulty: 600, question: 'ما هي المادة التي تعطي الدم لونه الأحمر؟', answer: 'الهيموغلوبين' },
        { id: 'health_7', categoryId: 'health', categoryName: 'صحة وطب', difficulty: 200, question: 'ما هو العضو المسؤول عن إنتاج الصفراء؟', answer: 'الكبد' },
        { id: 'health_8', categoryId: 'health', categoryName: 'صحة وطب', difficulty: 400, question: 'ما هو الهرمون المعروف بهرمون السعادة؟', answer: 'السيروتونين' },
      ],
      'politics': [
        { id: 'politics_1', categoryId: 'politics', categoryName: 'سياسة', difficulty: 200, question: 'ما هي عاصمة الأمم المتحدة؟', answer: 'نيويورك' },
        { id: 'politics_2', categoryId: 'politics', categoryName: 'سياسة', difficulty: 200, question: 'كم عدد الدول الأعضاء في الأمم المتحدة؟', answer: '193 دولة' },
        { id: 'politics_3', categoryId: 'politics', categoryName: 'سياسة', difficulty: 400, question: 'من هو أول رئيس للولايات المتحدة الأمريكية؟', answer: 'جورج واشنطن' },
        { id: 'politics_4', categoryId: 'politics', categoryName: 'سياسة', difficulty: 400, question: 'ما هي الدول الدائمة العضوية في مجلس الأمن؟', answer: 'الولايات المتحدة، روسيا، الصين، بريطانيا، فرنسا' },
        { id: 'politics_5', categoryId: 'politics', categoryName: 'سياسة', difficulty: 600, question: 'متى تأسست جامعة الدول العربية؟', answer: '1945' },
        { id: 'politics_6', categoryId: 'politics', categoryName: 'سياسة', difficulty: 600, question: 'ما هو النظام السياسي في المملكة المتحدة؟', answer: 'ملكية دستورية' },
        { id: 'politics_7', categoryId: 'politics', categoryName: 'سياسة', difficulty: 200, question: 'ما هو مقر الاتحاد الأوروبي؟', answer: 'بروكسل' },
        { id: 'politics_8', categoryId: 'politics', categoryName: 'سياسة', difficulty: 400, question: 'ما هي أقدم ديمقراطية في العالم؟', answer: 'أثينا القديمة' },
      ],
    };
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
