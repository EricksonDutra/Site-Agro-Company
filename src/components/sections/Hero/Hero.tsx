import { useEffect, useState, useCallback } from 'react';
import styles from './Hero.module.scss';
import { HERO_SLIDES } from '@/lib/constants';

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
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % SLIDES.length);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentSlide = SLIDES[currentIndex];

  return (
    <section id="home" className={styles.hero} aria-label="Banner principal">
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
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
