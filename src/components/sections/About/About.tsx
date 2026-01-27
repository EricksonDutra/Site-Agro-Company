import styles from './About.module.scss';
const logoSvg = '/images/logosvg.svg';

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={`container ${styles.aboutGrid}`}>
        <div className={styles.content}>
          <h2 id="about-title" className={styles.title}>
            Quem Somos
          </h2>
          <div className={styles.divider} />
          <p>
            A <strong>Agro Company</strong> é uma empresa especializada em soluções financeiras para
            o agronegócio. Atuando junto aos principais players do mercado financeiro, prestamos
            assessoria, consultoria e reestruturação financeira com excelência e comprometimento.
          </p>
          <p>
            Por meio de análise técnica aprofundada da carteira de passivos, nosso propósito é
            fortalecer a gestão financeira, potencializar resultados e promover um crescimento
            sólido e sustentável para nossos clientes.
          </p>
          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <span className={styles.number}>+7</span>
              <span className={styles.label}>Anos de experiência</span>
            </div>
            <div className={styles.highlight}>
              <span className={styles.number}>100%</span>
              <span className={styles.label}>Foco no produtor</span>
            </div>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <img src={logoSvg} alt="Agro Company - Assessoria Financeira para o Agronegócio" />
          </div>
          <div className={styles.decorative} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
