// Copyright (c) 2022-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { useLocation } from "react-router-dom";
import { TranslationFunction } from "../../../../io/hyperify/core/types/TranslationFunction";
import { ScrollToHere } from "../../../../io/hyperify/frontend/components/common/scrollToHere/ScrollToHere";
import { MAIN_VIEW_CLASS_NAME } from "../../../constants/classNames";
import { INDEX_ROUTE } from "../../../constants/route";
import "./MainView.scss";

export interface MainViewProps {
    readonly t: TranslationFunction;
    readonly className?: string;
}

export function MainView (props: MainViewProps) {
    // const t: TranslationFunction = props.t;
    const location = useLocation();
    return (
        <div className={MAIN_VIEW_CLASS_NAME}>
            {location.pathname === INDEX_ROUTE ? (
                <>
                    <ScrollToHere path={INDEX_ROUTE} />
                </>
            ) : null}

            <p>Hello</p>

        </div>
    );
}
