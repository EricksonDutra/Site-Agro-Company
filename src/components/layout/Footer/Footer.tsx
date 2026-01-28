import styles from './Footer.module.scss';
import { FiMapPin, FiMail, FiPhone, FiInstagram } from 'react-icons/fi';
import { NAV_LINKS } from '@/constants';

const logosvg = '/images/logosvg.svg';

const CREDENTIALS = [
  'Engenheiro Agrônomo CREA/MS 62.932',
  'Pós-graduação em Direito do Agronegócio',
  'Pós-graduação em Agronegócio, Gestão Empresarial e Inteligência Competitiva',
  'Técnico em Administração e Gestão Financeira voltada ao Agronegócio',
  'Técnico em Contabilidade no Agronegócio',
  'Certificações FEBRABAN FBB-410 / FBB-420 - (Agronegócio Crédito Rural), (Correspondente bancário + LGPD) ANBIMA CPA-20',
  '(Produtos de investimento para clientes dos segmentos varejo alta renda, private, corporate e investidores institucionais em agências bancárias ou em plataformas de atendimento)',
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
            <img src={logosvg} alt="Agro Company" width={140} height={35} />
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
            <span>Campo Grande – MS</span>
          </p>

          <p>
            <FiMail className={styles.icon} />
            <a href="mailto:augusto.agrocompany@gmail.com">augusto.agrocompany@gmail.com</a>
          </p>

          <p>
            <FiPhone className={styles.icon} />
            <a href="tel:+5567998214438">(67) 99821-4438</a>
          </p>

          <p>
            <FiInstagram className={styles.icon} />
            <a
              href="https://www.instagram.com/a.grocompany/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @a.grocompany
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
