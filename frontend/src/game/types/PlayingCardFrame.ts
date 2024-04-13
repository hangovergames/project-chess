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

export enum PlayingCardFrame {
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

export function getPlayingCardFrameByNumber (value: number) : PlayingCardFrame {
    switch(value) {
        case 0: return PlayingCardFrame.FRAME00;
        case 1: return PlayingCardFrame.FRAME01;
        case 2: return PlayingCardFrame.FRAME02;
        case 3: return PlayingCardFrame.FRAME03;
        case 4: return PlayingCardFrame.FRAME04;
        case 5: return PlayingCardFrame.FRAME05;
        case 6: return PlayingCardFrame.FRAME06;
        case 7: return PlayingCardFrame.FRAME07;
        case 8: return PlayingCardFrame.FRAME08;
        default: return PlayingCardFrame.FRAME00;
    }
}

export function isPlayingCardFrame (value: unknown) : value is PlayingCardFrame {
    return isEnum(PlayingCardFrame, value);
}

export function explainPlayingCardFrame (value : unknown) : string {
    return explainEnum("PlayingCardFrame", PlayingCardFrame, isPlayingCardFrame, value);
}

export function stringifyPlayingCardFrame (value : PlayingCardFrame) : string {
    return stringifyEnum(PlayingCardFrame, value);
}

export function parsePlayingCardFrame (value: any) : PlayingCardFrame | undefined {
    return parseEnum(PlayingCardFrame, value) as PlayingCardFrame | undefined;
}

export function isPlayingCardFrameOrUndefined (value: unknown): value is PlayingCardFrame | undefined {
    return isUndefined(value) || isPlayingCardFrame(value);
}

export function explainPlayingCardFrameOrUndefined (value: unknown): string {
    return isPlayingCardFrameOrUndefined(value) ? explainOk() : explainNot(explainOr(['PlayingCardFrame', 'undefined']));
}
