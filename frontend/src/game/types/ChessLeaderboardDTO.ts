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
    explainChessLeaderboardResultDTO,
    ChessLeaderboardResultDTO,
    isChessLeaderboardResultDTO,
} from "./ChessLeaderboardResultDTO";
import {
    explainChessLeaderBoardTypeOrUndefined,
    isChessLeaderBoardTypeOrUndefined,
    ChessLeaderBoardType,
} from "./ChessLeaderBoardType";

export interface ChessLeaderboardDTO {
    readonly payload  : readonly ChessLeaderboardResultDTO[];
    readonly type    ?: ChessLeaderBoardType;
}

export function createChessLeaderboardDTO (
    payload : readonly ChessLeaderboardResultDTO[],
    type   ?: ChessLeaderBoardType,
) : ChessLeaderboardDTO {
    return {
        payload,
        type,
    };
}

export function isChessLeaderboardDTO ( value: unknown) : value is ChessLeaderboardDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'payload',
            'type',
        ])
        && isArrayOf<ChessLeaderboardResultDTO>(value?.payload, isChessLeaderboardResultDTO)
        && isChessLeaderBoardTypeOrUndefined(value?.type)
    );
}

export function explainChessLeaderboardDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'payload',
                'type',
            ])
            , explainProperty("payload", explainArrayOf<ChessLeaderboardResultDTO>(
                "GameLeaderboardResultDTO",
                explainChessLeaderboardResultDTO,
                value?.payload,
                isChessLeaderboardResultDTO,
            ))
            , explainProperty("type", explainChessLeaderBoardTypeOrUndefined(value?.type))
        ]
    );
}

export function stringifyChessLeaderboardDTO ( value : ChessLeaderboardDTO) : string {
    return `GameLeaderboardDTO(${value})`;
}

export function parseChessLeaderboardDTO ( value: unknown) : ChessLeaderboardDTO | undefined {
    if (isChessLeaderboardDTO(value)) return value;
    return undefined;
}

export function isChessLeaderboardDTOOrUndefined ( value: unknown): value is ChessLeaderboardDTO | undefined {
    return isUndefined(value) || isChessLeaderboardDTO(value);
}

export function explainChessLeaderboardDTOOrUndefined ( value: unknown): string {
    return isChessLeaderboardDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['GameLeaderboardDTO', 'undefined']));
}
