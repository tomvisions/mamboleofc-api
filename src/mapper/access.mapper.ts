"use strict";

import {Access} from "../models";
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import {BaseMapper} from "./base.mapper";

export class AccessMapper extends BaseMapper{
    private _PARAMS_NAME: string = 'name';
    private _PARAMS_LEVEL: string = 'level';
    private _LIST_NAME: string = 'access';
    private _DEFAULT_SORT: string = 'name';

    public async apiGetAllAccess(params = {}) {

        try {
            return await Access.findAll({}).then(accesses => {
                return this.processArray(accesses);

            });
        } catch (error) {

            return error.toString();
        }
    }


    static async apiUpdateAccess(params) {
        /*
        try {
            const userUpdate = params['user'];
            const id = params['id'];

            const teams = userUpdate['teams'];
            await Access.destroy({ where: { UserId: id } });



            for (let team in teams) {
                const teamUserUpdateResult = await Access.upsert({"TeamId":teams[team], "UserId":id}).then(data => {
                    return true;
                }).catch(data => {
                    return false;
                });

                if (!teamUserUpdateResult) {
                    return false;
                }
            }

            const userUpdateResult = await UserModel.update(userUpdate,  { where: { id: id } }).then(data => {
                return true;
            }).catch(data => {
                return false;
            });

            return userUpdateResult;
        } catch (error) {
        //    console.log('catch');
          //  console.log(error);
        } */
    }
    public async apiCreateAccess(params) {
        try {
            params.slug = params.name.toLowerCase().replace('/ /g','-');

            const result = await Access.findOrCreate({
                where: {
                    name: params.name
                },
                defaults: params,
            }).then(data => {
                return data[0]._options.isNewRecord;

            }).catch(data => {

                return false;
            });

            return result;

        } catch (error) {
            console.log(`Could not fetch users ${error}`);
            return false;
        }
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

    get PARAMS_LEVEL(): string {
        return this._PARAMS_LEVEL;
    }

    get LIST_NAME(): string {
        return this._LIST_NAME;
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }
}

export const accessMapper = new AccessMapper();
