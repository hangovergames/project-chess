// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import "./MemoryGrid.scss";
import { useCallback, MouseEvent } from "react";
import { map } from "../../../io/hyperify/core/functions/map";
import { MEMORY_GRID_CLASS_NAME } from "../../constants/classNames";
import { getPlayingCardFrameByNumber } from "../../types/PlayingCardFrame";
import { getPlayingCardTypeByNumber } from "../../types/PlayingCardType";
import { PlayingCard } from "../playingCard/PlayingCard";

export interface MemoryGridProps {
    readonly className ?: string;
    readonly cards      : readonly number[];
    readonly onClick    : (index: number) => void;
}

export function MemoryGrid ( props: MemoryGridProps) {
    const className = props?.className;
    const onClick = props?.onClick;
    const cards = props?.cards ?? [];

    const indexes = getIndexesPerCardAmount(cards.length);

    const clickCallback = useCallback(
        (index: number) => {
            onClick(index);
        }, [
            onClick
        ],
    );

    return (
        <div className={
            MEMORY_GRID_CLASS_NAME
            + (className? ` ${className}` : '')
        }
             onContextMenu={ () => false }
        >{map(indexes, (row: number[], rowIndex: number) => {
            return (
                <div className={MEMORY_GRID_CLASS_NAME+'-row'}
                     key={MEMORY_GRID_CLASS_NAME+'-row-'+rowIndex}
                     onContextMenu={ () => false }
                >{
                    map(row, (index, cellIndex) => {
                        let click = clickCallback.bind(undefined, index)
                        let mouseClick = (event: MouseEvent<HTMLDivElement, any>) : boolean => {
                            if (event) {
                                event.preventDefault()
                                event.stopPropagation()
                            }
                            click();
                            return false;
                        }
                        return (
                            <div className={MEMORY_GRID_CLASS_NAME+'-cell'}
                                 key={MEMORY_GRID_CLASS_NAME+'-row-'+rowIndex+'-cell-'+cellIndex}
                                 onClick={mouseClick}
                                 onContextMenu={mouseClick}
                                 onMouseDown={mouseClick}
                            >
                                <div className={
                                    MEMORY_GRID_CLASS_NAME+'-cell-content'
                                    + ' ' + MEMORY_GRID_CLASS_NAME+'-cell-content-' + cards[index]
                                }
                                     onClick={mouseClick}
                                     onContextMenu={mouseClick}
                                     onMouseDown={mouseClick}
                                >
                                    <PlayingCard
                                        className={MEMORY_GRID_CLASS_NAME+'-cell-content-text'}
                                        type={ getPlayingCardTypeByNumber(cards[index]) }
                                        frame={ getPlayingCardFrameByNumber(cards[index]) }
                                    />
                                </div>
                            </div>
                        );
                    })
                }</div>
            );
        })}</div>
    );
}

function getIndexesPerCardAmount (amount : number) : number[][] {
    let indexes : number[][] = []
    if (amount === 2) {
        indexes = [
            [0, 1],
        ];
    }
    if (amount === 4) {
        indexes = [
            [0, 1],
            [2, 3],
        ];
    }
    if (amount === 6) {
        indexes = [
            [0, 1, 2],
            [3, 4, 5],
        ];
    }
    if (amount === 8) {
        indexes = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
        ];
    }
    if (amount === 12) {
        indexes = [
            [0, 1,  2,  3],
            [4, 5,  6,  7],
            [8, 9, 10, 11],
        ];
    }
    if (amount === 16) {
        indexes = [
            [0,   1,  2,  3],
            [4,   5,  6,  7],
            [8,   9, 10, 11],
            [12, 13, 14, 15],
        ];
    }
    return indexes;
}