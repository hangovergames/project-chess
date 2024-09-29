// Copyright (c) 2022-2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import React, {
    useCallback,
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import { map } from "../../../../io/hyperify/core/functions/map";
import { LogService } from "../../../../io/hyperify/core/LogService";
import { TranslationFunction } from "../../../../io/hyperify/core/types/TranslationFunction";
import { Button } from "../../../../io/hyperify/frontend/components/button/Button";
import { ScrollToHere } from "../../../../io/hyperify/frontend/components/common/scrollToHere/ScrollToHere";
import { MAIN_VIEW_CLASS_NAME } from "../../../constants/classNames";
import { INDEX_ROUTE } from "../../../constants/route";
import { useChessGameState } from "../../../hooks/useChessGameState";
import { ChessGameClientImpl } from "../../../services/ChessGameClientImpl";
import {
    ChessDraw,
} from "../../../types/ChessDraw";
import { ChessPlayMode } from "../../../types/ChessPlayMode";
import { ChessState } from "../../../types/ChessState";
import { ChessUnit } from "../../../types/ChessUnit";
import {
    ChessUnitDTO,
    createChessUnitDTO,
} from "../../../types/ChessUnitDTO";
import {
    ChessVictory,
} from "../../../types/ChessVictory";
import { ChessGrid } from "../../chessGrid/ChessGrid";
import "./MainChessView.scss";

const LOG = LogService.createLogger( 'MainChessView' );

const GAME_CLIENT = ChessGameClientImpl.create();

export interface MainChessViewProps {
    readonly t: TranslationFunction;
    readonly className?: string;
}

export function MainChessView ( props: MainChessViewProps) {

    // const t = props.t;
    const className: string | undefined = props.className;
    const location = useLocation();

    const [
        gameState, advance, startGameCallback, resetGame, setName, updatingLocations,
    ] = useChessGameState(GAME_CLIENT)

    const mode = gameState?.mode;
    const winner = gameState?.winner ?? "";
    const boardState = gameState?.board?.state ?? ChessState?.Uninitialized;
    const drawReason = gameState?.board?.draw ?? ChessDraw.DrawTBD;
    const victoryReason = gameState?.board?.victory ?? ChessVictory.VictoryTBD;
    const playerName = gameState?.name;
    const board = gameState?.board;

    const [selectedSubject, setSelectedSubject] = useState<number>(-1);
    const [selectedPromotion, setSelectedPromotion] = useState<number>(0);

    const promotionIsOffender = true;
    const promotionIsDefender = false;
    const promotionUnits : readonly ChessUnitDTO[] = map(
        [
            ChessUnit.QUEEN,
            ChessUnit.ROOK,
            ChessUnit.BISHOP,
            ChessUnit.KNIGHT,
            ChessUnit.ELEPHANT,
        ],
        (type, index) =>
            createChessUnitDTO(
                index,
                index,
                0,
                type,
                promotionIsDefender,
                promotionIsOffender,
                [],
            )
    );

    const selectedPromotedUnit : ChessUnit = selectedPromotion >= 0 && selectedPromotion < promotionUnits.length ? promotionUnits[selectedPromotion].type : ChessUnit.QUEEN;

    // User selects a chess piece
    const selectCellCallback = useCallback(
        (index: number) => {

            if (index < 0) {
                LOG.warn(`Warning! selectCellCallback index out of bounds: `, index);
                return;
            }

            if (index === selectedSubject) {
                LOG.info(`Cancelled advance from index ${index}`);
                setSelectedSubject(-1);
                return;
            }

            const units = board?.units ?? [];
            const dto = units[index];
            const validMoves = dto?.validMoves ?? [];
            const validMoveCount : number = validMoves.length ?? 0

            if (selectedSubject >= 0) {
                LOG.info(`Advancing to index ${index} from ${selectedSubject} with promotion as ${selectedPromotedUnit}`);
                advance(selectedSubject, index, selectedPromotedUnit);
                setSelectedSubject(-1);
            } else {
                if (validMoveCount === 0) {
                    return;
                }
                LOG.info(`Preparing advance from index ${index}`);
                setSelectedSubject(index);
            }

        }, [
            advance,
            selectedSubject,
            selectedPromotedUnit,
            board,
        ],
    );

    // User selects a promotion piece
    const selectPromotionCallback = useCallback(
        (index: number) => {

            if (index < 0) {
                LOG.warn(`Warning! selectPromotionCallback index out of bounds: `, index);
                return;
            }

            if (index === selectedPromotion) {
                LOG.debug(`Cancelled selectPromotionCallback because same index ${index}`);
                return;
            }

            LOG.info(`Selected promotion index ${index} from ${selectedPromotion}`);
            setSelectedPromotion(index);

        }, [
            selectedPromotion,
            setSelectedPromotion,
        ],
    );

    // Reset game board
    const resetGameCallback = useCallback(
        () => {
            LOG.info(`Resetting game`);
            resetGame();
        }, [
            resetGame,
        ],
    );

    const startSinglePlayerCallback = useCallback(
        () => {
            LOG.info(`Starting single player game`);
            startGameCallback(ChessPlayMode.SinglePlayer);
        }, [
            startGameCallback,
        ],
    );

    const startLocalMultiplayerCallback = useCallback(
        () => {
            LOG.info(`Starting local multiplayer game`);
            startGameCallback(ChessPlayMode.LocalMultiplayer);
        }, [
            startGameCallback,
        ],
    );

    // const startOnlineMultiplayerCallback = useCallback(
    //     () => {
    //         LOG.info(`Starting online multiplayer game`);
    //         startGameCallback(ChessPlayMode.OnlineMultiplayer);
    //     }, [
    //         startGameCallback,
    //     ],
    // );

    function victoryMessage (
        victory: ChessVictory,
        winner: string,
    ) : string {
        switch (victory) {
            case ChessVictory.VictoryTBD: return ""
            case ChessVictory.VictoryByCheckmate: return `${winner} won by checkmate`
            case ChessVictory.VictoryByResignation: return `${winner} won by resignation`
            case ChessVictory.VictoryByTimeControlExpiry: return `${winner} won by time control expiry`
            case ChessVictory.NoVictory: return ""
        }
    }

    function drawMessage (
        draw: ChessDraw,
    ) : string {
        switch (draw) {
            case ChessDraw.DrawTBD: return "";
            case ChessDraw.DrawByStalemate: return "Draw By Stalemate";
            case ChessDraw.DrawByAgreement: return "Draw By Agreement";
            case ChessDraw.DrawByThreefoldRepetition: return "Draw By Threefold Repetition";
            case ChessDraw.DrawByFiftyMoveRule: return "Draw By Fifty Move Rule";
            case ChessDraw.DrawByInsufficientMaterial: return "Draw By Insufficient Material";
            case ChessDraw.DrawByTimeControlExpiry: return "Draw By Time Control Expiry";
            case ChessDraw.DrawByPerpetualCheck: return "Draw By Perpetual Check";
            case ChessDraw.NoDraw: return "";
        }
    }

    return (
        <>

            <div className={ MAIN_VIEW_CLASS_NAME + (className ? ` ${ className }` : '') }>

                { location.pathname === INDEX_ROUTE ? (
                    <ScrollToHere path={ INDEX_ROUTE } />
                ) : null }

                <section className={ MAIN_VIEW_CLASS_NAME + '-game' }>

                    <section className={ MAIN_VIEW_CLASS_NAME + '-game-content' }>

                        <header className={ MAIN_VIEW_CLASS_NAME + '-game-header' }>
                            <h1>Chess from Hangover Games</h1>
                        </header>

                        <ChessGrid
                            className={ MAIN_VIEW_CLASS_NAME + '-chess-grid' }
                            width={ board?.width ?? 8 }
                            height={ board?.height ?? 8 }
                            units={ board?.units ?? [] }
                            selected={selectedSubject}
                            onClick={ selectCellCallback }
                            updatingLocations={ updatingLocations }
                        />

                        {mode === ChessPlayMode.PlayModeNil ? (
                            <>
                                <section className={ MAIN_VIEW_CLASS_NAME + '-init-screen' }>

                                    <h3>Start a game of chess!</h3>

                                    <form className={ MAIN_VIEW_CLASS_NAME + '-form' }>

                                        <label htmlFor="name" className={ MAIN_VIEW_CLASS_NAME + '-name' }>
                                            <span className={MAIN_VIEW_CLASS_NAME + '-name-label'}>Player Name:</span>
                                            <input
                                                id="name"
                                                className={ MAIN_VIEW_CLASS_NAME + '-name-field' }
                                                type="text"
                                                placeholder={ "Your name" }
                                                required={ gameState.isStarted }
                                                maxLength={ 32 }
                                                value={ playerName }
                                                onChange={ ( elem ) => setName(elem.target.value ) }
                                            />
                                        </label>

                                        <section className={ MAIN_VIEW_CLASS_NAME + '-buttons' }>
                                            <div className={MAIN_VIEW_CLASS_NAME + '-game-mode'}>Start a...</div>
                                            <Button
                                                className={ MAIN_VIEW_CLASS_NAME + '-start-button' }
                                                click={ () => startSinglePlayerCallback() }
                                            >Single Player</Button>
                                            <Button
                                                className={ MAIN_VIEW_CLASS_NAME + '-start-button' }
                                                click={ () => startLocalMultiplayerCallback() }
                                            >Local Multiplayer</Button>
                                            {/*<Button*/}
                                            {/*    className={ MAIN_VIEW_CLASS_NAME + '-start-button' }*/}
                                            {/*    click={ () => startOnlineMultiplayerCallback() }*/}
                                            {/*>Online Multiplayer</Button>*/}
                                        </section>

                                    </form>

                                </section>
                            </>
                        ) : null}

                        <section className={ MAIN_VIEW_CLASS_NAME + '-game-footer' }>

                            {mode === ChessPlayMode.LocalMultiplayer || mode === ChessPlayMode.SinglePlayer ? (
                            <section className={ MAIN_VIEW_CLASS_NAME + '-buttons' }>
                                <Button
                                    className={ MAIN_VIEW_CLASS_NAME + '-reset-button' }
                                    click={ () => resetGameCallback() }
                                >{ gameState.isFinished ? "Restart" : "Reset" }</Button>
                            </section>
                            ) : null}

                            {/*<section className={ MAIN_VIEW_CLASS_NAME + '-score' }>Score: { gameState.score }</section>*/}

                            {mode !== ChessPlayMode.PlayModeNil && boardState === ChessState.Active ? (
                                <section className={ MAIN_VIEW_CLASS_NAME + '-promotion-options' }>
                                    Promotion option:
                                    <ChessGrid
                                        width={ 5 }
                                        height={ 1 }
                                        units={ promotionUnits }
                                        selected={selectedPromotion}
                                        onClick={ selectPromotionCallback }
                                        updatingLocations={ [] }
                                    />
                                </section>
                            ) : (
                                <section className={ MAIN_VIEW_CLASS_NAME + '-game-ended-section' }>

                                    { boardState === ChessState.Victory ? (
                                        <>
                                            <strong>Victory!</strong>
                                            <span> {victoryMessage(victoryReason, winner)}</span>
                                        </>
                                    ): null}

                                    { boardState === ChessState.Draw ? (
                                        <>
                                            <strong>Draw!</strong>
                                            <span> {drawMessage(drawReason)}</span>
                                        </>
                                    ): null}

                                </section>
                            )}

                        </section>

                    </section>

                </section>

            </div>

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

        </>
    );
}
