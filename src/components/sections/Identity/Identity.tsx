import styles from './Identity.module.scss';

interface IdentityItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string | string[];
}

const IdentityList: IdentityItem[] = [
  {
    id: 'servicos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.36-6.36-2.83 2.83M9.47 14.53l-2.83 2.83m0-11.32 2.83 2.83m5.66 5.66 2.83 2.83" />
      </svg>
    ),
    title: 'Serviços',
    description: ['Assessoria Financeira', 'Consultoria Financeira', 'Reestruturação Financeira'],
  },
  {
    id: 'missao',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: 'Missão',
    description:
      'Oferecer serviço financeiro especializado, desenvolvendo soluções inteligentes e sustentáveis com foco na otimização dos resultados, proteção patrimonial e na saúde financeira dos nossos clientes.',
  },
  {
    id: 'visao',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Visão',
    description:
      'Ninguém cresce sozinho; o que torna o seu negócio único é você e sua fé. O valor do trabalho está em cada gota de suor que move o campo e a cidade. Acreditamos que a assessoria financeira deve ser utilizada como uma ferramenta estratégica.',
  },
  {
    id: 'valores',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l4-5h10l4 5-9 11-9-11z" />
      </svg>
    ),
    title: 'Valores',
    description: [
      'Transparência',
      'Compromisso',
      'Sustentabilidade',
      'Eficiência',
      'Parceria',
      'Integridade',
      'Proximidade',
      'Paixão pelo Agro',
    ],
  },
];

export default function Identity() {
  return (
    <section id="Identity" className={styles.services} aria-labelledby="services-title">
      <div className="container">
        <h2 id="services-title" className={styles.sectionTitle}>
          Nossa Identidade
        </h2>
        <div className={styles.divider} />

        <div className={styles.grid}>
          {IdentityList.map((service) => (
            <article key={service.id} className={styles.card}>
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3>{service.title}</h3>
              {Array.isArray(service.description) ? (
                <ul className={styles.list}>
                  {service.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{service.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
