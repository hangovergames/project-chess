// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JsonAny } from "../../io/hyperify/core/Json";
import { RequestClient } from "../../io/hyperify/core/RequestClient";
import { RequestClientImpl } from "../../io/hyperify/core/RequestClientImpl";
import { DEFAULT_GAME_URL } from "../constants/backend";
import {
    API_EVENTS_PATH,
    API_PATH,
    LEADERBOARD_API_PATH,
} from "../constants/frontend";
import { ChessComputerLevel } from "../types/ChessComputerLevel";
import {
    ChessEventListDTO,
    explainChessEventListDTO,
    isChessEventListDTO,
} from "../types/ChessEventListDTO";
import {
    ChessLeaderboardDTO,
    explainChessLeaderboardDTO,
    isChessLeaderboardDTO,
} from "../types/ChessLeaderboardDTO";
import { ChessLeaderBoardType } from "../types/ChessLeaderBoardType";
import { ChessPlayMode } from "../types/ChessPlayMode";
import {
    ChessRequestDTO,
    createChessRequestDTO,
} from "../types/ChessRequestDTO";
import {
    ChessStateDTO,
    explainChessStateDTO,
    isChessStateDTO,
} from "../types/ChessStateDTO";
import { ChessUnit } from "../types/ChessUnit";
import { ChessGameClient } from "./ChessGameClient";

/**
 * @inheritDoc
 */
export class ChessGameClientImpl implements ChessGameClient {

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
     * Create an instance of our Chess Game API client.
     *
     * @param url
     * @param client
     */
    public static create (
        url ?: string,
        client ?: RequestClient,
    ) {
        return new ChessGameClientImpl(
            url ?? this.getDefaultURL(),
            client ?? RequestClientImpl,
        );
    }

    /**
     * @inheritDoc
     */
    public async postRequest (body: ChessRequestDTO): Promise<ChessStateDTO> {
        const response = await this._client.postJson(
            `${this._url}${API_PATH}`,
            body as unknown as JsonAny,
        );
        if (!isChessStateDTO(response)) {
            throw new TypeError(`Response was not GameStateDTO: ${explainChessStateDTO(response)}`)
        }
        return response;
    }

    public async postEventsRequest (body: ChessRequestDTO): Promise<ChessEventListDTO> {
        const response = await this._client.postJson(
            `${this._url}${API_EVENTS_PATH}`,
            body as unknown as JsonAny,
        );
        if (!isChessEventListDTO(response)) {
            throw new TypeError(`Response was not ChessEventListDTO: ${explainChessEventListDTO(response)}`)
        }
        return response;
    }

    public async fetchEvents (
        prevState : ChessStateDTO,
    ) : Promise<ChessEventListDTO> {
        if (!prevState.id) {
            throw new TypeError("State invalid")
        }
        return this.postEventsRequest(
            createChessRequestDTO(
                undefined,
                undefined,
                undefined,
                undefined,
                prevState,
                undefined,
                undefined,
            )
        );
    }

    public async advanceGame (
        subject : number,
        target : number,
        prevState : ChessStateDTO,
        name ?: string,
        promotion ?: ChessUnit,
    ) : Promise<ChessStateDTO> {
        return this.postRequest(
            createChessRequestDTO(
                ChessPlayMode.LocalMultiplayer,
                ChessComputerLevel.None,
                subject,
                target,
                prevState,
                name,
                promotion,
            )
        );
    }

    public async newGame (
        mode: ChessPlayMode,
        computer : ChessComputerLevel,
        name ?: string,
    ) : Promise<ChessStateDTO> {
        return this.postRequest(
            createChessRequestDTO(
                mode,
                computer,
                undefined,
                undefined,
                undefined,
                name,
                undefined,
            )
        );
    }

    public async getLeaderboard (
        limit ?: number,
        name?: string,
        type?: ChessLeaderBoardType,
    ): Promise<ChessLeaderboardDTO> {
        const response = await this._client.getJson(
            `${this._url}${
                LEADERBOARD_API_PATH
                }?limit=${limit ?? 10}${
                name?`&name=${decodeURIComponent(name)}`:''
            }${
                type?`&type=${decodeURIComponent(type)}`:''
            }`,
        );
        if (!isChessLeaderboardDTO(response)) {
            throw new TypeError(`Response was not GameLeaderboardDTO: ${explainChessLeaderboardDTO(response)}`)
        }
        return response;
    }

}
