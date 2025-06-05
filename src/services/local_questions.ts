
// واجهة لتخزين الأسئلة
interface LocalQuestion {
  id: string;
  categoryId: string;
  categoryName: string;
  difficulty: number;
  question: string;
  answer: string;
  options?: string[]; // اختياري للأسئلة متعددة الخيارات
}

// قاعدة بيانات الأسئلة المحلية
const localQuestionsDatabase: { [key: string]: LocalQuestion[] } = {
  'general': [
    // 200 نقطة
    { id: 'general_1', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي أكبر دولة في العالم من حيث المساحة؟', answer: 'روسيا' },
    { id: 'general_2', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي عملة اليابان؟', answer: 'الين' },
    { id: 'general_7', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي عاصمة أستراليا؟', answer: 'كانبرا' },
    // ... (إضافة المزيد من أسئلة 200 نقطة حتى 67 سؤالاً)
    
    // 400 نقطة
    { id: 'general_3', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 400, question: 'ما هو أطول نهر في العالم؟', answer: 'نهر النيل' },
    { id: 'general_4', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 400, question: 'ما هو أكبر محيط في العالم؟', answer: 'المحيط الهادئ' },
    { id: 'general_8', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 400, question: 'كم عدد القارات في العالم؟', answer: 'سبع قارات' },
    // ... (إضافة المزيد من أسئلة 400 نقطة حتى 67 سؤالاً)
    
    // 600 نقطة
    { id: 'general_5', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 600, question: 'ما هي أكثر لغة يتحدث بها الناس في العالم؟', answer: 'الماندرين الصينية' },
    { id: 'general_6', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 600, question: 'ما هو اسم أعمق نقطة في المحيطات؟', answer: 'خندق ماريانا' },
    // ... (إضافة المزيد من أسئلة 600 نقطة حتى 66 سؤالاً)
  ],
  'history': [
    // 200 نقطة
    { id: 'history_1', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'في أي عام وقعت الحرب العالمية الأولى؟', answer: '1914' },
    { id: 'history_2', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'من بنى الأهرامات في مصر؟', answer: 'الفراعنة' },
    { id: 'history_7', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'في أي عام تأسست المملكة العربية السعودية؟', answer: '1932' },
    // ... (إضافة المزيد من أسئلة 200 نقطة حتى 67 سؤالاً)
    
    // 400 نقطة
    { id: 'history_3', categoryId: 'history', categoryName: 'تاريخ', difficulty: 400, question: 'من هو أول رئيس للولايات المتحدة الأمريكية؟', answer: 'جورج واشنطن' },
    { id: 'history_4', categoryId: 'history', categoryName: 'تاريخ', difficulty: 400, question: 'ما هي الحضارة التي ازدهرت في بلاد ما بين النهرين؟', answer: 'الحضارة السومرية/البابلية' },
    { id: 'history_8', categoryId: 'history', categoryName: 'تاريخ', difficulty: 400, question: 'من هو الخليفة الراشدي الثاني؟', answer: 'عمر بن الخطاب' },
    // ... (إضافة المزيد من أسئلة 400 نقطة حتى 67 سؤالاً)
    
    // 600 نقطة
    { id: 'history_5', categoryId: 'history', categoryName: 'تاريخ', difficulty: 600, question: 'ما اسم المعاهدة التي أنهت الحرب العالمية الأولى؟', answer: 'معاهدة فرساي' },
    { id: 'history_6', categoryId: 'history', categoryName: 'تاريخ', difficulty: 600, question: 'من هو القائد المغولي الذي أسس إمبراطورية واسعة؟', answer: 'جنكيز خان' },
    // ... (إضافة المزيد من أسئلة 600 نقطة حتى 66 سؤالاً)
  ],
  'geography': [
    // 200 نقطة
    { id: 'geography_1', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي عاصمة اليابان؟', answer: 'طوكيو' },
    { id: 'geography_2', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي أكبر قارة في العالم؟', answer: 'آسيا' },
    { id: 'geography_7', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي عاصمة المغرب؟', answer: 'الرباط' },
    // ... (إضافة المزيد من أسئلة 200 نقطة حتى 67 سؤالاً)
    
    // 400 نقطة
    { id: 'geography_3', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 400, question: 'ما هو أعلى جبل في العالم؟', answer: 'جبل إيفرست' },
    { id: 'geography_4', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 400, question: 'أين يقع نهر الأمازون؟', answer: 'أمريكا الجنوبية' },
    { id: 'geography_8', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 400, question: 'ما هو المضيق الذي يفصل بين آسيا وأمريكا الشمالية؟', answer: 'مضيق بيرنغ' },
    // ... (إضافة المزيد من أسئلة 400 نقطة حتى 67 سؤالاً)
    
    // 600 نقطة
    { id: 'geography_5', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 600, question: 'ما هي أكبر صحراء في العالم؟', answer: 'الصحراء الكبرى' },
    { id: 'geography_6', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 600, question: 'ما هي الدولة التي تقع في قارتين؟', answer: 'روسيا/تركيا' },
    // ... (إضافة المزيد من أسئلة 600 نقطة حتى 66 سؤالاً)
  ],
  // ... (إضافة 15 فئة أخرى بنفس الطريقة)
  'science': [],
  'sports': [],
  'religion': [],
  'technology': [],
  'music': [],
  'movies': [],
  'literature': [],
  'food': [],
  'art': [],
  'celebrities': [], // اعرف المشهور
  'world_wonders': [], // عجائب العالم
  'inventions': [], // اختراعات واكتشافات
  'puzzles': [], // ألغاز وألعاب
  'economy': [], // عملات وعلم الاقتصاد
  'health': [] // طب وصحة
};

// دالة لتصدير قاعدة البيانات
export const getLocalQuestions = (): { [key: string]: LocalQuestion[] } => {
  return localQuestionsDatabase;
};

// دالة لتصدير جميع الأسئلة في مصفوفة واحدة
export const getAllLocalQuestions = (): LocalQuestion[] => {
  return Object.values(localQuestionsDatabase).flat();
};



  // ... (تكملة الفئات السابقة)
  
  'science': [
    // 200 نقطة (67 سؤالاً)
    { id: 'science_1', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو العنصر الكيميائي الأكثر وفرة في الكون؟', answer: 'الهيدروجين' },
    { id: 'science_2', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو الكوكب الأقرب إلى الشمس؟', answer: 'عطارد' },
    { id: 'science_7', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو الغاز الذي نستنشقه للتنفس؟', answer: 'الأكسجين' },
    { id: 'science_9', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو أكبر عضو في جسم الإنسان؟', answer: 'الجلد' },
    { id: 'science_10', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'كم عدد الكواكب في نظامنا الشمسي؟', answer: 'ثمانية' },
    { id: 'science_11', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هي العملية التي تحول بها النباتات ضوء الشمس إلى طاقة؟', answer: 'التمثيل الضوئي' },
    { id: 'science_12', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو الرمز الكيميائي للماء؟', answer: 'H2O' },
    // ... (إضافة 60 سؤالاً إضافياً من فئة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'science_3', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هي وحدة قياس القوة في النظام الدولي؟', answer: 'نيوتن' },
    { id: 'science_4', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هي سرعة الضوء في الفراغ؟', answer: 'حوالي 300,000 كم/ثانية' },
    { id: 'science_8', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هو الحمض النووي المسؤول عن نقل الصفات الوراثية؟', answer: 'الحمض النووي (DNA)' },
    { id: 'science_13', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هو الكوكب الأحمر؟', answer: 'المريخ' },
    { id: 'science_14', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هي العملية التي يتحول بها الماء إلى بخار؟', answer: 'التبخر' },
    { id: 'science_15', categoryId: 'science', categoryName: 'علوم', difficulty: 400, question: 'ما هو اسم المجرة التي نعيش فيها؟', answer: 'درب التبانة' },
    // ... (إضافة 61 سؤالاً إضافياً من فئة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'science_5', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'ما هو قانون نيوتن الثالث للحركة؟', answer: 'لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه' },
    { id: 'science_6', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'من هو العالم الذي وضع نظرية النسبية؟', answer: 'ألبرت أينشتاين' },
    { id: 'science_16', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'ما هو الثقب الأسود؟', answer: 'منطقة في الفضاء ذات جاذبية قوية جداً لا يمكن للضوء الهروب منها' },
    { id: 'science_17', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'ما هو اسم أصغر جسيم في الذرة؟', answer: 'الكوارك (ضمن مكونات البروتون والنيوترون)' },
    { id: 'science_18', categoryId: 'science', categoryName: 'علوم', difficulty: 600, question: 'ما هي النظرية التي تفسر نشأة الكون؟', answer: 'نظرية الانفجار العظيم' },
    // ... (إضافة 61 سؤالاً إضافياً من فئة 600 نقطة)
  ],
  'sports': [
    // 200 نقطة (67 سؤالاً)
    { id: 'sports_1', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'كم عدد اللاعبين في فريق كرة القدم؟', answer: '11' },
    { id: 'sports_2', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'ما هي الدولة التي فازت بكأس العالم لكرة القدم 2022؟', answer: 'الأرجنتين' },
    { id: 'sports_7', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'ما هي الرياضة الأكثر شعبية في العالم؟', answer: 'كرة القدم' },
    { id: 'sports_9', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'ما هي الألوان الخمسة للحلقات الأولمبية؟', answer: 'أزرق، أصفر، أسود، أخضر، أحمر' },
    { id: 'sports_10', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'كم عدد الأشواط في مباراة كرة السلة؟', answer: 'أربعة أرباع' },
    { id: 'sports_11', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'ما هي الدولة التي تشتهر برياضة الكريكيت؟', answer: 'الهند / أستراليا / إنجلترا' },
    // ... (إضافة 61 سؤالاً إضافياً من فئة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'sports_3', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'في أي رياضة يستخدم المضرب والريشة؟', answer: 'الريشة الطائرة' },
    { id: 'sports_4', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'ما اسم أسرع رجل في العالم؟', answer: 'يوسين بولت' },
    { id: 'sports_8', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'كم عدد لاعبي كرة السلة في الملعب لكل فريق؟', answer: '5' },
    { id: 'sports_12', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'ما هي بطولة التنس الكبرى التي تقام على الملاعب العشبية؟', answer: 'ويمبلدون' },
    { id: 'sports_13', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'ما هي الرياضة التي تعرف باسم "رياضة الملوك"؟', answer: 'البولو' },
    { id: 'sports_14', categoryId: 'sports', categoryName: 'رياضة', difficulty: 400, question: 'من هو الملاكم الذي اشتهر بلقب "الأعظم"؟', answer: 'محمد علي كلاي' },
    // ... (إضافة 61 سؤالاً إضافياً من فئة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'sports_5', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'كم مرة أقيمت دورة الألعاب الأولمبية في اليابان؟', answer: '4 مرات' },
    { id: 'sports_6', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'ما هي الرياضة التي يلعبها ليبرون جيمس؟', answer: 'كرة السلة' },
    { id: 'sports_15', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'ما هو سباق الدراجات الأكثر شهرة في العالم؟', answer: 'طواف فرنسا (Tour de France)' },
    { id: 'sports_16', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'ما هو عدد الثقوب في ملعب الجولف القياسي؟', answer: '18' },
    { id: 'sports_17', categoryId: 'sports', categoryName: 'رياضة', difficulty: 600, question: 'ما هي الدولة التي فازت بأكبر عدد من الميداليات الذهبية في تاريخ الألعاب الأولمبية الصيفية؟', answer: 'الولايات المتحدة الأمريكية' },
    // ... (إضافة 61 سؤالاً إضافياً من فئة 600 نقطة)
  ],
  'religion': [],
  'technology': [],
  'music': [],
  'movies': [],
  'literature': [],
  'food': [],
  'art': [],
  'celebrities': [],
  'world_wonders': [],
  'inventions': [],
  'puzzles': [],
  'economy': [],
  'health': []
};

  'religion': [
    // 200 نقطة (67 سؤالاً)
    { id: 'religion_1', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو الكتاب المقدس للديانة الإسلامية؟', answer: 'القرآن الكريم' },
    { id: 'religion_2', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو شهر الصيام عند المسلمين؟', answer: 'رمضان' },
    { id: 'religion_7', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو الركن الخامس من أركان الإسلام؟', answer: 'الحج' },
    { id: 'religion_9', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو الكتاب المقدس للديانة المسيحية؟', answer: 'الإنجيل (الكتاب المقدس)' },
    { id: 'religion_10', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو الكتاب المقدس للديانة اليهودية؟', answer: 'التوراة' },
    { id: 'religion_11', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو اسم أول مسجد بني في الإسلام؟', answer: 'مسجد قباء' },
    { id: 'religion_12', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هو عدد الصلوات المفروضة في اليوم للمسلمين؟', answer: 'خمس صلوات' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'religion_3', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'من هو أول الخلفاء الراشدين في الإسلام؟', answer: 'أبو بكر الصديق' },
    { id: 'religion_4', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'ما هي الديانة التي يؤمن بها معظم سكان الهند؟', answer: 'الهندوسية' },
    { id: 'religion_8', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'من هو نبي المسيحية؟', answer: 'عيسى (المسيح)' },
    { id: 'religion_13', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'ما هي أقدم ديانة لا تزال موجودة في العالم؟', answer: 'الهندوسية' },
    { id: 'religion_14', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'من هو مؤسس البوذية؟', answer: 'سيدهارتا غوتاما (بوذا)' },
    { id: 'religion_15', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 400, question: 'ما هو اسم الجبل الذي نزل عليه الوحي على النبي محمد لأول مرة؟', answer: 'جبل حراء (جبل النور)' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'religion_5', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'كم عدد الأركان في الإسلام؟', answer: 'خمسة' },
    { id: 'religion_6', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'ما هو اسم المكان المقدس لليهود في القدس؟', answer: 'حائط المبكى' },
    { id: 'religion_16', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'ما هي الديانة التي تؤمن بالكارما والتناسخ؟', answer: 'الهندوسية والبوذية' },
    { id: 'religion_17', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'من هو الإمام الذي أسس المذهب الشافعي؟', answer: 'محمد بن إدريس الشافعي' },
    { id: 'religion_18', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 600, question: 'ما هو اسم الكتاب المقدس للديانة السيخية؟', answer: 'غورو غرانث صاحب' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'technology': [
    // 200 نقطة (67 سؤالاً)
    { id: 'technology_1', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'من هو مؤسس شركة مايكروسوفت؟', answer: 'بيل غيتس' },
    { id: 'technology_2', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو اسم أشهر محرك بحث على الإنترنت؟', answer: 'جوجل' },
    { id: 'technology_7', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو نظام التشغيل الأكثر استخداماً في الهواتف الذكية؟', answer: 'أندرويد' },
    { id: 'technology_9', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو اختصار RAM في الحاسوب؟', answer: 'ذاكرة الوصول العشوائي (Random Access Memory)' },
    { id: 'technology_10', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو اسم الشبكة الاجتماعية التي أسسها مارك زوكربيرج؟', answer: 'فيسبوك' },
    { id: 'technology_11', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو اسم الشركة المصنعة لهاتف آيفون؟', answer: 'أبل' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'technology_3', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هي لغة البرمجة الأكثر استخداماً في تطوير الويب؟', answer: 'جافاسكريبت' },
    { id: 'technology_4', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو اسم أول قمر صناعي أطلق إلى الفضاء؟', answer: 'سبوتنيك 1' },
    { id: 'technology_8', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو اسم الشركة التي طورت آيفون؟', answer: 'أبل' },
    { id: 'technology_12', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو البروتوكول المستخدم لتصفح الإنترنت؟', answer: 'HTTP/HTTPS' },
    { id: 'technology_13', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو اسم مؤسس شركة تسلا وسبيس إكس؟', answer: 'إيلون ماسك' },
    { id: 'technology_14', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 400, question: 'ما هو اسم أول حاسوب محمول في العالم؟', answer: 'أوزبورن 1' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'technology_5', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'ما هو اسم أول حاسوب إلكتروني في العالم؟', answer: 'إنياك (ENIAC)' },
    { id: 'technology_6', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'من هو مخترع الهاتف؟', answer: 'ألكسندر غراهام بيل' },
    { id: 'technology_15', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'ما هو اسم أول متصفح ويب تجاري؟', answer: 'نتسكيب نافيجيتور' },
    { id: 'technology_16', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'من هو مخترع الشبكة العنكبوتية العالمية (WWW)؟', answer: 'تيم بيرنرز لي' },
    { id: 'technology_17', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 600, question: 'ما هو اسم التقنية التي تستخدم سلسلة من الكتل لتسجيل المعاملات؟', answer: 'بلوكتشين (Blockchain)' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'music': [
    // 200 نقطة (67 سؤالاً)
    { id: 'music_1', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'ما هي الآلة الموسيقية التي تعتبر ملكة الآلات الموسيقية؟', answer: 'البيانو' },
    { id: 'music_2', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'من هي المغنية التي تلقب بـ "كوكب الشرق"؟', answer: 'أم كلثوم' },
    { id: 'music_7', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'ما هي الآلة الموسيقية ذات الأوتار الستة؟', answer: 'الجيتار' },
    { id: 'music_9', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'ما هي الآلة الموسيقية الوترية الشهيرة في الموسيقى العربية؟', answer: 'العود' },
    { id: 'music_10', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'من هو الموسيقار الذي لقب بـ "موتسارت العرب"؟', answer: 'محمد عبد الوهاب' },
    { id: 'music_11', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'ما هي الآلة الموسيقية التي تعزف عليها فرقة الروك؟', answer: 'الجيتار الكهربائي' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'music_3', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'من هو مؤلف السيمفونية التاسعة؟', answer: 'بيتهوفن' },
    { id: 'music_4', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'ما هي الآلة الموسيقية التي تشتهر بها اسكتلندا؟', answer: 'مزمار القربة' },
    { id: 'music_8', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'من هو مؤلف أوبرا عايدة؟', answer: 'جوزيبي فيردي' },
    { id: 'music_12', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'ما هو اسم الفرقة الموسيقية البريطانية التي اشتهرت بأغنية "Bohemian Rhapsody"؟', answer: 'كوين (Queen)' },
    { id: 'music_13', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'من هو مغني أغنية "Thriller"؟', answer: 'مايكل جاكسون' },
    { id: 'music_14', categoryId: 'music', categoryName: 'موسيقى', difficulty: 400, question: 'ما هو اسم الآلة الموسيقية التي تشبه الكمان لكنها أكبر حجماً؟', answer: 'التشيلو' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'music_5', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'كم عدد النوتات الموسيقية الأساسية؟', answer: 'سبع نوتات' },
    { id: 'music_6', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'من هو ملك موسيقى البوب؟', answer: 'مايكل جاكسون' },
    { id: 'music_15', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'من هو الموسيقار الذي أكمل تأليف سيمفونيته التاسعة وهو أصم؟', answer: 'لودفيج فان بيتهوفن' },
    { id: 'music_16', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'ما هو اسم الفرقة الموسيقية التي كان جون لينون أحد أعضائها؟', answer: 'البيتلز (The Beatles)' },
    { id: 'music_17', categoryId: 'music', categoryName: 'موسيقى', difficulty: 600, question: 'ما هو المقام الموسيقي الذي يعتبر أساس الموسيقى العربية؟', answer: 'مقام الراست' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'movies': [
    // 200 نقطة (67 سؤالاً)
    { id: 'movies_1', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'من هو مخرج فيلم تيتانيك؟', answer: 'جيمس كاميرون' },
    { id: 'movies_2', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'ما هو اسم الفيلم الذي تدور أحداثه في مدرسة هوغوورتس للسحر؟', answer: 'هاري بوتر' },
    { id: 'movies_7', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'ما هو اسم الفيلم الذي يظهر فيه الشخصية الخيالية فورست غامب؟', answer: 'فورست غامب' },
    { id: 'movies_9', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'ما هو اسم الفيلم الذي يظهر فيه الشخصية الخيالية جاك سبارو؟', answer: 'قراصنة الكاريبي' },
    { id: 'movies_10', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'من هو بطل فيلم "المصري"؟', answer: 'عمر الشريف' },
    { id: 'movies_11', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'ما هو اسم الفيلم الذي يظهر فيه شخصية باتمان؟', answer: 'فارس الظلام (The Dark Knight)' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'movies_3', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'ما هو الفيلم الذي حصل على أكبر عدد من جوائز الأوسكار؟', answer: 'تيتانيك / بن هور / سيد الخواتم: عودة الملك (11)' },
    { id: 'movies_4', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'من هو الممثل الذي لعب دور "الجوكر" في فيلم "فارس الظلام"؟', answer: 'هيث ليدجر' },
    { id: 'movies_8', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'من هو بطل فيلم المصارع (Gladiator)؟', answer: 'راسل كرو' },
    { id: 'movies_12', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'من هو مخرج فيلم "العراب" (The Godfather)؟', answer: 'فرانسيس فورد كوبولا' },
    { id: 'movies_13', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'ما هو اسم الفيلم الذي يظهر فيه شخصية هانيبال ليكتر؟', answer: 'صمت الحملان (The Silence of the Lambs)' },
    { id: 'movies_14', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 400, question: 'من هي الممثلة التي لعبت دور روز في فيلم تيتانيك؟', answer: 'كيت وينسلت' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'movies_5', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'من هو الممثل الذي لعب دور جاك سبارو في سلسلة أفلام قراصنة الكاريبي؟', answer: 'جوني ديب' },
    { id: 'movies_6', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'ما هو أول فيلم رسوم متحركة طويل من إنتاج ديزني؟', answer: 'سنو وايت والأقزام السبعة' },
    { id: 'movies_15', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'من هو المخرج الياباني الشهير الذي أخرج فيلم "راشومون"؟', answer: 'أكيرا كوروساوا' },
    { id: 'movies_16', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'ما هو اسم الاستوديو الياباني الشهير للرسوم المتحركة الذي أسسه هاياو ميازاكي؟', answer: 'استوديو غيبلي' },
    { id: 'movies_17', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 600, question: 'من هو الممثل الذي فاز بجائزة الأوسكار لأفضل ممثل ثلاث مرات؟', answer: 'دانيال داي لويس' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'literature': [
    // 200 نقطة (67 سؤالاً)
    { id: 'literature_1', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف رواية الحرب والسلام؟', answer: 'ليو تولستوي' },
    { id: 'literature_2', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'ما هو اسم الكتاب الذي يضم قصص ألف ليلة وليلة؟', answer: 'ألف ليلة وليلة' },
    { id: 'literature_7', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف كتاب كليلة ودمنة؟', answer: 'بيدبا (ترجمه ابن المقفع)' },
    { id: 'literature_9', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف رواية "البؤساء"؟', answer: 'فيكتور هوغو' },
    { id: 'literature_10', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو الشاعر الذي كتب معلقة "قفا نبك من ذكرى حبيب ومنزل"؟', answer: 'امرؤ القيس' },
    { id: 'literature_11', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف مسرحية "روميو وجولييت"؟', answer: 'وليام شكسبير' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'literature_3', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف مسرحية هاملت؟', answer: 'وليام شكسبير' },
    { id: 'literature_4', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف رواية "دون كيشوت"؟', answer: 'ميغيل دي سرفانتس' },
    { id: 'literature_8', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف رواية "الشيخ والبحر"؟', answer: 'إرنست همنغواي' },
    { id: 'literature_12', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف رواية "الجريمة والعقاب"؟', answer: 'فيودور دوستويفسكي' },
    { id: 'literature_13', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو الشاعر العربي الملقب بـ "المتنبي"؟', answer: 'أحمد بن الحسين المتنبي' },
    { id: 'literature_14', categoryId: 'literature', categoryName: 'أدب', difficulty: 400, question: 'من هو مؤلف رواية "مائة عام من العزلة"؟', answer: 'غابرييل غارسيا ماركيز' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'literature_5', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'من هو الأديب العربي الذي لقب بأمير الشعراء؟', answer: 'أحمد شوقي' },
    { id: 'literature_6', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'ما هي أول رواية في التاريخ؟', answer: 'قصة غنجي (اليابان)' },
    { id: 'literature_15', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'من هو مؤلف ملحمة الإلياذة والأوديسة؟', answer: 'هوميروس' },
    { id: 'literature_16', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'من هو الشاعر العربي الذي لقب بـ "شاعر النيل"؟', answer: 'حافظ إبراهيم' },
    { id: 'literature_17', categoryId: 'literature', categoryName: 'أدب', difficulty: 600, question: 'من هو مؤلف كتاب "النبي"؟', answer: 'جبران خليل جبران' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ]

  'food': [
    // 200 نقطة (67 سؤالاً)
    { id: 'food_1', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو الطبق الوطني للمكسيك؟', answer: 'التاكو' },
    { id: 'food_2', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو المكون الرئيسي في طبق السوشي الياباني؟', answer: 'الأرز' },
    { id: 'food_9', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو الطبق الوطني للسعودية؟', answer: 'الكبسة' },
    { id: 'food_10', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو المكون الرئيسي في الحمص؟', answer: 'الحمص (البقوليات)' },
    { id: 'food_11', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو الطبق الإيطالي المصنوع من العجين والجبن وصلصة الطماطم؟', answer: 'البيتزا' },
    { id: 'food_12', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو المشروب الأكثر استهلاكاً في العالم بعد الماء؟', answer: 'الشاي' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'food_3', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو أصل القهوة؟', answer: 'إثيوبيا' },
    { id: 'food_4', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو الطبق الإيطالي الشهير المصنوع من المعكرونة واللحم المفروم وصلصة الطماطم؟', answer: 'بولونيز' },
    { id: 'food_13', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو الطبق الياباني المصنوع من شرائح السمك النيء؟', answer: 'ساشيمي' },
    { id: 'food_14', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو الطبق المغربي الشهير المصنوع من اللحم والخضروات؟', answer: 'الطاجين' },
    { id: 'food_15', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 400, question: 'ما هو نوع الجبن المستخدم تقليدياً في البيتزا؟', answer: 'جبن الموزاريلا' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'food_5', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هو الجبن الفرنسي الذي يشتهر برائحته القوية؟', answer: 'روكفور' },
    { id: 'food_6', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هو اسم الفلفل الحار الذي يعتبر الأكثر حرارة في العالم؟', answer: 'كارولينا ريبر' },
    { id: 'food_16', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هو الطبق الفرنسي المصنوع من كبد البط المشبع بالدهن؟', answer: 'فوا غرا' },
    { id: 'food_17', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هو اسم التقنية اليابانية لتقطيع الطعام بشكل فني؟', answer: 'موكيموني' },
    { id: 'food_18', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 600, question: 'ما هو اسم النبيذ الفرنسي الفوار الشهير؟', answer: 'شامبانيا' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'art': [
    // 200 نقطة (67 سؤالاً)
    { id: 'art_1', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 200, question: 'من رسم لوحة الموناليزا؟', answer: 'ليوناردو دافنشي' },
    { id: 'art_2', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 200, question: 'ما هو اسم البرج المائل الشهير في إيطاليا؟', answer: 'برج بيزا المائل' },
    { id: 'art_9', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 200, question: 'من هو الفنان الذي رسم لوحة "صرخة"؟', answer: 'إدفارد مونك' },
    { id: 'art_10', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 200, question: 'ما هو اسم المتحف الشهير في باريس الذي يضم لوحة الموناليزا؟', answer: 'متحف اللوفر' },
    { id: 'art_11', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 200, question: 'ما هو الطراز المعماري للجامع الأموي في دمشق؟', answer: 'الطراز الأموي الإسلامي' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'art_3', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 400, question: 'من هو الفنان الهولندي الذي قطع جزءاً من أذنه؟', answer: 'فينسنت فان غوخ' },
    { id: 'art_4', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 400, question: 'ما هو اسم المهندس المعماري الذي صمم برج إيفل؟', answer: 'غوستاف إيفل' },
    { id: 'art_12', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 400, question: 'ما هو الطراز المعماري لكاتدرائية نوتردام في باريس؟', answer: 'القوطي' },
    { id: 'art_13', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 400, question: 'من هو الفنان الإسباني الذي اشتهر بأسلوب التكعيبية؟', answer: 'بابلو بيكاسو' },
    { id: 'art_14', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 400, question: 'ما هو اسم الفن الياباني لطي الورق؟', answer: 'الأوريغامي' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'art_5', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 600, question: 'من هو الفنان الذي رسم سقف كنيسة سيستين في الفاتيكان؟', answer: 'مايكل أنجلو' },
    { id: 'art_6', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 600, question: 'ما هو اسم المهندس المعماري الإسباني الذي صمم كنيسة ساغرادا فاميليا؟', answer: 'أنطوني غاودي' },
    { id: 'art_15', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 600, question: 'ما هو اسم الحركة الفنية التي ظهرت في أوائل القرن العشرين وتميزت بالأشكال الهندسية والخطوط المستقيمة؟', answer: 'الباوهاوس' },
    { id: 'art_16', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 600, question: 'من هو المهندس المعماري الذي صمم متحف غوغنهايم في بلباو؟', answer: 'فرانك غيري' },
    { id: 'art_17', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 600, question: 'ما هو اسم الفن الإسلامي الذي يعتمد على الزخارف الهندسية والنباتية؟', answer: 'الأرابيسك' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'celebrities': [
    // 200 نقطة (67 سؤالاً)
    { id: 'celebrities_1', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 200, question: 'من هو مؤسس شركة مايكروسوفت؟', answer: 'بيل غيتس' },
    { id: 'celebrities_2', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 200, question: 'من هو مؤسس شركة أبل؟', answer: 'ستيف جوبز' },
    { id: 'celebrities_9', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 200, question: 'من هو الممثل الذي لعب دور جاك في فيلم تيتانيك؟', answer: 'ليوناردو دي كابريو' },
    { id: 'celebrities_10', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 200, question: 'من هو الرئيس الأمريكي الذي قاد الولايات المتحدة خلال الحرب العالمية الثانية؟', answer: 'فرانكلين روزفلت' },
    { id: 'celebrities_11', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 200, question: 'من هو مؤسس موقع فيسبوك؟', answer: 'مارك زوكربيرج' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'celebrities_3', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 400, question: 'من هو العالم الذي اكتشف الجاذبية؟', answer: 'إسحاق نيوتن' },
    { id: 'celebrities_4', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 400, question: 'من هو مخترع المصباح الكهربائي؟', answer: 'توماس إديسون' },
    { id: 'celebrities_12', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 400, question: 'من هو الفيزيائي الذي وضع نظرية النسبية؟', answer: 'ألبرت أينشتاين' },
    { id: 'celebrities_13', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 400, question: 'من هو الرسام الذي قطع أذنه؟', answer: 'فينسنت فان غوخ' },
    { id: 'celebrities_14', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 400, question: 'من هو المغني الملقب بملك البوب؟', answer: 'مايكل جاكسون' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'celebrities_5', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 600, question: 'من هو العالم العربي الذي اخترع الجبر؟', answer: 'الخوارزمي' },
    { id: 'celebrities_6', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 600, question: 'من هو الفيلسوف اليوناني الذي علم الإسكندر الأكبر؟', answer: 'أرسطو' },
    { id: 'celebrities_15', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 600, question: 'من هو الطبيب العربي الذي ألف كتاب "القانون في الطب"؟', answer: 'ابن سينا' },
    { id: 'celebrities_16', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 600, question: 'من هو المخرج الياباني الذي أخرج فيلم "راشومون"؟', answer: 'أكيرا كوروساوا' },
    { id: 'celebrities_17', categoryId: 'celebrities', categoryName: 'اعرف المشهور', difficulty: 600, question: 'من هو الفيزيائي البريطاني الذي اكتشف الإلكترون؟', answer: 'جوزيف جون طومسون' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'world_wonders': [
    // 200 نقطة (67 سؤالاً)
    { id: 'world_wonders_1', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 200, question: 'ما هي أطول سلسلة جبال في العالم؟', answer: 'جبال الأنديز' },
    { id: 'world_wonders_2', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 200, question: 'ما هو أكبر محيط في العالم؟', answer: 'المحيط الهادئ' },
    { id: 'world_wonders_9', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 200, question: 'ما هو أطول نهر في العالم؟', answer: 'نهر النيل' },
    { id: 'world_wonders_10', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 200, question: 'ما هي أكبر صحراء في العالم؟', answer: 'الصحراء الكبرى' },
    { id: 'world_wonders_11', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 200, question: 'ما هو أعلى شلال في العالم؟', answer: 'شلال آنجل' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'world_wonders_3', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 400, question: 'ما هي أكبر جزيرة في العالم؟', answer: 'جرينلاند' },
    { id: 'world_wonders_4', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 400, question: 'ما هو أعمق خندق في المحيط؟', answer: 'خندق ماريانا' },
    { id: 'world_wonders_12', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 400, question: 'ما هو أكبر بحر داخلي في العالم؟', answer: 'بحر قزوين' },
    { id: 'world_wonders_13', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 400, question: 'ما هو أكبر بركان نشط في العالم؟', answer: 'مونا لوا في هاواي' },
    { id: 'world_wonders_14', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 400, question: 'ما هي أكبر شعاب مرجانية في العالم؟', answer: 'الحاجز المرجاني العظيم' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'world_wonders_5', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 600, question: 'ما هي أعلى هضبة في العالم؟', answer: 'هضبة التبت' },
    { id: 'world_wonders_6', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 600, question: 'ما هو أكبر خليج في العالم؟', answer: 'خليج البنغال' },
    { id: 'world_wonders_15', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 600, question: 'ما هو اسم أكبر كهف في العالم؟', answer: 'كهف سون دونغ' },
    { id: 'world_wonders_16', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 600, question: 'ما هو اسم أكبر دلتا نهرية في العالم؟', answer: 'دلتا نهر الغانج' },
    { id: 'world_wonders_17', categoryId: 'world_wonders', categoryName: 'عجائب العالم', difficulty: 600, question: 'ما هو اسم أكبر بحيرة مياه عذبة من حيث الحجم في العالم؟', answer: 'بحيرة بايكال' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'inventions': [
    // 200 نقطة (67 سؤالاً)
    { id: 'inventions_1', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 200, question: 'من اخترع المصباح الكهربائي؟', answer: 'توماس إديسون' },
    { id: 'inventions_2', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 200, question: 'من اخترع الهاتف؟', answer: 'ألكسندر غراهام بيل' },
    { id: 'inventions_9', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 200, question: 'من اخترع الطائرة؟', answer: 'الأخوان رايت' },
    { id: 'inventions_10', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 200, question: 'من اخترع البنسلين؟', answer: 'ألكسندر فلمنج' },
    { id: 'inventions_11', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 200, question: 'من اخترع الإنترنت؟', answer: 'تيم بيرنرز لي' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'inventions_3', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 400, question: 'من اخترع الديناميت؟', answer: 'ألفريد نوبل' },
    { id: 'inventions_4', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 400, question: 'من اكتشف الأشعة السينية؟', answer: 'فيلهلم رونتجن' },
    { id: 'inventions_12', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 400, question: 'من اخترع المحرك البخاري؟', answer: 'جيمس واط' },
    { id: 'inventions_13', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 400, question: 'من اخترع الراديو؟', answer: 'غوليلمو ماركوني' },
    { id: 'inventions_14', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 400, question: 'من اكتشف النظرية النسبية؟', answer: 'ألبرت أينشتاين' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'inventions_5', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 600, question: 'من اخترع الترانزستور؟', answer: 'جون باردين، والتر براتين، ووليام شوكلي' },
    { id: 'inventions_6', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 600, question: 'من اكتشف النشاط الإشعاعي؟', answer: 'هنري بيكريل' },
    { id: 'inventions_15', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 600, question: 'من اخترع الليزر؟', answer: 'تيودور مايمان' },
    { id: 'inventions_16', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 600, question: 'من اخترع الإسطرلاب؟', answer: 'الإغريق القدماء (تم تطويره لاحقاً من قبل العلماء المسلمين)' },
    { id: 'inventions_17', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 600, question: 'من اكتشف الدورة الدموية؟', answer: 'وليام هارفي' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'puzzles': [
    // 200 نقطة (67 سؤالاً)
    { id: 'puzzles_1', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 200, question: 'ما هي اللعبة التي تستخدم فيها 32 قطعة على رقعة مربعة؟', answer: 'الشطرنج' },
    { id: 'puzzles_2', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 200, question: 'ما هي اللعبة التي تهدف فيها إلى إسقاط جميع الأوتاد العشرة بكرة؟', answer: 'البولينج' },
    { id: 'puzzles_9', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 200, question: 'ما هي اللعبة التي تستخدم فيها أحجار الدومينو؟', answer: 'الدومينو' },
    { id: 'puzzles_10', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 200, question: 'ما هي اللعبة التي تستخدم فيها ورق اللعب وتهدف إلى جمع أربع بطاقات من نفس الرقم؟', answer: 'البوكر' },
    { id: 'puzzles_11', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 200, question: 'ما هي اللعبة اليابانية التي تهدف إلى ملء شبكة 9×9 بالأرقام؟', answer: 'سودوكو' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'puzzles_3', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 400, question: 'ما هي اللعبة التي تستخدم فيها مكعب ملون بستة ألوان مختلفة؟', answer: 'مكعب روبيك' },
    { id: 'puzzles_4', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 400, question: 'ما هي اللعبة التي تهدف فيها إلى وضع علامة X أو O في شبكة 3×3؟', answer: 'إكس أو (XO)' },
    { id: 'puzzles_12', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 400, question: 'ما هي اللعبة التي تستخدم فيها أحجار ملونة وتهدف إلى تكوين صف من أربعة أحجار من نفس اللون؟', answer: 'كونكت فور (Connect Four)' },
    { id: 'puzzles_13', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 400, question: 'ما هي اللعبة التي تستخدم فيها قطع بلاستيكية وتهدف إلى بناء أطول برج ممكن؟', answer: 'جينجا (Jenga)' },
    { id: 'puzzles_14', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 400, question: 'ما هي اللعبة التي تستخدم فيها لوحة وأحجار سوداء وبيضاء وتهدف إلى السيطرة على أكبر مساحة ممكنة؟', answer: 'جو (Go)' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'puzzles_5', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 600, question: 'ما هي اللعبة التي تستخدم فيها 144 قطعة وتهدف إلى تكوين مجموعات من نفس النوع؟', answer: 'ماهجونغ' },
    { id: 'puzzles_6', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 600, question: 'ما هي اللعبة اليابانية التي تهدف فيها إلى حل لغز منطقي باستخدام الأرقام والخطوط؟', answer: 'كاكورو' },
    { id: 'puzzles_15', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 600, question: 'ما هي اللعبة التي تستخدم فيها النرد وتهدف إلى نقل جميع الأحجار خارج اللوحة؟', answer: 'الطاولة (باكجامون)' },
    { id: 'puzzles_16', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 600, question: 'ما هي اللعبة التي تستخدم فيها 78 بطاقة وتستخدم للتنبؤ بالمستقبل؟', answer: 'التارو' },
    { id: 'puzzles_17', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 600, question: 'ما هي اللعبة الصينية التقليدية التي تستخدم فيها 32 قطعة وتشبه الشطرنج؟', answer: 'شيانغتشي (الشطرنج الصيني)' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'economy': [
    // 200 نقطة (67 سؤالاً)
    { id: 'economy_1', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 200, question: 'ما هي عملة اليابان؟', answer: 'الين' },
    { id: 'economy_2', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 200, question: 'ما هي عملة المملكة المتحدة؟', answer: 'الجنيه الإسترليني' },
    { id: 'economy_9', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 200, question: 'ما هي العملة المشتركة لدول الاتحاد الأوروبي؟', answer: 'اليورو' },
    { id: 'economy_10', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 200, question: 'ما هي عملة الصين؟', answer: 'اليوان' },
    { id: 'economy_11', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 200, question: 'ما هي عملة مصر؟', answer: 'الجنيه المصري' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'economy_3', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 400, question: 'ما هو اسم البورصة الرئيسية في نيويورك؟', answer: 'بورصة نيويورك (NYSE)' },
    { id: 'economy_4', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 400, question: 'ما هو اسم العملة الرقمية الأكثر شهرة؟', answer: 'بيتكوين' },
    { id: 'economy_12', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 400, question: 'ما هو اسم المؤشر الرئيسي لبورصة طوكيو؟', answer: 'نيكي 225' },
    { id: 'economy_13', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 400, question: 'ما هو اسم المؤسسة المالية الدولية التي تقدم قروضاً للدول النامية؟', answer: 'البنك الدولي' },
    { id: 'economy_14', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 400, question: 'ما هو اسم النظام الاقتصادي الذي يعتمد على الملكية الخاصة وحرية السوق؟', answer: 'الرأسمالية' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'economy_5', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 600, question: 'من هو الاقتصادي البريطاني الذي كتب كتاب "ثروة الأمم"؟', answer: 'آدم سميث' },
    { id: 'economy_6', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 600, question: 'ما هو اسم الاتفاقية التي أسست منظمة التجارة العالمية؟', answer: 'اتفاقية مراكش' },
    { id: 'economy_15', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 600, question: 'ما هو اسم النظرية الاقتصادية التي طورها جون مينارد كينز؟', answer: 'النظرية الكينزية' },
    { id: 'economy_16', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 600, question: 'ما هو اسم الظاهرة الاقتصادية التي تحدث عندما ترتفع الأسعار وينخفض النمو الاقتصادي في نفس الوقت؟', answer: 'الركود التضخمي' },
    { id: 'economy_17', categoryId: 'economy', categoryName: 'عملات وعلم الاقتصاد', difficulty: 600, question: 'ما هو اسم المؤشر الذي يقيس تكلفة المعيشة في بلد ما؟', answer: 'مؤشر أسعار المستهلك (CPI)' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ],
  'health': [
    // 200 نقطة (67 سؤالاً)
    { id: 'health_1', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 200, question: 'ما هو العضو المسؤول عن تنقية الدم في جسم الإنسان؟', answer: 'الكلى' },
    { id: 'health_2', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 200, question: 'ما هو العضو المسؤول عن إنتاج الأنسولين في جسم الإنسان؟', answer: 'البنكرياس' },
    { id: 'health_9', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 200, question: 'ما هو العضو الأكبر في جسم الإنسان؟', answer: 'الجلد' },
    { id: 'health_10', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 200, question: 'ما هو العنصر الغذائي الذي يساعد في بناء العضلات؟', answer: 'البروتين' },
    { id: 'health_11', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 200, question: 'ما هو الفيتامين الذي ينتجه الجسم عند التعرض لأشعة الشمس؟', answer: 'فيتامين د' },
    // ... (إضافة المزيد من أسئلة 200 نقطة)
    
    // 400 نقطة (67 سؤالاً)
    { id: 'health_3', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 400, question: 'ما هو اسم المرض الذي يسببه نقص فيتامين C؟', answer: 'الإسقربوط' },
    { id: 'health_4', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 400, question: 'ما هو اسم الهرمون المسؤول عن تنظيم مستوى السكر في الدم؟', answer: 'الأنسولين' },
    { id: 'health_12', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 400, question: 'ما هو اسم المرض الذي يسبب ارتفاع ضغط الدم المزمن؟', answer: 'فرط ضغط الدم (Hypertension)' },
    { id: 'health_13', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 400, question: 'ما هو اسم الخلايا المسؤولة عن مكافحة العدوى في جسم الإنسان؟', answer: 'خلايا الدم البيضاء' },
    { id: 'health_14', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 400, question: 'ما هو اسم العملية التي يحول بها الجسم الطعام إلى طاقة؟', answer: 'التمثيل الغذائي (الأيض)' },
    // ... (إضافة المزيد من أسئلة 400 نقطة)
    
    // 600 نقطة (66 سؤالاً)
    { id: 'health_5', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 600, question: 'ما هو اسم المرض الذي يسبب تلف الأعصاب بسبب نقص فيتامين B1؟', answer: 'مرض بري بري' },
    { id: 'health_6', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 600, question: 'ما هو اسم الجزء من الدماغ المسؤول عن التوازن والتنسيق الحركي؟', answer: 'المخيخ' },
    { id: 'health_15', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 600, question: 'ما هو اسم المرض الذي يسبب تصلب الشرايين؟', answer: 'تصلب الشرايين (Atherosclerosis)' },
    { id: 'health_16', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 600, question: 'ما هو اسم الاضطراب الذي يسبب نوبات من فقدان الوعي بسبب نشاط كهربائي غير طبيعي في الدماغ؟', answer: 'الصرع' },
    { id: 'health_17', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 600, question: 'ما هو اسم الهرمون المسؤول عن تنظيم مستوى الكالسيوم في الدم؟', answer: 'هرمون الغدة الدرقية (الكالسيتونين)' },
    // ... (إضافة المزيد من أسئلة 600 نقطة)
  ]
