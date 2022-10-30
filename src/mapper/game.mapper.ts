"use strict";

import {Game} from "../models";
import { or } from "../db";
import {Team} from "../models/Team";
import {BaseMapper} from ".";

export class GameMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_GAME: string = 'game';
    private _PARAMS_NAME: string = 'name';
    private _LIST_NAME: string = 'games';
    private _DEFAULT_SORT: string = 'name';


    public async apiGetGames(params = {}) {

        try {
           return await Game.findAll(params).then(data => {

                return this.processArray(data)
            }).catch(error => {

                return error.toString();
            });

        } catch (error) {

            return error.toString();
        }

    }

    public async apiUpdateGame(id, game) {
        try {
            console.log('in mapper');
            console.log(game);
            console.log('dd');
         //   console.log(JSON.parse(game));

            const result = await Game.upsert(
                game
            ).then(data => {
                console.log('good');
                console.log(data);

                console.log('dara');
                return data;

            }).catch(data => {
                console.log('error in catch');
                console.log(data);
                return false;
            });

            return result;

        } catch (error) {
            console.log(`Could not update games ${error}`);
            return false;
        }
    }



    public async apiCreateGame(params) {
        try {
            const result = await Game.create(
                JSON.parse(params)
            ).then(data => {

                return data;

            }).catch(data => {

                return false;
            });

            return result;

        } catch (error) {
            console.log(`Could not fetch users ${error}`);
            return false;
        }
    }

    get PARAMS_ID(): string {
        return this._PARAMS_ID;
    }

    get PARAMS_GAME(): string {
        return this._PARAMS_GAME;
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

    get LIST_NAME(): string {
        return this._LIST_NAME;
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }
}

export const gameMapper = new GameMapper();
