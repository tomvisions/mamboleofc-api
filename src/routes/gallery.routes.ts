import expressRouter from 'express';

const galleryRouter = expressRouter.Router();
import {GalleryController} from "../controllers/gallery.controller.js";

galleryRouter.get("/api/v1/gallery", GalleryController.apiGetAllGalleries);
galleryRouter.post("/api/v1/gallery/gallery", GalleryController.apiCreateGallery);

export {galleryRouter}
