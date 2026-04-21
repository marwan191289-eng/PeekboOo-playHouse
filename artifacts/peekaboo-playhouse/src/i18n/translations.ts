export type Lang = "ar" | "en";

export const translations = {
  brand: { ar: "بيكابو", en: "Peekaboo" },
  tagline: { ar: "بيت التعلم والمرح", en: "Play House" },
  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    letters: { ar: "الحروف", en: "Letters" },
    numbers: { ar: "الأرقام", en: "Numbers" },
    animals: { ar: "الحيوانات", en: "Animals" },
    colors: { ar: "الألوان", en: "Colors" },
    songs: { ar: "الأغاني", en: "Songs" },
    videos: { ar: "الفيديوهات", en: "Videos" },
    quiz: { ar: "الاختبار", en: "Quiz" },
    teacher: { ar: "المعلم الذكي", en: "AI Teacher" },
  },
  hero: {
    title: { ar: "مرحبًا بك في بيكابو!", en: "Welcome to Peekaboo!" },
    subtitle: {
      ar: "تطبيق تعليمي وترفيهي شامل للأطفال — احرف، أرقام، حيوانات، ألوان، أغاني، وألعاب ذكية!",
      en: "A complete learning playground for kids — letters, numbers, animals, colors, songs, and smart games!",
    },
    start: { ar: "ابدأ التعلم", en: "Start Learning" },
    askTeacher: { ar: "اسأل المعلم الذكي", en: "Ask the Smart Teacher" },
  },
  common: {
    listen: { ar: "استمع", en: "Listen" },
    next: { ar: "التالي", en: "Next" },
    back: { ar: "السابق", en: "Back" },
    correct: { ar: "أحسنت!", en: "Awesome!" },
    tryAgain: { ar: "حاول مرة أخرى", en: "Try again" },
    score: { ar: "نقاطك", en: "Your stars" },
    addSong: { ar: "أضف أغنية", en: "Add a song" },
    addVideo: { ar: "أضف فيديو", en: "Add a video" },
    save: { ar: "حفظ", en: "Save" },
    cancel: { ar: "إلغاء", en: "Cancel" },
    title: { ar: "العنوان", en: "Title" },
    youtubeUrl: { ar: "رابط يوتيوب", en: "YouTube URL" },
    play: { ar: "تشغيل", en: "Play" },
    poweredBy: { ar: "مدعوم بالذكاء الاصطناعي", en: "Powered by AI" },
    rewardEarned: { ar: "حصلت على نجمة!", en: "You earned a star!" },
    perfectScore: { ar: "إجابة كاملة! أنت بطل!", en: "Perfect score! You're a champion!" },
    chooseAnswer: { ar: "اختر الإجابة الصحيحة", en: "Choose the correct answer" },
    startQuiz: { ar: "ابدأ الاختبار", en: "Start the quiz" },
    restartQuiz: { ar: "أعد الاختبار", en: "Restart" },
    quizDone: { ar: "انتهى الاختبار", en: "Quiz finished" },
    yourFriend: { ar: "صديقك الذكي", en: "Your smart friend" },
    sayHi: { ar: "قل مرحباً وابدأ المغامرة", en: "Say hi and start the adventure" },
    placeholder: { ar: "اكتب سؤالك هنا...", en: "Type your question..." },
  },
  pages: {
    letters: {
      title: { ar: "تعلم الحروف", en: "Learn Letters" },
      subtitle: { ar: "اضغط على أي حرف لسماع نطقه", en: "Tap any letter to hear it" },
    },
    numbers: {
      title: { ar: "تعلم الأرقام", en: "Learn Numbers" },
      subtitle: { ar: "تعرف على الأرقام من 1 إلى 20", en: "Discover numbers 1 to 20" },
    },
    animals: {
      title: { ar: "عالم الحيوانات", en: "Animal World" },
      subtitle: { ar: "تعرف على أصدقائنا في الغابة", en: "Meet our friends in the wild" },
    },
    colors: {
      title: { ar: "الألوان السحرية", en: "Magic Colors" },
      subtitle: { ar: "تعرف على الألوان بأسمائها", en: "Discover colors and their names" },
    },
    songs: {
      title: { ar: "أغاني الأطفال", en: "Kids Songs" },
      subtitle: { ar: "أغاني ممتعة بالعربية والإنجليزية", en: "Fun songs in Arabic and English" },
    },
    videos: {
      title: { ar: "فيديوهات تعليمية", en: "Educational Videos" },
      subtitle: { ar: "فيديوهات تعليمية وترفيهية مختارة", en: "Curated learning fun" },
    },
    quiz: {
      title: { ar: "اختبارات ذكية", en: "Smart Quizzes" },
      subtitle: { ar: "تحدّ نفسك واربح النجوم!", en: "Challenge yourself and win stars!" },
    },
    teacher: {
      title: { ar: "المعلم الذكي", en: "AI Teacher" },
      subtitle: { ar: "صديقك الذكي يجيب على كل أسئلتك", en: "Your smart friend answers every question" },
    },
  },
} as const;

export function t(path: string, lang: Lang): string {
  const parts = path.split(".");
  let node: any = translations;
  for (const p of parts) node = node?.[p];
  if (!node) return path;
  return node[lang] ?? node.en ?? path;
}
