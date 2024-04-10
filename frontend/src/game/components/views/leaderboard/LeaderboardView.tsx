// Copyright (c) 2022-2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { useLocation } from "react-router-dom";
import { map } from "../../../../io/hyperify/core/functions/map";
import { LogService } from "../../../../io/hyperify/core/LogService";
import { TranslationFunction } from "../../../../io/hyperify/core/types/TranslationFunction";
import { ScrollToHere } from "../../../../io/hyperify/frontend/components/common/scrollToHere/ScrollToHere";
import { LEADERBOARD_VIEW_CLASS_NAME } from "../../../constants/classNames";
import {
    LEADERBOARD_ROUTE,
} from "../../../constants/route";
import { useLeaderboard } from "../../../hooks/useLeaderboard";
import { GameClientImpl } from "../../../services/GameClientImpl";
import "./LeaderboardView.scss";

const LOG = LogService.createLogger( 'LeaderboardView' );

const GAME_CLIENT = GameClientImpl.create();

export interface LeaderboardViewProps {
    readonly t: TranslationFunction;
    readonly className?: string;
}

export function LeaderboardView (props: LeaderboardViewProps) {

    const className: string | undefined = props.className;
    const location = useLocation();

    const [leaderboard] = useLeaderboard(GAME_CLIENT, 30)

    LOG.debug(`leaderboard = `, leaderboard);

    return (
        <div className={ LEADERBOARD_VIEW_CLASS_NAME + (className ? ` ${ className }` : '') }>

            { location.pathname === LEADERBOARD_ROUTE ? (
                <ScrollToHere path={ LEADERBOARD_ROUTE } />
            ) : null }

            <section className={ LEADERBOARD_VIEW_CLASS_NAME + '-list' }>

                <h3>Leaderboard</h3>

                {map(leaderboard.payload, (item, index): any => {
                    return (
                        <div
                            className={ LEADERBOARD_VIEW_CLASS_NAME + '-list-item'}
                            key={`leader-board-item-${item.id}`}>
                            <div className={ LEADERBOARD_VIEW_CLASS_NAME + '-list-item-index'}>{index + 1}</div>
                            <div className={ LEADERBOARD_VIEW_CLASS_NAME + '-list-item-name'}>{item.name}</div>
                            <div className={ LEADERBOARD_VIEW_CLASS_NAME + '-list-item-score'}>{item.score}</div>
                        </div>
                    );
                })}

            </section>

        </div>
    );
}
