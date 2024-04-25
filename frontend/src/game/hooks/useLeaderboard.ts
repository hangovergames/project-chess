// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { LogService } from "../../io/hyperify/core/LogService";
import { useIntervalUpdate } from "../../io/hyperify/frontend/hooks/useIntervalUpdate";
import { GameClient } from "../services/GameClient";
import {
    createGameLeaderboardDTO,
    GameLeaderboardDTO,
} from "../types/GameLeaderboardDTO";
import { LeaderBoardType } from "../types/LeaderBoardType";

const LOG = LogService.createLogger( 'useLeaderboard' );

export type UpdateLeaderboardCallback = () => void;

export function useLeaderboard (
    client  : GameClient,
    cards   : number,
    limit  ?: number,
    name   ?: string,
    type   ?: LeaderBoardType
) : [GameLeaderboardDTO, UpdateLeaderboardCallback] {

    const [leaderboard, setLeaderboard] = useState<GameLeaderboardDTO>( () => createGameLeaderboardDTO( [], cards, type ));

    const currentType = leaderboard?.type ?? LeaderBoardType.ALLTIME;
    const currentCards = leaderboard?.cards ?? 0;

    const isInitialized = leaderboard?.payload?.length !== 0;

    const updateLock = useRef<boolean>(false);

    const updateCallback = useCallback(
        () => {
            updateLock.current = true;
            client.getLeaderboard(cards, limit, name, type).then((dto) => {
                setLeaderboard(dto);
                updateLock.current = false;
            }).catch((err) => {
                LOG.error(`Failed to fetch leaderboard: `, err)
                updateLock.current = false;
            });
        }, [
            name,
            type,
            setLeaderboard,
            client,
            limit,
            cards,
        ],
    );

    useEffect(
        () => {
            if ( !( isInitialized && cards === currentCards && type === currentType ) && !updateLock.current ) {
                updateCallback();
            }
        },
        [
            currentType,
            type,
            cards,
            currentCards,
            isInitialized,
            updateLock,
            updateCallback,
        ]
    );

    useIntervalUpdate(
        () => {
            if (isInitialized && !updateLock.current) {
                updateCallback();
            }
        },
        5000
    )

    return [leaderboard, updateCallback];
}
