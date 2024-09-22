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

export enum ChessLeaderBoardType {
    ALLTIME = "Alltime",
    DAILY = "Daily",
    WEEKLY = "Weekly",
    MONTHLY = "Monthly",
}

export function isChessLeaderBoardType ( value: unknown) : value is ChessLeaderBoardType {
    return isEnum(ChessLeaderBoardType, value);
}

export function explainChessLeaderBoardType ( value : unknown) : string {
    return explainEnum("ChessLeaderBoardType", ChessLeaderBoardType, isChessLeaderBoardType, value);
}

export function stringifyChessLeaderBoardType ( value : ChessLeaderBoardType) : string {
    return stringifyEnum(ChessLeaderBoardType, value);
}

export function parseChessLeaderBoardType ( value: any) : ChessLeaderBoardType | undefined {
    return parseEnum(ChessLeaderBoardType, value) as ChessLeaderBoardType | undefined;
}

export function isChessLeaderBoardTypeOrUndefined ( value: unknown): value is ChessLeaderBoardType | undefined {
    return isUndefined(value) || isChessLeaderBoardType(value);
}

export function explainChessLeaderBoardTypeOrUndefined ( value: unknown): string {
    return isChessLeaderBoardTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['LeaderBoardType', 'undefined']));
}
