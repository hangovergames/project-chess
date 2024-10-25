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
    readonly className   ?: string;
    readonly index        : number;
    readonly selected     : boolean;
    readonly loading      : boolean;
    readonly selectedDto  : ChessUnitDTO|null|undefined;
    readonly dto          : ChessUnitDTO|null;
    readonly click        : () => void;
}

export function ChessGridCell ( props: ChessGridCellProps) {
    const className = props?.className;
    const selectedDirectly = props?.selected ?? false;
    const loading = props?.loading ?? false;
    const selectedDto = props?.selectedDto;
    const clickCallback = props?.click;
    const dto = props?.dto ?? null;
    const myIndex : number = props?.index ?? -1;
    const moved : boolean = dto?.moved ?? false;
    const rowA = Math.floor(myIndex / 8)
    const colA = Math.floor(myIndex % 8)
    const colorA = Math.floor((rowA + colA) % 2)

    const selectedMoves : readonly number[] = selectedDto?.validMoves ?? [];
    const amISelected : boolean = myIndex >= 0 && selectedMoves.includes(myIndex);

    const moves : readonly number[] = dto?.validMoves ?? [];
    const moveCount : number = moves?.length ?? 0;

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
            + (amISelected || selectedDirectly || (!selectedDto && moveCount !== 0) ? ` ${CHESS_GRID_CELL_CLASS_NAME}-can-move` : '')
            + (selectedDirectly ? ` ${CHESS_GRID_CELL_CLASS_NAME}-selected` : '')
            + (colorA === 0 ? ` ${CHESS_GRID_CELL_CLASS_NAME}-color-a` : ` ${CHESS_GRID_CELL_CLASS_NAME}-color-b`)
            + (moved ? ` ${CHESS_GRID_CELL_CLASS_NAME}-moved` : '')
        }
             onClick={mouseClick}
             onContextMenu={mouseClick}
             onMouseDown={mouseClick}
        ><div className={ CHESS_GRID_CELL_CLASS_NAME+'-content' }
                 onClick={mouseClick}
                 onContextMenu={mouseClick}
                 onMouseDown={mouseClick}
        ><ChessPiece
            key={"piece-"+myIndex}
            className={CHESS_GRID_CELL_CLASS_NAME+'-content-text'}
            type={ getChessPieceTypeByUnitTypeDTO(dto) }
            frame={ getChessPieceFrameByChessUnitDTO(dto, selectedDirectly) }
            loading={ loading }
            checkmate={ false }
            moved={ moved }
            index={ myIndex }
        /></div></div>
    );
}
