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
import { DEFAULT_CARD_AMOUNT } from "../../../constants/frontend";
import { INDEX_ROUTE } from "../../../constants/route";
import { useMemoryGameState } from "../../../hooks/useMemoryGameState";
import { GameClientImpl } from "../../../services/GameClientImpl";
import { LeaderBoardType } from "../../../types/LeaderBoardType";
import { MemoryGrid } from "../../memoryGrid/MemoryGrid";
import { LeaderboardView } from "../leaderboard/LeaderboardView";
import "./MainView.scss";

const LOG = LogService.createLogger( 'MainView' );

const GAME_CLIENT = GameClientImpl.create();

export interface MainViewProps {
    readonly t: TranslationFunction;
    readonly className?: string;
}

export function MainView (props: MainViewProps) {

    const t = props.t;
    const className: string | undefined = props.className;
    const location = useLocation();

    const [
        gameState, advance, resetGame, setName
    ] = useMemoryGameState(GAME_CLIENT)

    const [ type, setType ] = useState<LeaderBoardType>(LeaderBoardType.DAILY);

    const visibleCards = map(
        gameState.cards,
        (card: number, index: number) : number => {
            if (gameState.lastIndex === index) return gameState.lastCard;
            return card;
        }
    );

    // User selects a card
    const selectCardCallback = useCallback(
        (index: number) => {
            LOG.info(`Advancing to index:`, index);
            advance(index);
        }, [
            advance,
        ],
    );

    // Reset game and randomize cards
    const resetGameCallback = useCallback(
        (amount?: number) => {
            const cards = amount ?? gameState?.cards?.length
            LOG.info(`Resetting game with ${cards} cards`);
            resetGame( cards );
        }, [
            resetGame,
            gameState,
        ],
    );

    const changeCardButtons = (
        <section className={ MAIN_VIEW_CLASS_NAME + '-change-cards' }>
            <Button
                className={
                    MAIN_VIEW_CLASS_NAME + '-change-cards-button'
                    + (gameState?.cards?.length === 6 ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-cards-button-selected' }` : '')
                }
                click={ () => resetGameCallback( 6 ) }
                enabled={ !gameState.isStarted || gameState.isFinished  }
            >Novice</Button>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-cards-button'
                    + (gameState?.cards?.length === 8 ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-cards-button-selected' }` : '')
                }
                click={ () => resetGameCallback( 8 ) }
                enabled={ !gameState.isStarted || gameState.isFinished }
            >Apprentice</Button>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-cards-button'
                    + (gameState?.cards?.length === 12 ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-cards-button-selected' }` : '')
                }
                click={ () => resetGameCallback( 12 ) }
                enabled={ !gameState.isStarted || gameState.isFinished }
            >Master</Button>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-cards-button'
                    + (gameState?.cards?.length === 16 ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-cards-button-selected' }` : '')
                }
                click={ () => resetGameCallback( 16 ) }
                enabled={ !gameState.isStarted || gameState.isFinished }
            >Elder</Button>
        </section>
    );

    const changeTypeButtons = (
        <section className={ MAIN_VIEW_CLASS_NAME + '-change-type' }>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-type-button'
                    + (type === LeaderBoardType.DAILY ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-type-button-selected' }` : '')
                }
                click={ () => setType(LeaderBoardType.DAILY) }
                enabled={ type !== LeaderBoardType.DAILY }
            >Daily</Button>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-type-button'
                    + (type === LeaderBoardType.WEEKLY ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-type-button-selected' }` : '')
                }
                click={ () => setType(LeaderBoardType.WEEKLY) }
                enabled={ type !== LeaderBoardType.WEEKLY }
            >Weekly</Button>
            <Button
                className={ MAIN_VIEW_CLASS_NAME + '-change-type-button'
                    + (type === LeaderBoardType.MONTHLY ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-type-button-selected' }` : '')
                }
                click={ () => setType(LeaderBoardType.MONTHLY) }
                enabled={ type !== LeaderBoardType.MONTHLY }
            >Monthly</Button>
            <Button
                className={
                    MAIN_VIEW_CLASS_NAME + '-change-type-button'
                    + (type === LeaderBoardType.ALLTIME ? ` ${ MAIN_VIEW_CLASS_NAME + '-change-type-button-selected' }` : '')
                }
                click={ () => setType(LeaderBoardType.ALLTIME) }
                enabled={ type !== LeaderBoardType.ALLTIME  }
            >Alltime</Button>
        </section>
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
                            <h1>Memory Game from Hangover Games</h1>
                        </header>

                        <MemoryGrid
                            cards={ visibleCards }
                            onClick={ selectCardCallback }
                        />

                        <section className={ MAIN_VIEW_CLASS_NAME + '-game-footer' }>

                            <section className={ MAIN_VIEW_CLASS_NAME + '-name' }><input
                                className={ MAIN_VIEW_CLASS_NAME + '-name-field' }
                                type="text"
                                placeholder={ "Your name" }
                                required={ gameState.isStarted }
                                maxLength={ 32 }
                                value={ gameState.name }
                                onChange={ ( elem ) => setName( elem.target.value ) }
                            /></section>

                            <section className={ MAIN_VIEW_CLASS_NAME + '-buttons' }>
                                <Button
                                    className={ MAIN_VIEW_CLASS_NAME + '-reset-button' }
                                    click={ () => resetGameCallback() }
                                >{ gameState.isFinished ? "Restart" : "Reset" }</Button>
                            </section>

                            <section className={ MAIN_VIEW_CLASS_NAME + '-score' }>Score: { gameState.score }</section>

                        </section>


                        { gameState?.isStarted ? (
                            <>
                            </>
                        ) : (
                            <>{changeCardButtons}</>
                        ) }

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

            <LeaderboardView
                t={ t }
                name={ gameState.name }
                cards={ gameState?.cards?.length ?? DEFAULT_CARD_AMOUNT }
                type={ type }
            >

                <>{changeCardButtons}</>

                <>{changeTypeButtons}</>

            </LeaderboardView>

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
