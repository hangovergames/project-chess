// Copyright (c) 2022-2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { map } from "../../../../io/hyperify/core/functions/map";
import { TranslationFunction } from "../../../../io/hyperify/core/types/TranslationFunction";
import { ScrollToHere } from "../../../../io/hyperify/frontend/components/common/scrollToHere/ScrollToHere";
import { LEADERBOARD_VIEW_CLASS_NAME } from "../../../constants/classNames";
import {
    LEADERBOARD_ROUTE,
} from "../../../constants/route";
import { useLeaderboard } from "../../../hooks/useLeaderboard";
import { GameClientImpl } from "../../../services/GameClientImpl";
import { LeaderBoardType } from "../../../types/LeaderBoardType";
import "./LeaderboardView.scss";

const GAME_CLIENT = GameClientImpl.create();

export interface LeaderboardViewProps {
    readonly t: TranslationFunction;
    readonly children?: ReactNode;
    readonly className?: string;
    readonly cards?: number;
    readonly type?: LeaderBoardType;
    readonly name?: string;
}

export function LeaderboardView (props: LeaderboardViewProps) {

    const children: ReactNode | undefined = props?.children;
    const name: string | undefined = props.name;
    const className: string | undefined = props.className;
    const cards: number | undefined = props?.cards ?? 16;
    const type: LeaderBoardType | undefined = props?.type ?? LeaderBoardType.ALLTIME;
    const location = useLocation();

    const [leaderboard] = useLeaderboard(GAME_CLIENT, cards, 100, name, type)

    // LOG.debug(`leaderboard = `, leaderboard);
    //
    // let levelString = 'n/a';
    // if (cards === 16) levelString = 'Elder';
    // else if (cards === 12) levelString = 'Master';
    // else if (cards === 8) levelString = 'Apprentice';
    // else if (cards === 6) levelString = 'Novice';

    return (
        <div className={ LEADERBOARD_VIEW_CLASS_NAME + (className ? ` ${ className }` : '') }>

            { location.pathname === LEADERBOARD_ROUTE ? (
                <ScrollToHere path={ LEADERBOARD_ROUTE } />
            ) : null }

            <section className={ LEADERBOARD_VIEW_CLASS_NAME + '-list' }>

                <h3>Leaderboard</h3>

                {children}

                {map(leaderboard.payload, (item, index): any => {
                    return (
                        <div
                            className={ LEADERBOARD_VIEW_CLASS_NAME + '-list-item'
                            + (
                                    name === item.name ? ' ' + LEADERBOARD_VIEW_CLASS_NAME + '-list-item-mine' : ''
                                )
                        }
                            key={`leader-board-item-${item.id}`}>
                            <div className={ LEADERBOARD_VIEW_CLASS_NAME + '-list-item-index'}>{item.rank}</div>
                            <div className={ LEADERBOARD_VIEW_CLASS_NAME + '-list-item-name'}>{item.name}</div>
                            <div className={ LEADERBOARD_VIEW_CLASS_NAME + '-list-item-score'}>{item.score}</div>
                        </div>
                    );
                })}

            </section>

        </div>
    );
}
