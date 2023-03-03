import expressRouter from 'express';

const eventRouter = expressRouter.Router();
import {EventController} from "../controllers/event.controller";
eventRouter.post("/", EventController.apiCreateEvents);
eventRouter.patch("/", EventController.apiUpdateEvents);

eventRouter.get("/", EventController.apiGetEvents);
eventRouter.post("/import", EventController.apiImportEvents);

//eventRouter.get("/import", EventController.apiImportEvents);

export {eventRouter}
