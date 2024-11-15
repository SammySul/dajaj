import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: [
    { id: 'en', label: 'English' },
    { id: 'ar', label: 'Arabic' },
  ],
  keysManager: {},
};

export default config;
