import expressRouter from 'express';

const mediaRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";
import {GalleryImageController} from "../controllers/gallery.image.controller";

mediaRouter.post("/", GalleryController.apiCreateGallery);
mediaRouter.get("/", GalleryController.apiGetAllGalleries);
mediaRouter.post("/image", GalleryImageController.apiUploadImage);
mediaRouter.post("/images", GalleryImageController.apiUploadImages);

export { mediaRouter };
