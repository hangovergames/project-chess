// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {
    Navigate,
    Outlet,
    useRoutes,
} from "react-router-dom";
import { LanguageService } from "../../../io/hyperify/core/LanguageService";
import { LogService } from "../../../io/hyperify/core/LogService";
import { TranslationUtils } from "../../../io/hyperify/core/TranslationUtils";
import { parseBoolean } from "../../../io/hyperify/core/types/Boolean";
import { parseLanguage } from "../../../io/hyperify/core/types/Language";
import {
    parseTheme,
    Theme,
} from "../../../io/hyperify/core/types/Theme";
import { TranslationFunction } from "../../../io/hyperify/core/types/TranslationFunction";
import { useQueryParam } from "../../../io/hyperify/frontend/hooks/useQueryParams";
import { useRouteServiceWithNavigate } from "../../../io/hyperify/frontend/hooks/useRouteServiceWithNavigate";
import { useTheme } from "../../../io/hyperify/frontend/hooks/useTheme";
import { ThemeService } from "../../../io/hyperify/frontend/services/ThemeService";
import {
    INDEX_ROUTE,
    LEADERBOARD_ROUTE,
    NOT_FOUND_ROUTE,
} from "../../constants/route";
import { parseChessPlayMode } from "../../types/ChessPlayMode";

// NOTE! Order in which these imports are done is essential -- it declares the order of SCSS files!
// So, put components before layouts, and layouts before views. Otherwise layout's SCSS files will
// overwrite SCSS from views and make your life harder.
import { MainLayout } from "../layouts/main/MainLayout";
import { LeaderboardView } from "../views/leaderboard/LeaderboardView";
import { MainChessView } from "../views/main/MainChessView";

const LOG = LogService.createLogger('ChessApp');

/**
 * The frontend for a chess game.
 */
export function ChessApp () {

    const [modeString] = useQueryParam('mode');
    const mode = parseChessPlayMode(modeString);

    const [themeParam] = useQueryParam('theme');
    const [themeVariantParam] = useQueryParam('variant');
    const [browserTheme] = useTheme( ThemeService.hasDarkMode() ? Theme.DARK : Theme.LIGHT  )
    const theme = parseTheme(themeParam) ?? browserTheme;

    const [embedString] = useQueryParam('embed');
    const isEmbedded = parseBoolean(embedString) ?? false;

    const themeVariant = themeVariantParam ?? 'default';

    const { t, i18n } = useTranslation();

    const i18nLanguage = i18n?.language;

    useRouteServiceWithNavigate();

    // If language changes from i18n and/or when it's initializing
    useEffect(
        () => {
            const l = parseLanguage(i18nLanguage) ?? LanguageService.getDefaultLanguage();
            LanguageService.setCurrentLanguage(l);
        }, [
            i18nLanguage
        ]
    );

    // When language in our service changes
    useEffect(
        () => {
            return LanguageService.on(
                LanguageService.Event.CURRENT_LANGUAGE_CHANGED,
                () => {
                    const l = LanguageService.getCurrentLanguage();
                    const ls = TranslationUtils.getLanguageStringForI18n(l);
                    if (!ls) {
                        LOG.error(`Changing language: Could not parse language: ${l}`);
                    } else if (i18n.language !== ls) {
                        i18n.changeLanguage( ls ).catch(err => {
                            LOG.error(`Changing language: Could not change language to "${ls}" (${l}": `, err);
                        });
                    } else {
                        LOG.debug(`The language was already ${ls}`);
                    }
                }
            );
        },
        [
            i18n
        ]
    );

    const mainRoutes = {
        path: INDEX_ROUTE,
        element: (
            <MainLayout t={t as TranslationFunction} theme={theme} embedded={isEmbedded} themeVariant={themeVariant}>
                <Outlet />
            </MainLayout>
        ),
        children: [

            {path: INDEX_ROUTE, element: <MainChessView autoStartMode={mode} theme={theme} embedded={isEmbedded} themeVariant={themeVariant} t={t as TranslationFunction} /> },
            {path: LEADERBOARD_ROUTE, element: <LeaderboardView t={t as TranslationFunction} /> },

            {path: '*', element: <Navigate to={NOT_FOUND_ROUTE} />},
            {path: INDEX_ROUTE, element: <Navigate to={INDEX_ROUTE} />},
            {path: NOT_FOUND_ROUTE, element: <Navigate to={INDEX_ROUTE} />}

        ]
    };

    const routing = useRoutes(
        [
            mainRoutes,
        ]
    );

    return <>{routing}</>;

}
