// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PlayingCardType } from "../../game/types/PlayingCardType";
import IconFood from "./IconFood.webp";
import IconGold from "./IconGold.webp";
import IconKnowledge from "./IconKnowledge.webp";
import IconMagic from "./IconMagic.webp";
import IconStone from "./IconStone.webp";
import IconTechnology from "./IconTechnology.webp";
import IconTree from "./IconTree.webp";
import IconWater from "./IconWater.webp";

export const ALL_ICONS = [
    IconFood,
    IconGold,
    IconKnowledge,
    IconMagic,
    IconStone,
    IconTechnology,
    IconTree,
    IconWater,
];

export function getIconByPlayingCardType(type: PlayingCardType) {
    switch(type) {
        case PlayingCardType.FOOD       : return IconFood;
        case PlayingCardType.GOLD       : return IconGold;
        case PlayingCardType.KNOWLEDGE  : return IconKnowledge;
        case PlayingCardType.MAGIC      : return IconMagic;
        case PlayingCardType.STONE      : return IconStone;
        case PlayingCardType.TECHNOLOGY : return IconTechnology;
        case PlayingCardType.TREE       : return IconTree;
        case PlayingCardType.WATER      : return IconWater;
        default                         : return undefined;
    }
}

export {
    IconFood,
    IconGold,
    IconKnowledge,
    IconMagic,
    IconStone,
    IconTechnology,
    IconTree,
    IconWater,
}