export const arabicLetters = [
  { ch: "أ", name: "ألف", word: "أرنب", emoji: "🐰" },
  { ch: "ب", name: "باء", word: "بطة", emoji: "🦆" },
  { ch: "ت", name: "تاء", word: "تفاحة", emoji: "🍎" },
  { ch: "ث", name: "ثاء", word: "ثعلب", emoji: "🦊" },
  { ch: "ج", name: "جيم", word: "جمل", emoji: "🐪" },
  { ch: "ح", name: "حاء", word: "حصان", emoji: "🐴" },
  { ch: "خ", name: "خاء", word: "خروف", emoji: "🐑" },
  { ch: "د", name: "دال", word: "دب", emoji: "🐻" },
  { ch: "ذ", name: "ذال", word: "ذرة", emoji: "🌽" },
  { ch: "ر", name: "راء", word: "رمان", emoji: "🍑" },
  { ch: "ز", name: "زاي", word: "زرافة", emoji: "🦒" },
  { ch: "س", name: "سين", word: "سمكة", emoji: "🐟" },
  { ch: "ش", name: "شين", word: "شمس", emoji: "☀️" },
  { ch: "ص", name: "صاد", word: "صقر", emoji: "🦅" },
  { ch: "ض", name: "ضاد", word: "ضفدع", emoji: "🐸" },
  { ch: "ط", name: "طاء", word: "طائرة", emoji: "✈️" },
  { ch: "ظ", name: "ظاء", word: "ظبي", emoji: "🦌" },
  { ch: "ع", name: "عين", word: "عصفور", emoji: "🐦" },
  { ch: "غ", name: "غين", word: "غزال", emoji: "🦌" },
  { ch: "ف", name: "فاء", word: "فيل", emoji: "🐘" },
  { ch: "ق", name: "قاف", word: "قطة", emoji: "🐱" },
  { ch: "ك", name: "كاف", word: "كلب", emoji: "🐶" },
  { ch: "ل", name: "لام", word: "ليمون", emoji: "🍋" },
  { ch: "م", name: "ميم", word: "موزة", emoji: "🍌" },
  { ch: "ن", name: "نون", word: "نحلة", emoji: "🐝" },
  { ch: "ه", name: "هاء", word: "هدهد", emoji: "🐦" },
  { ch: "و", name: "واو", word: "وردة", emoji: "🌹" },
  { ch: "ي", name: "ياء", word: "يد", emoji: "✋" },
];

export const englishLetters = [
  { ch: "A", word: "Apple", emoji: "🍎" },
  { ch: "B", word: "Bear", emoji: "🐻" },
  { ch: "C", word: "Cat", emoji: "🐱" },
  { ch: "D", word: "Dog", emoji: "🐶" },
  { ch: "E", word: "Elephant", emoji: "🐘" },
  { ch: "F", word: "Fish", emoji: "🐟" },
  { ch: "G", word: "Giraffe", emoji: "🦒" },
  { ch: "H", word: "Horse", emoji: "🐴" },
  { ch: "I", word: "Ice cream", emoji: "🍦" },
  { ch: "J", word: "Jellyfish", emoji: "🪼" },
  { ch: "K", word: "Kangaroo", emoji: "🦘" },
  { ch: "L", word: "Lion", emoji: "🦁" },
  { ch: "M", word: "Monkey", emoji: "🐵" },
  { ch: "N", word: "Nest", emoji: "🪺" },
  { ch: "O", word: "Octopus", emoji: "🐙" },
  { ch: "P", word: "Panda", emoji: "🐼" },
  { ch: "Q", word: "Queen", emoji: "👑" },
  { ch: "R", word: "Rabbit", emoji: "🐰" },
  { ch: "S", word: "Sun", emoji: "☀️" },
  { ch: "T", word: "Tiger", emoji: "🐯" },
  { ch: "U", word: "Umbrella", emoji: "☂️" },
  { ch: "V", word: "Violin", emoji: "🎻" },
  { ch: "W", word: "Whale", emoji: "🐳" },
  { ch: "X", word: "Xylophone", emoji: "🎶" },
  { ch: "Y", word: "Yacht", emoji: "⛵" },
  { ch: "Z", word: "Zebra", emoji: "🦓" },
];

export const numbers = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1;
  const arNames = [
    "واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة",
    "أحد عشر","اثنا عشر","ثلاثة عشر","أربعة عشر","خمسة عشر","ستة عشر","سبعة عشر","ثمانية عشر","تسعة عشر","عشرون",
  ];
  const enNames = [
    "One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
    "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty",
  ];
  const arDigits = ["١","٢","٣","٤","٥","٦","٧","٨","٩","١٠","١١","١٢","١٣","١٤","١٥","١٦","١٧","١٨","١٩","٢٠"];
  return {
    value: n,
    en: { digit: String(n), name: enNames[i] },
    ar: { digit: arDigits[i], name: arNames[i] },
    emoji: "⭐".repeat(Math.min(n, 10)),
  };
});

export const animals = [
  { emoji: "🐶", ar: { name: "كلب", sound: "هو هو" }, en: { name: "Dog", sound: "Woof woof" } },
  { emoji: "🐱", ar: { name: "قطة", sound: "ميو ميو" }, en: { name: "Cat", sound: "Meow meow" } },
  { emoji: "🐮", ar: { name: "بقرة", sound: "موو" }, en: { name: "Cow", sound: "Moo" } },
  { emoji: "🐷", ar: { name: "خنزير", sound: "غنغ" }, en: { name: "Pig", sound: "Oink" } },
  { emoji: "🐔", ar: { name: "دجاجة", sound: "كاكاكا" }, en: { name: "Chicken", sound: "Cluck cluck" } },
  { emoji: "🐑", ar: { name: "خروف", sound: "ماع" }, en: { name: "Sheep", sound: "Baa" } },
  { emoji: "🐴", ar: { name: "حصان", sound: "هيهي" }, en: { name: "Horse", sound: "Neigh" } },
  { emoji: "🐘", ar: { name: "فيل", sound: "بررر" }, en: { name: "Elephant", sound: "Trumpet" } },
  { emoji: "🦁", ar: { name: "أسد", sound: "زئير" }, en: { name: "Lion", sound: "Roar" } },
  { emoji: "🐯", ar: { name: "نمر", sound: "هرر" }, en: { name: "Tiger", sound: "Growl" } },
  { emoji: "🐻", ar: { name: "دب", sound: "غررر" }, en: { name: "Bear", sound: "Growl" } },
  { emoji: "🐵", ar: { name: "قرد", sound: "أو أو" }, en: { name: "Monkey", sound: "Ooh ooh" } },
  { emoji: "🦒", ar: { name: "زرافة", sound: "هممم" }, en: { name: "Giraffe", sound: "Hum" } },
  { emoji: "🐰", ar: { name: "أرنب", sound: "" }, en: { name: "Rabbit", sound: "" } },
  { emoji: "🐸", ar: { name: "ضفدع", sound: "نقنق" }, en: { name: "Frog", sound: "Ribbit" } },
  { emoji: "🦆", ar: { name: "بطة", sound: "بطبط" }, en: { name: "Duck", sound: "Quack" } },
  { emoji: "🐟", ar: { name: "سمكة", sound: "" }, en: { name: "Fish", sound: "" } },
  { emoji: "🐝", ar: { name: "نحلة", sound: "زززز" }, en: { name: "Bee", sound: "Bzzz" } },
];

export const colors = [
  { hex: "#EF476F", ar: "أحمر وردي", en: "Pink Red" },
  { hex: "#F77F00", ar: "برتقالي", en: "Orange" },
  { hex: "#FFD166", ar: "أصفر", en: "Yellow" },
  { hex: "#06D6A0", ar: "أخضر", en: "Green" },
  { hex: "#118AB2", ar: "أزرق", en: "Blue" },
  { hex: "#8338EC", ar: "بنفسجي", en: "Purple" },
  { hex: "#FF99C8", ar: "وردي", en: "Pink" },
  { hex: "#FCF6BD", ar: "كريمي", en: "Cream" },
  { hex: "#000000", ar: "أسود", en: "Black" },
  { hex: "#FFFFFF", ar: "أبيض", en: "White" },
  { hex: "#A0522D", ar: "بني", en: "Brown" },
  { hex: "#9CA3AF", ar: "رمادي", en: "Gray" },
];

export interface MediaItem {
  id: string;
  title: string;
  youtubeId: string;
  lang: "ar" | "en";
}

export const defaultSongs: MediaItem[] = [
  { id: "s1", title: "أنشودة الحروف العربية", youtubeId: "TUWyGuOXulU", lang: "ar" },
  { id: "s2", title: "أرقام بالعربية للأطفال", youtubeId: "pejl1G0YeUg", lang: "ar" },
  { id: "s3", title: "ABC Song", youtubeId: "75p-N9YKqNo", lang: "en" },
  { id: "s4", title: "Numbers Song 1-20", youtubeId: "D0Ajq682yrA", lang: "en" },
  { id: "s5", title: "Old MacDonald", youtubeId: "_6HzoUcx3eo", lang: "en" },
  { id: "s6", title: "أغنية الألوان", youtubeId: "Yu0rZAHOPCs", lang: "ar" },
];

export const defaultVideos: MediaItem[] = [
  { id: "v1", title: "تعلم الحيوانات وأصواتها", youtubeId: "wcLNxqDbiHk", lang: "ar" },
  { id: "v2", title: "Learn Colors with Crayons", youtubeId: "ybt2DSREAQs", lang: "en" },
  { id: "v3", title: "Animal Sounds for Kids", youtubeId: "Em8UcMaR8t0", lang: "en" },
  { id: "v4", title: "تعلم الأشكال للأطفال", youtubeId: "U46Yo_6z_F4", lang: "ar" },
];

export interface QuizQuestion {
  question: { ar: string; en: string };
  options: { ar: string; en: string }[];
  answer: number;
  emoji?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    emoji: "🐶",
    question: { ar: "ما اسم هذا الحيوان؟", en: "What animal is this?" },
    options: [
      { ar: "قطة", en: "Cat" },
      { ar: "كلب", en: "Dog" },
      { ar: "أرنب", en: "Rabbit" },
      { ar: "أسد", en: "Lion" },
    ],
    answer: 1,
  },
  {
    emoji: "🍎",
    question: { ar: "ما لون التفاحة؟", en: "What color is the apple?" },
    options: [
      { ar: "أزرق", en: "Blue" },
      { ar: "أخضر", en: "Green" },
      { ar: "أحمر", en: "Red" },
      { ar: "أصفر", en: "Yellow" },
    ],
    answer: 2,
  },
  {
    emoji: "5️⃣",
    question: { ar: "ما هذا الرقم؟", en: "What number is this?" },
    options: [
      { ar: "ثلاثة", en: "Three" },
      { ar: "أربعة", en: "Four" },
      { ar: "خمسة", en: "Five" },
      { ar: "ستة", en: "Six" },
    ],
    answer: 2,
  },
  {
    emoji: "🦁",
    question: { ar: "أي حيوان ملك الغابة؟", en: "Who is the king of the jungle?" },
    options: [
      { ar: "الفيل", en: "Elephant" },
      { ar: "الأسد", en: "Lion" },
      { ar: "النمر", en: "Tiger" },
      { ar: "الدب", en: "Bear" },
    ],
    answer: 1,
  },
  {
    emoji: "☀️",
    question: { ar: "ما الذي يشرق في النهار؟", en: "What shines in the daytime?" },
    options: [
      { ar: "القمر", en: "Moon" },
      { ar: "النجوم", en: "Stars" },
      { ar: "الشمس", en: "Sun" },
      { ar: "السحاب", en: "Cloud" },
    ],
    answer: 2,
  },
  {
    emoji: "🐝",
    question: { ar: "ماذا تصنع النحلة؟", en: "What does the bee make?" },
    options: [
      { ar: "حليب", en: "Milk" },
      { ar: "عسل", en: "Honey" },
      { ar: "خبز", en: "Bread" },
      { ar: "ماء", en: "Water" },
    ],
    answer: 1,
  },
  {
    emoji: "🐟",
    question: { ar: "أين تعيش السمكة؟", en: "Where does the fish live?" },
    options: [
      { ar: "في الشجرة", en: "In a tree" },
      { ar: "في الماء", en: "In the water" },
      { ar: "في الكهف", en: "In a cave" },
      { ar: "في السماء", en: "In the sky" },
    ],
    answer: 1,
  },
  {
    emoji: "🌈",
    question: { ar: "كم لون في قوس قزح؟", en: "How many colors in a rainbow?" },
    options: [
      { ar: "خمسة", en: "Five" },
      { ar: "ستة", en: "Six" },
      { ar: "سبعة", en: "Seven" },
      { ar: "ثمانية", en: "Eight" },
    ],
    answer: 2,
  },
];
