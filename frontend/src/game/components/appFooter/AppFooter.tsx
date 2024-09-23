// Copyright (c) 2022-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TranslationFunction } from "../../../io/hyperify/core/types/TranslationFunction";
import { APP_FOOTER_CLASS_NAME } from "../../constants/classNames";
import "./AppFooter.scss";

export interface AppFooterProps {
    readonly t?: TranslationFunction;
    readonly className?: string;
}

export function AppFooter (props: AppFooterProps) {
    const name : string = process.env.REACT_APP_NAME ?? '';
    const version : string = process.env.REACT_APP_VERSION ?? '';
    const className = props?.className;
    // const t: TranslationFunction = props?.t ?? ((key: string): string => key);
    return (
        <footer
            className={
                APP_FOOTER_CLASS_NAME
                + (className ? ` ${className}` : '')
            }
        >

             <a href={"https://github.com/hangovergames/project-chess"}>{ name ? name : 'Chess' }</a>
            &nbsp;<a href={"https://github.com/hangovergames/project-chess/issues/1"}>{ version ? `v${ version }` : 'dev-version' }</a>
            &nbsp;&copy; 2024 <a href={"https://hangover.games"}>Hangover Games</a>

        </footer>
    );
}
