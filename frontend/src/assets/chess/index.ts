// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ChessPieceType } from "../../game/types/ChessPieceType";
import IconPawn from "./noun-chess-pawn-4390012.svg";
import IconRook from "./noun-chess-bishop-4390004.svg";
import IconKnight from "./noun-chess-knight-4390003.svg";
import IconBishop from "./noun-chess-bishop-4390004.svg";
import IconQueen from "./noun-chess-queen-4390013.svg";
import IconKing from "./noun-chess-king-4390008.svg";
import IconElephant from "./noun-elephant-1686314.svg";

export const ALL_CHESS_ICONS = [
    IconPawn,
    IconRook,
    IconKnight,
    IconBishop,
    IconQueen,
    IconKing,
    IconElephant,
];

export function getIconByChessPieceType( type: ChessPieceType) {
    switch(type) {
        case ChessPieceType.PAWN       : return IconPawn;
        case ChessPieceType.ROOK       : return IconRook;
        case ChessPieceType.KNIGHT     : return IconKnight;
        case ChessPieceType.BISHOP     : return IconBishop;
        case ChessPieceType.QUEEN      : return IconQueen;
        case ChessPieceType.KING       : return IconKing;
        case ChessPieceType.ELEPHANT   : return IconElephant;
        default                        : return undefined;
    }
}

export {
    IconPawn,
    IconRook,
    IconKnight,
    IconBishop,
    IconQueen,
    IconKing,
    IconElephant,
}
