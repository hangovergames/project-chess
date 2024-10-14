// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

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
import {
    explainString,
    isString,
} from "../../io/hyperify/core/types/String";
import { isUndefined } from "../../io/hyperify/core/types/undefined";
import {
    ChessStateDTO,
    explainChessStateDTO,
    isChessStateDTO,
} from "./ChessStateDTO";

export interface ChessEventDTO {
    readonly id: string;
    readonly created: string;
    readonly data: ChessStateDTO;
}

export function createChessEventDTO (
    id : string,
    created : string,
    data : ChessStateDTO,
) : ChessEventDTO {
    return {
        id,
        created,
        data,
    };
}

export function isChessEventDTO (value: unknown) : value is ChessEventDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'created',
            'data',
        ])
        && isString(value?.id)
        && isString(value?.created)
        && isChessStateDTO(value?.data)
    );
}

export function explainChessEventDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'created',
                'data',
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("data", explainChessStateDTO(value?.data))
        ]
    );
}

export function stringifyChessEventDTO (value : ChessEventDTO) : string {
    return `ChessEventDTO(${value})`;
}

export function parseChessEventDTO (value: unknown) : ChessEventDTO | undefined {
    if (isChessEventDTO(value)) return value;
    return undefined;
}

export function isChessEventDTOOrUndefined (value: unknown): value is ChessEventDTO | undefined {
    return isUndefined(value) || isChessEventDTO(value);
}

export function explainChessEventDTOOrUndefined (value: unknown): string {
    return isChessEventDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessEventDTO', 'undefined']));
}
