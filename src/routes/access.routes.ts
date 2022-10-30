import expressRouter from 'express';

const accessRouter = expressRouter.Router();
import {AccessController} from "../controllers/access.controller";

accessRouter.post("/", AccessController.apiCreateAccess);
accessRouter.patch("/", AccessController.apiUpdateAccess);
accessRouter.get("/", AccessController.apiGetAccess);

export  {accessRouter}
