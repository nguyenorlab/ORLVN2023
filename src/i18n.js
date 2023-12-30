import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Nav_en from './locales/en/Nav.json';
import Home_en from './locales/en/Home.json';
import About_en from './locales/en/About.json';
import Services_en from './locales/en/Services.json';
import News_en from './locales/en/News.json';
import Recruitment_en from './locales/en/Recruitment.json';
import Footer_en from './locales/en/Footer.json';


import Nav_vi from './locales/vi/Nav.json';
import Home_vi from './locales/vi/Home.json';
import About_vi from './locales/vi/About.json';
import Services_vi from './locales/vi/Services.json';
import News_vi from './locales/vi/News.json';
import Recruitment_vi from './locales/vi/Recruitment.json';
import Footer_vi from './locales/vi/Footer.json';

import Home_jp from './locales/jp/Home.json';
import Nav_jp from './locales/jp/Nav.json';
import About_jp from './locales/jp/About.json';
import Services_jp from './locales/jp/Services.json';
import News_jp from './locales/jp/News.json';
import Recruitment_jp from './locales/jp/Recruitment.json';
import Footer_jp from './locales/jp/Footer.json';


const resources = {
  en: {
    Nav: Nav_en,
    Home: Home_en,
    About: About_en,
    Services: Services_en,
    News: News_en,
    Recruitment: Recruitment_en,
    Footer: Footer_en
  },
  vi: {
    Nav: Nav_vi,
    Home: Home_vi,
    About: About_vi,
    Services: Services_vi,
    News: News_vi,
    Recruitment: Recruitment_vi,
    Footer: Footer_vi
  },
  jp: {
    Home: Home_jp,
    Nav: Nav_jp,
    About: About_jp,
    Services: Services_jp,
    News: News_jp,
    Recruitment: Recruitment_jp,
    Footer: Footer_jp
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
