import {galleryMapper, Options} from "../mapper/";

export class GalleryController {

    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async apiGetAllGalleries(req: any, res: any, next: any) {
        try {
    //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
      //      }
            const options:Options = {image: {primary:false}, gallery: {}};

            if (req.query.primary === '1') {
                options.image.primary = true;
            } else if (req.query.gallery_id) {
                options.gallery.id = req.query.gallery_id;
            }

            const galleries = await galleryMapper.getAllGalleries(options);

//            if (typeof galleries === 'string') {
  //              return res.status(500).json({errors_string: galleries})
    //        }

      //      const paginationResults = galleryMapper.prepareListResults(galleries, req.query);

        //    return res.status(200).json(paginationResults);
            return res.status(200).json(galleries);

        } catch (error) {
            res.status(500).json({error_main: error.toString()})
        }

    }

    /**
     * Function in controller to start the creation of a gallery
     * @param req
     * @param res
     * @param next
     */
    public static async apiCreateGallery(req: any, res: any, next: any) {
        try {
            if (req.body[galleryMapper.PARAMS_ID] && req.body[galleryMapper.PARAMS_NAME]) {
                const gallery = await galleryMapper.createGallery(req.body);

                return res.status(200).json(gallery);
            }
        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }

    }
}
