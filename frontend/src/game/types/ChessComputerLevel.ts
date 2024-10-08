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

export enum ChessComputerLevel {
    None = 0,
    Basic = 1,
    Advanced = 2,
}

export function isChessComputerLevel (value: unknown) : value is ChessComputerLevel {
    return isEnum(ChessComputerLevel, value);
}

export function explainChessComputerLevel (value : unknown) : string {
    return explainEnum("ChessComputerLevel", ChessComputerLevel, isChessComputerLevel, value);
}

export function stringifyChessComputerLevel (value : ChessComputerLevel) : string {
    return stringifyEnum(ChessComputerLevel, value);
}

export function parseChessComputerLevel (value: any) : ChessComputerLevel | undefined {
    return parseEnum(ChessComputerLevel, value) as ChessComputerLevel | undefined;
}

export function isChessComputerLevelOrUndefined (value: unknown): value is ChessComputerLevel | undefined {
    return isUndefined(value) || isChessComputerLevel(value);
}

export function explainChessComputerLevelOrUndefined (value: unknown): string {
    return isChessComputerLevelOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessComputerLevel', 'undefined']));
}
