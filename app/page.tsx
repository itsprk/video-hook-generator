'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ShieldCheck, Lock } from 'lucide-react';

export default function HeroSection() {
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const vid1Ref = useRef<HTMLVideoElement | null>(null);
  const vid2Ref = useRef<HTMLVideoElement | null>(null);
  const vid3Ref = useRef<HTMLVideoElement | null>(null);
  const vid4Ref = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (phase === 12 && vid1Ref.current) {
      vid1Ref.current.currentTime = 0;
      vid1Ref.current.play().catch(() => {});
    }
    if (phase === 13 && vid2Ref.current) {
      vid2Ref.current.currentTime = 0;
      vid2Ref.current.play().catch(() => {});
    }
    if (phase === 14 && vid3Ref.current) {
      vid3Ref.current.currentTime = 0;
      vid3Ref.current.play().catch(() => {});
    }
    if (phase === 19 && vid4Ref.current) {
      vid4Ref.current.currentTime = 2;
      vid4Ref.current.play().catch(() => {});
    }
  }, [phase]);

  useEffect(() => {
    if (!hasStarted) return;

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }

    // Play background music with 2s fade-in to 50% volume
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.currentTime = 0;
      audio.volume = 0;
      audio.loop = false;
      audio.play().catch(console.error);
      const fadeStart = performance.now();
      const fadeDuration = 2000;
      const targetVolume = 0.5;
      const fadeIn = (now: number) => {
        const elapsed = now - fadeStart;
        if (elapsed < fadeDuration) {
          audio.volume = Math.min(targetVolume, (elapsed / fadeDuration) * targetVolume);
          requestAnimationFrame(fadeIn);
        } else {
          audio.volume = targetVolume;
        }
      };
      requestAnimationFrame(fadeIn);
    }

    let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, t4: NodeJS.Timeout, t5: NodeJS.Timeout, t6: NodeJS.Timeout, t7: NodeJS.Timeout, t8: NodeJS.Timeout, t9: NodeJS.Timeout, t10: NodeJS.Timeout, t11: NodeJS.Timeout, t12: NodeJS.Timeout, t13: NodeJS.Timeout, t14: NodeJS.Timeout, t15: NodeJS.Timeout, t16: NodeJS.Timeout, t17: NodeJS.Timeout, t18: NodeJS.Timeout, t19: NodeJS.Timeout, t20: NodeJS.Timeout;
    
    const runSequence = () => {
      setPhase(0);
      // Phase 1: Video appears, show the rest of the question staggered
      t1 = setTimeout(() => setPhase(1), 2000); 
      // Phase 2: Fade to black, show single CULTURE
      t2 = setTimeout(() => setPhase(2), 4500); 
      // Phase 3: Show CULTURE echoes
      t3 = setTimeout(() => setPhase(3), 5300); 
      // Phase 4: Zoom out CULTURE
      t4 = setTimeout(() => setPhase(4), 7300); 
      // Phase 5: But most of it is invisible
      t5 = setTimeout(() => setPhase(5), 8000); 
      // Phase 6: Fade out invisible
      t6 = setTimeout(() => setPhase(6), 9500); 
      // Phase 7: Unmeasured
      t7 = setTimeout(() => setPhase(7), 10500); 
      // Phase 8: Unstructured
      t8 = setTimeout(() => setPhase(8), 11500); 
      // Phase 9: Unused
      t9 = setTimeout(() => setPhase(9), 12500); 
      // Phase 10: Until now
      t10 = setTimeout(() => setPhase(10), 13500); 
      // Phase 11: Imagine if culture became
      t11 = setTimeout(() => setPhase(11), 15500); 
      // Phase 12: Visible
      t12 = setTimeout(() => setPhase(12), 17500); 
      // Phase 13: Measurable
      t13 = setTimeout(() => setPhase(13), 19500); 
      // Phase 14: Actionable
      t14 = setTimeout(() => setPhase(14), 21500); 
      // Phase 15: And backed by
      t15 = setTimeout(() => setPhase(15), 23500); 
      // Phase 16: SOC / GDPR
      t16 = setTimeout(() => setPhase(16), 25000); 
      // Phase 17: INTRODUCING
      t17 = setTimeout(() => setPhase(17), 28000); 
      // Phase 18: Flow logo
      t18 = setTimeout(() => setPhase(18), 30000); 
      // Phase 19: scene-6 video + text
      t19 = setTimeout(() => setPhase(19), 32500); 
      // End: fade out audio and show play screen again
      t20 = setTimeout(() => {
        // Fade out audio over 2s then pause
        if (audioRef.current) {
          const audio = audioRef.current;
          const fadeOutStart = performance.now();
          const fadeOutDuration = 2000;
          const startVol = audio.volume;
          const fadeOut = (now: number) => {
            const elapsed = now - fadeOutStart;
            if (elapsed < fadeOutDuration) {
              audio.volume = Math.max(0, startVol - (elapsed / fadeOutDuration) * startVol);
              requestAnimationFrame(fadeOut);
            } else {
              audio.volume = 0;
              audio.pause();
            }
          };
          requestAnimationFrame(fadeOut);
        }
        // Stop all videos
        [videoRef, vid1Ref, vid2Ref, vid3Ref, vid4Ref].forEach(ref => {
          if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
        });
        setPhase(0);
        setHasStarted(false);
      }, 37000);
    };

    runSequence();

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); clearTimeout(t8);
      clearTimeout(t9); clearTimeout(t10); clearTimeout(t11); clearTimeout(t12);
      clearTimeout(t13); clearTimeout(t14); clearTimeout(t15); clearTimeout(t16);
      clearTimeout(t17); clearTimeout(t18); clearTimeout(t19); clearTimeout(t20);
    };
  }, [hasStarted]);

  return (
    <motion.main 
      className="relative min-h-screen w-full overflow-hidden font-sans flex items-center justify-center"
      initial={{ backgroundColor: '#000000' }}
      animate={{
        backgroundColor: 
          phase === 7 ? '#ffffff' : // Unmeasured (White)
          phase === 8 ? '#000000' : // Unstructured (Black)
          phase === 9 ? '#ffffff' : // Unused (White)
          phase === 10 ? '#000000' : // Until now (Black)
          '#000000'
      }}
      transition={{ duration: 0.2 }}
    >
      
      {/* Intro Screen */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-inter-tight)] font-bold tracking-tighter mb-8">
              Instill Flow
            </h1>
            <button 
              onClick={() => setHasStarted(true)}
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-[family-name:var(--font-inter-tight)] font-semibold text-lg hover:scale-105 transition-transform"
            >
              <Play className="w-6 h-6 fill-black" />
              Play video
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Video */}
      <motion.video
        ref={videoRef}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/scene-5.mp4"
        animate={{ opacity: phase === 1 ? 0.85 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Background Videos for Phase 12-14 */}
      <video 
        ref={(el) => { 
          vid1Ref.current = el;
          if (el) el.playbackRate = 2.0; 
        }}
        loop muted playsInline 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${phase === 12 ? 'opacity-50' : 'opacity-0'}`} 
        src="/sunrise.mp4" 
      />
      <video ref={vid2Ref} loop muted playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${phase === 13 ? 'opacity-50' : 'opacity-0'}`} src="/measurable.mp4" />
      <video ref={vid3Ref} loop muted playsInline className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${phase === 14 ? 'opacity-50' : 'opacity-0'}`} src="/actionable.mp4" />
      
      {/* Background Video for Phase 19 */}
      <video 
        ref={vid4Ref} 
        loop muted playsInline 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${phase === 19 ? 'opacity-60' : 'opacity-0'}`} 
        src="/scene-6.mp4" 
      />

      {/* Gradient Overlay for text readability */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"
        animate={{ opacity: phase === 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Phase 0: DO YOU KNOW */}
      <AnimatePresence>
        {hasStarted && phase === 0 && (
          <motion.div 
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center bg-black"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.4 }
                }
              }}
              className="flex flex-col items-center justify-center gap-2"
            >
              {['DO', 'YOU', 'KNOW'].map((word, i) => (
                <motion.h1 
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="font-[family-name:var(--font-inter-tight)] font-black text-7xl md:text-9xl uppercase tracking-tighter text-white leading-none"
                >
                  {word}
                </motion.h1>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: The Question */}
      <AnimatePresence>
        {hasStarted && phase === 1 && (
          <motion.div 
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="flex flex-col items-center gap-2 max-w-4xl"
            >
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="font-[family-name:var(--font-inter-tight)] font-bold text-4xl md:text-6xl text-white drop-shadow-lg leading-tight">
                What's the #1 driver of
              </motion.h2>
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="font-[family-name:var(--font-inter-tight)] font-bold text-4xl md:text-6xl text-white drop-shadow-lg leading-tight">
                high-performing organizations?
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2 & 3: CULTURE */}
      <AnimatePresence>
        {hasStarted && phase >= 2 && phase < 4 && (
          <motion.div 
            className="absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 4, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Echoes */}
            <AnimatePresence>
              {phase === 3 && (
                <>
                  <motion.h1 
                    initial={{ y: 0, opacity: 0 }} 
                    animate={{ y: -100, opacity: 0.6 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                    className="text-6xl md:text-[9rem] font-[family-name:var(--font-inter-tight)] font-black text-transparent absolute leading-none tracking-tighter" 
                    style={{ WebkitTextStroke: '2px white' }}
                  >
                    CULTURE
                  </motion.h1>
                  <motion.h1 
                    initial={{ y: 0, opacity: 0 }} 
                    animate={{ y: 100, opacity: 0.6 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                    className="text-6xl md:text-[9rem] font-[family-name:var(--font-inter-tight)] font-black text-transparent absolute leading-none tracking-tighter" 
                    style={{ WebkitTextStroke: '2px white' }}
                  >
                    CULTURE
                  </motion.h1>
                  <motion.h1 
                    initial={{ y: 0, opacity: 0 }} 
                    animate={{ y: -200, opacity: 0.2 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.6, type: "spring", bounce: 0.5, delay: 0.08 }}
                    className="text-6xl md:text-[9rem] font-[family-name:var(--font-inter-tight)] font-black text-transparent absolute leading-none tracking-tighter" 
                    style={{ WebkitTextStroke: '2px white' }}
                  >
                    CULTURE
                  </motion.h1>
                  <motion.h1 
                    initial={{ y: 0, opacity: 0 }} 
                    animate={{ y: 200, opacity: 0.2 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.6, type: "spring", bounce: 0.5, delay: 0.08 }}
                    className="text-6xl md:text-[9rem] font-[family-name:var(--font-inter-tight)] font-black text-transparent absolute leading-none tracking-tighter" 
                    style={{ WebkitTextStroke: '2px white' }}
                  >
                    CULTURE
                  </motion.h1>
                </>
              )}
            </AnimatePresence>

            {/* Main Text */}
            <motion.h1 
              layoutId="culture-main"
              className="text-6xl md:text-[9rem] font-[family-name:var(--font-inter-tight)] font-black text-white absolute drop-shadow-[0_0_40px_#3AD0F8] leading-none tracking-tighter"
            >
              CULTURE
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 5: Invisible */}
      <AnimatePresence>
        {hasStarted && phase === 5 && (
          <motion.div 
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-[family-name:var(--font-inter-tight)] font-bold text-white tracking-tight"
            >
              But most of it is
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-[family-name:var(--font-inter-tight)] font-black text-transparent tracking-tighter mt-2"
              style={{ WebkitTextStroke: "2px white" }}
            >
              invisible.
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 7, 8, 9, 10: Un- sequence */}
      <AnimatePresence>
        {hasStarted && phase >= 7 && phase <= 10 && (
          <motion.div 
            className="absolute inset-0 z-30 flex items-center justify-center px-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100vw", filter: "drop-shadow(100px 0px 30px #3AD0F8)" }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            <div className={`flex text-6xl md:text-8xl font-[family-name:var(--font-inter-tight)] font-black tracking-tighter ${phase === 7 || phase === 9 ? 'text-black' : 'text-white'}`} style={{ perspective: 1000 }}>
              <div className="w-[120px] md:w-[200px] text-right transition-colors duration-200">Un</div>
              <div className="relative w-[240px] md:w-[460px] text-left">
                <AnimatePresence>
                  {phase === 7 && (
                    <motion.span 
                      key="measured"
                      className="absolute left-0 whitespace-nowrap transition-colors duration-200"
                      initial={{ y: 0, opacity: 1, rotateX: 0 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -40, opacity: 0, rotateX: 90 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                      style={{ transformOrigin: "center center" }}
                    >
                      measured.
                    </motion.span>
                  )}
                  {phase === 8 && (
                    <motion.span 
                      key="structured"
                      className="absolute left-0 whitespace-nowrap transition-colors duration-200"
                      initial={{ y: 40, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -40, opacity: 0, rotateX: 90 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                      style={{ transformOrigin: "center center" }}
                    >
                      structured.
                    </motion.span>
                  )}
                  {phase === 9 && (
                    <motion.span 
                      key="used"
                      className="absolute left-0 whitespace-nowrap transition-colors duration-200"
                      initial={{ y: 40, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -40, opacity: 0, rotateX: 90 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                      style={{ transformOrigin: "center center" }}
                    >
                      used.
                    </motion.span>
                  )}
                  {phase === 10 && (
                    <motion.span 
                      key="tilnow"
                      className="absolute left-0 whitespace-nowrap transition-colors duration-200"
                      initial={{ y: 40, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -40, opacity: 0, rotateX: 90 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                      style={{ transformOrigin: "center center" }}
                    >
                      til <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3AD0F8] to-white">now</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 11: Imagine if culture became */}
      <AnimatePresence>
        {hasStarted && phase === 11 && (
          <motion.div 
            className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center"
            initial={{ opacity: 0, x: "100vw" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-inter-tight)] font-bold text-white tracking-tight drop-shadow-lg">
              Imagine if culture became
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 12, 13, 14: Visible, Measurable, Actionable */}
      <AnimatePresence mode="wait">
        {hasStarted && phase >= 12 && phase <= 14 && (
          <motion.div 
            key={phase}
            className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-7xl md:text-9xl font-[family-name:var(--font-inter-tight)] font-black text-white tracking-tighter uppercase drop-shadow-2xl">
              {phase === 12 ? "Visible." : phase === 13 ? "Measurable." : "Actionable."}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 15: And backed by */}
      <AnimatePresence>
        {hasStarted && phase === 15 && (
          <motion.div 
            className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center bg-black"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-inter-tight)] font-bold text-white tracking-tight drop-shadow-lg">
              And backed by
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 16: SOC / GDPR */}
      <AnimatePresence>
        {hasStarted && phase === 16 && (
          <motion.div 
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center bg-black"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.3 } }
            }}
          >
            <div className="flex gap-12 md:gap-24 mb-10">
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}
                className="flex flex-col items-center gap-4"
              >
                <img src="/SOC 2 (1).png" alt="SOC 2" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
                <span className="text-white font-bold text-2xl md:text-3xl tracking-widest">SOC 2</span>
              </motion.div>
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 30, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}
                className="flex flex-col items-center gap-4"
              >
                <img src="/GDPR (1).png" alt="GDPR" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
                <span className="text-white font-bold text-2xl md:text-3xl tracking-widest">GDPR</span>
              </motion.div>
            </div>
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="text-3xl md:text-5xl font-[family-name:var(--font-inter-tight)] font-medium text-gray-300 max-w-3xl leading-tight"
            >
              Enterprise-grade privacy and security
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 17: INTRODUCING */}
      <AnimatePresence>
        {hasStarted && phase === 17 && (
          <motion.div 
            className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center bg-black"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="flex"
            >
              {"INTRODUCING".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
                  }}
                  className="text-5xl md:text-7xl font-[family-name:var(--font-inter-tight)] font-black text-white tracking-widest"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 18: Flow Logo */}
      <AnimatePresence>
        {hasStarted && phase === 18 && (
          <motion.div 
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            {/* Glowing background */}
            <div className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[#3AD0F8] rounded-full blur-[100px] opacity-20 animate-pulse" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <motion.img 
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                src="/Flow (1).png" alt="Flow Icon" className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_30px_rgba(58,208,248,0.5)]" 
              />
              <motion.img 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.5 }}
                src="/flow-text-logo.svg" alt="Flow Text" className="h-12 md:h-16 object-contain" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 19: Buddy Text */}
      <AnimatePresence>
        {hasStarted && phase === 19 && (
          <motion.div 
            className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center"
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex flex-wrap justify-center gap-x-3 gap-y-2 max-w-5xl"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.08 } }
              }}
            >
              {"Your super intelligent in-meeting performance and culture buddy.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", scale: 1.2, y: 20 },
                    show: { opacity: 1, filter: "blur(0px)", scale: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }
                  }}
                  className="text-4xl md:text-6xl font-[family-name:var(--font-inter-tight)] font-bold text-white tracking-tight drop-shadow-lg"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Music */}
      <audio ref={audioRef} src="/bg-music.mp3" preload="auto" />

    </motion.main>
  );
}
