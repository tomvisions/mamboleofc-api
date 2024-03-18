import expressRouter from 'express';

const galleryRouter = expressRouter.Router();
import {GalleryController} from "../controllers/gallery.controller.js";

galleryRouter.get("/api/v1/gallery", GalleryController.apiGetAllGalleries);
galleryRouter.post("/api/v1/gallery/gallery", GalleryController.apiCreateGallery);
galleryRouter.get("/slug/:slug", GalleryController.apiGetAllGalleries);
galleryRouter.get("/primary", GalleryController.apiGetAllGalleries);

export {galleryRouter}
