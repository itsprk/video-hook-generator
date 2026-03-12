'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

const ASSETS = {
  videos: ['/sunrise.mp4', '/measurable.mp4', '/actionable.mp4', '/sunrise.mp4'],
  audioClips: [
    '/audio-culture.mp3',
    '/audio-imagine.mp3',
    '/audio-visible.mp3',
    '/audio-measurable.mp3',
    '/audio-actionable.mp3',
    '/audio-and.mp3',
    '/audio-secure.mp3',
  ],
};

// Helper to play an audio clip from start
function playClip(audio: HTMLAudioElement) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export default function AydenPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [loadProgress, setLoadProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [secureVideoPlaying, setSecureVideoPlaying] = useState(false);
  const vid1Ref = useRef<HTMLVideoElement | null>(null);
  const vid2Ref = useRef<HTMLVideoElement | null>(null);
  const vid3Ref = useRef<HTMLVideoElement | null>(null);
  const vid4Ref = useRef<HTMLVideoElement | null>(null);

  // Audio clip refs
  const audioCultureRef = useRef<HTMLAudioElement | null>(null);
  const audioImagineRef = useRef<HTMLAudioElement | null>(null);
  const audioVisibleRef = useRef<HTMLAudioElement | null>(null);
  const audioMeasurableRef = useRef<HTMLAudioElement | null>(null);
  const audioActionableRef = useRef<HTMLAudioElement | null>(null);
  const audioAndRef = useRef<HTMLAudioElement | null>(null);
  const audioSecureRef = useRef<HTMLAudioElement | null>(null);

  // Preload all assets on mount
  useEffect(() => {
    const totalAssets = ASSETS.videos.length + ASSETS.audioClips.length; // 4 videos + 6 audio
    let loaded = 0;

    const onAssetReady = () => {
      loaded++;
      setLoadProgress(Math.round((loaded / totalAssets) * 100));
      if (loaded >= totalAssets) {
        setAssetsReady(true);
      }
    };

    // Preload videos programmatically
    const preloadedUrls = new Set<string>();
    ASSETS.videos.forEach((src) => {
      if (preloadedUrls.has(src)) {
        onAssetReady();
        return;
      }
      preloadedUrls.add(src);
      const vid = document.createElement('video');
      vid.preload = 'auto';
      vid.muted = true;
      vid.playsInline = true;
      vid.addEventListener('canplaythrough', onAssetReady, { once: true });
      vid.src = src;
      vid.load();
    });

    // Preload audio clips
    const audioRefs = [
      audioCultureRef, audioImagineRef, audioVisibleRef,
      audioMeasurableRef, audioActionableRef, audioAndRef, audioSecureRef,
    ];
    audioRefs.forEach((ref) => {
      const audio = ref.current;
      if (audio) {
        if (audio.readyState >= 3) {
          onAssetReady();
        } else {
          audio.addEventListener('canplaythrough', onAssetReady, { once: true });
          audio.load();
        }
      }
    });
  }, []);

  // Typing animation for "Culture"
  useEffect(() => {
    if (phase !== 0 || !hasStarted) return;
    const word = 'Culture';
    let i = 0;
    setTypedText('');
    const interval = setInterval(() => {
      i++;
      setTypedText(word.slice(0, i));
      if (i >= word.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, [phase, hasStarted]);

  // Play videos when their phase hits
  useEffect(() => {
    if (phase === 5 && vid1Ref.current) {
      vid1Ref.current.currentTime = 0;
      vid1Ref.current.play().catch(() => {});
    }
    if (phase === 6 && vid2Ref.current) {
      vid2Ref.current.currentTime = 0;
      vid2Ref.current.play().catch(() => {});
    }
    if (phase === 7 && vid3Ref.current) {
      vid3Ref.current.currentTime = 0;
      vid3Ref.current.play().catch(() => {});
    }
    // Secure: show first frame as still "image", then start playing after 100ms
    if (phase >= 8 && vid4Ref.current) {
      if (vid4Ref.current.paused) {
        vid4Ref.current.currentTime = 0; // Show first frame as still image
        setSecureVideoPlaying(false);
        setTimeout(() => {
          if (vid4Ref.current) {
            vid4Ref.current.play().catch(() => {});
            setSecureVideoPlaying(true);
          }
        }, 10); // Image holds for 10ms, then video comes alive
      }
    }
    if (phase === 0) {
      setSecureVideoPlaying(false);
    }
  }, [phase]);

  // Main sequence — separate audio clips give us perfect sync
  useEffect(() => {
    if (!hasStarted) return;

    const timers: NodeJS.Timeout[] = [];
    const at = (ms: number, p: number) => {
      timers.push(setTimeout(() => setPhase(p), ms));
    };

    setPhase(0);

    // Audio clip durations (from waveform analysis):
    // culture:    1040ms (speech 60-620ms)
    // imagine:    1520ms (speech 80-1340ms, contains "imagine if it became")
    //   sub-words: imagine(80ms), if(690ms), it(840ms), became(960ms)
    // visible:     640ms (speech 40-560ms)
    // measurable:  960ms (speech 20-660ms)
    // actionable:  720ms (speech 20-660ms)
    // secure:      640ms (speech 20-540ms)

    // Phase 0: Culture typing + audio (1.1x)
    if (audioCultureRef.current) {
      audioCultureRef.current.playbackRate = 1.1;
      playClip(audioCultureRef.current);
    }

    // Phase 1-4: "imagine if it became" — single clip at 1x (natural pace, user requested)
    const imagineStart = 750; // slightly tighter after faster culture
    timers.push(setTimeout(() => {
      if (audioImagineRef.current) {
        audioImagineRef.current.playbackRate = 1; // keep at 1x
        playClip(audioImagineRef.current);
      }
    }, imagineStart));
    // Sub-word offsets at 1x speed
    at(imagineStart, 1);              // "imagine" (onset at 80ms in clip)
    at(imagineStart + 690, 2);        // "if"
    at(imagineStart + 840, 3);        // "it"
    at(imagineStart + 960, 4);        // "became"

    // Phase 5: "visible" + video (1.1x audio)
    const visibleStart = imagineStart + 1450; // tighter gap after became
    timers.push(setTimeout(() => {
      if (audioVisibleRef.current) {
        audioVisibleRef.current.playbackRate = 1.1;
        playClip(audioVisibleRef.current);
      }
    }, visibleStart));
    at(visibleStart, 5);

    // Phase 6: "measurable" + video (1.1x audio)
    const measurableStart = visibleStart + 730; // 640/1.1 ≈ 582ms clip + 148ms pause
    timers.push(setTimeout(() => {
      if (audioMeasurableRef.current) {
        audioMeasurableRef.current.playbackRate = 1.1;
        playClip(audioMeasurableRef.current);
      }
    }, measurableStart));
    at(measurableStart, 6);

    // Phase 7: "actionable" + video (1.1x audio)
    const actionableStart = measurableStart + 960; // 960/1.1 ≈ 873ms clip + 87ms pause
    timers.push(setTimeout(() => {
      if (audioActionableRef.current) {
        audioActionableRef.current.playbackRate = 1.1;
        playClip(audioActionableRef.current);
      }
    }, actionableStart));
    at(actionableStart, 7);

    // "and" audio plays after actionable (1.1x)
    const andStart = actionableStart + 655; // 720/1.1 ≈ 655ms
    timers.push(setTimeout(() => {
      if (audioAndRef.current) {
        audioAndRef.current.playbackRate = 1.1;
        playClip(audioAndRef.current);
      }
    }, andStart));

    // Phase 8: "secure" + video (1.1x audio)
    const secureStart = andStart + 500; // "and" speech ends ~436ms at 1.1x + tiny breath
    timers.push(setTimeout(() => {
      if (audioSecureRef.current) {
        audioSecureRef.current.playbackRate = 1.1;
        playClip(audioSecureRef.current);
      }
    }, secureStart));
    at(secureStart, 8);

    // Phase 9: hold
    at(secureStart + 730, 9); // 800/1.1 ≈ 730ms

    // Reset
    timers.push(setTimeout(() => {
      [vid1Ref, vid2Ref, vid3Ref, vid4Ref].forEach(ref => {
        if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
      });
      // Stop all audio clips
      [audioCultureRef, audioImagineRef, audioVisibleRef,
       audioMeasurableRef, audioActionableRef, audioAndRef, audioSecureRef].forEach(ref => {
        if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
      });
      setPhase(0);
      setTypedText('');
      setHasStarted(false);
    }, secureStart + 2000));

    return () => { timers.forEach(clearTimeout); };
  }, [hasStarted]);

  const handlePlay = useCallback(() => {
    if (assetsReady) setHasStarted(true);
  }, [assetsReady]);

  // Shared text style for the 4 words — medium weight, not too light
  const wordClass = "text-4xl md:text-6xl font-[family-name:var(--font-inter-tight)] font-semibold text-[#1a1a2e] tracking-tight lowercase";

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-sans flex items-center justify-center bg-[#f5f5f5]">
      {/* Audio clips — always rendered for preloading */}
      <audio ref={audioCultureRef} src="/audio-culture.mp3" preload="auto" />
      <audio ref={audioImagineRef} src="/audio-imagine.mp3" preload="auto" />
      <audio ref={audioVisibleRef} src="/audio-visible.mp3" preload="auto" />
      <audio ref={audioMeasurableRef} src="/audio-measurable.mp3" preload="auto" />
      <audio ref={audioActionableRef} src="/audio-actionable.mp3" preload="auto" />
      <audio ref={audioAndRef} src="/audio-and.mp3" preload="auto" />
      <audio ref={audioSecureRef} src="/audio-secure.mp3" preload="auto" />

      {/* Play Screen */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f5f5]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-inter-tight)] font-bold tracking-tighter mb-8 text-[#1a1a2e]">
              Ayden Demo
            </h1>

            {/* Play button with progress */}
            <div className="relative flex flex-col items-center gap-4">
              <button
                onClick={handlePlay}
                disabled={!assetsReady}
                className={`group relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-full font-[family-name:var(--font-inter-tight)] font-semibold text-lg transition-all duration-300 ${
                  assetsReady
                    ? 'bg-[#1a1a2e] text-white hover:scale-105 cursor-pointer'
                    : 'bg-[#1a1a2e]/40 text-white/60 cursor-not-allowed'
                }`}
              >
                {/* Progress fill behind button */}
                {!assetsReady && (
                  <div
                    className="absolute inset-0 rounded-full bg-[#1a1a2e]/70 origin-left"
                    style={{
                      transform: `scaleX(${loadProgress / 100})`,
                      transition: 'transform 0.3s ease-out',
                    }}
                  />
                )}
                <Play className={`relative z-10 w-6 h-6 ${assetsReady ? 'fill-white' : 'fill-white/60'}`} />
                <span className="relative z-10">
                  {assetsReady ? 'Play' : `Loading ${loadProgress}%`}
                </span>
              </button>

              {/* Subtle progress bar below button */}
              {!assetsReady && (
                <div className="w-40 h-1 rounded-full bg-[#1a1a2e]/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#1a1a2e]/40 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadProgress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 0: "Culture" — typing animation */}
      <AnimatePresence>
        {hasStarted && phase === 0 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#f5f5f5]"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
          >
            <h1 className="text-8xl md:text-[11rem] font-[family-name:var(--font-inter-tight)] font-black text-[#1a1a2e] tracking-tighter leading-none">
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[4px] md:w-[6px] h-[0.85em] bg-[#1a1a2e] ml-1 align-middle"
              />
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: "imagine" */}
      <AnimatePresence>
        {hasStarted && phase === 1 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#f5f5f5]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.03 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              className={wordClass}
            >
              imagine
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: "if" */}
      <AnimatePresence>
        {hasStarted && phase === 2 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#f5f5f5]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.03 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              className={wordClass}
            >
              if
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: "it" */}
      <AnimatePresence>
        {hasStarted && phase === 3 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#f5f5f5]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.03 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              className={wordClass}
            >
              it
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: "became" */}
      <AnimatePresence>
        {hasStarted && phase === 4 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#f5f5f5]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.03 }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              className={wordClass}
            >
              became
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phases 5-9: Single continuous growing container */}
      {hasStarted && phase >= 5 && phase <= 9 && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <motion.div
            className="relative overflow-hidden rounded-none flex items-center justify-center"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: phase === 5 ? '58vw' : phase === 6 ? '80vw' : phase === 7 ? '92vw' : '100vw',
              height: phase === 5 ? '58vh' : phase === 6 ? '80vh' : phase === 7 ? '92vh' : '100vh',
              opacity: 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ boxShadow: phase >= 8 ? 'none' : '0 25px 80px rgba(0,0,0,0.3)' }}
          >
            {/* Phases 5-7: Full-bleed videos with crossfade */}
            <video
              ref={vid1Ref}
              loop muted playsInline preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 1,
                opacity: phase === 5 ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
              }}
              src="/sunrise.mp4"
            />
            <video
              ref={vid2Ref}
              loop muted playsInline preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 2,
                opacity: phase === 6 ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
              }}
              src="/measurable.mp4"
            />
            <video
              ref={vid3Ref}
              loop muted playsInline preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 3,
                opacity: phase === 7 ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
              }}
              src="/actionable.mp4"
            />

            {/* Phase 8+: Background IMAGE replaces video — swap /secure-bg.jpg with your image */}
            <div
              className="absolute inset-0"
              style={{
                zIndex: 4,
                opacity: phase >= 8 ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
                backgroundImage: 'url(/secure-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Fallback gradient behind image in case it's slow to load */}
            <div
              className="absolute inset-0"
              style={{
                zIndex: phase >= 8 ? 3 : 0,
                opacity: phase >= 8 ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out',
                background: '#0d1b2a',
              }}
            />

            {/* Phase 8+: Video rectangle centered on top of the image — grows with container */}
            <div
              className="absolute overflow-hidden"
              style={{
                zIndex: 6,
                inset: phase >= 8 ? '60px' : '50%',
                opacity: phase >= 8 ? 1 : 0,
                transform: phase >= 8 ? 'scale(1.03)' : 'scale(1)',
                transition: 'inset 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-in-out, transform 1.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.6s',
                boxShadow: '0 30px 100px rgba(0,0,0,0.6)',
              }}
            >
              <video
                ref={vid4Ref}
                loop muted playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: secureVideoPlaying ? 1 : 0.85,
                  transform: secureVideoPlaying ? 'scale(1)' : 'scale(1.03)',
                  transition: 'opacity 0.5s ease-in-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                src="/sunrise.mp4"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="absolute inset-0 bg-black/10" style={{ zIndex: 5, opacity: phase >= 8 ? 0 : 1, transition: 'opacity 0.3s' }} />

            {/* Text — instant swap, grows with container */}
            <h1
              className="relative font-[family-name:var(--font-inter-tight)] font-black text-white tracking-tighter lowercase"
              style={{
                zIndex: 10,
                fontSize: phase === 5 ? 'clamp(3rem, 8vw, 8rem)'
                  : phase === 6 ? 'clamp(4rem, 10vw, 10rem)'
                  : phase === 7 ? 'clamp(4.5rem, 12vw, 11rem)'
                  : 'clamp(5rem, 14vw, 13rem)',
                textShadow: phase >= 8
                  ? '0 8px 80px rgba(0,0,0,0.7), 0 3px 30px rgba(0,0,0,0.5)'
                  : '0 4px 40px rgba(0,0,0,0.5)',
                transition: 'font-size 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {phase === 5 ? 'visible' : phase === 6 ? 'measurable' : phase === 7 ? 'actionable' : 'secure'}
            </h1>
          </motion.div>
        </div>
      )}
    </main>
  );
}
