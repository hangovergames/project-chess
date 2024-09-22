// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainEnum,
    isEnum,
    parseEnum,
    stringifyEnum,
} from "../../io/hyperify/core/types/Enum";
import {
    explainNot,
    explainOk,
    explainOr,
} from "../../io/hyperify/core/types/explain";
import { isUndefined } from "../../io/hyperify/core/types/undefined";
import { ChessUnit } from "./ChessUnit";
import { ChessUnitDTO } from "./ChessUnitDTO";

export enum ChessPieceFrame {
    FRAME00 = "00",
    FRAME01 = "01",
    FRAME02 = "02",
    FRAME03 = "03",
    FRAME04 = "04",
    FRAME05 = "05",
    FRAME06 = "06",
    FRAME07 = "07",
    FRAME08 = "08",
}

export function getChessPieceFrameByChessUnitDTO ( value: ChessUnitDTO | null ) : ChessPieceFrame {
    switch(value?.type) {
        case 0: return ChessPieceFrame.FRAME00;
        case 1: return ChessPieceFrame.FRAME01;
        case 2: return ChessPieceFrame.FRAME02;
        case 3: return ChessPieceFrame.FRAME03;
        case 4: return ChessPieceFrame.FRAME04;
        case 5: return ChessPieceFrame.FRAME05;
        case 6: return ChessPieceFrame.FRAME06;
        case 7: return ChessPieceFrame.FRAME07;
        default: return ChessPieceFrame.FRAME00;
    }
}

export function isChessPieceFrame ( value: unknown) : value is ChessPieceFrame {
    return isEnum(ChessPieceFrame, value);
}

export function explainChessPieceFrame ( value : unknown) : string {
    return explainEnum("PlayingCardFrame", ChessPieceFrame, isChessPieceFrame, value);
}

export function stringifyChessPieceFrame ( value : ChessPieceFrame) : string {
    return stringifyEnum(ChessPieceFrame, value);
}

export function parseChessPieceFrame ( value: any) : ChessPieceFrame | undefined {
    return parseEnum(ChessPieceFrame, value) as ChessPieceFrame | undefined;
}

export function isChessPieceFrameOrUndefined ( value: unknown): value is ChessPieceFrame | undefined {
    return isUndefined(value) || isChessPieceFrame(value);
}

export function explainChessPieceFrameOrUndefined ( value: unknown): string {
    return isChessPieceFrameOrUndefined(value) ? explainOk() : explainNot(explainOr(['PlayingCardFrame', 'undefined']));
}
