'use client';

import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
CustomEase.create('cinematic', '0.22, 1, 0.36, 1');
CustomEase.create('punch', '0.25, 0.46, 0.1, 1');
CustomEase.create('filmEase', '0.83, 0, 0.17, 1');

// 6 culture cards — positioned in a ring around center
const CULTURE_CARDS = [
  {
    label: 'Burnout Resilience',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=350&fit=crop',
    x: -340, y: -175, rotate: -6, w: 220, h: 155,
  },
  {
    label: 'Values Alignment',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop',
    x: 20, y: -210, rotate: 3, w: 240, h: 160,
  },
  {
    label: 'Innovation',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=350&fit=crop',
    x: 340, y: -160, rotate: 5, w: 210, h: 150,
  },
  {
    label: 'Trust',
    img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=350&fit=crop',
    x: -330, y: 175, rotate: 4, w: 215, h: 155,
  },
  {
    label: 'Psychological Safety',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=350&fit=crop',
    x: 30, y: 210, rotate: -2, w: 240, h: 160,
  },
  {
    label: 'Inclusion',
    img: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&h=350&fit=crop',
    x: 330, y: 185, rotate: -5, w: 220, h: 155,
  },
];

// Strip images
const STRIP_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
  null, // index 8 = VIDEO FRAME
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop',
];

const VIDEO_INDEX = 8;
const FRAME_W = 520;
const FRAME_H = 340;
const FRAME_GAP = 24;

export default function HomeGsap2Page() {
  const [hasStarted, setHasStarted] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  // Scene 1: question + 6 cards
  const s1Ref = useRef<HTMLDivElement>(null);
  const s1TitleRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scene 2: strip + zoom + culture
  const s2Ref = useRef<HTMLDivElement>(null);
  const s2BgRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cultureTextRef = useRef<HTMLDivElement>(null);
  const cultureSubRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!hasStarted) return;
    if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.currentTime = 0; audio.volume = 0; audio.loop = false;
      audio.play().catch(() => {});
      gsap.to(audio, { volume: 0.5, duration: 2, ease: 'none' });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (audioRef.current) {
          gsap.to(audioRef.current, {
            volume: 0, duration: 2, ease: 'none',
            onComplete: () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; } },
          });
        }
        gsap.set([s1Ref.current, s2Ref.current], { opacity: 0 });
        gsap.set(flashRef.current, { opacity: 0 });
        gsap.set(introRef.current, { opacity: 1 });
        setHasStarted(false);
      },
    });
    tlRef.current = tl;

    // Hide intro
    tl.to(introRef.current, { opacity: 0, duration: 0.4, ease: 'power2.inOut' });

    // =============================================================
    // SCENE 1 — QUESTION + 6 CARDS (Pi-style layout)
    // =============================================================
    tl.set(s1Ref.current, { opacity: 1 });

    // Cards fly in from outside with stagger
    const validCards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    validCards.forEach((card, i) => {
      const data = CULTURE_CARDS[i];
      // Start from further out
      const startScale = 0.3;
      const startX = data.x * 2.5;
      const startY = data.y * 2.5;

      tl.fromTo(card,
        { x: startX, y: startY, scale: startScale, opacity: 0, rotation: data.rotate * 3 },
        {
          x: data.x, y: data.y, scale: 1, opacity: 1, rotation: data.rotate,
          duration: 0.5, ease: 'cinematic',
        },
        `-=${i === 0 ? 0 : 0.4}` // stagger overlap
      );
    });

    // Title fades in after cards settle
    tl.fromTo(s1TitleRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'cinematic' },
      '-=0.2'
    );

    // Hold — let audience read
    tl.to({}, { duration: 2.0 });

    // TRANSITION: Title zooms up + pushes cards outward
    // Title scales up massively
    tl.to(s1TitleRef.current, {
      scale: 8, opacity: 0, filter: 'blur(20px)',
      duration: 0.7, ease: 'power3.in',
    });

    // Cards explode outward simultaneously
    validCards.forEach((card, i) => {
      const data = CULTURE_CARDS[i];
      const exitX = data.x * 4;
      const exitY = data.y * 4;
      tl.to(card, {
        x: exitX, y: exitY, scale: 0.2, opacity: 0, rotation: data.rotate * 5,
        duration: 0.6, ease: 'power3.in',
      }, '<'); // all at same time as title zoom
    });

    // Flash on transition
    tl.set(flashRef.current, { backgroundColor: '#fff', opacity: 0.3 });
    tl.to(flashRef.current, { opacity: 0, duration: 0.15 });

    // Fade out scene 1 bg
    tl.to(s1Ref.current, { opacity: 0, duration: 0.2 }, '-=0.3');

    // =============================================================
    // SCENE 2 — STRIP ON WHITE → ZOOM INTO VIDEO → CULTURE
    // Strip starts scrolling THE INSTANT scene 2 appears — no delay
    // =============================================================
    const videoFrameCenter = VIDEO_INDEX * (FRAME_W + FRAME_GAP) + FRAME_W / 2;
    const startX = 300;
    const stopX = -videoFrameCenter;

    // Pre-set strip position before scene 2 is visible
    tl.set(stripRef.current, { x: startX, opacity: 1 });
    tl.set(s2BgRef.current, { backgroundColor: '#ffffff' });

    tl.call(() => {
      if (videoRef.current) { videoRef.current.currentTime = 0; videoRef.current.play().catch(() => {}); }
    });

    // Scene 2 appears AND strip starts scrolling at the SAME time
    const stripLabel = 'strip';
    tl.addLabel(stripLabel);

    tl.set(s2Ref.current, { opacity: 1 }, stripLabel);

    // Strip scrolls immediately — already moving when it appears
    tl.to(stripRef.current, {
      x: stopX,
      duration: 2.2,
      ease: 'power2.inOut',
    }, stripLabel);

    // IMMEDIATELY zoom — no pause
    const zoomLabel = 'zoom';
    tl.addLabel(zoomLabel);

    // Bg white → dark
    tl.to(s2BgRef.current, { backgroundColor: '#0a0a0a', duration: 0.6, ease: 'power2.inOut' }, zoomLabel);
    tl.to(vignetteRef.current, { opacity: 0, duration: 0.3 }, zoomLabel);

    // Video frame zooms to fill — NO dark overlay
    tl.to(videoFrameRef.current, {
      scale: 5.5, zIndex: 50,
      duration: 0.8, ease: 'filmEase',
    }, zoomLabel);

    // Other frames dissolve
    tl.to(stripRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, `${zoomLabel}+=0.2`);

    // Cross-dissolve to full-bleed video — full brightness, no overlay
    tl.to(videoFrameRef.current, { opacity: 0, duration: 0.25 }, `${zoomLabel}+=0.5`);
    tl.to(videoRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, `${zoomLabel}+=0.45`);

    // "CULTURE" SLAMS
    tl.fromTo(cultureTextRef.current,
      { opacity: 0, scale: 3.5, letterSpacing: '0.6em', filter: 'blur(6px)' },
      { opacity: 1, scale: 1, letterSpacing: '0.15em', filter: 'blur(0px)', duration: 0.15, ease: 'punch' },
      `${zoomLabel}+=0.7`
    );

    // Flash + shake
    tl.set(flashRef.current, { backgroundColor: '#fff', opacity: 0.6 });
    tl.to(flashRef.current, { opacity: 0, duration: 0.12 });
    tl.to(mainRef.current, { x: -12, duration: 0.03, ease: 'none' });
    tl.to(mainRef.current, { x: 10, duration: 0.03, ease: 'none' });
    tl.to(mainRef.current, { x: -6, duration: 0.03, ease: 'none' });
    tl.to(mainRef.current, { x: 3, duration: 0.03, ease: 'none' });
    tl.to(mainRef.current, { x: 0, duration: 0.03, ease: 'none' });

    // Subtitle
    tl.fromTo(cultureSubRef.current,
      { opacity: 0, y: 20, letterSpacing: '0.6em' },
      { opacity: 0.5, y: 0, letterSpacing: '0.4em', duration: 0.5, ease: 'cinematic' },
      '+=0.2'
    );

    // Ken Burns on video — full brightness
    tl.to(videoRef.current, { scale: 1.08, duration: 4, ease: 'none' }, '-=0.5');

    // Hold
    tl.to({}, { duration: 3 });

    // Exit
    tl.to(s2Ref.current, { opacity: 0, duration: 0.8, ease: 'power2.in' });

    return () => {
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }
    };
  }, [hasStarted]);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center font-sans">
      <main
        ref={mainRef}
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: '#0a0a0a', aspectRatio: '16/9', maxHeight: '100vh', maxWidth: 'calc(100vh * 16 / 9)' }}
      >
      <audio ref={audioRef} src="/bg-music.mp3" preload="auto" />
      <div ref={flashRef} className="absolute inset-0 z-[60] pointer-events-none" style={{ opacity: 0 }} />

      {/* ===== INTRO ===== */}
      <div ref={introRef} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white" style={{ pointerEvents: hasStarted ? 'none' : 'auto' }}>
        <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-inter-tight)] font-bold tracking-tighter mb-8">
          Instill Flow
        </h1>
        <button onClick={() => setHasStarted(true)} className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-[family-name:var(--font-inter-tight)] font-semibold text-lg hover:scale-105 transition-transform cursor-pointer">
          <Play className="w-6 h-6 fill-black" /> Play video
        </button>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SCENE 1: QUESTION + 6 CULTURE CARDS         */}
      {/* ═══════════════════════════════════════════ */}
      <div ref={s1Ref} className="absolute inset-0 z-10 overflow-hidden" style={{ opacity: 0, background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%)' }}>
        {/* Subtle grid texture */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        {/* Center question — frosted glass card */}
        <div
          ref={s1TitleRef}
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: 0 }}
        >
          <div className="text-center px-8 py-10 rounded-3xl relative" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-inter-tight)] font-black text-white tracking-tight leading-[1.15]">
              What&apos;s the{' '}
              <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>#1</span>
              {' '}driver
              <br />
              of high-performing
              <br />
              organizations?
            </p>
          </div>
        </div>

        {/* 6 Culture cards — image with gradient overlay label */}
        {CULTURE_CARDS.map((card, i) => (
          <div
            key={card.label}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute z-20"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: `${-card.w / 2}px`,
              marginTop: `${-card.h / 2}px`,
              opacity: 0,
              willChange: 'transform',
            }}
          >
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                width: `${card.w}px`,
                height: `${card.h}px`,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              <img
                src={card.img}
                alt={card.label}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* Gradient overlay with label */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pt-6">
                <span className="text-[11px] font-[family-name:var(--font-inter-tight)] font-semibold text-white/90 tracking-wide uppercase">
                  {card.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SCENE 2: STRIP + ZOOM + CULTURE             */}
      {/* ═══════════════════════════════════════════ */}
      <div ref={s2Ref} className="absolute inset-0 z-20 overflow-hidden" style={{ opacity: 0 }}>
        <div ref={s2BgRef} className="absolute inset-0 z-[3]" style={{ backgroundColor: '#ffffff' }} />

        <video
          ref={videoRef}
          src="/scene-5.mp4"
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover z-[4]"
          style={{ opacity: 0 }}
        />

        <div ref={overlayRef} className="absolute inset-0 bg-black z-[5]" style={{ opacity: 0 }} />

        {/* Strip */}
        <div className="absolute inset-0 flex items-center z-[10]">
          <div
            ref={stripRef}
            className="flex items-center flex-shrink-0"
            style={{ willChange: 'transform', paddingLeft: '50%', gap: `${FRAME_GAP}px` }}
          >
            {STRIP_IMAGES.map((src, i) => {
              if (i === VIDEO_INDEX) {
                return (
                  <div
                    key={`frame-${i}`}
                    ref={videoFrameRef}
                    className="flex-shrink-0 rounded-xl overflow-hidden relative bg-black"
                    style={{
                      width: `${FRAME_W}px`,
                      height: `${FRAME_H}px`,
                      boxShadow: '0 16px 50px rgba(0,0,0,0.25), 0 0 0 2px rgba(0,0,0,0.1)',
                      transformOrigin: 'center center',
                    }}
                  >
                    <video src="/scene-5.mp4" muted playsInline autoPlay loop preload="auto" className="w-full h-full object-cover" />
                  </div>
                );
              }
              return (
                <div
                  key={`frame-${i}`}
                  className="flex-shrink-0 rounded-xl overflow-hidden"
                  style={{
                    width: `${FRAME_W}px`,
                    height: `${FRAME_H}px`,
                    boxShadow: '0 16px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
                  }}
                >
                  <img src={src!} alt="" className="w-full h-full object-cover" loading="eager" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Vignette */}
        <div ref={vignetteRef} className="absolute inset-0 z-[12] pointer-events-none" style={{
          background: 'linear-gradient(90deg, #ffffff 0%, transparent 12%, transparent 88%, #ffffff 100%)',
        }} />

        {/* CULTURE text */}
        <div className="absolute inset-0 z-[55] flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center">
            <div
              ref={cultureTextRef}
              className="text-7xl md:text-[10rem] lg:text-[13rem] font-[family-name:var(--font-inter-tight)] font-black text-white tracking-[0.15em] leading-none"
              style={{ opacity: 0, textShadow: '0 0 100px rgba(0,0,0,0.5), 0 8px 50px rgba(0,0,0,0.4)' }}
            >
              CULTURE
            </div>
            <div
              ref={cultureSubRef}
              className="mt-4 md:mt-6 text-base md:text-xl font-[family-name:var(--font-inter-tight)] font-light text-white/40 tracking-[0.4em] uppercase"
              style={{ opacity: 0 }}
            >
              is the answer
            </div>
          </div>
        </div>
      </div>

      </main>
    </div>
  );
}
