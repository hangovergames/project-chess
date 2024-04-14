// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useCallback,
    useRef,
    useState,
} from "react";
import { LogService } from "../../io/hyperify/core/LogService";
import { LocalStorageService } from "../../io/hyperify/frontend/services/LocalStorageService";
import { DEFAULT_CARD_AMOUNT } from "../constants/frontend";
import { GameClient } from "../services/GameClient";
import {
    createGameStateDTO,
    GameStateDTO,
} from "../types/GameStateDTO";

const LOCAL_STORAGE_KEY_NAME = 'fi.hg.name';

const LOG = LogService.createLogger( 'useMemoryGameState' );

const INITIAL_NAME = () => LocalStorageService.getItem(LOCAL_STORAGE_KEY_NAME) ?? '';

const INIT_CARDS = (cards: number) => {
    if (cards <= 2) {
        return [
            0, 0
        ];
    }
    if (cards <= 4) {
        return [
            0, 0,
            0, 0,
        ];
    }
    if (cards <= 6) {
        return [
            0, 0, 0,
            0, 0, 0,
        ];
    }
    if (cards <= 8) {
        return [
            0, 0, 0, 0,
            0, 0, 0, 0,
        ];
    }
    if (cards <= 12) {
        return [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ];
    }
    return [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ];
}
const INITIAL_GAME_STATE = (cards: number) => createGameStateDTO(
    0,
    INIT_CARDS(cards),
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
export type ResetCallback = (size?: number) => void;
export type SetNameCallback = (name : string) => void;

export function useMemoryGameState (client : GameClient) : [GameStateDTO, AdvanceCallback, ResetCallback, SetNameCallback] {

    const [gameState, setGameState] = useState<GameStateDTO|undefined>();

    const cardAmount = gameState?.cards?.length ?? DEFAULT_CARD_AMOUNT

    const promiseLock = useRef<boolean>(false);

    const visibleGameState : GameStateDTO = gameState ? gameState : INITIAL_GAME_STATE(cardAmount);

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
                promise = client.advanceGame( index, gameState, name)
            } else {
                promise = client.newGame(cardAmount, index, name)
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
            cardAmount,
            client,
            setGameState,
            gameState,
        ]
    );

    const resetCallback = useCallback(
        (size ?: number) => {
            setGameState({
                ...INITIAL_GAME_STATE(size ?? DEFAULT_CARD_AMOUNT),
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
                        ...INITIAL_GAME_STATE(cardAmount),
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
            cardAmount,
        ],
    )

    return [visibleGameState, advanceCallback, resetCallback, setNameCallback];
}
