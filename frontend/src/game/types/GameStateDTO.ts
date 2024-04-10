// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBoolean } from "../../io/hyperify/core/types/Boolean";
import {
    explain,
    explainNot,
    explainOk,
    explainOr,
    explainProperty,
} from "../../io/hyperify/core/types/explain";
import {
    explainNumber,
    isNumber,
} from "../../io/hyperify/core/types/Number";
import {
    explainNumberArray,
    isNumberArray,
} from "../../io/hyperify/core/types/NumberArray";
import {
    explainNoOtherKeysInDevelopment,
    hasNoOtherKeysInDevelopment,
} from "../../io/hyperify/core/types/OtherKeys";
import {
    explainRegularObject,
    isRegularObject,
} from "../../io/hyperify/core/types/RegularObject";
import {
    explainString,
    isString,
} from "../../io/hyperify/core/types/String";
import { isUndefined } from "../../io/hyperify/core/types/undefined";

export interface GameStateDTO {
    readonly score         : number;
    readonly cards         : readonly number[];
    readonly private       : string;
    readonly lastCard      : number;
    readonly lastIndex     : number;
    readonly isFinished    : boolean;
    readonly name          : string;
    readonly leaderboardId : string;
}

export function createGameStateDTO (
    score : number,
    cards : readonly number[],
    privateData : string,
    lastCard : number,
    lastIndex : number,
    name : string,
    leaderboardId : string,
    isFinished : boolean,
) : GameStateDTO {
    return {
        score,
        cards,
        private: privateData,
        lastCard,
        lastIndex,
        name,
        isFinished,
        leaderboardId,
    };
}

export function isGameStateDTO (value: unknown) : value is GameStateDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'score',
            'cards',
            'private',
            'lastCard',
            'lastIndex',
            'name',
            'isFinished',
            'leaderboardId',
        ])
        && isNumber(value?.score)
        && isNumberArray(value?.cards)
        && isString(value?.private)
        && isNumber(value?.lastCard)
        && isNumber(value?.lastIndex)
        && isString(value?.name)
        && isBoolean(value?.isFinished)
        && isString(value?.leaderboardId)
    );
}

export function explainGameStateDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'score',
                'cards',
                'private',
                'lastCard',
                'lastIndex',
                'name',
                'isFinished',
                'leaderboardId',
            ])
            , explainProperty("score", explainNumber(value?.score))
            , explainProperty("cards", explainNumberArray(value?.cards))
            , explainProperty("private", explainString(value?.private))
            , explainProperty("lastCard", explainNumber(value?.lastCard))
            , explainProperty("lastIndex", explainNumber(value?.lastIndex))
            , explainProperty("name", explainNumber(value?.name))
            , explainProperty("isFinished", explainNumber(value?.isFinished))
            , explainProperty("leaderboardId", explainNumber(value?.leaderboardId))
        ]
    );
}

export function stringifyGameStateDTO (value : GameStateDTO) : string {
    return `GameStateDTO(${value})`;
}

export function parseGameStateDTO (value: unknown) : GameStateDTO | undefined {
    if (isGameStateDTO(value)) return value;
    return undefined;
}

export function isGameStateDTOOrUndefined (value: unknown): value is GameStateDTO | undefined {
    return isUndefined(value) || isGameStateDTO(value);
}

export function explainGameStateDTOOrUndefined (value: unknown): string {
    return isGameStateDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['GameStateDTO', 'undefined']));
}
