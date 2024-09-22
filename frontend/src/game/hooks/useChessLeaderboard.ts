// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { LogService } from "../../io/hyperify/core/LogService";
import { useIntervalUpdate } from "../../io/hyperify/frontend/hooks/useIntervalUpdate";
import { ChessGameClient } from "../services/ChessGameClient";
import {
    createChessLeaderboardDTO,
    ChessLeaderboardDTO,
} from "../types/ChessLeaderboardDTO";
import { ChessLeaderBoardType } from "../types/ChessLeaderBoardType";

const LOG = LogService.createLogger( 'useChessLeaderboard' );

export type UpdateChessLeaderboardCallback = () => void;

export function useChessLeaderboard (
    client  : ChessGameClient,
    limit  ?: number,
    name   ?: string,
    type   ?: ChessLeaderBoardType
) : [ChessLeaderboardDTO, UpdateChessLeaderboardCallback] {

    const [leaderboard, setLeaderboard] = useState<ChessLeaderboardDTO>( () => createChessLeaderboardDTO( [], type ));
    const currentType = leaderboard?.type ?? ChessLeaderBoardType.ALLTIME;
    const isInitialized = leaderboard?.payload?.length !== 0;
    const updateLock = useRef<boolean>(false);

    const updateCallback = useCallback(
        () => {
            updateLock.current = true;
            client.getLeaderboard(limit, name, type).then((dto) => {
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
        ],
    );

    useEffect(
        () => {
            if ( !( isInitialized && type === currentType ) && !updateLock.current ) {
                updateCallback();
            }
        },
        [
            currentType,
            type,
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
