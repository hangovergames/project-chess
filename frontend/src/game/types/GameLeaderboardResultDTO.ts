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

export interface GameLeaderboardResultDTO {
    readonly id      ?: string;
    readonly time    ?: string;
    readonly name    ?: string;
    readonly score   ?: number;
    readonly rank    ?: number;
}

export function createGameLeaderboardResultDTO (
    id ?: string | undefined,
    time ?: string | undefined,
    name ?: string | undefined,
    score ?: number | undefined,
    rank ?: number | undefined,
) : GameLeaderboardResultDTO {
    return {
        id,
        time,
        name,
        score,
        rank,
    };
}

export function isGameLeaderboardResultDTO (value: unknown) : value is GameLeaderboardResultDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'time',
            'name',
            'score',
            'rank',
        ])
        && isStringOrUndefined(value?.id)
        && isStringOrUndefined(value?.time)
        && isStringOrUndefined(value?.name)
        && isNumberOrUndefined(value?.score)
        && isNumberOrUndefined(value?.rank)
    );
}

export function explainGameLeaderboardResultDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'time',
                'name',
                'score',
                'rank',
            ])
            , explainProperty("id", explainStringOrUndefined(value?.id))
            , explainProperty("time", explainStringOrUndefined(value?.time))
            , explainProperty("name", explainStringOrUndefined(value?.name))
            , explainProperty("score", explainNumberOrUndefined(value?.score))
            , explainProperty("rank", explainNumberOrUndefined(value?.rank))
        ]
    );
}

export function stringifyGameLeaderboardResultDTO (value : GameLeaderboardResultDTO) : string {
    return `GameLeaderboardResultDTO(${value})`;
}

export function parseGameLeaderboardResultDTO (value: unknown) : GameLeaderboardResultDTO | undefined {
    if (isGameLeaderboardResultDTO(value)) return value;
    return undefined;
}

export function isGameLeaderboardResultDTOOrUndefined (value: unknown): value is GameLeaderboardResultDTO | undefined {
    return isUndefined(value) || isGameLeaderboardResultDTO(value);
}

export function explainGameLeaderboardResultDTOOrUndefined (value: unknown): string {
    return isGameLeaderboardResultDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['GameLeaderboardResultDTO', 'undefined']));
}
