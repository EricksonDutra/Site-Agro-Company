import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './Contact.module.scss';
import { FiInstagram } from 'react-icons/fi';
import { WHATSAPP_NUMBER } from '@/constants';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  phone: '',
  email: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const text = `*Contato via site Agro Company*

*Nome:* ${form.name}
*Telefone:* ${form.phone}
*E-mail:* ${form.email}

*Mensagem:*
${form.message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');

    // Reset form after short delay
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 id="contact-title">Entre em Contato</h2>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              Ajudamos quem produz a crescer com inteligência e estratégia. Entre em contato e
              descubra como podemos ajudar seu negócio.
            </p>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📍</span>
                <div>
                  <strong>Localização</strong>
                  <p>Campo Grande – MS</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📞</span>
                <div>
                  <strong>Telefone</strong>
                  <p>
                    <a href="tel:+5567998214438">(67) 99821-4438</a>
                  </p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>✉️</span>
                <div>
                  <strong>E-mail</strong>
                  <p>
                    <a href="mailto:augusto.agrocompany@gmail.com">augusto.agrocompany@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>
                  <FiInstagram />
                </span>
                <div>
                  <strong>Instagram</strong>
                  <p>
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
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                placeholder="Como podemos ajudar?"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
