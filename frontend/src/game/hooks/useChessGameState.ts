// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { LogService } from "../../io/hyperify/core/LogService";
import { ObserverDestructor } from "../../io/hyperify/core/Observer";
import { LocalStorageService } from "../../io/hyperify/frontend/services/LocalStorageService";
import { ChessGameClient } from "../services/ChessGameClient";
import {
    ChessGameEventManager,
    ChessGameEventManagerEvent,
} from "../services/ChessGameEventManager";
import { createChessBoardDTO } from "../types/ChessBoardDTO";
import { ChessComputerLevel } from "../types/ChessComputerLevel";
import { ChessDraw } from "../types/ChessDraw";
import { ChessPlayMode } from "../types/ChessPlayMode";
import { ChessState } from "../types/ChessState";
import {
    ChessStateDTO,
    createChessStateDTO,
} from "../types/ChessStateDTO";
import { ChessUnit } from "../types/ChessUnit";
import { ChessUnitDTO } from "../types/ChessUnitDTO";
import { ChessVictory } from "../types/ChessVictory";

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
    ChessPlayMode.PlayModeNil,
    ChessComputerLevel.Basic,
    INITIAL_NAME(),
    '',
    '',
    '',
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
        false,
        ChessState.Uninitialized,
        ChessDraw.DrawTBD,
        ChessVictory.VictoryTBD,
    ),
    "",
);

export type AdvanceCallback = (subject: number, target: number, promotion : ChessUnit) => void;
export type ResetCallback = () => void;
export type SetNameCallback = (name : string) => void;
export type StartGameCallback = (mode: ChessPlayMode, computer: ChessComputerLevel) => void;

export function useChessGameState (client : ChessGameClient) : [ChessStateDTO, AdvanceCallback, StartGameCallback, ResetCallback, SetNameCallback, readonly number[]] {

    const [updatingLocations, setUpdatingLocations] = useState<readonly number[]>([]);
    const [gameState, setGameState] = useState<ChessStateDTO|undefined>();

    const eventListener = useRef<ObserverDestructor|undefined>(undefined);
    const eventService = useRef<ChessGameEventManager|undefined>(undefined);
    const initializeLock = useRef<boolean>(false);
    const promiseLock = useRef<boolean>(false);

    const visibleGameState : ChessStateDTO = gameState ? gameState : INITIAL_GAME_STATE();

    const currentTurn = gameState?.board.turn ?? -999999;

    let eventCallback = useCallback(
        (eventName: string, data: ChessStateDTO) => {
            const turn = data.board.turn;
            if (turn > currentTurn) {
                LOG.debug(`Event for turn ${turn} changed state: `, eventName, data)
                setGameState(data)
            } else {
                LOG.debug(`Event for turn ${turn} was older than ${currentTurn}`, eventName, data)
            }
        }, [
            currentTurn
        ],
    );

    const startGameCallback = useCallback(
        (mode: ChessPlayMode, computer: ChessComputerLevel) => {

            if (promiseLock.current) {
                LOG.error(`Previous action still active`)
                return;
            }

            const name = gameState?.name ?? INITIAL_NAME();
            if (gameState?.isStarted) {
                LOG.debug(`Game was started already: `, gameState);
            } else {
                promiseLock.current = true;
                LOG.debug(`Game starting: `, mode, computer, name);
                client.newGame(mode, computer, name).then(state => {
                    LOG.debug(`Game started: `, mode, computer, name);
                    setGameState(state);
                    promiseLock.current = false;
                }).catch(err => {
                    LOG.error(`Failed: `, err);
                    promiseLock.current = false;
                })
            }
        }, [
            client,
            setGameState,
            gameState,
        ],
    )

    const advanceCallback = useCallback(
        (subject: number, target: number, promotion : number) => {

            if (promiseLock.current) {
                LOG.error(`Previous action still active`)
                return;
            }

            const name = gameState?.name ?? INITIAL_NAME();
            if (gameState?.isFinished) {
                LOG.debug(`Game is finished already: `, gameState);
            } else {
                if (gameState?.isStarted) {
                    promiseLock.current = true;
                    setUpdatingLocations([subject, target]);
                    client.advanceGame(subject, target, gameState, name, promotion).then(state => {
                        const turn = state.board.turn
                        if (turn > currentTurn) {
                            LOG.debug(`State updated ${turn}: `, state);
                            setGameState(state);
                            setUpdatingLocations([]);
                        } else {
                            LOG.debug(`Warning! State for older turn ${turn}: `, state);
                        }
                        promiseLock.current = false;
                    }).catch(err => {
                        LOG.error(`Failed: `, err);
                        setUpdatingLocations([]);
                        promiseLock.current = false;
                    });
                } else {
                    LOG.debug(`Game was not started yet: `, gameState);
                }
            }

        },
        [
            currentTurn,
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
                mode: ChessPlayMode.PlayModeNil,
            });
            initializeLock.current = false
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

    // useEffect(() => {
    //     if ( !gameState?.isStarted && !promiseLock.current && !initializeLock.current ) {
    //         initializeLock.current = true
    //         startGameCallback();
    //     }
    // }, [
    //     gameState?.isStarted,
    //     promiseLock,
    //     initializeLock,
    //     startGameCallback,
    // ])

    // Shutdown event service
    useEffect(() => {

        if (gameState?.id !== undefined) {
            LOG.debug(`Starting events handler: ${gameState?.id}`);

            if (eventListener.current !== undefined) {
                eventListener.current()
                eventListener.current = undefined
            }

            if (eventService.current !== undefined) {
                eventService.current?.stop()
                eventService.current?.destroy()
                eventService.current = undefined;
            }

            let manager = ChessGameEventManager.create(client, gameState)
            eventService.current = manager;
            eventListener.current = manager.on( ChessGameEventManagerEvent.STATE_UPDATED, eventCallback );
            manager.start()
        }

        return () => {

            LOG.debug(`Shutting down events: ${gameState?.id}`)

            if (eventListener.current !== undefined) {
                eventListener.current()
                eventListener.current = undefined
            }

            if (eventService.current !== undefined) {
                eventService.current?.stop()
                eventService.current?.destroy()
                eventService.current = undefined;
            }
        }
    }, [
        gameState?.id,
        client,
        eventCallback,
        gameState,
    ])

    return [visibleGameState, advanceCallback, startGameCallback, resetCallback, setNameCallback, updatingLocations];
}
