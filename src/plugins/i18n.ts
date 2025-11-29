import Vue from 'vue';
import VueI18n, { I18nOptions } from 'vue-i18n'
import enCA from '@/locales/en-US.json';
import esMX from '@/locales/es-MX.json';

Vue.use(VueI18n);

const messages: any = {
  'en-US': enCA,
  'es-MX': esMX,
};

let locale = localStorage.getItem('locale');
if (!locale) {
  const navLang = navigator.language;
  const availableLanguages = Object.keys(messages).map(lang => lang.substring(0, 2));
  const index = availableLanguages.indexOf(navLang);
  if (index === -1) {
    locale = 'en-US';
  } else {
    locale = Object.keys(messages)[index];
  }
} else if (Object.keys(messages).indexOf(locale) === -1) {
  locale = 'en-US';
}

const opts: I18nOptions = {
  locale,
  fallbackLocale: ['en-US'],
  formatFallbackMessages: true,
  messages,
};

export default new VueI18n(opts);
