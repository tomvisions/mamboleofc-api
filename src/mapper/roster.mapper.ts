"use strict";

import {Roster} from "../models/";
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import {BaseMapper} from "./base.mapper";

export class RosterMapper extends BaseMapper{
    private _PARAMS_GAME: string = 'gameId';
    private _PARAMS_USER: string = 'userId';
    private _PARAMS_ROSTER: string = 'id';
    private _LIST_NAME: string = 'roster';

    public async apiGetRoster(params = {}) {
        try {
            const paramsWhere = {
                where: params,
                include: [{
                    association: Roster.User,
                    as: 'users'
                }]
            };

           return await Roster.findAll(paramsWhere).then(data => {
                this.processArray(data);

                return data;

            }).catch(data => {
                return data.toString();
            });

        } catch (error) {

            return error.toString();
        }

    }

    static async apiUpdateGame(id, game) {
        try {
            console.log('in mapper');
            console.log(game);
            console.log('dd');
            //   console.log(JSON.parse(game));

            const result = await Roster.upsert(
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
    public async apiAddUserToRoster(params) {
        try {
            console.log('what to enter');
            console.log(params);
            const result = await Roster.create(
               params
            ).then(data => {

                return data;

            }).catch(data => {
                return data.toString();
            });

            return result;

        } catch (error) {

            return error.toString();
        }
    }

    static async apiCreateGame(params) {
        try {
            const result = await Roster.create(
                JSON.parse(params)
            ).then(data => {

                return data;

            }).catch(data => {

                return false;
            });

            return result;

        } catch (error) {

            return error.toString();
        }
    }

    get PARAMS_GAME(): string {
        return this._PARAMS_GAME;
    }

    get PARAMS_USER(): string {
        return this._PARAMS_USER;
    }


    get PARAMS_ROSTER(): string {
        return this._PARAMS_ROSTER;
    }
}

export const rosterMapper = new RosterMapper();
