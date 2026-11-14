import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './Hero.module.scss';
import { HERO_SLIDES } from '@/constants';
interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const SLIDES: Slide[] = HERO_SLIDES;
const SLIDE_INTERVAL = 6000; // 6 seconds

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<boolean[]>(() =>
    SLIDES.map((_, index) => index === 0)
  );
  const isAnimatingRef = useRef(false);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setLoadedSlides((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setCurrentIndex(index);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 600);
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % SLIDES.length;
      setLoadedSlides((loaded) => {
        if (loaded[nextIndex]) return loaded;
        const updated = [...loaded];
        updated[nextIndex] = true;
        return updated;
      });
      return nextIndex;
    });

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 600);
  }, []);

  // Preload remaining hero slides after initial page load / idle time so LCP (hero1.webp) gets full bandwidth
  useEffect(() => {
    const preloadRemaining = () => {
      setLoadedSlides(SLIDES.map(() => true));
    };

    const timer = setTimeout(preloadRemaining, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => {
      clearInterval(timer);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [nextSlide]);

  const currentSlide = SLIDES[currentIndex]!;

  return (
    <section id="home" className={styles.hero} aria-label="Banner principal">
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          style={loadedSlides[index] ? { backgroundImage: `url(${slide.image})` } : undefined}
          aria-hidden={index !== currentIndex}
        />
      ))}

      {/* Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textWrapper} key={currentSlide.id}>
          <span className={styles.subtitle}>{currentSlide.subtitle}</span>
          <h1 className={styles.title}>{currentSlide.title}</h1>
          <div className={styles.divider} />
          <p className={styles.description}>{currentSlide.description}</p>
          <a href="#contact" className={styles.cta}>
            Fale com um especialista
          </a>
        </div>

        {/* Slide Indicators */}
        <div className={styles.indicators} role="tablist" aria-label="Slides do banner">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span>Role para baixo</span>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  );
}
