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
    explainGameStateDTOOrUndefined,
    GameStateDTO,
    isGameStateDTOOrUndefined,
} from "./GameStateDTO";

export interface GameRequestDTO {
    readonly name      ?: string;
    readonly gameState ?: GameStateDTO;
    readonly nextIndex ?: number;
    readonly cards     ?: number;
}

export function createGameRequestDTO (
    nextIndex : number | undefined,
    gameState ?: GameStateDTO | undefined,
    name      ?: string | undefined,
    cards     ?: number | undefined,
) : GameRequestDTO {
    return {
        name,
        nextIndex,
        gameState,
        cards,
    };
}

export function isGameRequestDTO (value: unknown) : value is GameRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'gameState',
            'nextIndex',
            'cards',
        ])
        && isStringOrUndefined(value?.name)
        && isGameStateDTOOrUndefined(value?.gameState)
        && isNumberOrUndefined(value?.nextIndex)
        && isNumberOrUndefined(value?.cards)
    );
}

export function explainGameRequestDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'gameState',
                'nextIndex',
                'cards',
            ])
            , explainProperty("name", explainStringOrUndefined(value?.name))
            , explainProperty("gameState", explainGameStateDTOOrUndefined(value?.gameState))
            , explainProperty("nextIndex", explainNumberOrUndefined(value?.nextIndex))
            , explainProperty("cards", explainNumberOrUndefined(value?.cards))
        ]
    );
}

export function stringifyGameRequestDTO (value : GameRequestDTO) : string {
    return `GameRequestDTO(${value})`;
}

export function parseGameRequestDTO (value: unknown) : GameRequestDTO | undefined {
    if (isGameRequestDTO(value)) return value;
    return undefined;
}

export function isGameRequestDTOOrUndefined (value: unknown): value is GameRequestDTO | undefined {
    return isUndefined(value) || isGameRequestDTO(value);
}

export function explainGameRequestDTOOrUndefined (value: unknown): string {
    return isGameRequestDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['GameRequestDTO', 'undefined']));
}
