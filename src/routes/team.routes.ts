import expressRouter from 'express';

const teamRouter = expressRouter.Router();
import {TeamController} from "../controllers/team.controller";

teamRouter.post("/", TeamController.apiPostCreateTeam);
teamRouter.get("/", TeamController.apiGetTeams);

export { teamRouter };
