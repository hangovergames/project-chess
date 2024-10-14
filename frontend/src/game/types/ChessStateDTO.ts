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
    explainStringOrUndefined,
    isString,
    isStringOrUndefined,
} from "../../io/hyperify/core/types/String";
import { isUndefined } from "../../io/hyperify/core/types/undefined";
import {
    ChessBoardDTO,
    explainChessBoardDTO,
    isChessBoardDTO,
} from "./ChessBoardDTO";
import {
    ChessComputerLevel,
    explainChessComputerLevel,
    isChessComputerLevel,
} from "./ChessComputerLevel";
import {
    ChessPlayMode,
    explainChessPlayMode,
    isChessPlayMode,
} from "./ChessPlayMode";

export interface ChessStateDTO {
    readonly id            : string;
    readonly name          : string;
    readonly mode          : ChessPlayMode;
    /** The computer level */
    readonly computer      : ChessComputerLevel;
    readonly offender      : string;
    readonly defender      : string;
    readonly winner       ?: string | undefined;
    readonly leaderboardId : string;
    readonly started       : number;
    readonly finished      : number;
    readonly isStarted     : boolean;
    readonly isFinished    : boolean;
    readonly board         : ChessBoardDTO;
    readonly private       : string;
}

export function createChessStateDTO (
    id : string,
    mode : ChessPlayMode,
    computer : ChessComputerLevel,
    name : string,
    offender : string,
    defender : string,
    winner : string | undefined,
    leaderboardId : string,
    started : number,
    finished: number,
    isStarted: boolean,
    isFinished: boolean,
    board: ChessBoardDTO,
    privateData : string,
) : ChessStateDTO {
    return {
        id,
        mode,
        computer,
        name,
        offender,
        defender,
        winner,
        leaderboardId,
        started,
        finished,
        isStarted,
        isFinished,
        board,
        private: privateData,
    };
}

export function isChessStateDTO ( value: unknown) : value is ChessStateDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'name',
            'computer',
            'mode',
            'offender',
            'defender',
            'winner',
            'leaderboardId',
            'started',
            'finished',
            'isStarted',
            'isFinished',
            'board',
            'private',
        ])
        && isString(value?.id)
        && isString(value?.name)
        && isChessPlayMode(value?.mode)
        && isString(value?.offender)
        && isString(value?.defender)
        && isStringOrUndefined(value?.winner)
        && isString(value?.leaderboardId)
        && isNumber(value?.started)
        && isNumber(value?.finished)
        && isBoolean(value?.isStarted)
        && isBoolean(value?.isFinished)
        && isChessBoardDTO(value?.board)
        && isString(value?.private)
        && isChessComputerLevel(value?.computer)
    );
}

export function explainChessStateDTO ( value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'mode',
                'name',
                'offender',
                'defender',
                'winner',
                'leaderboardId',
                'started',
                'finished',
                'isStarted',
                'isFinished',
                'board',
                'private',
                'computer',
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("mode", explainChessPlayMode(value?.mode))
            , explainProperty("offender", explainString(value?.offender))
            , explainProperty("defender", explainString(value?.defender))
            , explainProperty("winner", explainStringOrUndefined(value?.winner))
            , explainProperty("leaderboardId", explainString(value?.leaderboardId))
            , explainProperty("started", explainNumber(value?.started))
            , explainProperty("finished", explainNumber(value?.finished))
            , explainProperty("isStarted", explainBoolean(value?.isStarted))
            , explainProperty("isFinished", explainBoolean(value?.isFinished))
            , explainProperty("board", explainChessBoardDTO(value?.board))
            , explainProperty("private", explainString(value?.private))
            , explainProperty("computer", explainChessComputerLevel(value?.computer))
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
