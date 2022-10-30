import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {readFileSync} from "fs";
var crypto = require('crypto');
const fs = require('fs');


export class MediaMapper {
    private _client;

    constructor() {
        const options = {
            version:"latest",
            region: "us-east-1"
        }

        this._client = new S3Client(options);
    }

    async uploadAvatar(body, files) {

        //  const command = new PutObjectCommand(input);
        //      return {result:"hello"}

        const fileStream = fs.createReadStream(files.path);
        let params = {Bucket: 'tomvisions', Key: `original-images/mamboleofc/avatars/${files.originalname}`, ContentType: "image/png", Body: fileStream};

        /*    return {
                result: "success",
                message: 'File is uploaded',
            ///    params: `${params.Bucket}`
                body: params.Body
            }; */
        try {
            /*     try )
             //    const fs = require('fs');
               //  let data = arrayBuffer // you image stored on arrayBuffer variable;
                 let data = Buffer.from(req.body.avatar);
                 fs.writeFile(`/tmp/test.png`, data, err => { // Assets is a folder present in your root directory
                     if (err) {
                         console.log(err);
                     } else {
                         console.log('File created successfully!');
                     }
                 });
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            //    let avatar = uploadedFile.avatar;

*/
            //      var hash = crypto.createHash('md5').update(uploadedFile.name).digest('hex');
            //    const params = {Bucket: 'tomvisions', Key: `original-images/mamboleofc/avatars/test.png`, Body: avatar};
            await this._client.send(new PutObjectCommand(params));
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            // avatar.mv('./uploads/' + avatar.name);

            return {
                result: "success",
                message: 'File is uploaded',
            };
        } catch (error) {
            //   return {results: "error", message: error.toString()}
            return {result:"error", message: error.toString(), params: params}
        }
    }
}
