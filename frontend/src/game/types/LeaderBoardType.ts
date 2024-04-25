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

export enum LeaderBoardType {
    ALLTIME = "Alltime",
    DAILY = "Daily",
    WEEKLY = "Weekly",
    MONTHLY = "Monthly",
}

export function isLeaderBoardType (value: unknown) : value is LeaderBoardType {
    return isEnum(LeaderBoardType, value);
}

export function explainLeaderBoardType (value : unknown) : string {
    return explainEnum("LeaderBoardType", LeaderBoardType, isLeaderBoardType, value);
}

export function stringifyLeaderBoardType (value : LeaderBoardType) : string {
    return stringifyEnum(LeaderBoardType, value);
}

export function parseLeaderBoardType (value: any) : LeaderBoardType | undefined {
    return parseEnum(LeaderBoardType, value) as LeaderBoardType | undefined;
}

export function isLeaderBoardTypeOrUndefined (value: unknown): value is LeaderBoardType | undefined {
    return isUndefined(value) || isLeaderBoardType(value);
}

export function explainLeaderBoardTypeOrUndefined (value: unknown): string {
    return isLeaderBoardTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['LeaderBoardType', 'undefined']));
}
