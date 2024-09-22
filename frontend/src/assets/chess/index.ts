// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ChessPieceFrame } from "../../game/types/ChessPieceFrame";
import { ChessPieceType } from "../../game/types/ChessPieceType";

import Frame00_IconPawn from "./frame00/noun-chess-pawn-4390012.svg";
import Frame00_IconRook from "./frame00/noun-chess-bishop-4390004.svg";
import Frame00_IconKnight from "./frame00/noun-chess-knight-4390003.svg";
import Frame00_IconBishop from "./frame00/noun-chess-bishop-4390004.svg";
import Frame00_IconQueen from "./frame00/noun-chess-queen-4390013.svg";
import Frame00_IconKing from "./frame00/noun-chess-king-4390008.svg";
import Frame00_IconElephant from "./frame00/noun-elephant-1686314.svg";

import Frame01_IconPawn from "./frame01/noun-chess-pawn-4390012.svg";
import Frame01_IconRook from "./frame01/noun-chess-bishop-4390004.svg";
import Frame01_IconKnight from "./frame01/noun-chess-knight-4390003.svg";
import Frame01_IconBishop from "./frame01/noun-chess-bishop-4390004.svg";
import Frame01_IconQueen from "./frame01/noun-chess-queen-4390013.svg";
import Frame01_IconKing from "./frame01/noun-chess-king-4390008.svg";
import Frame01_IconElephant from "./frame01/noun-elephant-1686314.svg";

import Frame02_IconPawn from "./frame02/noun-chess-pawn-4390012.svg";
import Frame02_IconRook from "./frame02/noun-chess-bishop-4390004.svg";
import Frame02_IconKnight from "./frame02/noun-chess-knight-4390003.svg";
import Frame02_IconBishop from "./frame02/noun-chess-bishop-4390004.svg";
import Frame02_IconQueen from "./frame02/noun-chess-queen-4390013.svg";
import Frame02_IconKing from "./frame02/noun-chess-king-4390008.svg";
import Frame02_IconElephant from "./frame02/noun-elephant-1686314.svg";

import Frame03_IconPawn from "./frame03/noun-chess-pawn-4390012.svg";
import Frame03_IconRook from "./frame03/noun-chess-bishop-4390004.svg";
import Frame03_IconKnight from "./frame03/noun-chess-knight-4390003.svg";
import Frame03_IconBishop from "./frame03/noun-chess-bishop-4390004.svg";
import Frame03_IconQueen from "./frame03/noun-chess-queen-4390013.svg";
import Frame03_IconKing from "./frame03/noun-chess-king-4390008.svg";
import Frame03_IconElephant from "./frame03/noun-elephant-1686314.svg";

import Frame04_IconPawn from "./frame04/noun-chess-pawn-4390012.svg";
import Frame04_IconRook from "./frame04/noun-chess-bishop-4390004.svg";
import Frame04_IconKnight from "./frame04/noun-chess-knight-4390003.svg";
import Frame04_IconBishop from "./frame04/noun-chess-bishop-4390004.svg";
import Frame04_IconQueen from "./frame04/noun-chess-queen-4390013.svg";
import Frame04_IconKing from "./frame04/noun-chess-king-4390008.svg";
import Frame04_IconElephant from "./frame04/noun-elephant-1686314.svg";

import Frame05_IconPawn from "./frame05/noun-chess-pawn-4390012.svg";
import Frame05_IconRook from "./frame05/noun-chess-bishop-4390004.svg";
import Frame05_IconKnight from "./frame05/noun-chess-knight-4390003.svg";
import Frame05_IconBishop from "./frame05/noun-chess-bishop-4390004.svg";
import Frame05_IconQueen from "./frame05/noun-chess-queen-4390013.svg";
import Frame05_IconKing from "./frame05/noun-chess-king-4390008.svg";
import Frame05_IconElephant from "./frame05/noun-elephant-1686314.svg";

import Frame06_IconPawn from "./frame06/noun-chess-pawn-4390012.svg";
import Frame06_IconRook from "./frame06/noun-chess-bishop-4390004.svg";
import Frame06_IconKnight from "./frame06/noun-chess-knight-4390003.svg";
import Frame06_IconBishop from "./frame06/noun-chess-bishop-4390004.svg";
import Frame06_IconQueen from "./frame06/noun-chess-queen-4390013.svg";
import Frame06_IconKing from "./frame06/noun-chess-king-4390008.svg";
import Frame06_IconElephant from "./frame06/noun-elephant-1686314.svg";

import Frame07_IconPawn from "./frame07/noun-chess-pawn-4390012.svg";
import Frame07_IconRook from "./frame07/noun-chess-bishop-4390004.svg";
import Frame07_IconKnight from "./frame07/noun-chess-knight-4390003.svg";
import Frame07_IconBishop from "./frame07/noun-chess-bishop-4390004.svg";
import Frame07_IconQueen from "./frame07/noun-chess-queen-4390013.svg";
import Frame07_IconKing from "./frame07/noun-chess-king-4390008.svg";
import Frame07_IconElephant from "./frame07/noun-elephant-1686314.svg";

import Frame08_IconPawn from "./frame08/noun-chess-pawn-4390012.svg";
import Frame08_IconRook from "./frame08/noun-chess-bishop-4390004.svg";
import Frame08_IconKnight from "./frame08/noun-chess-knight-4390003.svg";
import Frame08_IconBishop from "./frame08/noun-chess-bishop-4390004.svg";
import Frame08_IconQueen from "./frame08/noun-chess-queen-4390013.svg";
import Frame08_IconKing from "./frame08/noun-chess-king-4390008.svg";
import Frame08_IconElephant from "./frame08/noun-elephant-1686314.svg";

export function getIconByChessPieceType(type: ChessPieceType, frame: ChessPieceFrame) {
    switch (frame) {

        case ChessPieceFrame.FRAME01:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame01_IconPawn;
                case ChessPieceType.ROOK       : return Frame01_IconRook;
                case ChessPieceType.KNIGHT     : return Frame01_IconKnight;
                case ChessPieceType.BISHOP     : return Frame01_IconBishop;
                case ChessPieceType.QUEEN      : return Frame01_IconQueen;
                case ChessPieceType.KING       : return Frame01_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame01_IconElephant;
                default                        : return undefined;
            }

        case ChessPieceFrame.FRAME02:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame02_IconPawn;
                case ChessPieceType.ROOK       : return Frame02_IconRook;
                case ChessPieceType.KNIGHT     : return Frame02_IconKnight;
                case ChessPieceType.BISHOP     : return Frame02_IconBishop;
                case ChessPieceType.QUEEN      : return Frame02_IconQueen;
                case ChessPieceType.KING       : return Frame02_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame02_IconElephant;
                default                        : return undefined;
            }

        case ChessPieceFrame.FRAME03:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame03_IconPawn;
                case ChessPieceType.ROOK       : return Frame03_IconRook;
                case ChessPieceType.KNIGHT     : return Frame03_IconKnight;
                case ChessPieceType.BISHOP     : return Frame03_IconBishop;
                case ChessPieceType.QUEEN      : return Frame03_IconQueen;
                case ChessPieceType.KING       : return Frame03_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame03_IconElephant;
                default                        : return undefined;
            }

        case ChessPieceFrame.FRAME04:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame04_IconPawn;
                case ChessPieceType.ROOK       : return Frame04_IconRook;
                case ChessPieceType.KNIGHT     : return Frame04_IconKnight;
                case ChessPieceType.BISHOP     : return Frame04_IconBishop;
                case ChessPieceType.QUEEN      : return Frame04_IconQueen;
                case ChessPieceType.KING       : return Frame04_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame04_IconElephant;
                default                        : return undefined;
            }

        case ChessPieceFrame.FRAME05:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame05_IconPawn;
                case ChessPieceType.ROOK       : return Frame05_IconRook;
                case ChessPieceType.KNIGHT     : return Frame05_IconKnight;
                case ChessPieceType.BISHOP     : return Frame05_IconBishop;
                case ChessPieceType.QUEEN      : return Frame05_IconQueen;
                case ChessPieceType.KING       : return Frame05_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame05_IconElephant;
                default                        : return undefined;
            }

        case ChessPieceFrame.FRAME06:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame06_IconPawn;
                case ChessPieceType.ROOK       : return Frame06_IconRook;
                case ChessPieceType.KNIGHT     : return Frame06_IconKnight;
                case ChessPieceType.BISHOP     : return Frame06_IconBishop;
                case ChessPieceType.QUEEN      : return Frame06_IconQueen;
                case ChessPieceType.KING       : return Frame06_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame06_IconElephant;
                default                        : return undefined;
            }

        case ChessPieceFrame.FRAME07:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame07_IconPawn;
                case ChessPieceType.ROOK       : return Frame07_IconRook;
                case ChessPieceType.KNIGHT     : return Frame07_IconKnight;
                case ChessPieceType.BISHOP     : return Frame07_IconBishop;
                case ChessPieceType.QUEEN      : return Frame07_IconQueen;
                case ChessPieceType.KING       : return Frame07_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame07_IconElephant;
                default                        : return undefined;
            }

        case ChessPieceFrame.FRAME08:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame08_IconPawn;
                case ChessPieceType.ROOK       : return Frame08_IconRook;
                case ChessPieceType.KNIGHT     : return Frame08_IconKnight;
                case ChessPieceType.BISHOP     : return Frame08_IconBishop;
                case ChessPieceType.QUEEN      : return Frame08_IconQueen;
                case ChessPieceType.KING       : return Frame08_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame08_IconElephant;
                default                        : return undefined;
            }

        case ChessPieceFrame.FRAME00:
        default:
            switch(type) {
                case ChessPieceType.PAWN       : return Frame00_IconPawn;
                case ChessPieceType.ROOK       : return Frame00_IconRook;
                case ChessPieceType.KNIGHT     : return Frame00_IconKnight;
                case ChessPieceType.BISHOP     : return Frame00_IconBishop;
                case ChessPieceType.QUEEN      : return Frame00_IconQueen;
                case ChessPieceType.KING       : return Frame00_IconKing;
                case ChessPieceType.ELEPHANT   : return Frame00_IconElephant;
                default                        : return undefined;
            }

    }
}
