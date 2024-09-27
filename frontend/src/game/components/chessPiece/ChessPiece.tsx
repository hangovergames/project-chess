// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { getIconByChessPieceType } from "../../../assets/chess";
import { getHexagonFrame } from "../../../assets/frames/hexagon/hexagonFrames";
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
}

export function ChessPiece ( props: ChessPieceProps) {
    const className = props?.className;
    const loading = props?.loading ?? false;
    const type = props.type;
    const frame = props.frame;
    const frameSrc = getHexagonFrame(frame);
    const typeSrc = getIconByChessPieceType(type, frame);
    return (
        <div
            className={
                CHESS_PIECE_CLASS_NAME
                + (className ? ` ${ className }` : '')
            }
            onContextMenu={ () => false }
        >
            { frameSrc ? <img className={CHESS_PIECE_CLASS_NAME+'-frame'} src={frameSrc} alt={frame} /> : <></> }
            { typeSrc ? <img className={CHESS_PIECE_CLASS_NAME+'-type'} src={typeSrc} alt={type} /> : <></> }
            {loading ? (
                <Loader hiddenTime={50} speed={5} className={CHESS_PIECE_CLASS_NAME+'-loader'} />
            ) : null}
        </div>
    );
}
