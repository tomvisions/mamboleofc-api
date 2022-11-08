import multer from 'multer';
import {ImageMapper} from '../mapper/';

export class GalleryImageController {

    static async apiUploadImage(req: any, res: any, next: any) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "/tmp");
            },
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`); //Appending extension
            },
        });
        const upload = multer({
            storage: storage,
            preservePath: true,
            limits: { fieldSize: 25 * 1024 * 1024 }
        }).single('file');

        upload(req, res, async (error) => {
            if (error) {
                return res.json({
                    result: "error",
                    message: error.toString()
                })
            }

            const imageMapper = new ImageMapper();
            await imageMapper.uploadImage(req.body);
            return res.json({info1:req.body});
        });
    }

    static async apiUploadImages(req: any, res: any, next: any) {
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "/tmp");
            },
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`); //Appending extension
            },

        });
        const multipleUpload = multer({storage: storage, limits: { fieldSize: 1024 * 1024 * 1024 }}).array(req.files);

        multipleUpload(req, res, async (err) => {
            if (err) {
                console.log('the error hre');
                console.log(err);
                return res.json({error: err})
            }

            const imageMapper = new ImageMapper();
            const retVal = await imageMapper.uploadImages(req.body);



//            console.log(JSON.parse(req.body.files));

            //      return res.json(req.files)

             let img = []

               // req.files.forEach(file => {
            //  img.push(file.filename)
            ////  });

//           return res.json({
            //           path:img
            ///          })
        })
        console.log('end');
    } catch (error) {
        console.log('error');
        console.log(error);
        return res.json({"error": error.toString()});
    }
  //         const imageMapper = new ImageMapper();
//            const retVal = await imageMapper.uploadImages(req.body, req.files);
      //      return res.json(req.files);

 //       })

        //   const avatarMapper = new AvatarMapper();
        //  const retVal = await avatarMapper.uploadAvatar(req.body, req.files);
        //    return res.json(retVal); */
    }

//            return res.json({retval})
    /*            if (retval['result'] === 'error') {
                    return res.json({
                        result:"error",
                        message:retval['message'],
                        params: retval['params']
                    });
                }

                return res.json({
                    result:"suc33cessssss",
                    params: retval['params']
                }); */


//            return res.json({
    //              result: "success",
    //             path: req.file
    //       })
    //    })

//        return res.json({result:"cool"});
    /*

    //  return res.status(200).json({"result":"success", "message":req.body});
  //  return res.status(200).send({ path:'hello'});
///     try {
    //    const file = req.body;
   //     return res.status(200).send({ path: req.file});
        //const base64data = file.content.replace(/^data:.*,/, '');
     //   if (req) {
            //        var hash = crypto.createHash('md5').update(req.name).digest('hex');
            /*      return res.status(200).json({
                      result: "error",
                      message: 'No file uploaded',
                      body: req.body
                    //  name: req.name,
                    //  file: req.file
                    //  params: { Bucket: 'tomvisions', Key: `original-images/mamboleofc/avatars/${hash}.${req.type}`,  Body: req.body.data},
                  //    body: req.body
                  });
              }

           // const avatarMapper = new AvatarMapper();
         //   const bo = await avatarMapper.uploadAvatar(req.body.avatar);
        res.status(200).send({ path:'hello'});
        //    res.status(200).send({ path:req.file.filename});
*/
    //  } catch (error) {
    //    res.status(500).send({result:"failure", message:error});
    // }


}
