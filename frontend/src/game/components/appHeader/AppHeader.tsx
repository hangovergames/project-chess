// Copyright (c) 2021-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Theme } from "../../../io/hyperify/core/types/Theme";
import { TranslationFunction } from "../../../io/hyperify/core/types/TranslationFunction";
import { SetThemeCallback } from "../../../io/hyperify/frontend/hooks/useTheme";
import { APP_HEADER_CLASS_NAME } from "../../constants/classNames";
import "./AppHeader.scss";

export interface AppHeaderProps {
    readonly t: TranslationFunction;
    readonly className?: string;
    readonly theme?: Theme;
    readonly changeTheme: SetThemeCallback;
    readonly isFixed?: boolean;
}

export function AppHeader (props: AppHeaderProps) {

    return (
        <header className={ APP_HEADER_CLASS_NAME }>

        </header>
    );
}
