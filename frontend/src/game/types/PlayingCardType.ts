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

export enum PlayingCardType {
    NONE = "NONE",
    FOOD = "FOOD",
    GOLD = "GOLD",
    KNOWLEDGE = "KNOWLEDGE",
    MAGIC = "MAGIC",
    STONE = "STONE",
    TECHNOLOGY = "TECHNOLOGY",
    TREE = "TREE",
    WATER = "WATER",
}

export function getPlayingCardTypeByNumber ( value: number) : PlayingCardType {
    switch (value) {
        case 1  : return PlayingCardType.FOOD;
        case 2  : return PlayingCardType.GOLD;
        case 3  : return PlayingCardType.KNOWLEDGE;
        case 4  : return PlayingCardType.MAGIC;
        case 5  : return PlayingCardType.STONE;
        case 6  : return PlayingCardType.TECHNOLOGY;
        case 7  : return PlayingCardType.TREE;
        case 8  : return PlayingCardType.WATER;
        default : return PlayingCardType.NONE;
    }
}

export function getPlayingCardNumberByType ( value: PlayingCardType) : number {
    switch (value) {
        case PlayingCardType.FOOD       : return 1;
        case PlayingCardType.GOLD       : return 2;
        case PlayingCardType.KNOWLEDGE  : return 3;
        case PlayingCardType.MAGIC      : return 4;
        case PlayingCardType.STONE      : return 5;
        case PlayingCardType.TECHNOLOGY : return 6;
        case PlayingCardType.TREE       : return 7;
        case PlayingCardType.WATER      : return 8;
        default                         : return 0;
    }
}

export function isPlayingCardType (value: unknown) : value is PlayingCardType {
    return isEnum(PlayingCardType, value);
}

export function explainPlayingCardType (value : unknown) : string {
    return explainEnum("PlayingCardType", PlayingCardType, isPlayingCardType, value);
}

export function stringifyPlayingCardType (value : PlayingCardType) : string {
    return stringifyEnum(PlayingCardType, value);
}

export function parsePlayingCardType (value: any) : PlayingCardType | undefined {
    return parseEnum(PlayingCardType, value) as PlayingCardType | undefined;
}

export function isPlayingCardTypeOrUndefined (value: unknown): value is PlayingCardType | undefined {
    return isUndefined(value) || isPlayingCardType(value);
}

export function explainPlayingCardTypeOrUndefined (value: unknown): string {
    return isPlayingCardTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['PlayingCardType', 'undefined']));
}
