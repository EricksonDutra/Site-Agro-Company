import { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import { NAV_LINKS } from '@/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.content}`}>
        {/* Logo */}
        <a href="#home" className={styles.logo}>
          <img src={'/images/logo.png'} alt="Agro Company - Assessoria Financeira" />
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {NAV_LINKS.slice(0, -1).map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.cta}>
            Contato
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuButton}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNavContent}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
