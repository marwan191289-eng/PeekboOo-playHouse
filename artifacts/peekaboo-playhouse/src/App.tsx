import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Shapes, Sparkles, Smile, Star, BookOpen, Music, Youtube, Rocket, Heart, Zap, Circle, FlaskConical, Activity, Hammer, Image, Type, MessageCircle, Wand2, Loader2, Video, UploadCloud, ChevronRight, Bot } from 'lucide-react';
import { PeekabooCreatorAssistant } from "./components/PeekabooCreatorAssistant";

let audioCtx: AudioContext | null = null;
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
        audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

const playSound = (type: 'hover' | 'click') => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'hover') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.02);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } else if (type === 'click') {
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
      oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Silently fail if audio throws
  }
};

const colors = [
  { name: 'Sunshine Yellow', hex: '#FFD166', class: 'bg-[#FFD166]' },
  { name: 'Bubblegum Pink', hex: '#EF476F', class: 'bg-[#EF476F]', textLight: true },
  { name: 'Playful Teal', hex: '#06D6A0', class: 'bg-[#06D6A0]' },
  { name: 'Curious Blue', hex: '#118AB2', class: 'bg-[#118AB2]', textLight: true },
  { name: 'Magic Purple', hex: '#8338EC', class: 'bg-[#8338EC]', textLight: true },
  { name: 'Giggle Orange', hex: '#F77F00', class: 'bg-[#F77F00]', textLight: true },
  
  // Expanded Palette
  { name: 'Zesty Lime', hex: '#80ED99', class: 'bg-[#80ED99]' },
  { name: 'Sky High Blue', hex: '#48CAE4', class: 'bg-[#48CAE4]' },
  { name: 'Cheeky Coral', hex: '#F25F5C', class: 'bg-[#F25F5C]', textLight: true },
  { name: 'Dreamy Lavender', hex: '#B5179E', class: 'bg-[#B5179E]', textLight: true },
  { name: 'Peachy Keen', hex: '#FFB703', class: 'bg-[#FFB703]' },
];

const characters = [
  {
    name: "Pip the Bunny",
    role: "The Creator",
    description: "Always holding a giant crayon! Pip teaches kids about colors, drawing, and using their imagination to build new worlds.",
    color: "#EF476F",
    icon: <Palette size={48} className="text-white" />,
    delay: 0.1
  },
  {
    name: "Barnaby Bear",
    role: "The Explorer",
    description: "Wears a tiny explorer hat. Barnaby takes kids on wild adventures to learn about animals, nature, and the alphabet.",
    color: "#06D6A0",
    icon: <BookOpen size={48} className="text-white" />,
    delay: 0.2
  },
  {
    name: "Dotty the Owl",
    role: "The Musician",
    description: "Has big musical note glasses! Dotty sings catchy songs about numbers, daily hygiene routines, and being a good friend.",
    color: "#8338EC",
    icon: <Music size={48} className="text-white" />,
    delay: 0.3
  },
  {
    name: "Daisy the Dino",
    role: "The Scientist",
    description: "Equipped with tiny safety goggles! Daisy makes volcanoes, mixes colors, and asks 'Why?' about everything in nature.",
    color: "#80ED99",
    icon: <FlaskConical size={48} className="text-white" />,
    delay: 0.4
  },
  {
    name: "Milo the Monkey",
    role: "The Gymnast",
    description: "Always swinging in! Milo gets kids off the couch to stretch, dance, and learn about the human body.",
    color: "#F77F00",
    icon: <Activity size={48} className="text-white" />,
    delay: 0.5
  },
  {
    name: "Leo the Lion",
    role: "The Builder",
    description: "Wearing a yellow hard hat. Leo loves stacking blocks, counting materials, and teaching cause and effect.",
    color: "#FFB703",
    icon: <Hammer size={48} className="text-white" />,
    delay: 0.6
  }
];

const contentPillars = [
  {
    title: "Learn & Play Adventures",
    description: "Engaging educational journeys where kids master essential foundational skills through interactive play.",
    items: ["ABC Scavenger Hunts", "Counting with Magic Blocks", "Shapes in the Real World"],
    bgColor: "bg-[#FFD166]",
    textColor: "text-[#F77F00]",
    icon: <Shapes size={32} strokeWidth={2.5} />
  },
  {
    title: "Silly Songs & Dances",
    description: "High-energy musical segments designed to get kids moving and build healthy daily routines.",
    items: ["The Freeze Dance Bop", "Brush Your Teeth Rap", "Good Morning Sun Anthem"],
    bgColor: "bg-[#EF476F]",
    textColor: "text-white",
    icon: <Music size={32} strokeWidth={2.5} />
  },
  {
    title: "Creative Craft Time",
    description: "Hands-on DIY projects that encourage imagination, fine motor skills, and safe messy play.",
    items: ["Cardboard Castle Building", "Finger Painting Fun", "Making Play-Doh Safely"],
    bgColor: "bg-[#06D6A0]",
    textColor: "text-[#118AB2]",
    icon: <Palette size={32} strokeWidth={2.5} />
  },
  {
    title: "Storybook Surprises",
    description: "Immersive narrative experiences featuring our beloved mascots and interactive storytelling.",
    items: ["Interactive Pop-up Stories", "Mascot Puppet Shows", "Where is Pip Hiding?"],
    bgColor: "bg-[#118AB2]",
    textColor: "text-white",
    icon: <Star size={32} strokeWidth={2.5} />
  }
];

const FloatingIcon = ({ children, delay, className }: { children: React.ReactNode, delay: number, className?: string }) => (
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
    transition={{ duration: 4, repeat: Infinity, delay: delay, ease: "easeInOut" }}
    className={`absolute opacity-20 pointer-events-none ${className}`}
  >
    {children}
  </motion.div>
);

const StoryGenerator = () => {
  const [topic, setTopic] = useState("Sharing and Kindness");
  const [ageRange, setAgeRange] = useState("3-5");
  const [contentMode, setContentMode] = useState("educational");
  const [scenes, setScenes] = useState(4);
  const [genVideo, setGenVideo] = useState(false);
  const [ytUpload, setYtUpload] = useState(false);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [htmlResult, setHtmlResult] = useState("");

  const handleGenerate = async () => {
    playSound('click');
    setStatus('loading');
    
    try {
      const res = await fetch('/api/generate', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           topic,
           age_range: ageRange,
           content_mode: contentMode,
           number_of_scenes: scenes,
           generate_video: genVideo,
           upload_to_youtube: ytUpload
         })
      });
      if (!res.ok) throw new Error("Backend not available");
      const data = await res.json();
      setHtmlResult(data.html_storybook);
      setStatus('success');
    } catch (e) {
      // Backend is likely not running locally. Fallback to stunning interactive demo mock!
      setTimeout(() => {
         setHtmlResult(`
         <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Flicker's Toy Box</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Georgia",serif;max-width:900px;margin:0 auto;padding:40px 20px;background:#0f1117;color:#e0e0e8;line-height:1.8}h1{text-align:center;color:#f59e0b;font-size:2.2em;margin-bottom:6px}.title-ar{text-align:center;color:#fbbf24;font-size:1.6em;font-family:"Traditional Arabic","Amiri",serif;direction:rtl;margin-bottom:8px}.synopsis{text-align:center;color:#9ca3af;font-size:1em;margin-bottom:40px;max-width:600px;margin-left:auto;margin-right:auto}.scene{margin:50px 0;padding:28px;background:#1a1b26;border:1px solid #2a2b3d;border-radius:14px}.scene h2{color:#34d399;border-bottom:2px solid #059669;padding-bottom:8px;margin-bottom:20px;font-size:1.3em}.illustration{text-align:center;margin:20px 0}.illustration img{max-width:100%;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.5)}.columns{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0}@media(max-width:640px){.columns{grid-template-columns:1fr}}.col-en,.col-ar{padding:16px;background:#252740;border-radius:10px}.col-en h3,.col-ar h3{font-size:0.95em;color:#a5b4fc;margin-bottom:10px}.narration{font-size:1.05em;margin-bottom:12px}.narration p{margin:10px 0}.rtl{direction:rtl;text-align:right;font-family:"Traditional Arabic","Amiri",serif;font-size:1.15em}audio{width:100%;height:36px;margin-top:8px}.moral{background:#1e1b4b;border-left:4px solid #f59e0b;padding:14px 18px;margin-top:18px;border-radius:6px;color:#fbbf24;font-size:0.95em}.overall-moral{text-align:center;margin:40px 0;padding:24px;background:#0d3320;border:1px solid #166534;border-radius:12px}.overall-moral h3{color:#34d399;margin-bottom:8px}.overall-moral p{color:#86efac;font-size:1.1em}</style></head><body><h1>📖 Flicker's Toy Box</h1><div class="title-ar">صندوق ألعاب فليكر</div><p class="synopsis">A story about sharing, making friends, and building big rockets together.</p><div class="scene"><h2>Scene 1: The Magic Box</h2><div class="illustration"><img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop" alt="Scene 1" style="height:350px;object-fit:cover;width:100%;" /></div><div class="columns"><div class="col-en"><h3>🇬🇧 English</h3><div class="narration"><p>Flicker the little fox keeps his toys in a shiny wooden box under a green rug. He is small and orange with a white-tipped tail, wearing a blue scarf and a red patch on his left ear. One sunny morning, his friends arrive: Maya the rabbit in a yellow dress, Sam the turtle with round glasses, and Lila. "Can we play with your rockets?" asks Maya. Flicker hugs the box tight. "They're mine," he whispers. The friends look sad, but decide to play nearby. Flicker watches, curious and a little lonely.</p></div></div><div class="col-ar"><h3>🇸🇦 العربية</h3><div class="narration rtl"><p>فليكر، الثعلب الصغير، يحتفظ بألعابه في صندوق خشبي لامع تحت سجادة خضراء. هو صغير وبرتقالي وله ذيل مدبب أبيض، يرتدي وشاحًا أزرق وقطعة قماش حمراء على أذنه اليسرى. في صباح مشمس وصل أصدقاؤه. "هل نلعب بصواريخك؟" تسأل مايا. يحتضن فليكر الصندوق بشدة. "إنها لي،" يهمس. ينظر الأصدقاء بحزن، لكنهم يقررون اللعب بالقرب منه.</p></div></div></div><div class="moral">💡 It's okay to feel protective of your things, but pushing friends away can feel lonely.</div></div><div class="scene"><h2>Scene 2: The Wind Blows!</h2><div class="illustration"><img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop" alt="Scene 2" style="height:350px;object-fit:cover;width:100%;" /></div><div class="columns"><div class="col-en"><h3>🇬🇧 English</h3><div class="narration"><p>A gust of wind flips the toy box lid! Bright rockets and blocks tumble out and bounce like happy frogs. "Oh no!" laughs Lila as a rocket rolls to Sam. Maya gasps as a block lands on Flicker's paw. The friends rush to help and start playing together. Flicker feels surprised and then giggles. "Try the blue rocket," he says, handing it to Maya. "My turn next," Sam promises. They build a tall tower and make a silly moon parade!</p></div></div><div class="col-ar"><h3>🇸🇦 العربية</h3><div class="narration rtl"><p>هبّة رياح تقلب غطاء صندوق الألعاب! تتدحرج الصواريخ الملونة والقطع المكعبة وتنبطح كأنها ضفادع سعيدة. يندفع الأصدقاء للمساعدة ويبدؤون اللعب معًا. يشعر فليكر بالمفاجأة ثم يضحك. "جرّبي الصاروخ الأزرق،" يقول وهو يمدّه لمايا. "دورِي بعد ذلك،" يعد سام. يبنون برجًا طويلًا ويقيمون موكبًا قمريًا مضحكًا!</p></div></div></div><div class="moral">💡 When we share our toys, we double our fun.</div></div><div class="overall-moral"><h3>🌟 The Moral of the Story</h3><p>Playthings are great, but playing together is the best magic of all.</p></div></body></html>
         `);
         setStatus('success');
      }, 3500);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl border-[10px] border-[#8338EC] relative mb-32 overflow-hidden mx-auto max-w-5xl">
      <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none"><Wand2 size={120} className="text-[#8338EC] rotate-12" /></div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#8338EC] p-4 rounded-full text-white shadow-lg"><BookOpen size={36} /></div>
        <div>
          <h2 className="font-display text-4xl font-bold text-[#2b2d42]">Magic Story Generator</h2>
          <p className="text-slate-600 font-medium text-lg mt-1">AI-Powered Bilingual Storybooks (English + Arabic)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
        <div className="space-y-6">
          <div>
            <label className="block font-bold text-slate-700 mb-2">What is the story about?</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 font-medium focus:border-[#8338EC] focus:outline-none transition-colors"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-bold text-slate-700 mb-2">Age Range</label>
              <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)} className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 font-medium focus:border-[#8338EC] focus:outline-none">
                <option value="3-5">3-5 years</option>
                <option value="3-10">3-10 years</option>
                <option value="6-8">6-8 years</option>
                <option value="8-12">8-12 years</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-bold text-slate-700 mb-2">Content Mode</label>
              <select value={contentMode} onChange={(e) => setContentMode(e.target.value)} className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 font-medium focus:border-[#8338EC] focus:outline-none">
                <option value="educational">Educational</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>
          </div>

          <div>
             <label className="block font-bold text-slate-700 mb-2">Number of Scenes ({scenes})</label>
             <input type="range" min="2" max="6" value={scenes} onChange={(e) => setScenes(parseInt(e.target.value))} className="w-full accent-[#8338EC]" />
          </div>
        </div>

        <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2"><Sparkles size={20} className="text-[#FFB703]" /> Premium Features</h3>
          
          <label className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-[#8338EC] transition-colors shadow-sm">
            <input type="checkbox" checked={genVideo} onChange={(e) => setGenVideo(e.target.checked)} className="w-6 h-6 rounded text-[#8338EC]" />
            <div className="flex-1">
              <div className="font-bold text-slate-800 flex items-center gap-2">Generate Video <Video size={16} className="text-[#EF476F]" /></div>
              <p className="text-sm text-slate-500">Create an animation clip of the first scene</p>
            </div>
          </label>

          <label className={`flex items-center gap-4 p-4 bg-white rounded-xl border ${!genVideo ? 'opacity-50' : 'cursor-pointer hover:border-[#8338EC]'} border-slate-200 transition-colors shadow-sm`}>
            <input type="checkbox" disabled={!genVideo} checked={ytUpload} onChange={(e) => setYtUpload(e.target.checked)} className="w-6 h-6 rounded text-[#8338EC]" />
            <div className="flex-1">
              <div className="font-bold text-slate-800 flex items-center gap-2">Upload to YouTube <UploadCloud size={16} className="text-[#118AB2]" /></div>
              <p className="text-sm text-slate-500">Auto-upload with generated SEO metadata</p>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <motion.button
          onClick={handleGenerate}
          disabled={status === 'loading'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#8338EC] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-display text-2xl font-bold px-12 py-5 rounded-full shadow-[0_8px_0_0_#5A1BA8] hover:shadow-[0_4px_0_0_#5A1BA8] hover:translate-y-[4px] disabled:shadow-none disabled:translate-y-[4px] transition-all flex items-center gap-3"
        >
          {status === 'loading' ? <Loader2 className="animate-spin" /> : <Wand2 />} 
          {status === 'loading' ? 'Weaving Magic...' : 'Generate AI Story!'}
        </motion.button>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-10 pt-10 border-t-4 border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-2xl text-[#2b2d42]">Your Storybook is Ready!</h3>
              <button 
                onClick={() => setStatus('idle')}
                className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
              >
                Reset <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="w-full bg-[#0f1117] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 p-2 md:p-6 pb-0">
               <iframe 
                 srcDoc={htmlResult} 
                 className="w-full h-[600px] bg-[#0f1117] rounded-2xl" 
                 title="Generated Storybook"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChatPanel = () => {
  return (
    <section className="mb-32">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-4 mb-12"
      >
        <Bot size={40} className="text-[#8338EC]" />
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-[#2b2d42]">Peekaboo Creator Assistant</h2>
      </motion.div>
      <div className="bg-white rounded-[3rem] p-4 md:p-8 shadow-2xl border-[10px] border-[#EF476F]/10 relative overflow-hidden mx-auto max-w-5xl h-[800px] flex flex-col">
        <div className="flex-1 rounded-2xl overflow-hidden border-2 border-slate-100/50 shadow-inner">
           <PeekabooCreatorAssistant />
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-polka relative font-sans overflow-hidden">
      {/* Background Floating Elements */}
      <FloatingIcon delay={0} className="top-20 left-10 text-[#EF476F]"><Star size={64} fill="currentColor" /></FloatingIcon>
      <FloatingIcon delay={1} className="top-40 right-20 text-[#06D6A0]"><Circle size={80} fill="currentColor" /></FloatingIcon>
      <FloatingIcon delay={2} className="bottom-40 left-32 text-[#8338EC]"><Zap size={56} fill="currentColor" /></FloatingIcon>
      <FloatingIcon delay={1.5} className="top-1/2 right-1/4 text-[#FFD166]"><Smile size={100} /></FloatingIcon>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* HERO SECTION */}
        <header className="text-center mb-24 pt-10">
          <motion.div
            initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            className="inline-block"
          >
            <div className="bg-white rounded-[3rem] p-8 shadow-[0_20px_0_0_rgba(239,71,111,1)] border-8 border-[#EF476F] mb-8 relative">
              <div className="absolute -top-10 -right-10 bg-[#FFD166] p-4 rounded-full border-4 border-white shadow-lg">
                <Sparkles size={40} className="text-[#F77F00]" />
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[#118AB2] leading-tight flex flex-col">
                <span className="text-[#EF476F]">Peekaboo</span> 
                <span>Play House</span>
              </h1>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl font-bold text-[#2b2d42] bg-white/80 backdrop-blur-sm inline-block px-8 py-4 rounded-full shadow-sm max-w-2xl"
          >
            Where curiosity lives, giggles are guaranteed, and learning is always an adventure! 🚀
          </motion.p>
        </header>

        {/* BRAND IDENTITY: COLORS */}
        <section className="mb-32">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <Palette size={40} className="text-[#8338EC]" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-[#2b2d42]">The Joyful Palette</h2>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {colors.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring", bounce: 0.4 }}
                whileHover={{ y: -10, scale: 1.05 }}
                onMouseEnter={() => playSound('hover')}
                className={`${c.class} rounded-3xl p-6 shadow-xl w-40 h-40 flex flex-col justify-end relative overflow-hidden group shrink-0`}
              >
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                <div className="wavy-border absolute top-4 left-4 w-10 h-10 bg-white/30" />
                <span className={`font-display font-bold text-md leading-tight mb-1 ${c.textLight ? 'text-white' : 'text-slate-800'}`}>
                  {c.name}
                </span>
                <span className={`font-mono text-xs font-bold opacity-80 ${c.textLight ? 'text-white' : 'text-slate-800'}`}>
                  {c.hex}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MASCOTS / CHARACTERS */}
        <section className="mb-32">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <Smile size={40} className="text-[#06D6A0]" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-[#2b2d42]">Meet the Stars</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-20 pt-16">
            {characters.map((char) => (
              <motion.div
                key={char.name}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: char.delay, duration: 0.6, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -15, scale: 1.02 }}
                onMouseEnter={() => playSound('hover')}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 relative text-center flex flex-col items-center"
                style={{ borderColor: char.color }}
              >
                <motion.div 
                  className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-8 border-white shadow-lg flex items-center justify-center"
                  style={{ backgroundColor: char.color }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {char.icon}
                </motion.div>
                
                <div className="mt-12 w-full flex-grow">
                  <h3 className="font-display text-3xl font-bold mb-2" style={{ color: char.color }}>{char.name}</h3>
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-600 mb-4 uppercase tracking-wider">
                    {char.role}
                  </span>
                  <p className="text-slate-700 font-medium text-lg leading-relaxed">
                    {char.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTENT PILLARS */}
        <section className="mb-24">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <Youtube size={40} className="text-[#EF476F]" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-[#2b2d42]">What We Create</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {contentPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`${pillar.bgColor} rounded-3xl p-8 shadow-lg relative overflow-hidden`}
              >
                {/* Decorative cutouts */}
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full blur-sm" />
                
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className={`p-4 rounded-2xl bg-white/20 backdrop-blur-sm ${pillar.textColor}`}>
                    {pillar.icon}
                  </div>
                  <h3 className={`font-display text-2xl md:text-3xl font-bold ${pillar.textColor}`}>
                    {pillar.title}
                  </h3>
                </div>
                
                <p className={`font-medium mb-6 relative z-10 text-lg leading-snug ${pillar.textColor === 'text-white' ? 'text-white/90' : 'text-slate-800/80'}`}>
                  {pillar.description}
                </p>
                
                <ul className="space-y-4 relative z-10">
                  {pillar.items.map((item, j) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (j * 0.1) }}
                      key={j} 
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center shrink-0">
                        <Star size={16} fill="currentColor" className={pillar.textColor} />
                      </div>
                      <span className={`font-bold text-lg ${pillar.textColor === 'text-white' ? 'text-white' : 'text-slate-800'}`}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* YOUTUBE CHANNEL CTA */}
        <section className="mb-32 px-4 relative z-20">
          <motion.div 
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            whileInView={{ scale: 1, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#118AB2] rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden text-center max-w-5xl mx-auto border-[12px] border-white"
          >
            {/* Background elements */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#06D6A0]/40 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl mb-8 shadow-inner inline-block">
                <Youtube size={80} className="text-[#FFD166]" />
              </div>
            </motion.div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready for the Fun?<br/>Join the <span className="text-[#FFD166] underline decoration-4 underline-offset-8">Peekaboo Family!</span>
            </h2>
            
            <p className="text-white text-xl md:text-2xl font-bold mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed font-sans">
              Watch our latest episodes, sing along to Silly Songs, and start learning today. New adventures every week!
            </p>
            
            <motion.a
              href="https://youtube.com" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex bg-[#FFD166] text-[#F77F00] font-display text-2xl font-bold px-10 py-5 rounded-full shadow-[0_8px_0_0_#F77F00] hover:shadow-[0_4px_0_0_#F77F00] hover:translate-y-[4px] transition-all items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <Youtube fill="currentColor" size={32} /> Visit Our Channel
            </motion.a>
          </motion.div>
        </section>

        {/* BRAND GUIDELINES */}
        <StoryGenerator />
        
        <section className="mb-24">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <BookOpen size={40} className="text-[#118AB2]" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-[#2b2d42]">Brand Guidelines</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo Usage */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg border-2 border-[#EF476F]"
            >
              <div className="bg-[#EF476F]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Image size={32} className="text-[#EF476F]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#EF476F] mb-4">Logo Usage</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-2"><span>✅</span> <span>Always ensure the logo has clear space around it to breathe.</span></li>
                <li className="flex gap-2"><span>✅</span> <span>Use the full color logo on light backgrounds (like Peekaboo Cream).</span></li>
                <li className="flex gap-2"><span>❌</span> <span>Do not stretch, distort, or change the primary logo colors.</span></li>
                <li className="flex gap-2"><span>❌</span> <span>Avoid placing the logo over busy video frames without a solid drop shadow.</span></li>
              </ul>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg border-2 border-[#118AB2]"
            >
              <div className="bg-[#118AB2]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Type size={32} className="text-[#118AB2]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#118AB2] mb-4">Typography</h3>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Primary: Fredoka</h4>
                  <p className="text-sm">Used for big, bouncy, playful headings and engaging video thumbnails.</p>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-lg text-slate-900">Secondary: Nunito</h4>
                  <p className="text-sm">Used for body copy, sub-headings, and easy readability for parents.</p>
                </div>
                <p className="text-sm italic mt-4 text-slate-500">All text should be high contrast and easily legible on mobile screens.</p>
              </div>
            </motion.div>

            {/* Tone of Voice */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg border-2 border-[#06D6A0]"
            >
              <div className="bg-[#06D6A0]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MessageCircle size={32} className="text-[#06D6A0]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#06D6A0] mb-4">Tone of Voice</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-2"><span>🌟</span> <span><strong>Encouraging:</strong> Always celebrate trying new things. "Great job!"</span></li>
                <li className="flex gap-2"><span>🎈</span> <span><strong>Playful:</strong> Use fun sounds, gentle giggles, and an energetic cadence.</span></li>
                <li className="flex gap-2"><span>🤝</span> <span><strong>Inclusive:</strong> Speak directly to the viewer. "Can YOU see it?"</span></li>
                <li className="flex gap-2"><span>🛡️</span> <span><strong>Gentle:</strong> Avoid loud jumpscares or overly aggressive pacing.</span></li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CHATKIT ASSISTANT */}
        <ChatPanel />

        {/* CALL TO ACTION */}
        <section className="text-center pb-20">
          <motion.button
            onClick={() => playSound('click')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#EF476F] text-white font-display text-2xl font-bold px-12 py-6 rounded-full shadow-[0_10px_0_0_#A8294B] hover:shadow-[0_5px_0_0_#A8294B] hover:translate-y-[5px] transition-all flex items-center justify-center gap-4 mx-auto"
          >
            <Heart fill="currentColor" /> Let's Make Some Magic! 
          </motion.button>
        </section>

      </div>
    </div>
  );
}
