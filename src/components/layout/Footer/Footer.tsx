import styles from './Footer.module.scss';
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { NAV_LINKS } from '@/constants';

const logosvg = '/images/logosvg.svg';

const CREDENTIALS = [
  'Engenheiro Agrônomo CREA/MS 62.932',
  'Pós-graduação em Direito do Agronegócio',
  'Pós-graduação em Agronegócio, Gestão Empresarial e Inteligência Competitiva',
  'Técnico em Administração e Gestão Financeira voltada ao Agronegócio',
  'Técnico em Contabilidade no Agronegócio',
  'Certificação FEBRABAN FBB-100 - Correspondente bancário + LGPD',
  'Certificação FEBRABAN FBB-420 - Agronegócio Crédito Rural',
  'Certificação ANBIMA C-PRO R - Profissional de Investimentos com selo de excelência ANBIMA, focado no relacionamento e gestão de investimentos para Alta Renda, Private e Corporate, investidores institucionais em agências bancárias ou em plataformas de atendimento',
  '+7 anos de experiência em bancos e instituições financeiras',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Column */}
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <img
              src={logosvg}
              alt="Agro Company"
              width={240}
              height={227}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p>Ajudamos quem produz a crescer com inteligência, técnica e sustentabilidade.</p>
        </div>

        {/* Technical Responsible */}
        <div className={styles.footerTech}>
          <h4>Responsável Técnico</h4>
          <ul>
            {CREDENTIALS.map((credential, index) => (
              <li key={index}>{credential}</li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.footerLinks}>
          <h4>Links Rápidos</h4>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              <span>›</span> {link.label}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className={styles.footerContact}>
          <h4>Contato</h4>

          <p>
            <FiMapPin className={styles.icon} />
            <span>Rua Mar Cáspio, 208 - Campo Grande – MS - Brasil</span>
          </p>

          <p>
            <FiMail className={styles.icon} />
            <a href="mailto:falecomagrocompany@gmail.com">falecomagrocompany@gmail.com</a>
          </p>

          <p>
            <FiPhone className={styles.icon} />
            <a href="tel:+5567998214438">(67) 99821-4438</a> /{' '}
            <a href="tel:+5567981154023">(67) 98115-4023</a>
          </p>

          <p>
            <FiInstagram className={styles.icon} />
            <a
              href="https://www.instagram.com/agrocompany.assessoria/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @agrocompany.assessoria
            </a>
          </p>

          <p>
            <FiLinkedin className={styles.icon} />
            <a
              href="http://linkedin.com/in/augusto-alvarenga-2064b2b3"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/augusto-alvarenga-2064b2b3
            </a>
          </p>
        </div>
      </div>

      <div className={styles.footerCopy}>
        <div className="container">
          © {currentYear} Agro Company – Assessoria Financeira. Todos os direitos reservados.
          <br />
          <span style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '5px' }}>
            Desenvolvido por:{' '}
            <a
              href="https://ericksondutra.cloud"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Erickson Dutra
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
