// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    MouseEvent,
    useCallback,
    useRef,
} from "react";
import {
    CHESS_GRID_CELL_CLASS_NAME,
} from "../../constants/classNames";
import { CHESS_BOARD_CLICK_DEBOUNCE_TIME } from "../../constants/frontend";
import { getChessPieceFrameByChessUnitDTO } from "../../types/ChessPieceFrame";
import { ChessUnitDTO } from "../../types/ChessUnitDTO";
import {
    getChessPieceTypeByUnitTypeDTO,
} from "../../types/ChessPieceType";
import { ChessPiece } from "../chessPiece/ChessPiece";
import "./ChessGridCell.scss";

export interface ChessGridCellProps {
    readonly className ?: string;
    readonly index      : number;
    readonly selected   : boolean;
    readonly dto        : ChessUnitDTO|null;
    readonly click      : () => void;
}

export function ChessGridCell ( props: ChessGridCellProps) {
    const className = props?.className;
    const selected = props?.selected ?? false;
    const clickCallback = props?.click;
    const dto = props?.dto ?? null;

    const isHandlingClick = useRef(false);

    const handleClick = useCallback(() => {

        if (isHandlingClick.current) {
            // Click is already being handled; ignore this event
            return;
        }

        // Set the flag to indicate a click is being handled
        isHandlingClick.current = true;

        // Invoke the click callback
        clickCallback();

        // Reset the flag after the debounce time
        setTimeout(() => {
            isHandlingClick.current = false;
        }, CHESS_BOARD_CLICK_DEBOUNCE_TIME);

    }, [
        clickCallback,
    ]);

    let mouseClick = (event: MouseEvent<HTMLDivElement, any>) : boolean => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }
        handleClick();
        return false;
    }

    return (
        <div className={
            CHESS_GRID_CELL_CLASS_NAME
            + (className? ` ${className}` : '')
            + (selected ? ` ${CHESS_GRID_CELL_CLASS_NAME}-selected` : '')
        }
             onClick={mouseClick}
             onContextMenu={mouseClick}
             onMouseDown={mouseClick}
        >
            <div className={ CHESS_GRID_CELL_CLASS_NAME+'-content' }
                 onClick={mouseClick}
                 onContextMenu={mouseClick}
                 onMouseDown={mouseClick}
            >
                <ChessPiece
                    className={CHESS_GRID_CELL_CLASS_NAME+'-content-text'}
                    type={ getChessPieceTypeByUnitTypeDTO(dto) }
                    frame={ getChessPieceFrameByChessUnitDTO(dto, selected) }
                />
            </div>
        </div>
    );
}
