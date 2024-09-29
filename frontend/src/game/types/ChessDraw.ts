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

export enum ChessDraw {
    DrawTBD = 0,
    DrawByStalemate= 1,
    DrawByAgreement = 2,
    DrawByThreefoldRepetition = 3,
    DrawByFiftyMoveRule = 4,
    DrawByInsufficientMaterial = 5,
    DrawByTimeControlExpiry = 6,
    DrawByPerpetualCheck = 7,
}

export function isChessDraw (value: unknown) : value is ChessDraw {
    return isEnum(ChessDraw, value);
}

export function explainChessDraw (value : unknown) : string {
    return explainEnum("ChessDraw", ChessDraw, isChessDraw, value);
}

export function stringifyChessDraw (value : ChessDraw) : string {
    return stringifyEnum(ChessDraw, value);
}

export function parseChessDraw (value: any) : ChessDraw | undefined {
    return parseEnum(ChessDraw, value) as ChessDraw | undefined;
}

export function isChessDrawOrUndefined (value: unknown): value is ChessDraw | undefined {
    return isUndefined(value) || isChessDraw(value);
}

export function explainChessDrawOrUndefined (value: unknown): string {
    return isChessDrawOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessDraw', 'undefined']));
}
