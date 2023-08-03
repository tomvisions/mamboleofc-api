import expressRouter from 'express';

const pageRouter = expressRouter.Router();
import {PageController} from "../controllers/page.controller";
pageRouter.post("/", PageController.apiCreatePage);
pageRouter.patch("/", PageController.apiUpdatePage);
pageRouter.get("/slug/:slug", PageController.apiGetPage);
pageRouter.get("/", PageController.apiGetPage);


//pageRouter.get("/import", PageController.apiImportEvents);

export {pageRouter}
