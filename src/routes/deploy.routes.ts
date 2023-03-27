import expressRouter from 'express';

const deployRouter = expressRouter.Router();
import {DeployController} from "../controllers/deploy.controller";
deployRouter.post("/", DeployController.apiDeploy);

export {deployRouter}
