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
const localQuestions: { [key: string]: LocalQuestion[] } = {
  'general': [
    // --- 200 نقطة (67 سؤالاً) ---
    { id: 'general_1', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي أكبر دولة في العالم من حيث المساحة؟', answer: 'روسيا' },
    { id: 'general_2', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'ما هي عملة اليابان؟', answer: 'الين' },
    { id: 'general_3', categoryId: 'general', categoryName: 'معلومات عامة', difficulty: 200, question: 'كم عدد قارات العالم؟', answer: 'سبع قارات' },
    // ... المزيد من الأسئلة
  ],
  'history': [
    // أسئلة التاريخ
    { id: 'history_1', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'متى بدأت الحرب العالمية الأولى؟', answer: '1914' },
    { id: 'history_2', categoryId: 'history', categoryName: 'تاريخ', difficulty: 200, question: 'من هو أول رئيس للولايات المتحدة الأمريكية؟', answer: 'جورج واشنطن' },
    // ... المزيد من الأسئلة
  ],
  'geography': [
    // أسئلة الجغرافيا
    { id: 'geography_1', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي أطول سلسلة جبال في العالم؟', answer: 'جبال الأنديز' },
    { id: 'geography_2', categoryId: 'geography', categoryName: 'جغرافيا', difficulty: 200, question: 'ما هي أكبر صحراء في العالم؟', answer: 'الصحراء الكبرى' },
    // ... المزيد من الأسئلة
  ],
  'science': [
    // أسئلة العلوم
    { id: 'science_1', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هو العنصر الكيميائي الأكثر وفرة في الكون؟', answer: 'الهيدروجين' },
    { id: 'science_2', categoryId: 'science', categoryName: 'علوم', difficulty: 200, question: 'ما هي وحدة قياس القوة؟', answer: 'نيوتن' },
    // ... المزيد من الأسئلة
  ],
  'sports': [
    // أسئلة الرياضة
    { id: 'sports_1', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'كم عدد لاعبي فريق كرة القدم؟', answer: '11 لاعب' },
    { id: 'sports_2', categoryId: 'sports', categoryName: 'رياضة', difficulty: 200, question: 'ما هي الدولة التي فازت بأكبر عدد من كؤوس العالم لكرة القدم؟', answer: 'البرازيل' },
    // ... المزيد من الأسئلة
  ],
  'religion': [
    // أسئلة الدين والثقافة
    { id: 'religion_1', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'ما هي أقدم ديانة سماوية؟', answer: 'اليهودية' },
    { id: 'religion_2', categoryId: 'religion', categoryName: 'دين وثقافة', difficulty: 200, question: 'كم عدد الأناجيل المعتمدة في المسيحية؟', answer: 'أربعة' },
    // ... المزيد من الأسئلة
  ],
  'technology': [
    // أسئلة التكنولوجيا
    { id: 'technology_1', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'من هو مؤسس شركة مايكروسوفت؟', answer: 'بيل غيتس' },
    { id: 'technology_2', categoryId: 'technology', categoryName: 'تكنولوجيا', difficulty: 200, question: 'ما هو لغة البرمجة الأكثر استخداماً في تطوير الويب؟', answer: 'جافاسكريبت' },
    // ... المزيد من الأسئلة
  ],
  'music': [
    // أسئلة الموسيقى
    { id: 'music_1', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'من هو ملك البوب؟', answer: 'مايكل جاكسون' },
    { id: 'music_2', categoryId: 'music', categoryName: 'موسيقى', difficulty: 200, question: 'ما هي الآلة الموسيقية التي تعتبر ملكة الآلات الموسيقية؟', answer: 'البيانو' },
    // ... المزيد من الأسئلة
  ],
  'movies': [
    // أسئلة الأفلام والسينما
    { id: 'movies_1', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'من هو مخرج فيلم تيتانيك؟', answer: 'جيمس كاميرون' },
    { id: 'movies_2', categoryId: 'movies', categoryName: 'أفلام وسينما', difficulty: 200, question: 'ما هو أعلى فيلم تحقيقاً للإيرادات في التاريخ؟', answer: 'أفينجرز: إند جيم' },
    // ... المزيد من الأسئلة
  ],
  'literature': [
    // أسئلة الأدب
    { id: 'literature_1', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف رواية الحرب والسلام؟', answer: 'ليو تولستوي' },
    { id: 'literature_2', categoryId: 'literature', categoryName: 'أدب', difficulty: 200, question: 'من هو مؤلف مسرحية هاملت؟', answer: 'ويليام شكسبير' },
    // ... المزيد من الأسئلة
  ],
  'food': [
    // أسئلة الطعام والطبخ
    { id: 'food_1', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هو الطبق الوطني لإيطاليا؟', answer: 'البيتزا / الباستا' },
    { id: 'food_2', categoryId: 'food', categoryName: 'طعام وطبخ', difficulty: 200, question: 'ما هي المكونات الرئيسية للسوشي؟', answer: 'الأرز والسمك النيء' },
    // ... المزيد من الأسئلة
  ],
  'art': [
    // أسئلة الفن والعمارة
    { id: 'art_1', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 200, question: 'من رسم لوحة الموناليزا؟', answer: 'ليوناردو دافنشي' },
    { id: 'art_2', categoryId: 'art', categoryName: 'فن وعمارة', difficulty: 200, question: 'ما هو اسم المهندس المعماري الذي صمم برج إيفل؟', answer: 'غوستاف إيفل' },
    // ... المزيد من الأسئلة
  ],
  'celebrities': [
    // أسئلة الشخصيات المشهورة
    { id: 'celebrities_1', categoryId: 'celebrities', categoryName: 'شخصيات مشهورة', difficulty: 200, question: 'من هو مؤسس شركة أبل؟', answer: 'ستيف جوبز' },
    { id: 'celebrities_2', categoryId: 'celebrities', categoryName: 'شخصيات مشهورة', difficulty: 200, question: 'من هو أول إنسان يصل إلى القمر؟', answer: 'نيل أرمسترونغ' },
    // ... المزيد من الأسئلة
  ],
  'wonders': [
    // أسئلة عجائب العالم
    { id: 'wonders_1', categoryId: 'wonders', categoryName: 'عجائب العالم', difficulty: 200, question: 'أين يقع تاج محل؟', answer: 'الهند' },
    { id: 'wonders_2', categoryId: 'wonders', categoryName: 'عجائب العالم', difficulty: 200, question: 'ما هي أطول عجائب الدنيا السبع القديمة عمراً؟', answer: 'الأهرامات المصرية' },
    // ... المزيد من الأسئلة
  ],
  'inventions': [
    // أسئلة الاختراعات والاكتشافات
    { id: 'inventions_1', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 200, question: 'من اخترع المصباح الكهربائي؟', answer: 'توماس إديسون' },
    { id: 'inventions_2', categoryId: 'inventions', categoryName: 'اختراعات واكتشافات', difficulty: 200, question: 'من اكتشف البنسلين؟', answer: 'ألكسندر فليمنغ' },
    // ... المزيد من الأسئلة
  ],
  'puzzles': [
    // أسئلة الألغاز والألعاب
    { id: 'puzzles_1', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 200, question: 'ما هي أشهر لعبة ألغاز مكعبة في العالم؟', answer: 'مكعب روبيك' },
    { id: 'puzzles_2', categoryId: 'puzzles', categoryName: 'ألغاز وألعاب', difficulty: 200, question: 'ما هي اللعبة التي تستخدم فيها الأحجار السوداء والبيضاء على لوحة مربعة؟', answer: 'الشطرنج / الجو' },
    // ... المزيد من الأسئلة
  ],
  'economy': [
    // أسئلة العملات والاقتصاد
    { id: 'economy_1', categoryId: 'economy', categoryName: 'عملات واقتصاد', difficulty: 200, question: 'ما هي العملة المستخدمة في اليابان؟', answer: 'الين' },
    { id: 'economy_2', categoryId: 'economy', categoryName: 'عملات واقتصاد', difficulty: 200, question: 'ما هي أكبر بورصة في العالم؟', answer: 'بورصة نيويورك' },
    // ... المزيد من الأسئلة
  ],
  'health': [
    // أسئلة الطب والصحة
    { id: 'health_1', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 200, question: 'ما هو أكبر عضو في جسم الإنسان؟', answer: 'الجلد' },
    { id: 'health_2', categoryId: 'health', categoryName: 'طب وصحة', difficulty: 200, question: 'كم عدد العظام في جسم الإنسان البالغ؟', answer: '206 عظمة' },
    // ... المزيد من الأسئلة
  ]
};

// دالة للحصول على الأسئلة حسب الفئة
export const getLocalQuestions = () => {
  return localQuestions;
};

// دالة للحصول على جميع الأسئلة في مصفوفة واحدة
export const getAllLocalQuestions = () => {
  let allQuestions: LocalQuestion[] = [];
  
  Object.keys(localQuestions).forEach(category => {
    allQuestions = [...allQuestions, ...localQuestions[category]];
  });
  
  return allQuestions;
};

export default localQuestions;
