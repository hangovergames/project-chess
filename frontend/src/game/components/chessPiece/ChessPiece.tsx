// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    useEffect,
    useState,
} from "react";
import { getIconByChessPieceType } from "../../../assets/chess";
import { Loader } from "../../../io/hyperify/frontend/components/loader/Loader";
import { CHESS_PIECE_CLASS_NAME } from "../../constants/classNames";
import { ChessPieceFrame } from "../../types/ChessPieceFrame";
import { ChessPieceType } from "../../types/ChessPieceType";
import "./ChessPiece.scss";

export interface ChessPieceProps {
    readonly className ?: string;
    readonly type       : ChessPieceType;
    readonly frame      : ChessPieceFrame;
    readonly loading    : boolean;
    readonly checkmate  : boolean;
    readonly index  : number;
}

const PIECE_TYPE_CHANGE_ANIMATION_TIME = 500

export function ChessPiece ( props: ChessPieceProps) {
    const className = props?.className;
    const loading = props?.loading ?? false;
    const checkmate = props?.checkmate ?? false;
    const index = props.index;
    const type = props.type;
    const frame = props.frame;
    // const frameSrc = getHexagonFrame(frame);
    const typeSrc = getIconByChessPieceType(type, frame);

    const [originalType, setOriginalType] = useState<string>(type);

    // State to manage animation trigger
    const [animateCapture, setAnimateCapture] = useState(false);

    // Trigger animation when type changes on the same index
    useEffect(() => {
        if ( !!originalType &&
            originalType !== ChessPieceType.NONE &&
            !!type && type !== ChessPieceType.NONE &&
            type !== originalType
        ) {
            setOriginalType(type)
            setAnimateCapture(true);
            const timer = setTimeout(
                () => setAnimateCapture(false),
                PIECE_TYPE_CHANGE_ANIMATION_TIME,
            );
            return () => clearTimeout(timer);
        }
        if ( !!type && type !== ChessPieceType.NONE && originalType !== type ) {
            setOriginalType(type)
        }
    }, [
        type,
        originalType,
        index,
    ]);

    return (
        <div
            className={
                CHESS_PIECE_CLASS_NAME
                + (animateCapture ? ` ${CHESS_PIECE_CLASS_NAME}-captured` : ` ${CHESS_PIECE_CLASS_NAME}-not-captured`)
                + (className ? ` ${ className }` : '')
            }
            onContextMenu={ () => false }
        >
            {/*{ frameSrc ? <img className={CHESS_PIECE_CLASS_NAME+'-frame'} src={frameSrc} alt={frame} /> : <></> }*/}
            { typeSrc ? <img className={
                CHESS_PIECE_CLASS_NAME+'-type'
                + (animateCapture ? ` ${CHESS_PIECE_CLASS_NAME}-captured` : ` ${CHESS_PIECE_CLASS_NAME}-not-captured`)
                + (checkmate ? ` ${CHESS_PIECE_CLASS_NAME}-check-mate` : '')
            } src={typeSrc} alt={type} /> : <></> }
            {loading ? (
                <Loader hiddenTime={50} speed={5} className={CHESS_PIECE_CLASS_NAME+'-loader'} />
            ) : null}
        </div>
    );
}
