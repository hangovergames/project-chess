// Copyright (c) 2022-2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { ChessComputerLevel } from "../types/ChessComputerLevel";
import { ChessEventListDTO } from "../types/ChessEventListDTO";
import { ChessLeaderboardDTO } from "../types/ChessLeaderboardDTO";
import { ChessPlayMode } from "../types/ChessPlayMode";
import { ChessRequestDTO } from "../types/ChessRequestDTO";
import { ChessStateDTO } from "../types/ChessStateDTO";
import { ChessLeaderBoardType } from "../types/ChessLeaderBoardType";
import { ChessUnit } from "../types/ChessUnit";

export interface ChessGameClient {

    /**
     * Execute game request on the server.
     *
     * @param body
     */
    postRequest (body: ChessRequestDTO): Promise<ChessStateDTO>;

    /**
     * Fetch events
     */
    fetchEvents ( prevState: ChessStateDTO ): Promise<ChessEventListDTO>;

    /**
     * Start a new game
     */
    newGame (
        mode: ChessPlayMode,
        computer : ChessComputerLevel,
        name ?: string,
    ): Promise<ChessStateDTO>;

    /**
     * Start a new game
     */
    advanceGame (
        subject : number,
        target : number,
        prevState: ChessStateDTO,
        name ?: string,
        promotion ?: ChessUnit,
    ): Promise<ChessStateDTO>;

    /**
     * Fetch the leaderboard
     */
    getLeaderboard (limit ?: number, name?: string, type?: ChessLeaderBoardType): Promise<ChessLeaderboardDTO>;

}
