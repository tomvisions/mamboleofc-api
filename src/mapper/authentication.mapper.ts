"use strict";

import {User} from "../models/User";

export class UserMapper {
    static async getUserBasedOnPassword(params) {
        try {

            const userParams = {
                where: JSON.parse(params)
            };

            return await User.findAll(userParams).then(data => {
                return data;
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }
}
