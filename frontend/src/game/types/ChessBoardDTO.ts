// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../io/hyperify/core/types/Array";
import {
    explainBoolean,
    isBoolean,
} from "../../io/hyperify/core/types/Boolean";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../io/hyperify/core/types/explain";
import {
    explainNumber,
    isNumber,
} from "../../io/hyperify/core/types/Number";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../io/hyperify/core/types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../io/hyperify/core/types/RegularObject";
import { isUndefined } from "../../io/hyperify/core/types/undefined";
import {
    ChessUnitDTO,
    explainChessUnitDTOOrNull,
    isChessUnitDTOOrNull,
} from "./ChessUnitDTO";

export interface ChessBoardDTO {
    readonly turn: number;
    readonly width: number;
    readonly height: number;
    readonly units: readonly (ChessUnitDTO|null)[];
    readonly check : boolean;
}

export function createChessBoardDTO (
    turn : number,
    width : number,
    height : number,
    units : readonly (ChessUnitDTO|null)[],
    check : boolean,
) : ChessBoardDTO {
    return {
        turn,
        width,
        height,
        units,
        check,
    };
}

export function isChessBoardDTO (value: unknown) : value is ChessBoardDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'turn',
            'width',
            'height',
            'units',
            'check',
        ])
        && isNumber(value?.turn)
        && isNumber(value?.width)
        && isNumber(value?.height)
        && isBoolean(value?.check)
        && isArrayOf<ChessUnitDTO|null>(value?.units, isChessUnitDTOOrNull)
    );
}

export function explainChessBoardDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'turn',
                'width',
                'height',
                'units',
                'check',
            ])
            , explainProperty("turn", explainNumber(value?.turn))
            , explainProperty("width", explainNumber(value?.width))
            , explainProperty("height", explainNumber(value?.height))
            , explainProperty("check", explainBoolean(value?.check))
            , explainProperty("units", explainArrayOf<ChessUnitDTO|null>("ChessUnitDTO|null", explainChessUnitDTOOrNull, value?.units, isChessUnitDTOOrNull))
        ]
    );
}

export function stringifyChessBoardDTO (value : ChessBoardDTO) : string {
    return `ChessBoardDTO(${value})`;
}

export function parseChessBoardDTO (value: unknown) : ChessBoardDTO | undefined {
    if (isChessBoardDTO(value)) return value;
    return undefined;
}

export function isChessBoardDTOOrUndefined (value: unknown): value is ChessBoardDTO | undefined {
    return isUndefined(value) || isChessBoardDTO(value);
}

export function explainChessBoardDTOOrUndefined (value: unknown): string {
    return isChessBoardDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessBoardDTO', 'undefined']));
}

//