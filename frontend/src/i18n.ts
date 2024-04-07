// Copyright (c) 2021-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { use } from "i18next";
import { initReactI18next } from "react-i18next";
import { TranslationUtils } from "./io/hyperify/core/TranslationUtils";
import { LogService } from "./io/hyperify/core/LogService";
import { LanguageService } from "./io/hyperify/core/LanguageService";
import { Language, parseLanguage } from "./io/hyperify/core/types/Language";
import { TRANSLATIONS } from "./game/translations";
import { FRONTEND_DEFAULT_LANGUAGE } from "./game/constants/frontend";

const LOG = LogService.createLogger('i18n');

LanguageService.setDefaultLanguage(parseLanguage(FRONTEND_DEFAULT_LANGUAGE) ?? Language.ENGLISH);

use(initReactI18next).init({
    resources: TranslationUtils.getConfig(TRANSLATIONS),
    lng: FRONTEND_DEFAULT_LANGUAGE,
    interpolation: {
        escapeValue: false
    }
}).catch(err => {
    LOG.error(`Translation init failed: `, err);
});
