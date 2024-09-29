// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

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

export enum ChessVictory {
    VictoryTBD = 0,
    VictoryByCheckmate = 1,
    VictoryByResignation = 2,
    VictoryByTimeControlExpiry = 3,
    NoVictory = 4,
}

export function isChessVictory (value: unknown) : value is ChessVictory {
    return isEnum(ChessVictory, value);
}

export function explainChessVictory (value : unknown) : string {
    return explainEnum("ChessVictory", ChessVictory, isChessVictory, value);
}

export function stringifyChessVictory (value : ChessVictory) : string {
    return stringifyEnum(ChessVictory, value);
}

export function parseChessVictory (value: any) : ChessVictory | undefined {
    return parseEnum(ChessVictory, value) as ChessVictory | undefined;
}

export function isChessVictoryOrUndefined (value: unknown): value is ChessVictory | undefined {
    return isUndefined(value) || isChessVictory(value);
}

export function explainChessVictoryOrUndefined (value: unknown): string {
    return isChessVictoryOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessVictory', 'undefined']));
}
