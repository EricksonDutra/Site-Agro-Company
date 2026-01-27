import styles from './Services.module.scss';
const colhedeira = '/images/colhedeira.webp';

interface Slide {
  id: number;
  image: string;
  title: string;
}

const slide: Slide = {
  id: 1,
  image: colhedeira,
  title: `Contratar a Agro Company significa ter uma equipe técnica ao lado do produtor rural, reduzindo custos, protegendo 
seu patrimônio, organizando o passivo e recuperando a capacidade de crescimento com segurança e estratégia.`,
};

export default function Services() {
  return (
    <section id="services" className={styles.hero} aria-label="Banner principal">
      <div
        key={slide.id}
        className={`${styles.slide} ${styles.active}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      />

      {/* Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textWrapper} key={slide.id}>
          <p className={styles.title}>{slide.title}</p>
          <div className={styles.divider} />
        </div>
      </div>
    </section>
  );
}
