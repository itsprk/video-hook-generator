'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

export default function HeroSection() {
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const vid1Ref = useRef<HTMLVideoElement | null>(null);
  const vid2Ref = useRef<HTMLVideoElement | null>(null);
  const vid3Ref = useRef<HTMLVideoElement | null>(null);
  const vid4Ref = useRef<HTMLVideoElement | null>(null);
  const vid5Ref = useRef<HTMLVideoElement | null>(null); // research video
  const vid6Ref = useRef<HTMLVideoElement | null>(null); // flow-video.mp4
  // vid7 removed (instill-logo-anim had black bg)
  const vid8Ref = useRef<HTMLVideoElement | null>(null); // bg video for final scene
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
    // Research video (phase 19, 3.5s)
    if (phase === 19 && vid5Ref.current) {
      vid5Ref.current.currentTime = 0;
      vid5Ref.current.play().catch(() => {});
    }
    // Scene 6 video (phase 22)
    if (phase === 22 && vid4Ref.current) {
      vid4Ref.current.currentTime = 2;
      vid4Ref.current.play().catch(() => {});
    }
    // Flow joins your meeting scene (phase 23)
    if (phase === 23) {
      if (vid8Ref.current) {
        vid8Ref.current.currentTime = 0;
        vid8Ref.current.play().catch(() => {});
      }
      if (vid6Ref.current) {
        vid6Ref.current.currentTime = 0;
        vid6Ref.current.play().catch(() => {});
      }
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
          audio.volume = Math.min(targetVolume, Math.max(0, (elapsed / fadeDuration) * targetVolume));
          requestAnimationFrame(fadeIn);
        } else {
          audio.volume = targetVolume;
        }
      };
      requestAnimationFrame(fadeIn);
    }

    const timers: NodeJS.Timeout[] = [];
    const at = (ms: number, p: number) => {
      timers.push(setTimeout(() => setPhase(p), ms));
    };

    setPhase(0);
    at(2000, 1);    // Question on video
    at(4500, 2);    // CULTURE
    at(5300, 3);    // CULTURE echoes
    at(7300, 4);    // Zoom out CULTURE
    at(8000, 5);    // Invisible
    at(9500, 6);    // Fade out invisible
    at(10500, 7);   // Unmeasured
    at(11500, 8);   // Unstructured
    at(12500, 9);   // Unused
    at(13500, 10);  // Until now
    at(15500, 11);  // Imagine if culture became
    at(17500, 12);  // Visible
    at(19500, 13);  // Measurable
    at(21500, 14);  // Actionable
    at(23500, 15);  // And backed by
    at(25000, 16);  // SOC / GDPR
    // --- Research section ---
    at(28000, 17);  // "Grounded in Research"
    at(30000, 18);  // Fade out title + experts subtitle with AI
    at(32500, 19);  // Research video with logos (3.5s)
    // --- Introducing section ---
    at(36000, 20);  // INTRODUCING
    at(38000, 21);  // Flow logo
    at(40500, 22);  // scene-6 video + buddy text
    at(43500, 23);  // "Flow joins your meeting" text → then video reveals + icons
    // End
    timers.push(setTimeout(() => {
      if (audioRef.current) {
        const audio = audioRef.current;
        const fadeOutStart = performance.now();
        const fadeOutDuration = 2000;
        const startVol = audio.volume;
        const fadeOut = (now: number) => {
          const elapsed = now - fadeOutStart;
          if (elapsed < fadeOutDuration) {
            audio.volume = Math.min(1, Math.max(0, startVol - (elapsed / fadeOutDuration) * startVol));
            requestAnimationFrame(fadeOut);
          } else {
            audio.volume = 0;
            audio.pause();
          }
        };
        requestAnimationFrame(fadeOut);
      }
      [videoRef, vid1Ref, vid2Ref, vid3Ref, vid4Ref, vid5Ref, vid6Ref, vid8Ref].forEach(ref => {
        if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
      });
      setPhase(0);
      setHasStarted(false);
    }, 49000));

    return () => { timers.forEach(clearTimeout); };
  }, [hasStarted]);

  const buddyWords = "Your super intelligent in-meeting performance and culture buddy.".split(" ");

  return (
    <motion.main
      className="relative min-h-screen w-full overflow-hidden font-sans flex items-center justify-center"
      initial={{ backgroundColor: '#000000' }}
      animate={{
        backgroundColor:
          phase === 7 ? '#ffffff' :
          phase === 8 ? '#000000' :
          phase === 9 ? '#ffffff' :
          phase === 10 ? '#000000' :
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

      {/* Research Video for Phase 19 */}
      <video
        ref={vid5Ref}
        loop muted playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${phase === 19 ? 'opacity-50' : 'opacity-0'}`}
        src="/research-video.mp4"
      />

      {/* Background Video for Phase 22-23 (scene-6) */}
      <video
        ref={vid4Ref}
        loop muted playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${phase === 22 ? 'opacity-60' : 'opacity-0'}`}
        src="/scene-6.mp4"
      />

      {/* Background Video for Phase 24 (sunrise with blur + dark overlay) */}
      <video
        ref={vid8Ref}
        loop muted playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 blur-2xl ${phase === 23 ? 'opacity-10' : 'opacity-0'}`}
        src="/scene-5.mp4"
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
                What&apos;s the #1 driver of
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
              Enterprise-grade{' '}
              <span className="inline-block text-transparent bg-clip-text bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-emerald-400 via-green-200 to-emerald-400">privacy</span>
              {' '}and{' '}
              <span className="inline-block text-transparent bg-clip-text bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite_0.5s] bg-gradient-to-r from-emerald-400 via-green-200 to-emerald-400">security</span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== RESEARCH SECTION (Phases 17-19) ===== */}

      {/* Phase 17: "Grounded in Research" text on dark — fades out on exit */}
      <AnimatePresence>
        {hasStarted && phase === 17 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-[family-name:var(--font-inter-tight)] font-black text-white tracking-tighter"
            >
              Grounded in Research
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 18: Experts subtitle — only AI text scales + fades on exit */}
      <AnimatePresence>
        {hasStarted && phase === 18 && (
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl md:text-4xl font-[family-name:var(--font-inter-tight)] font-medium text-gray-300 max-w-4xl leading-relaxed"
            >
              with Experts in Neuroscience,
              <br />
              Organizational Psychology, and{' '}
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#3AD0F8] to-white font-black text-4xl md:text-6xl"
              >
                AI
              </motion.span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 19: Research video with 3 logos (3.5s) — fades up */}
      <AnimatePresence>
        {hasStarted && phase === 19 && (
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Dark overlay on video for logo readability */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* 3 Logos fade up */}
            <motion.div
              className="relative z-10 flex items-center justify-center gap-10 md:gap-20"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
              }}
            >
              <motion.img
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src="/logo-arl.png"
                alt="ARL"
                className="h-12 md:h-20 object-contain drop-shadow-lg"
              />
              <motion.img
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src="/logo-2.png"
                alt="Research Partner"
                className="h-12 md:h-20 object-contain drop-shadow-lg"
              />
              <motion.img
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                src="/logo-stanford.png"
                alt="Stanford"
                className="h-12 md:h-20 object-contain drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== END RESEARCH SECTION ===== */}

      {/* Phase 20: INTRODUCING */}
      <AnimatePresence>
        {hasStarted && phase === 20 && (
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

      {/* Phase 21: Flow Logo */}
      <AnimatePresence>
        {hasStarted && phase === 21 && (
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[#3AD0F8] rounded-full blur-[100px] opacity-20 animate-pulse" />

            <div className="relative z-10 flex flex-col items-center gap-0">
              <motion.img
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                src="/Flow (1).png" alt="Flow Icon" className="w-[166px] h-[166px] md:w-[250px] md:h-[250px] object-contain drop-shadow-[0_0_30px_rgba(58,208,248,0.5)]"
              />
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.5 }}
                src="/flow-text-logo.svg" alt="Flow Text" className="h-[55px] md:h-[73px] object-contain -mt-[40px] md:-mt-[60px]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 22: Buddy Text (normal) */}
      <AnimatePresence>
        {hasStarted && phase === 22 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
              {buddyWords.map((word, i) => (
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

      {/* Phase 23: "Flow joins your meeting" — text first, video reveals after 1s, icons after 1.5s */}
      <AnimatePresence>
        {hasStarted && phase === 23 && (
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/85 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* "Flow joins your meeting" text — appears immediately */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-7xl font-[family-name:var(--font-inter-tight)] font-bold text-white tracking-tight"
              >
                Flow joins your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3AD0F8] to-white">
                  meeting
                </span>
              </motion.h2>

              {/* Video container — reveals after 1s */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                className="relative"
              >
                {/* flow-video.mp4 */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(58,208,248,0.3)]">
                  <video
                    ref={vid6Ref}
                    loop muted playsInline
                    className="w-[860px] md:w-[1296px] h-auto rounded-2xl"
                    src="/flow-video.mp4"
                  />
                  {/* Flow logo with breathing animation + gradient blur */}
                  <div className="absolute top-4 left-4 flex items-center justify-center">
                    <motion.div
                      className="absolute w-[120px] h-[120px] rounded-full bg-gradient-to-r from-[#3AD0F8] via-[#7B61FF] to-[#3AD0F8] blur-[30px]"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [0.9, 1.2, 0.9],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    <motion.img
                      src="/Flow (1).png"
                      alt="Flow"
                      className="relative w-[90px] h-[90px] object-contain drop-shadow-[0_0_20px_rgba(58,208,248,0.6)]"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>

                {/* Floating meeting platform icons — appear after 1.5s */}
                {/* Google Meet - top right */}
                <motion.div
                  className="absolute -top-4 -right-6 md:-top-6 md:-right-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{ opacity: { duration: 0.4, delay: 1.5 }, scale: { duration: 0.4, delay: 1.5 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2">
                    <img src="/meet.png" alt="Google Meet" className="w-full h-full object-contain" />
                  </div>
                </motion.div>

                {/* Microsoft Teams - bottom right */}
                <motion.div
                  className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
                  transition={{ opacity: { duration: 0.4, delay: 1.7 }, scale: { duration: 0.4, delay: 1.7 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.7 } }}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2">
                    <img src="/teams.png" alt="Microsoft Teams" className="w-full h-full object-contain" />
                  </div>
                </motion.div>

                {/* Zoom - bottom left */}
                <motion.div
                  className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{ opacity: { duration: 0.4, delay: 1.9 }, scale: { duration: 0.4, delay: 1.9 }, y: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.9 } }}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2">
                    <img src="/zoom.png" alt="Zoom" className="w-full h-full object-contain" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Music */}
      <audio ref={audioRef} src="/bg-music.mp3" preload="auto" />

    </motion.main>
  );
}
