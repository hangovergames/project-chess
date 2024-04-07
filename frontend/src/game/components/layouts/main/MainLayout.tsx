// Copyright (c) 2021-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReactNode, useRef, useState } from "react";
import { Theme } from "../../../../io/hyperify/core/types/Theme";
import { TranslationFunction } from "../../../../io/hyperify/core/types/TranslationFunction";
import { useScrollingElement } from "../../../../io/hyperify/frontend/hooks/useScrollingElement";
import { useScrollTop } from "../../../../io/hyperify/frontend/hooks/useScrollTop";
import { MAIN_LAYOUT_CLASS_NAME } from "../../../constants/classNames";
import { AppFooter } from "../../appFooter/AppFooter";
import { AppHeader } from "../../appHeader/AppHeader";
import "./MainLayout.scss";

export interface MainLayoutProps {
    readonly t: TranslationFunction;
    readonly children: ReactNode;
    readonly className?: string;
    readonly theme?: Theme;
    readonly setThemeDark?: boolean;
}

export function MainLayout (props: MainLayoutProps) {
    const t = props?.t;
    const [ theme, setTheme ] = useState<Theme>(props?.theme ?? Theme.LIGHT);
    const isThemeDark = theme === Theme.DARK;
    const myRef = useRef<HTMLDivElement>(null);
    const scrollingElement = useScrollingElement();
    const scrollTop = useScrollTop(scrollingElement);
    const isOnTop : boolean = scrollTop === 0;
    return (
        <div
            ref={myRef}
            className={MAIN_LAYOUT_CLASS_NAME}
            data-theme={isThemeDark ? "dark" : "light"}
        >

            <AppHeader
                className={`${MAIN_LAYOUT_CLASS_NAME}-header`}
                theme={theme}
                changeTheme={setTheme}
                t={t}
                isFixed={!isOnTop}
            />

            <section className={`${MAIN_LAYOUT_CLASS_NAME}-content`}>{props.children}</section>

            <AppFooter
                className={`${MAIN_LAYOUT_CLASS_NAME}-footer`}
                t={t}
            />

        </div>
    );
}
