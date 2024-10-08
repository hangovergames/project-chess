// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ChessPieceFrame } from "../../../game/types/ChessPieceFrame";
import BackCover from "./00_BackCover.webp";
import FramesHexagon01 from "./FramesHexagon01.webp";
import FramesHexagon02 from "./FramesHexagon02.webp";
import FramesHexagon03 from "./FramesHexagon03.webp";
import FramesHexagon04 from "./FramesHexagon04.webp";
import FramesHexagon05 from "./FramesHexagon05.webp";
import FramesHexagon06 from "./FramesHexagon06.webp";
import FramesHexagon07 from "./FramesHexagon07.webp";
import FramesHexagon08 from "./FramesHexagon08.webp";

export function getHexagonFrame(type: ChessPieceFrame) : string | undefined {
    switch(type) {
        case ChessPieceFrame.FRAME00 : return BackCover;
        case ChessPieceFrame.FRAME01 : return FramesHexagon01;
        case ChessPieceFrame.FRAME02 : return FramesHexagon02;
        case ChessPieceFrame.FRAME03 : return FramesHexagon03;
        case ChessPieceFrame.FRAME04 : return FramesHexagon04;
        case ChessPieceFrame.FRAME05 : return FramesHexagon05;
        case ChessPieceFrame.FRAME06 : return FramesHexagon06;
        case ChessPieceFrame.FRAME07 : return FramesHexagon07;
        case ChessPieceFrame.FRAME08 : return FramesHexagon08;
        default                       : return undefined;
    }
}
