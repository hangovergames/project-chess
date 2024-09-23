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
    ChessStateDTO,
    explainChessStateDTOOrUndefined,
    isChessStateDTOOrUndefined,
} from "./ChessStateDTO";
import {
    ChessUnit,
    explainChessUnitOrUndefined,
    isChessUnitOrUndefined,
} from "./ChessUnit";

export interface ChessRequestDTO {

    /**
     * An index on the board for a unit of the next action
     */
    readonly subject   ?: number;

    /**
     * An index on the board for a unit to perform the action (move,
     * attack, etc). It cannot be same as Subject.
     */
    readonly target    ?: number;

    /**
     * The state of the game from previous request.
     * If not defined, a new game is initialized.
     */
    readonly gameState ?: ChessStateDTO;

    /**
     * Name Optional name of the player. Can be used to change the name of the
     * requester.
     */
    readonly name ?: string;

    /**
     * The unit ID which to promote the unit. Defaults to Queen.
     */
    readonly promote ?: ChessUnit;

}

export function createChessRequestDTO (
    subject   ?: number | undefined,
    target    ?: number | undefined,
    gameState ?: ChessStateDTO | undefined,
    name      ?: string | undefined,
    promote   ?: ChessUnit | undefined,
) : ChessRequestDTO {
    return {
        subject,
        target,
        gameState,
        name,
        promote,
    };
}

export function isChessRequestDTO ( value: unknown) : value is ChessRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'subject',
            'target',
            'gameState',
            'name',
            'promote',
        ])
        && isNumberOrUndefined(value?.subject)
        && isNumberOrUndefined(value?.target)
        && isChessUnitOrUndefined(value?.promote)
        && isChessStateDTOOrUndefined(value?.gameState)
        && isStringOrUndefined(value?.name)
    );
}

export function explainChessRequestDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'subject',
                'target',
                'gameState',
                'name',
                'promote',
            ])
            , explainProperty("subject", explainNumberOrUndefined(value?.subject))
            , explainProperty("target", explainNumberOrUndefined(value?.target))
            , explainProperty("promote", explainChessUnitOrUndefined(value?.promote))
            , explainProperty("gameState", explainChessStateDTOOrUndefined(value?.gameState))
            , explainProperty("name", explainStringOrUndefined(value?.name))
        ]
    );
}

export function stringifyChessRequestDTO ( value : ChessRequestDTO) : string {
    return `ChessRequestDTO(${value})`;
}

export function parseChessRequestDTO ( value: unknown) : ChessRequestDTO | undefined {
    if (isChessRequestDTO(value)) return value;
    return undefined;
}

export function isChessRequestDTOOrUndefined ( value: unknown): value is ChessRequestDTO | undefined {
    return isUndefined(value) || isChessRequestDTO(value);
}

export function explainChessRequestDTOOrUndefined ( value: unknown): string {
    return isChessRequestDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessRequestDTO', 'undefined']));
}
