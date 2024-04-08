// Copyright (c) 2022-2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import {
    useCallback,
    useEffect,
    useRef,
} from "react";
import { useLocation } from "react-router-dom";
import { map } from "../../../../io/hyperify/core/functions/map";
import { some } from "../../../../io/hyperify/core/functions/some";
import { LogService } from "../../../../io/hyperify/core/LogService";
import { TranslationFunction } from "../../../../io/hyperify/core/types/TranslationFunction";
import { Button } from "../../../../io/hyperify/frontend/components/button/Button";
import { ScrollToHere } from "../../../../io/hyperify/frontend/components/common/scrollToHere/ScrollToHere";
import { MAIN_VIEW_CLASS_NAME } from "../../../constants/classNames";
import { INDEX_ROUTE } from "../../../constants/route";
import { useMemoryGameState } from "../../../hooks/useMemoryGameState";
import { GameClientImpl } from "../../../services/GameClientImpl";
import { MemoryGrid } from "../../memoryGrid/MemoryGrid";
import "./MainView.scss";

const HIDE_TIMEOUT = 1500;

const LOG = LogService.createLogger( 'MainView' );

const GAME_CLIENT = GameClientImpl.create();

export interface MainViewProps {
    readonly t: TranslationFunction;
    readonly className?: string;
}

export function MainView (props: MainViewProps) {

    const className: string | undefined = props.className;
    const location = useLocation();

    const timeoutRef = useRef<any | undefined>(undefined);
    const [gameState, advance, resetGame] = useMemoryGameState(GAME_CLIENT)

    const visibleCards = map(
        gameState.cards,
        (card: number, index: number) : number => {
            if (gameState.lastIndex === index) return gameState.lastCard;
            return card;
        }
    );

    // Handle unflipping any cards without a match
    const hideCardsCallback = useCallback(
        () => {
            LOG.debug('Hiding cards');

        },
        [
        ]
    );

    // Delayed call to hide cards
    const delayedHideCardsCallback = useCallback(
        () => {
            if (timeoutRef.current !== undefined) {
                clearTimeout(timeoutRef.current);
            }
            LOG.debug(`Delayed call to hideCardsCallback()`);
            timeoutRef.current = setTimeout(
                () => hideCardsCallback(),
                HIDE_TIMEOUT,
            );
        }, [
            timeoutRef,
            hideCardsCallback,
        ],
    );

    // Update initial state and clear timeout when component unmounts
    useEffect(() => {

        delayedHideCardsCallback();

        return () => {
            if (timeoutRef.current !== undefined) {
                clearTimeout(timeoutRef.current);
            }
        }
    });

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
        () => {
            LOG.info(`Resetting game`);
            resetGame();
        }, [
            resetGame,
        ],
    );

    return (
        <div className={MAIN_VIEW_CLASS_NAME + (className? ` ${className}`: '')}>
            {location.pathname === INDEX_ROUTE ? (
                <>
                    <ScrollToHere path={INDEX_ROUTE} />
                </>
            ) : null}

            <p>Score: {gameState.score}</p>

            <MemoryGrid
                cards={visibleCards}
                onClick={selectCardCallback}
            />

            <section className={MAIN_VIEW_CLASS_NAME+'-buttons'}>
                <Button click={resetGameCallback}>Reset</Button>
            </section>


        </div>
    );
}
