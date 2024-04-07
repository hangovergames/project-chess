// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import "./MemoryGrid.scss";
import { useCallback } from "react";
import { map } from "../../../io/hyperify/core/functions/map";
import { MEMORY_GRID_CLASS_NAME } from "../../constants/classNames";

export interface MemoryGridProps {
    readonly className ?: string;
    readonly cards      : readonly number[];
    readonly onClick    : (index: number) => void;
}

export function MemoryGrid ( props: MemoryGridProps) {
    const className = props?.className;
    const onClick = props?.onClick;
    const cards = props?.cards ?? [];

    const indexes = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
    ];

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
        }>{map(indexes, (row: number[], rowIndex: number) => {
            return (
                <div className={MEMORY_GRID_CLASS_NAME+'-row'}
                     key={MEMORY_GRID_CLASS_NAME+'-row-'+rowIndex}
                >{
                    map(row, (index, cellIndex) => {
                        return (
                            <div className={MEMORY_GRID_CLASS_NAME+'-cell'}
                                 key={MEMORY_GRID_CLASS_NAME+'-row-'+rowIndex+'-cell-'+cellIndex}
                            >
                                <div className={
                                    MEMORY_GRID_CLASS_NAME+'-cell-content'
                                    + ' ' + MEMORY_GRID_CLASS_NAME+'-cell-content-' + cards[index]
                                }
                                     onClick={clickCallback.bind(undefined, index)}
                                >
                                    <div className={MEMORY_GRID_CLASS_NAME+'-cell-content-text'}>{ cards[index] }</div>
                                </div>
                            </div>
                        );
                    })
                }</div>
            );
        })}</div>
    );
}
