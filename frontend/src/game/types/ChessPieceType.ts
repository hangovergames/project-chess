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
import { ChessUnit } from "./ChessUnit";
import { ChessUnitDTO } from "./ChessUnitDTO";

export enum ChessPieceType {
    NONE = "NONE",
    PAWN = "PAWN",
    ROOK = "ROOK",
    KNIGHT = "KNIGHT",
    BISHOP = "BISHOP",
    QUEEN = "QUEEN",
    KING = "KING",
    ELEPHANT = "ELEPHANT",
}

export function getChessPieceTypeByUnitType ( value: ChessUnit | null) : ChessPieceType {
    switch (value) {

        case ChessUnit.PAWN  : return ChessPieceType.PAWN;
        case ChessUnit.ROOK  : return ChessPieceType.ROOK;
        case ChessUnit.KNIGHT  : return ChessPieceType.KNIGHT;
        case ChessUnit.BISHOP  : return ChessPieceType.BISHOP;
        case ChessUnit.QUEEN  : return ChessPieceType.QUEEN;
        case ChessUnit.KING  : return ChessPieceType.KING;
        case ChessUnit.ELEPHANT  : return ChessPieceType.ELEPHANT;

        case ChessUnit.NIL:
        default : return ChessPieceType.NONE;
    }
}

export function getChessPieceTypeByUnitTypeDTO ( value: ChessUnitDTO | null) : ChessPieceType {
    return getChessPieceTypeByUnitType(value?.type ?? null);
}

export function isChessPieceType ( value: unknown) : value is ChessPieceType {
    return isEnum(ChessPieceType, value);
}

export function explainChessPieceType ( value : unknown) : string {
    return explainEnum("ChessPieceType", ChessPieceType, isChessPieceType, value);
}

export function stringifyChessPieceType ( value : ChessPieceType) : string {
    return stringifyEnum(ChessPieceType, value);
}

export function parseChessPieceType (value: any) : ChessPieceType | undefined {
    return parseEnum(ChessPieceType, value) as ChessPieceType | undefined;
}

export function isChessPieceTypeOrUndefined ( value: unknown): value is ChessPieceType | undefined {
    return isUndefined(value) || isChessPieceType(value);
}

export function explainChessPieceTypeOrUndefined ( value: unknown): string {
    return isChessPieceTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessPieceType', 'undefined']));
}
