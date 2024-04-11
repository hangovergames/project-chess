// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useCallback,
    useRef,
    useState,
} from "react";
import { LogService } from "../../io/hyperify/core/LogService";
import { LocalStorageService } from "../../io/hyperify/frontend/services/LocalStorageService";
import { GameClient } from "../services/GameClient";
import {
    createGameStateDTO,
    GameStateDTO,
} from "../types/GameStateDTO";

const LOCAL_STORAGE_KEY_NAME = 'fi.hg.name';

const LOG = LogService.createLogger( 'useMemoryGameState' );

const INITIAL_NAME = () => LocalStorageService.getItem(LOCAL_STORAGE_KEY_NAME) ?? '';

const INITIAL_GAME_STATE = () => createGameStateDTO(
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
    INITIAL_NAME(),
    "",
    0,
    0,
    false,
    false,
);

export type AdvanceCallback = (index: number) => void;
export type ResetCallback = () => void;
export type SetNameCallback = (name : string) => void;

export function useMemoryGameState (client : GameClient) : [GameStateDTO, AdvanceCallback, ResetCallback, SetNameCallback] {

    const [gameState, setGameState] = useState<GameStateDTO|undefined>();

    const promiseLock = useRef<boolean>(false);

    const visibleGameState : GameStateDTO = gameState ? gameState : INITIAL_GAME_STATE();

    const advanceCallback = useCallback(
        (index: number) => {

            if (promiseLock.current) {
                LOG.error(`Previous action still active`)
                return;
            }
            promiseLock.current = true;

            const name = gameState?.name ?? INITIAL_NAME();

            let promise : Promise<GameStateDTO>
            if (gameState?.isStarted) {
                promise = client.advanceGame(index, gameState, name)
            } else {
                promise = client.newGame(index, name)
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
            setGameState({
                ...INITIAL_GAME_STATE(),
                name: gameState?.name ?? INITIAL_NAME(),
            });
        }, [
            setGameState,
            gameState,
        ],
    );

    const setNameCallback = useCallback(
        (name : string) : void => {
            LocalStorageService.setItem(LOCAL_STORAGE_KEY_NAME, name);
            setGameState((state : GameStateDTO | undefined) : GameStateDTO => {
                if (state === undefined) {
                    return {
                        ...INITIAL_GAME_STATE(),
                        name,
                    };
                } else {
                    return {
                        ...state,
                        name,
                    };
                }
            })
        }, [
            setGameState,
        ],
    )

    return [visibleGameState, advanceCallback, resetCallback, setNameCallback];
}
