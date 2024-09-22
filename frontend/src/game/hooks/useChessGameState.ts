// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useCallback,
    useRef,
    useState,
} from "react";
import { LogService } from "../../io/hyperify/core/LogService";
import { LocalStorageService } from "../../io/hyperify/frontend/services/LocalStorageService";
import { ChessGameClient } from "../services/ChessGameClient";
import { createChessBoardDTO } from "../types/ChessBoardDTO";
import {
    createChessStateDTO,
    ChessStateDTO,
} from "../types/ChessStateDTO";
import {
    ChessUnitDTO,
} from "../types/ChessUnitDTO";

const LOCAL_STORAGE_KEY_NAME = 'fi.hg.name';

const LOG = LogService.createLogger( 'useChessGameState' );

const INITIAL_NAME = () => LocalStorageService.getItem(LOCAL_STORAGE_KEY_NAME) ?? '';

const INIT_UNITS = () : (ChessUnitDTO|null)[] => {
    return [
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
    ];
}
const INITIAL_GAME_STATE = () => createChessStateDTO(
    '',
    'white',
    'black',
    '',
    0,
    0,
    false,
    false,
    createChessBoardDTO(
        -999,
        8,
        8,
        INIT_UNITS(),
    ),
    "",
);

export type AdvanceCallback = (subject: number, target: number) => void;
export type ResetCallback = () => void;
export type SetNameCallback = (name : string) => void;

export function useChessGameState (client : ChessGameClient) : [ChessStateDTO, AdvanceCallback, ResetCallback, SetNameCallback] {

    const [gameState, setGameState] = useState<ChessStateDTO|undefined>();

    const promiseLock = useRef<boolean>(false);

    const visibleGameState : ChessStateDTO = gameState ? gameState : INITIAL_GAME_STATE();

    const advanceCallback = useCallback(
        (subject: number, target: number) => {

            if (promiseLock.current) {
                LOG.error(`Previous action still active`)
                return;
            }
            promiseLock.current = true;

            const name = gameState?.name ?? INITIAL_NAME();

            let promise : Promise<ChessStateDTO>
            if (gameState?.isStarted) {
                promise = client.advanceGame(subject, target, gameState, name)
            } else {
                promise = client.newGame(name)
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
            setGameState((state : ChessStateDTO | undefined) : ChessStateDTO => {
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
