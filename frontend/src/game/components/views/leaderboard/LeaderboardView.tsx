// Copyright (c) 2022-2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import React, {
    ReactNode,
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import { map } from "../../../../io/hyperify/core/functions/map";
import { TranslationFunction } from "../../../../io/hyperify/core/types/TranslationFunction";
import { Button } from "../../../../io/hyperify/frontend/components/button/Button";
import { ScrollToHere } from "../../../../io/hyperify/frontend/components/common/scrollToHere/ScrollToHere";
import {
    LEADERBOARD_VIEW_CLASS_NAME,
    MAIN_VIEW_CLASS_NAME,
} from "../../../constants/classNames";
import {
    LEADERBOARD_ROUTE,
} from "../../../constants/route";
import { useChessLeaderboard } from "../../../hooks/useChessLeaderboard";
import { ChessGameClientImpl } from "../../../services/ChessGameClientImpl";
import { ChessLeaderBoardType } from "../../../types/ChessLeaderBoardType";
import "./LeaderboardView.scss";

const GAME_CLIENT = ChessGameClientImpl.create();

export interface LeaderboardViewProps {
    readonly t: TranslationFunction;
    readonly children?: ReactNode;
    readonly className?: string;
    readonly name ?: string;
}

export function LeaderboardView (props: LeaderboardViewProps) {

    const children: ReactNode | undefined = props?.children;
    const name: string | undefined = props?.name;
    const className: string | undefined = props.className;
    const location = useLocation();
    const [ type, setType ] = useState<ChessLeaderBoardType>(ChessLeaderBoardType.DAILY);
    const [leaderboard] = useChessLeaderboard(GAME_CLIENT, 100, name, type)
    const changeTypeButtons = (
        <section className={ MAIN_VIEW_CLASS_NAME + '-change-type' }>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-type-button'
                    + (type === ChessLeaderBoardType.DAILY ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-type-button-selected' }` : '')
                }
                click={ () => setType(ChessLeaderBoardType.DAILY) }
                enabled={ type !== ChessLeaderBoardType.DAILY }
            >Daily</Button>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-type-button'
                    + (type === ChessLeaderBoardType.WEEKLY ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-type-button-selected' }` : '')
                }
                click={ () => setType(ChessLeaderBoardType.WEEKLY) }
                enabled={ type !== ChessLeaderBoardType.WEEKLY }
            >Weekly</Button>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-type-button'
                    + (type === ChessLeaderBoardType.MONTHLY ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-type-button-selected' }` : '')
                }
                click={ () => setType(ChessLeaderBoardType.MONTHLY) }
                enabled={ type !== ChessLeaderBoardType.MONTHLY }
            >Monthly</Button>
            <Button
                className={
                    MAIN_VIEW_CLASS_NAME + '-change-type-button'
                    + (type === ChessLeaderBoardType.ALLTIME ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-type-button-selected' }` : '')
                }
                click={ () => setType(ChessLeaderBoardType.ALLTIME) }
                enabled={ type !== ChessLeaderBoardType.ALLTIME  }
            >Alltime</Button>
        </section>
    );


    return (
        <div className={ LEADERBOARD_VIEW_CLASS_NAME + (className ? ` ${ className }` : '') }>

            { location.pathname === LEADERBOARD_ROUTE ? (
                <ScrollToHere path={ LEADERBOARD_ROUTE } />
            ) : null }

            <section className={ LEADERBOARD_VIEW_CLASS_NAME + '-list' }>
                <h3>Leaderboard</h3>
                <>{changeTypeButtons}</>
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

            <section className={ MAIN_VIEW_CLASS_NAME + '-6b' }>
                <iframe
                    title="r2"
                    src="https://www.6b.fi/"
                    width="100%"
                    height="100%"
                    scrolling="no"
                    frameBorder="0"
                ></iframe>
            </section>

        </div>
    );
}
