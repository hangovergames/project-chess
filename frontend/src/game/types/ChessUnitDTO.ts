// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

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
import { isNull } from "../../io/hyperify/core/types/Null";
import {
    explainNumber,
    isNumber,
} from "../../io/hyperify/core/types/Number";
import {
    explainNumberArrayOrUndefined,
    isNumberArrayOrUndefined,
} from "../../io/hyperify/core/types/NumberArray";
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
    ChessUnit,
    explainChessUnit,
    isChessUnit,
} from "./ChessUnit";

export interface ChessUnitDTO {
    readonly index: number;
    readonly x: number;
    readonly y: number;
    readonly type: ChessUnit;
    readonly isDefender: boolean;
    readonly isOffender: boolean;
    readonly validMoves ?: readonly number[] | undefined;
}

export function createChessUnitDTO (
    index : number,
    x : number,
    y : number,
    type : ChessUnit,
    isDefender : boolean,
    isOffender : boolean,
    validMoves : readonly number[] | undefined,
) : ChessUnitDTO {
    return {
        index,
        x,
        y,
        type,
        isDefender,
        isOffender,
        validMoves,
    };
}

export function isChessUnitDTO (value: unknown) : value is ChessUnitDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'index',
            'x',
            'y',
            'type',
            'isDefender',
            'isOffender',
            'validMoves',
        ])
        && isNumber(value?.index)
        && isNumber(value?.x)
        && isNumber(value?.y)
        && isChessUnit(value?.type)
        && isBoolean(value?.isDefender)
        && isBoolean(value?.isOffender)
        && isNumberArrayOrUndefined(value?.validMoves)
    );
}

export function explainChessUnitDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'index',
                'x',
                'y',
                'type',
                'isDefender',
                'isOffender',
                'validMoves',
            ])
            , explainProperty("index", explainNumber(value?.index))
            , explainProperty("x", explainNumber(value?.x))
            , explainProperty("y", explainNumber(value?.y))
            , explainProperty("type", explainChessUnit(value?.type))
            , explainProperty("isDefender", explainBoolean(value?.isDefender))
            , explainProperty("isOffender", explainBoolean(value?.isOffender))
            , explainProperty("validMoves", explainNumberArrayOrUndefined(value?.validMoves))
        ]
    );
}

export function stringifyChessUnitDTO (value : ChessUnitDTO) : string {
    return `ChessUnitDTO(${value})`;
}

export function parseChessUnitDTO (value: unknown) : ChessUnitDTO | undefined {
    if (isChessUnitDTO(value)) return value;
    return undefined;
}

export function isChessUnitDTOOrUndefined (value: unknown): value is ChessUnitDTO | undefined {
    return isUndefined(value) || isChessUnitDTO(value);
}

export function explainChessUnitDTOOrUndefined (value: unknown): string {
    return isChessUnitDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessUnitDTO', 'undefined']));
}

export function isChessUnitDTOOrNull (value: unknown): value is ChessUnitDTO | undefined {
    return isNull(value) || isChessUnitDTO(value);
}

export function explainChessUnitDTOOrNull (value: unknown): string {
    return isChessUnitDTOOrNull(value) ? explainOk() : explainNot(explainOr(['ChessUnitDTO', 'null']));
}
