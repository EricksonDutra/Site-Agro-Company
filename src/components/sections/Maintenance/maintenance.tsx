import styles from './Maintenance.module.scss';
const logoSvg = '/images/logosvg.svg';

export default function Maintenance() {
  return (
    <section id="maintenance" className={styles.about} aria-labelledby="maintenance-title">
      <div className={`container ${styles.aboutGrid}`}>
        <div className={styles.content}>
          <h2 id="maintenance-title" className={styles.title}>
            SITE EM
            <br />
            MANUTENÇÃO
          </h2>
        </div>

        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <img
              src={logoSvg}
              alt="Agro Company - Assessoria Financeira para o Agronegócio"
              width={300}
              height={284}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.decorative} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
