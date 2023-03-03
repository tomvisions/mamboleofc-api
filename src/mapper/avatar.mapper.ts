import {readFileSync} from "fs";
import {FileProperties, S3Mapper} from "./s3.mapper";
import {PutObjectCommand} from '.';
import {User} from "../models/";

import * as uuid from 'uuid';

export class AvatarMapper extends S3Mapper {

    async uploadAvatar(body: string) {
        let fileProperties: FileProperties;
        try {
            const id = uuid.v4();
            await this.generatePrePath('/tmp/mamboleofc/avatars');
            fileProperties = await this.getImageReadyForUpload(`mamboleofc/avatars/${id}`, body['file']);

            let avatar_params = {
                avatar: `mamboleofc/avatars/${id}.${fileProperties.extension}`,
            }

            const userUpdateResult = await User.update(avatar_params, {where: {id: body['id']}}).then(data => {
                console.log('success in avatar update');
                console.log(data);
                return data;
            }).catch(error => {
                console.log('here is the error');
                console.log(error);
                return error;
            });

            console.log('the updated user');
            console.log(userUpdateResult);
            return {
                result: "success",
                message: 'File is uploaded',
                response: userUpdateResult
            };
        } catch (error) {
            //   return {results: "error", message: error.toString()}
            return {result: "error", message: error.toString()}
        }
    }
}
