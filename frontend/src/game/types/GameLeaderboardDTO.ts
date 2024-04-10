// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainArrayOf,
    isArrayOf,
} from "../../io/hyperify/core/types/Array";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../io/hyperify/core/types/explain";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../io/hyperify/core/types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../io/hyperify/core/types/RegularObject";
import { isUndefined } from "../../io/hyperify/core/types/undefined";
import {
    explainGameLeaderboardResultDTO,
    GameLeaderboardResultDTO,
    isGameLeaderboardResultDTO,
} from "./GameLeaderboardResultDTO";

export interface GameLeaderboardDTO {
    readonly payload : readonly GameLeaderboardResultDTO[];
}

export function createGameLeaderboardDTO (
    payload : readonly GameLeaderboardResultDTO[],
) : GameLeaderboardDTO {
    return {
        payload,
    };
}

export function isGameLeaderboardDTO (value: unknown) : value is GameLeaderboardDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'payload',
        ])
        && isArrayOf<GameLeaderboardResultDTO>(value?.payload, isGameLeaderboardResultDTO)
    );
}

export function explainGameLeaderboardDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'payload',
            ])
            , explainProperty("payload", explainArrayOf<GameLeaderboardResultDTO>(
                "GameLeaderboardResultDTO",
                explainGameLeaderboardResultDTO,
                value?.payload,
                isGameLeaderboardResultDTO,
            ))
        ]
    );
}

export function stringifyGameLeaderboardDTO (value : GameLeaderboardDTO) : string {
    return `GameLeaderboardDTO(${value})`;
}

export function parseGameLeaderboardDTO (value: unknown) : GameLeaderboardDTO | undefined {
    if (isGameLeaderboardDTO(value)) return value;
    return undefined;
}

export function isGameLeaderboardDTOOrUndefined (value: unknown): value is GameLeaderboardDTO | undefined {
    return isUndefined(value) || isGameLeaderboardDTO(value);
}

export function explainGameLeaderboardDTOOrUndefined (value: unknown): string {
    return isGameLeaderboardDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['GameLeaderboardDTO', 'undefined']));
}
