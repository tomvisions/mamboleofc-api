/*import {userMapper, AvatarMapper} from "../mapper/";
import multer from 'multer';

export class UserAvatarController {

    static async apiUploadAvatar(req: any, res: any, next: any) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "/tmp/");
            },
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`); //Appending extension
            },
        });
        const upload = multer({
                storage: storage,
                preservePath: true
            }).single('file');

        upload(req, res, async (error) => {
            if (error) {
                return res.json({
                    result: "error",
                    message: error.toString()
                })
            }
            const params = JSON.parse(`{"id":${req.body.id}, "user": ${req.body.user}}`);
         //   await userMapper.apiUpdateUser(params);
            const avatarMapper = new AvatarMapper();
            await avatarMapper.uploadAvatar(req.body);

            return res.json({success:'good stuff'});
        });
    }
}
*/
