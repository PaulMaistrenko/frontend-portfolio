import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const StartPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="start-page">
        <div className="container">
          <div className="start-page__content">
            <h1 className="start-page__title text-primary">
              I<span>'</span>M <br /> Pavlo Maistrenko
            </h1>
            <p className="start-page__subtitle">{t('position')}</p>
            <p className="text-accent">
              {t('with passion to creating and improving')}
              <span>|</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
