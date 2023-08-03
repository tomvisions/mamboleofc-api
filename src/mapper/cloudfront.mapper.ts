import {CloudFrontClient, ListDistributionsCommand, CreateInvalidationCommand} from "@aws-sdk/client-cloudfront";
import {S3Client, PutObjectCommand, ListObjectsCommand} from "@aws-sdk/client-s3";
import fs, {existsSync} from "fs";
import {User} from "../models";
const sizeOf = require('image-size');
import * as uuid from 'uuid';
const { exec } = require("child_process");
import dotenv from "dotenv";
dotenv.config();

export interface FileProperties {
    content_type?: string;
    extension?: string;
    error?: string;
    image_type?: string;
}

export interface EditProperties {
    "resize": {
        width?: number,
        height?: number,
        fit?: string
    }
}

export class CloudFrontMapper {
    private _client;

    constructor() {
        const options = {
            version: "2020-05-31",
            region: "us-east-1"
        }

        this._client = new CloudFrontClient(options);
    }

    /**
     * The path to use invalidate on
     * @param path
     */
    async createInvalidation(path) {
        try {
            let params = { // CreateInvalidationRequest
                DistributionId: process.env.CLOUDFRONT_ID, // required
                InvalidationBatch: { // InvalidationBatch
                    Paths: { // Paths
                        Quantity: Number("20"), // required
                        Items: [ // PathList
                            path,
                        ],
                    },
                    CallerReference: "STRING_VALUE", // required
                },
            };
            console.log('invalidate');
            console.log({ // CreateInvalidationRequest
                DistributionId: process.env.CLOUDFRONT_ID, // required
                InvalidationBatch: { // InvalidationBatch
                    Paths: { // Paths
                        Quantity: Number("20"), // required
                        Items: [ // PathList
                            path,
                        ],
                    },
                    CallerReference: "STRING_VALUE", // required
                },
            });
            console.log(await this._client.send(new CreateInvalidationCommand(params)));

            return await this._client.send(new CreateInvalidationCommand(params));
        } catch (error) {
            console.log('the error that showed up');
            console.log(error);

            return error.toString();
        }
    }


}

export const cloudFrontMapper = new CloudFrontMapper();
