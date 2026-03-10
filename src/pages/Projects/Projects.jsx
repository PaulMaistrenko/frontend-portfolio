import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { scrollToTop } from '../../utils/scrollToTop';

import { useMainContext } from '../../context/MainContext';

import { BackLink } from '../../components/UI/BackLink/BackLink';
import { ProjectsPageItem } from '../../components/ProjectsPageItem/ProjectsPageItem';

import { projectsData } from '../../data/projectsData';
import { ScrollReveal } from '../../components/ScrollReveal/ScrollReveal';

export const Projects = () => {
  const { setCurrentPage } = useMainContext();
  const { t } = useTranslation();

  useEffect(() => {
    scrollToTop();
    setCurrentPage('projects');
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section id="projects" className="page projects">
        <div className="container">
          <BackLink />
          <ScrollReveal>
            <h1 className="page__title text-secondary">
              {t('projects').charAt(0).toUpperCase() + t('projects').slice(1)}
            </h1>
            <article className="projects-page__description text-secondary">
              {t('projects page description part 1')}{' '}
              <span className="text-accent">
                {t('projects page description part 2')}
              </span>{' '}
              {t('projects page description part 3')}
            </article>
          </ScrollReveal>

          <ul className="projects-page-list">
            {projectsData.map((projectsItem) => (
              <ScrollReveal key={projectsItem.id}>
                <li className="projects-page-item">
                  <ProjectsPageItem projectsItem={projectsItem} />
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>
    </motion.div>
  );
};
