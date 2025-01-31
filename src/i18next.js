import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import English from './translate/indexEn.js';
import Persian from './translate/indexFa.js';
import {language} from "../config.js";

const resources = {
    en: {
        translation: English,
    },
    fa: {
        translation: Persian,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: language,
    interpolation: {
        escapeValue: false,
    },
});

export default i18next;
