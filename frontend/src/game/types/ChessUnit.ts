// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../io/hyperify/core/types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../io/hyperify/core/types/explain";
import { isUndefined } from "../../io/hyperify/core/types/undefined";

export enum ChessUnit {
    NIL = 0,
    PAWN = 1,
    ROOK = 2,
    KNIGHT = 3,
    BISHOP = 4,
    QUEEN = 5,
    KING = 6,
    ELEPHANT = 7,
}

export function isChessUnit (value: unknown) : value is ChessUnit {
    return isEnum(ChessUnit, value);
}

export function explainChessUnit (value : unknown) : string {
    return explainEnum("ChessUnit", ChessUnit, isChessUnit, value);
}

export function stringifyChessUnit (value : ChessUnit) : string {
    return stringifyEnum(ChessUnit, value);
}

export function parseChessUnit (value: any) : ChessUnit | undefined {
    return parseEnum(ChessUnit, value) as ChessUnit | undefined;
}

export function isChessUnitOrUndefined (value: unknown): value is ChessUnit | undefined {
    return isUndefined(value) || isChessUnit(value);
}

export function explainChessUnitOrUndefined (value: unknown): string {
    return isChessUnitOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessUnit', 'undefined']));
}
