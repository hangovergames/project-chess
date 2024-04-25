// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    JsonAny,
} from "../../io/hyperify/core/Json";
import { RequestClient } from "../../io/hyperify/core/RequestClient";
import { RequestClientImpl } from "../../io/hyperify/core/RequestClientImpl";
import {
    API_PATH,
    LEADERBOARD_API_PATH,
} from "../constants/frontend";
import {
    explainGameLeaderboardDTO,
    GameLeaderboardDTO,
    isGameLeaderboardDTO,
} from "../types/GameLeaderboardDTO";
import {
    createGameRequestDTO,
    GameRequestDTO,
} from "../types/GameRequestDTO";
import {
    explainGameStateDTO,
    GameStateDTO,
    isGameStateDTO,
} from "../types/GameStateDTO";
import { LeaderBoardType } from "../types/LeaderBoardType";
import { GameClient } from "./GameClient";

const DEFAULT_GAME_URL = 'https://memory.hangover.games';

/**
 * @inheritDoc
 */
export class GameClientImpl implements GameClient {

    // Private parts

    private readonly _url: string;
    private readonly _client: RequestClient;

    private constructor (
        url : string,
        client: RequestClient,
    ) {
        this._url = url;
        this._client = client;
    }

    public static getDefaultURL () {
        if ( window?.location?.hostname ) {
            return `${ window?.location?.protocol ?? 'http' }//${ window?.location?.hostname }${ window?.location?.port ? `:${ window?.location?.port }` : '' }`;
        }
        return DEFAULT_GAME_URL
    }

    /**
     * Create an instance of our Memory Game API client.
     *
     * @param url
     * @param client
     */
    public static create (
        url ?: string,
        client ?: RequestClient,
    ) {
        return new GameClientImpl(
            url ?? this.getDefaultURL(),
            client ?? RequestClientImpl,
        );
    }

    /**
     * @inheritDoc
     */
    public async postRequest (body: GameRequestDTO): Promise<GameStateDTO> {
        const response = await this._client.postJson(
            `${this._url}${API_PATH}`,
            body as unknown as JsonAny,
        );
        if (!isGameStateDTO(response)) {
            throw new TypeError(`Response was not GameStateDTO: ${explainGameStateDTO(response)}`)
        }
        return response;
    }

    public async advanceGame (nextIndex : number, prevState : GameStateDTO, name ?: string ) : Promise<GameStateDTO> {
        return this.postRequest(
            createGameRequestDTO(
                nextIndex,
                prevState,
                name,
            )
        );
    }

    public async newGame (cards: number, nextIndex : number, name ?: string) : Promise<GameStateDTO> {
        return this.postRequest(
            createGameRequestDTO(
                nextIndex,
                undefined,
                name,
                cards,
            )
        );
    }

    public async getLeaderboard (cards : number, limit ?: number, name?: string, type?: LeaderBoardType): Promise<GameLeaderboardDTO> {
        const response = await this._client.getJson(
            `${this._url}${
                LEADERBOARD_API_PATH
                }?limit=${limit ?? 10}&cards=${cards}${
                name?`&name=${decodeURIComponent(name)}`:''
            }${
                type?`&type=${decodeURIComponent(type)}`:''
            }`,
        );
        if (!isGameLeaderboardDTO(response)) {
            throw new TypeError(`Response was not GameLeaderboardDTO: ${explainGameLeaderboardDTO(response)}`)
        }
        return response;
    }

}
