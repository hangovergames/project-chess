// Copyright (c) 2024. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../io/hyperify/core/LogService";
import {
    Observer,
    ObserverCallback,
    ObserverDestructor,
} from "../../io/hyperify/core/Observer";
import { ChessEventListDTO } from "../types/ChessEventListDTO";
import { ChessStateDTO } from "../types/ChessStateDTO";
import { ChessGameClient } from "./ChessGameClient";

const LOG = LogService.createLogger( 'ChessGameEventManager' );

const CHESS_EVENT_ERROR_TIMEOUT = 5000;
const CHESS_EVENT_MINIMUM_LOOP_TIME = 500;

export enum ChessGameEventManagerEvent {
    STATE_UPDATED = "stateUpdated"
}

export type ChessGameEventManagerDestructor = ObserverDestructor;

/**
 * Handles long polling events from the backend.
 */
export class ChessGameEventManager {

    public static Event = ChessGameEventManagerEvent;

    private readonly _observer : Observer<ChessGameEventManagerEvent>;
    private readonly _client : ChessGameClient;
    private _errorTimeout : any;
    private _state : ChessStateDTO;
    private _started : boolean;

    private constructor (client: ChessGameClient, state: ChessStateDTO) {
        this._started = false;
        this._state = state;
        this._client = client;
        this._observer = new Observer<ChessGameEventManagerEvent>( "ChessGameEventManager" );
    }

    public static create (client: ChessGameClient, state: ChessStateDTO) : ChessGameEventManager {
        return new ChessGameEventManager(client, state)
    }

    public destroy () : void {

        if (this._errorTimeout !== undefined) {
            clearTimeout(this._errorTimeout)
            this._errorTimeout = undefined;
        }

        this._observer.destroy();

    }

    public on (
        name : ChessGameEventManagerEvent,
        callback : ObserverCallback<ChessGameEventManagerEvent>,
    ) : ChessGameEventManagerDestructor {
        return this._observer.listenEvent( name, callback );
    }

    public start () {
        this._start().catch(err => {
            LOG.error(`Warning! Error starting the service: `, err)

            if (this._errorTimeout !== undefined) {
                clearTimeout(this._errorTimeout);
                this._errorTimeout = undefined;
            }
            this._errorTimeout = setTimeout(
                () => {
                    this.start()
                },
                CHESS_EVENT_ERROR_TIMEOUT,
            );

        })
    }

    public stop () {
        this._stop().catch(err => {
            LOG.error(`Warning! Error stopping the service: `, err)
        });
    }

    public async _start () {
        LOG.debug("Starting service")
        this._started = true;
        do {
            try {
                let duration : number = -1;
                let list : ChessEventListDTO | undefined = undefined;
                while (true) {
                    try {

                        LOG.debug("Fetching events from the server")
                        const startTime = Date.now()
                        list = await this._client.fetchEvents(this._state)
                        const endTime = Date.now()
                        duration = endTime - startTime;
                        LOG.debug(`Duration was ${duration} ms`)
                        this._state = {
                            ...this._state,
                            private: list.private,
                        };
                        break;

                    } catch (err) {
                        LOG.error(`Request failed: `, err)
                        await this._wait( CHESS_EVENT_ERROR_TIMEOUT );
                    }
                }

                await this._onEventList(list);

                if (duration < 0) {
                    duration = 0
                }
                LOG.debug(`duration = `, duration);
                if (duration < CHESS_EVENT_MINIMUM_LOOP_TIME) {
                    LOG.debug(`Waiting minimum loop time ${ CHESS_EVENT_MINIMUM_LOOP_TIME - duration } ms`)
                    await this._wait( CHESS_EVENT_MINIMUM_LOOP_TIME - duration );
                }

            } catch(err) {
                LOG.error(`Error in event loop: `, err)
                await this._wait( CHESS_EVENT_ERROR_TIMEOUT );
            }
        } while(this._started)
    }

    public async _onEventList (list: ChessEventListDTO) {
        for (let i = 0; i<list.payload.length; i++) {
            const ev = list.payload[i];
            if (this._observer.hasCallbacks(ChessGameEventManagerEvent.STATE_UPDATED)) {
                LOG.debug(`ev = `, ev)
                this._observer.triggerEvent(ChessGameEventManagerEvent.STATE_UPDATED, ev.data)
            } else {
                LOG.warn(`Warning! No listeners for STATE_UPDATED detected.`)
                LOG.debug(`ev = `, ev);
            }
        }
    }

    public async _stop () {
        LOG.debug("Stopping service")
        this._started = false;
        if (this._errorTimeout !== undefined) {
            clearTimeout(this._errorTimeout)
            this._errorTimeout = undefined;
        }
    }

    private async _wait (time: number) : Promise<void> {
        await new Promise((resolve, reject) => {
            try {
                setTimeout(resolve, time)
            } catch (err) {
                reject(err)
            }
        });
    }

}
