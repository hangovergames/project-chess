// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { IS_DEVELOPMENT } from "../../io/hyperify/core/constants/environment";
import {
    JsonAny,
} from "../../io/hyperify/core/Json";
import { RequestClient } from "../../io/hyperify/core/RequestClient";
import { RequestClientImpl } from "../../io/hyperify/core/RequestClientImpl";
import {
    createGameRequestDTO,
    GameRequestDTO,
} from "../types/GameRequestDTO";
import {
    explainGameStateDTO,
    GameStateDTO,
    isGameStateDTO,
} from "../types/GameStateDTO";
import { GameClient } from "./GameClient";

const DEFAULT_GAME_URL = IS_DEVELOPMENT ? 'http://localhost:3000/api/' : 'https://memory.hangover.games';

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
            url ?? DEFAULT_GAME_URL,
            client ?? RequestClientImpl,
        );
    }

    /**
     * @inheritDoc
     */
    public async postRequest (body: GameRequestDTO): Promise<GameStateDTO> {
        const response = await this._client.postJson(
            this._url,
            body as unknown as JsonAny,
        );
        if (!isGameStateDTO(response)) {
            throw new TypeError(`Response was not GameStateDTO: ${explainGameStateDTO(response)}`)
        }
        return response;
    }

    public async advanceGame ( nextIndex : number, prevState : GameStateDTO, name ?: string ) : Promise<GameStateDTO> {
        return this.postRequest(
            createGameRequestDTO(
                nextIndex,
                prevState,
                name,
            )
        );
    }

    public async newGame (nextIndex : number, name ?: string) : Promise<GameStateDTO> {
        return this.postRequest(
            createGameRequestDTO(
                nextIndex,
                undefined,
                name,
            )
        );
    }

}
