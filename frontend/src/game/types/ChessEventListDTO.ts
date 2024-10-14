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
import {
    explainString,
    isString,
} from "../../io/hyperify/core/types/String";
import { isUndefined } from "../../io/hyperify/core/types/undefined";
import {
    ChessEventDTO,
    explainChessEventDTO,
    isChessEventDTO,
} from "./ChessEventDTO";

export interface ChessEventListDTO {
    readonly created: string;
    readonly payload: readonly ChessEventDTO[];
    readonly private: string;
}

export function createChessEventListDTO (
    created : string,
    payload : readonly ChessEventDTO[],
    privateData : string,
) : ChessEventListDTO {
    return {
        created,
        payload,
        private: privateData,
    };
}

export function isChessEventListDTO (value: unknown) : value is ChessEventListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'created',
            'payload',
            'private',
        ])
        && isString(value?.created)
        && isArrayOf<ChessEventDTO>(value?.payload, isChessEventDTO)
        && isString(value?.private)
    );
}

export function explainChessEventListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'created',
                'payload',
                'private',
            ])
            , explainProperty("created", explainString(value?.created))
            , explainProperty("payload", explainArrayOf<ChessEventDTO>("ChessEventDTO", explainChessEventDTO, value?.payload, isChessEventDTO))
            , explainProperty("private", explainString(value?.private))
        ]
    );
}

export function stringifyChessEventListDTO (value : ChessEventListDTO) : string {
    return `ChessEventListDTO(${value})`;
}

export function parseChessEventListDTO (value: unknown) : ChessEventListDTO | undefined {
    if (isChessEventListDTO(value)) return value;
    return undefined;
}

export function isChessEventListDTOOrUndefined (value: unknown): value is ChessEventListDTO | undefined {
    return isUndefined(value) || isChessEventListDTO(value);
}

export function explainChessEventListDTOOrUndefined (value: unknown): string {
    return isChessEventListDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessEventListDTO', 'undefined']));
}
