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
import { ChessUnit } from "../../../types/ChessUnit";
import {
    ChessUnitDTO,
    createChessUnitDTO,
} from "../../../types/ChessUnitDTO";
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
        gameState, advance, resetGame, setName
    ] = useChessGameState(GAME_CLIENT)

    const playerName = gameState?.defender;
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
                LOG.info(`Advancing to index ${index} from ${selectedSubject}`);
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
                            width={ board?.width ?? 8 }
                            height={ board?.height ?? 8 }
                            units={ board?.units ?? [] }
                            selected={selectedSubject}
                            onClick={ selectCellCallback }
                        />

                        <section className={ MAIN_VIEW_CLASS_NAME + '-game-footer' }>

                            <section className={ MAIN_VIEW_CLASS_NAME + '-name' }><input
                                className={ MAIN_VIEW_CLASS_NAME + '-name-field' }
                                type="text"
                                placeholder={ "Your name" }
                                required={ gameState.isStarted }
                                maxLength={ 32 }
                                value={ playerName }
                                onChange={ ( elem ) => setName( elem.target.value ) }
                            /></section>

                            <section className={ MAIN_VIEW_CLASS_NAME + '-buttons' }>
                                <Button
                                    className={ MAIN_VIEW_CLASS_NAME + '-reset-button' }
                                    click={ () => resetGameCallback() }
                                >{ gameState.isFinished ? "Restart" : "Reset" }</Button>
                            </section>

                            {/*<section className={ MAIN_VIEW_CLASS_NAME + '-score' }>Score: { gameState.score }</section>*/}

                            <section>
                                Promotion option:
                                <ChessGrid
                                    width={ 5 }
                                    height={ 1 }
                                    units={ promotionUnits }
                                    selected={selectedPromotion}
                                    onClick={ selectPromotionCallback }
                                />
                            </section>

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
