// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useCallback,
    useRef,
    useState,
} from "react";
import { LogService } from "../../io/hyperify/core/LogService";
import { GameClient } from "../services/GameClient";
import {
    createGameStateDTO,
    GameStateDTO,
} from "../types/GameStateDTO";

const LOG = LogService.createLogger( 'useMemoryGameState' );

const INITIAL_GAME_STATE = createGameStateDTO(
    0,
    [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ],
    "",
    0,
    -1,
    "",
    "",
    false,
);

export type AdvanceCallback = (index: number) => void;
export type ResetCallback = () => void;

export function useMemoryGameState (client : GameClient) : [GameStateDTO, AdvanceCallback, ResetCallback] {

    const [gameState, setGameState] = useState<GameStateDTO|undefined>();

    const promiseLock = useRef<boolean>(false);

    const visibleGameState : GameStateDTO = gameState ? gameState : INITIAL_GAME_STATE;

    const advanceCallback = useCallback(
        (index: number) => {

            if (promiseLock.current) {
                LOG.error(`Previous action still active`)
                return;
            }
            promiseLock.current = true;

            let promise : Promise<GameStateDTO>
            if (gameState) {
                promise = client.advanceGame(index, gameState)
            } else {
                promise = client.newGame(index)
            }
            promise.then(state => {
                LOG.debug(`State updated: `, state);
                setGameState(state);
                promiseLock.current = false;
            }).catch(err => {
                LOG.error(`Failed: `, err);
                promiseLock.current = false;
            })
        },
        [
            client,
            setGameState,
            gameState,
        ]
    );

    const resetCallback = useCallback(
        () => {
            setGameState(undefined);
        }, [
            setGameState,
        ],
    )

    return [visibleGameState, advanceCallback, resetCallback];
}
