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

export enum ChessState {
    Uninitialized = 0,
    Active = 1,
    Victory = 2,
    Draw = 3,
}

export function isChessState (value: unknown) : value is ChessState {
    return isEnum(ChessState, value);
}

export function explainChessState (value : unknown) : string {
    return explainEnum("ChessState", ChessState, isChessState, value);
}

export function stringifyChessState (value : ChessState) : string {
    return stringifyEnum(ChessState, value);
}

export function parseChessState (value: any) : ChessState | undefined {
    return parseEnum(ChessState, value) as ChessState | undefined;
}

export function isChessStateOrUndefined (value: unknown): value is ChessState | undefined {
    return isUndefined(value) || isChessState(value);
}

export function explainChessStateOrUndefined (value: unknown): string {
    return isChessStateOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessState', 'undefined']));
}
