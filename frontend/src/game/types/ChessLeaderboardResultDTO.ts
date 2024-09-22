// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../io/hyperify/core/types/explain";
import {
    explainNumberOrUndefined,
    isNumberOrUndefined,
} from "../../io/hyperify/core/types/Number";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../io/hyperify/core/types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../io/hyperify/core/types/RegularObject";
import {
    explainStringOrUndefined,
    isStringOrUndefined,
} from "../../io/hyperify/core/types/String";
import { isUndefined } from "../../io/hyperify/core/types/undefined";
import {
    explainChessLeaderBoardTypeOrUndefined,
    isChessLeaderBoardTypeOrUndefined,
    ChessLeaderBoardType,
} from "./ChessLeaderBoardType";

export interface ChessLeaderboardResultDTO {
    readonly id      ?: string;
    readonly time    ?: string;
    readonly type    ?: ChessLeaderBoardType;
    readonly rank    ?: number;
    readonly name    ?: string;
    readonly score   ?: number;
}

export function createChessLeaderboardResultDTO (
    id ?: string | undefined,
    time ?: string | undefined,
    name ?: string | undefined,
    score ?: number | undefined,
    rank ?: number | undefined,
    type ?: ChessLeaderBoardType | undefined,
) : ChessLeaderboardResultDTO {
    return {
        id,
        time,
        name,
        score,
        rank,
        type,
    };
}

export function isChessLeaderboardResultDTO ( value: unknown) : value is ChessLeaderboardResultDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'time',
            'name',
            'score',
            'rank',
            'type',
        ])
        && isStringOrUndefined(value?.id)
        && isStringOrUndefined(value?.time)
        && isStringOrUndefined(value?.name)
        && isNumberOrUndefined(value?.score)
        && isNumberOrUndefined(value?.rank)
        && isChessLeaderBoardTypeOrUndefined(value?.type)
    );
}

export function explainChessLeaderboardResultDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'time',
                'name',
                'score',
                'rank',
                'type',
            ])
            , explainProperty("id", explainStringOrUndefined(value?.id))
            , explainProperty("time", explainStringOrUndefined(value?.time))
            , explainProperty("name", explainStringOrUndefined(value?.name))
            , explainProperty("score", explainNumberOrUndefined(value?.score))
            , explainProperty("rank", explainNumberOrUndefined(value?.rank))
            , explainProperty("type", explainChessLeaderBoardTypeOrUndefined(value?.type))
        ]
    );
}

export function stringifyChessLeaderboardResultDTO ( value : ChessLeaderboardResultDTO) : string {
    return `GameLeaderboardResultDTO(${value})`;
}

export function parseChessLeaderboardResultDTO ( value: unknown) : ChessLeaderboardResultDTO | undefined {
    if (isChessLeaderboardResultDTO(value)) return value;
    return undefined;
}

export function isChessLeaderboardResultDTOOrUndefined ( value: unknown): value is ChessLeaderboardResultDTO | undefined {
    return isUndefined(value) || isChessLeaderboardResultDTO(value);
}

export function explainChessLeaderboardResultDTOOrUndefined ( value: unknown): string {
    return isChessLeaderboardResultDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['GameLeaderboardResultDTO', 'undefined']));
}
