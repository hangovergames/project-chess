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
import { ChessUnitDTO } from "./ChessUnitDTO";

export enum ChessPieceFrame {

    /**
     * Empty, grey frame
     */
    FRAME00 = "00",

    /**
     * Sand white frame
     */
    FRAME01 = "01",

    /**
     * Brown frame
     */
    FRAME02 = "02",

    /**
     * Green frame
     */
    FRAME03 = "03",

    /**
     * Grey frame
     */
    FRAME04 = "04",

    /**
     * Purple frame
     */
    FRAME05 = "05",

    /**
     * Cyan frame
     */
    FRAME06 = "06",

    /**
     * Brownish red frame
     */
    FRAME07 = "07",

    /**
     * Yellowish brown frame
     */
    FRAME08 = "08",
}

export function getChessPieceFrameByChessUnitDTO ( value: ChessUnitDTO | null, selected: boolean ) : ChessPieceFrame {
    if (value?.isDefender && value?.isOffender) {
        return ChessPieceFrame.FRAME00;
    }
    if (!value?.isDefender && !value?.isOffender) {
        return ChessPieceFrame.FRAME00;
    }

    if (selected) {
        switch(value?.isDefender) {
            case true: return ChessPieceFrame.FRAME00;
            default: return ChessPieceFrame.FRAME00;
        }
    }

    switch(value?.isDefender) {
        case true: return ChessPieceFrame.FRAME04;
        default: return ChessPieceFrame.FRAME01;
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
