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

const LOG = LogService.createLogger( 'useLeaderboard' );

export type UpdateLeaderboardCallback = () => void;

export function useLeaderboard (
    client : GameClient,
    limit ?: number,
    name ?: string,
) : [GameLeaderboardDTO, UpdateLeaderboardCallback] {

    const [leaderboard, setLeaderboard] = useState<GameLeaderboardDTO>( () => createGameLeaderboardDTO( [] ));

    const isInitialized = leaderboard?.payload?.length !== 0;

    const updateLock = useRef<boolean>(false);

    const updateCallback = useCallback(
        () => {
            updateLock.current = true;
            client.getLeaderboard(limit, name).then((dto) => {
                setLeaderboard(dto);
                updateLock.current = false;
            }).catch((err) => {
                LOG.error(`Failed to fetch leaderboard: `, err)
                updateLock.current = false;
            });
        }, [
            name,
            setLeaderboard,
            client,
            limit,
        ],
    );

    useEffect(
        () => {
            if (!isInitialized && !updateLock.current) {
                updateCallback();
            }
        },
        [
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
