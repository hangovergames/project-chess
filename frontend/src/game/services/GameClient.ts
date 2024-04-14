// Copyright (c) 2022-2024. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { GameLeaderboardDTO } from "../types/GameLeaderboardDTO";
import { GameRequestDTO } from "../types/GameRequestDTO";
import { GameStateDTO } from "../types/GameStateDTO";

export interface GameClient {

    /**
     * Execute game request on the server.
     *
     * @param body
     */
    postRequest (body: GameRequestDTO): Promise<GameStateDTO>;

    /**
     * Start a new game
     */
    newGame (cards: number, nextIndex : number, name ?: string): Promise<GameStateDTO>;

    /**
     * Start a new game
     */
    advanceGame (nextIndex: number, prevState: GameStateDTO, name ?: string): Promise<GameStateDTO>;

    /**
     * Fetch the leaderboard
     */
    getLeaderboard (limit ?: number, name?: string): Promise<GameLeaderboardDTO>;

}
