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

export enum ChessPlayMode {
    PlayModeNil = 0,
    SinglePlayer = 1,
    LocalMultiplayer = 2,
    OnlineMultiplayer = 3,
}

export function isChessPlayMode (value: unknown) : value is ChessPlayMode {
    return isEnum(ChessPlayMode, value);
}

export function explainChessPlayMode (value : unknown) : string {
    return explainEnum("ChessPlayMode", ChessPlayMode, isChessPlayMode, value);
}

export function stringifyChessPlayMode (value : ChessPlayMode) : string {
    return stringifyEnum(ChessPlayMode, value);
}

export function parseChessPlayMode (value: any) : ChessPlayMode | undefined {
    return parseEnum(ChessPlayMode, value) as ChessPlayMode | undefined;
}

export function isChessPlayModeOrUndefined (value: unknown): value is ChessPlayMode | undefined {
    return isUndefined(value) || isChessPlayMode(value);
}

export function explainChessPlayModeOrUndefined (value: unknown): string {
    return isChessPlayModeOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessPlayMode', 'undefined']));
}
