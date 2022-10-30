import expressRouter from 'express';

const eventRouter = expressRouter.Router();
import {EventController} from "../controllers/event.controller";
eventRouter.post("/", EventController.apiCreateEvents);
eventRouter.get("/", EventController.apiGetEvents);

export {eventRouter}
