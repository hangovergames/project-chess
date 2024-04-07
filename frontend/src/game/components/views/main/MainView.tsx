// Copyright (c) 2022-2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import { isEqual } from "../../../../io/hyperify/core/functions/isEqual";
import { map } from "../../../../io/hyperify/core/functions/map";
import { shuffle } from "../../../../io/hyperify/core/functions/shuffle";
import { some } from "../../../../io/hyperify/core/functions/some";
import { LogService } from "../../../../io/hyperify/core/LogService";
import { TranslationFunction } from "../../../../io/hyperify/core/types/TranslationFunction";
import { Button } from "../../../../io/hyperify/frontend/components/button/Button";
import { ScrollToHere } from "../../../../io/hyperify/frontend/components/common/scrollToHere/ScrollToHere";
import { MAIN_VIEW_CLASS_NAME } from "../../../constants/classNames";
import { INDEX_ROUTE } from "../../../constants/route";
import { MemoryGrid } from "../../memoryGrid/MemoryGrid";
import "./MainView.scss";

const HIDE_TIMEOUT = 1500;

const LOG = LogService.createLogger( 'MainView' );

export interface MainViewProps {
    readonly t: TranslationFunction;
    readonly className?: string;
}

const INITIAL_CARD_VISIBILITY = () => [
    false, false, false, false,
    false, false, false, false,
    false, false, false, false,
    false, false, false, false,
];

const INITIAL_CARD_OPEN_TIMES = () => [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
];

const RANDOM_CARDS = () => {
    return shuffle([
        1, 2, 3, 4,
        5, 6, 7, 8,
        1, 2, 3, 4,
        5, 6, 7, 8,
    ]);
};

export function MainView (props: MainViewProps) {

    const className: string | undefined = props.className;
    const location = useLocation();

    // States

    const timeoutRef = useRef<any | null>(undefined);
    const [cardsVisible, setCardsVisible] = useState<readonly boolean[]>(INITIAL_CARD_VISIBILITY);
    const [cardOpenCounts, setCardOpenCounts] = useState<readonly number[]>(INITIAL_CARD_OPEN_TIMES);
    const [cards, setCards ] = useState<readonly number[]>(RANDOM_CARDS);

    const visibleCards = map(
        cards,
        (item, index: number): number => {
            return cardsVisible[index] ? item : 0
        }
    );

    // Reset game and randomize cards
    const resetGameCallback = useCallback(
        () => {
            setCardsVisible(INITIAL_CARD_VISIBILITY);
            setCards(RANDOM_CARDS);
            setCardOpenCounts(INITIAL_CARD_OPEN_TIMES);
        }, [
            setCardsVisible,
            setCards,
        ],
    );

    // Handle unflipping any cards without a match
    const hideCardsCallback = useCallback(
        () => {

            LOG.debug('Hiding cards');

            const a = filterVisibleCards( cardsVisible, cards );

            LOG.debug('new cardsVisible =', a);
            LOG.debug('old cardsVisible =', cardsVisible);

            if (!isEqual(a, cardsVisible)) {
                setCardsVisible(a);
            }

        },
        [
            cards,
            cardsVisible,
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

    // User selects a card
    const selectCardCallback = useCallback(
        (index: number) => {
            let a = [...cardsVisible];
            const newValue = !a[index];
            a[index] = newValue;
            a = filterVisibleCards(a, cards);
            a[index] = newValue;
            setCardsVisible(a);
            LOG.debug('Flipped index ', index, cardsVisible, a);

            let b = [ ...cardOpenCounts ];
            b[index] = b[index] + 1;
            setCardOpenCounts(b);

            delayedHideCardsCallback();

        }, [
            cardOpenCounts,
            cards,
            cardsVisible,
            delayedHideCardsCallback,
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

    return (
        <div className={MAIN_VIEW_CLASS_NAME + (className? ` ${className}`: '')}>
            {location.pathname === INDEX_ROUTE ? (
                <>
                    <ScrollToHere path={INDEX_ROUTE} />
                </>
            ) : null}

            <p>Hello</p>

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

function filterVisibleCards (prev: readonly boolean[], cards: readonly number[]): boolean[] {
    return map(
        prev,
        (item, index): boolean => {
            if (item) {
                const value = cards[index];
                return some(
                    prev,
                    (v, i) => {
                        return v && i !== index && value === cards[i];
                    }
                );
            } else {
                return false;
            }
        }
    );
}

