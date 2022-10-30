import {galleryMapper} from "../mapper/";

export class GalleryController {

    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async apiGetAllGalleries(req: any, res: any, next: any) {
        try {
            if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
                return res.status(500).json({error: 'Not Authorized to access the API'})
            }

            const galleries = await galleryMapper.getAllGalleries();

            if (typeof galleries === 'string') {
                return res.status(500).json({error: galleries})
            }

            const paginationResults = galleryMapper.prepareListResults(galleries, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({error: error})
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
