import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';

import { scrollToTop } from '../../utils/scrollToTop';

import { useMainContext } from '../../context/MainContext';

import { BackLink } from '../../components/UI/BackLink/BackLink';
import { SocialLinks } from '../../components/SocialLinks/SocialLinks';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';

export const Contacts = () => {
  const { currentPage, setCurrentPage, country } = useMainContext();
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        'service_a5fzh9o',
        'template_m0i6rei',
        event.target,
        'Z9jQH0HnTBFeGnW2W',
      )
      .then(
        (result) => {
          setStatusMessage('Сообщение отправлено успешно!');
          setFormData({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setStatusMessage('Произошла ошибка. Попробуйте снова.');
          console.error(error.text);
        },
      );
  };

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    scrollToTop();
    setCurrentPage('contacts');
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [currentPage, setCurrentPage]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section id="contacts" className="page contacts">
        <ScrollReveal>
          <div className="container">
            <BackLink />
            <h1 className="page__title text-secondary">
              {t('contacts').charAt(0).toUpperCase() + t('contacts').slice(1)}
            </h1>
            <p className="contacts-page__description">
              {t('Always in touch for you...')}
            </p>
            <ul className="contacts-list">
              <div className="grid">
                <li className="contacts-item grid__item--tablet-1-2 grid__item--desktop-2-4">
                  <p className="contacts-title text-secondary">
                    {t('Call me...')}
                  </p>
                  <a
                    href="tel:+4916096294939"
                    className="contacts-link text-accent"
                  >
                    {country === 'UA'
                      ? '+38 050 5584254 (WhatsApp, Viber)'
                      : '+49 160 96294939'}
                  </a>
                </li>
                <li className="contacts-item grid__item--tablet-1-2 grid__item--desktop-2-4">
                  <p className="contacts-title text-secondary">
                    {t('Chat with me on Telegram...')}
                  </p>
                  <a
                    href="https://t.me/@Pavlo_Maistrenko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacts-link text-accent"
                  >
                    @Pavlo_Maistrenko
                  </a>
                </li>
                <li className="contacts-item grid__item--tablet-1-2 grid__item--desktop-2-4">
                  <p className="contacts-title text-secondary">
                    {t('Drop me a line...')}
                  </p>
                  <a
                    href="mailto:maystrenko.p@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacts-link text-accent"
                  >
                    maystrenko.p@gmail.com
                  </a>
                </li>
                {!isMobile && (
                  <li className="contacts-item grid__item--tablet-1-2 grid__item--desktop-2-4">
                    <p className="contacts-title text-secondary">
                      {t('Follow me...')}
                    </p>
                    <SocialLinks />
                  </li>
                )}
                <li className="contacts-item grid__item--tablet-3-4 grid-row--tablet-1-5 grid__item--desktop-5-9">
                  <p className="contacts-title text-secondary">
                    {t('or use the form below...')}
                  </p>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="name" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('Your name...')}
                      required
                    />

                    <label htmlFor="email" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('Your e-mail...')}
                      required
                    />

                    <label htmlFor="message" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('Your message...')}
                      rows="5"
                      required
                    ></textarea>
                    <button type="submit" className="contact-form__button">
                      {t('Send')}
                    </button>
                  </form>
                  {!isMobile && (
                    <button
                      className="to-top-button"
                      onClick={() => scrollToTop()}
                    />
                  )}
                </li>
              </div>
            </ul>
          </div>
        </ScrollReveal>
      </section>
    </motion.div>
  );
};
