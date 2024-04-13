// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { getHexagonFrame } from "../../../assets/frames/hexagon/hexagonFrames";
import { getIconByPlayingCardType } from "../../../assets/icons/icons";
import { PLAYING_CARD_CLASS_NAME } from "../../constants/classNames";
import { PlayingCardFrame } from "../../types/PlayingCardFrame";
import { PlayingCardType } from "../../types/PlayingCardType";
import "./PlayingCard.scss";

export interface PlayingCardProps {
    readonly className ?: string;
    readonly type  : PlayingCardType;
    readonly frame : PlayingCardFrame;
}

export function PlayingCard (props: PlayingCardProps) {
    const className = props?.className;
    const type = props.type;
    const frame = props.frame;

    const frameSrc = getHexagonFrame(frame);
    const typeSrc = getIconByPlayingCardType(type);

    return (
        <div
            className={
                PLAYING_CARD_CLASS_NAME
                + (className ? ` ${ className }` : '')
            }
            onContextMenu={ () => false }
        >
            { frameSrc ? <img className={PLAYING_CARD_CLASS_NAME+'-frame'} src={frameSrc} alt={frame} /> : <></> }
            { typeSrc ? <img className={PLAYING_CARD_CLASS_NAME+'-type'} src={typeSrc} alt={type} /> : <></> }
        </div>
    );
}
