import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Trophy } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewards } from "@/contexts/RewardsContext";
import { speak } from "@/lib/speech";
import { quizQuestions } from "@/data/learning";

export default function Quiz() {
  const { lang, t } = useLanguage();
  const { addStars, celebrate } = useRewards();
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quizQuestions[idx];

  const start = () => {
    setStarted(true);
    setIdx(0);
    setScore(0);
    setChosen(null);
    setDone(false);
  };

  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.answer) {
      setScore((s) => s + 1);
      addStars(2);
      celebrate(t("common.correct"));
      speak(lang === "ar" ? "أحسنت" : "Awesome", { lang });
    } else {
      speak(lang === "ar" ? "حاول مرة أخرى" : "Try again", { lang });
    }
    setTimeout(() => {
      if (idx + 1 >= quizQuestions.length) {
        setDone(true);
        if (score + (i === q.answer ? 1 : 0) === quizQuestions.length) {
          celebrate(t("common.perfectScore"));
        }
      } else {
        setIdx((p) => p + 1);
        setChosen(null);
      }
    }, 1300);
  };

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto">
      <PageHeader
        title={t("pages.quiz.title")}
        subtitle={t("pages.quiz.subtitle")}
        emoji="🧠"
        color="#8338EC"
      />

      {!started && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-10 text-center border-4 border-[#8338EC]"
        >
          <div className="text-7xl mb-4">🎮</div>
          <p className="text-lg text-slate-600 mb-6 font-bold">
            {lang === "ar"
              ? `${quizQuestions.length} أسئلة ممتعة بانتظارك!`
              : `${quizQuestions.length} fun questions waiting for you!`}
          </p>
          <button
            onClick={start}
            className="bg-gradient-to-r from-[#8338EC] to-[#EF476F] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-transform"
          >
            {t("common.startQuiz")}
          </button>
        </motion.div>
      )}

      {started && !done && (
        <motion.div
          key={idx}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 border-4 border-[#8338EC]"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-500">
              {idx + 1} / {quizQuestions.length}
            </span>
            <span className="text-sm font-bold text-[#06D6A0]">
              {t("common.score")}: {score}
            </span>
          </div>

          <div className="text-center mb-8">
            {q.emoji && <div className="text-7xl mb-3">{q.emoji}</div>}
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-800">
              {q.question[lang]}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isCorrect = chosen !== null && i === q.answer;
              const isWrong = chosen === i && i !== q.answer;
              return (
                <motion.button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={chosen !== null}
                  whileHover={chosen === null ? { scale: 1.03 } : {}}
                  whileTap={chosen === null ? { scale: 0.97 } : {}}
                  className={`p-4 rounded-2xl font-bold text-lg flex items-center justify-between border-4 transition-colors ${
                    isCorrect
                      ? "bg-[#06D6A0] text-white border-[#06D6A0]"
                      : isWrong
                      ? "bg-[#EF476F] text-white border-[#EF476F]"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#8338EC]"
                  }`}
                >
                  <span>{opt[lang]}</span>
                  {isCorrect && <Check size={22} />}
                  {isWrong && <X size={22} />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl p-10 text-center border-4 border-[#FFD166]"
          >
            <Trophy size={80} className="mx-auto text-[#FFD166] mb-4" fill="#FFD166" />
            <h2 className="font-display text-3xl font-extrabold text-[#8338EC] mb-2">
              {t("common.quizDone")}
            </h2>
            <p className="text-2xl font-bold text-slate-700 mb-6">
              {score} / {quizQuestions.length}
            </p>
            <button
              onClick={start}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8338EC] to-[#EF476F] text-white px-7 py-3 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform"
            >
              <RotateCcw size={20} />
              {t("common.restartQuiz")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
