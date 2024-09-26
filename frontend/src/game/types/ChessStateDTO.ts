// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainBoolean,
    isBoolean,
} from "../../io/hyperify/core/types/Boolean";
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
    ChessBoardDTO,
    explainChessBoardDTO,
    isChessBoardDTO,
} from "./ChessBoardDTO";

export interface ChessStateDTO {
    readonly name          : string;
    readonly offender      : string;
    readonly defender      : string;
    readonly leaderboardId : string;
    readonly started       : number;
    readonly finished      : number;
    readonly isStarted     : boolean;
    readonly isFinished    : boolean;
    readonly board         : ChessBoardDTO;
    readonly private       : string;
    readonly check         : boolean;
}

export function createChessStateDTO (
    name : string,
    offender : string,
    defender : string,
    leaderboardId : string,
    started : number,
    finished: number,
    isStarted: boolean,
    isFinished: boolean,
    board: ChessBoardDTO,
    privateData : string,
    check : boolean,
) : ChessStateDTO {
    return {
        name,
        offender,
        defender,
        leaderboardId,
        started,
        finished,
        isStarted,
        isFinished,
        board,
        check,
        private: privateData,
    };
}

export function isChessStateDTO ( value: unknown) : value is ChessStateDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'offender',
            'defender',
            'leaderboardId',
            'started',
            'finished',
            'isStarted',
            'isFinished',
            'board',
            'check',
            'private',
        ])
        && isString(value?.name)
        && isString(value?.offender)
        && isString(value?.defender)
        && isString(value?.leaderboardId)
        && isNumber(value?.started)
        && isNumber(value?.finished)
        && isBoolean(value?.isStarted)
        && isBoolean(value?.isFinished)
        && isChessBoardDTO(value?.board)
        && isString(value?.private)
        && isBoolean(value?.check)
    );
}

export function explainChessStateDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'offender',
                'defender',
                'leaderboardId',
                'started',
                'finished',
                'isStarted',
                'isFinished',
                'board',
                'check',
                'private',
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("offender", explainString(value?.offender))
            , explainProperty("defender", explainString(value?.defender))
            , explainProperty("leaderboardId", explainString(value?.leaderboardId))
            , explainProperty("started", explainNumber(value?.started))
            , explainProperty("finished", explainNumber(value?.finished))
            , explainProperty("isStarted", explainBoolean(value?.isStarted))
            , explainProperty("isFinished", explainBoolean(value?.isFinished))
            , explainProperty("check", explainBoolean(value?.check))
            , explainProperty("board", explainChessBoardDTO(value?.board))
            , explainProperty("private", explainString(value?.private))
        ]
    );
}

export function stringifyChessStateDTO ( value : ChessStateDTO) : string {
    return `ChessStateDTO(${value})`;
}

export function parseChessStateDTO ( value: unknown) : ChessStateDTO | undefined {
    if (isChessStateDTO(value)) return value;
    return undefined;
}

export function isChessStateDTOOrUndefined ( value: unknown): value is ChessStateDTO | undefined {
    return isUndefined(value) || isChessStateDTO(value);
}

export function explainChessStateDTOOrUndefined ( value: unknown): string {
    return isChessStateDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['ChessStateDTO', 'undefined']));
}
