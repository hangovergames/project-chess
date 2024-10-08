// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { useCallback } from "react";
import { map } from "../../../io/hyperify/core/functions/map";
import {
    CHESS_GRID_CLASS_NAME,
} from "../../constants/classNames";
import { ChessUnitDTO } from "../../types/ChessUnitDTO";
import { ChessGridCell } from "./ChessGridCell";
import "./ChessGrid.scss";

export interface ChessGridProps {
    readonly className ?: string;
    readonly width      : number;
    readonly height     : number;
    readonly selected   : number;
    readonly updatingLocations : readonly number[];
    readonly units      : readonly (ChessUnitDTO|null)[];
    readonly onClick    : (index: number) => void;
}

export function ChessGrid ( props: ChessGridProps) {
    const className = props?.className;
    const updatingLocations = props?.updatingLocations;
    const clickCallback = props?.onClick;
    const selectedIndex = props?.selected;
    const width = props?.width ?? 8;
    const height = props?.height ?? 8;
    const units = props?.units ?? [];
    const indexes = getChessBoardIndexes(width, height);

    const isSelectedCallback = useCallback(
        (index: number): boolean => {
            return index === selectedIndex;
        }, [
            selectedIndex
        ],
    )

    return (
        <div className={
            CHESS_GRID_CLASS_NAME
            + (className? ` ${className}` : '')
        }
             onContextMenu={ () => false }
        >{map(indexes, (row: number[], rowIndex: number) => {
            return (
                <div className={CHESS_GRID_CLASS_NAME+'-row'}
                     key={CHESS_GRID_CLASS_NAME+'-row-'+rowIndex}
                     onContextMenu={ () => false }
                >{
                    map(row, (index, cellIndex) => {
                        return (
                            <ChessGridCell
                                key={CHESS_GRID_CLASS_NAME+'-row-'+rowIndex+'-cell-'+cellIndex}
                                className={CHESS_GRID_CLASS_NAME+'-content-' + index}
                                index={index}
                                dto={units[index]}
                                click={() => clickCallback(index)}
                                selected={ isSelectedCallback(index) }
                                selectedDto={ units[selectedIndex] }
                                loading={ updatingLocations.indexOf(index) >= 0 }
                            />
                        );
                    })
                }</div>
            );
        })}</div>
    );
}

function getChessBoardIndexes (
    width: number,
    height: number,
) : number[][] {
    if (width === 8 && height === 1) {
        return [
            [ 0,  1,  2,  3,  4,  5,  6,  7],
        ];
    }
    if (width === 5 && height === 1) {
        return [
            [ 0,  1,  2,  3, 4 ],
        ];
    }
    if (width === 4 && height === 1) {
        return [
            [ 0,  1,  2,  3 ],
        ];
    }
    if (width === 2 && height === 2) {
        return [
            [ 0,  1 ],
            [ 2,  3 ],
        ];
    }
    if (width === 1 && height === 4) {
        return [
            [ 0 ],
            [ 1 ],
            [ 2,],
            [ 3 ],
        ];
    }
    return [
        [ 0,  1,  2,  3,  4,  5,  6,  7],
        [ 8,  9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30, 31],
        [32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47],
        [48, 49, 50, 51, 52, 53, 54, 55],
        [56, 57, 58, 59, 60, 61, 62, 63],
    ];
}
