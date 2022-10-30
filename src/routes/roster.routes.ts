import expressRouter from 'express';

const rosterRouter = expressRouter.Router();
import {RosterController} from "../controllers/roster.controller";

rosterRouter.post("/", RosterController.apiAddUserToRoster);
rosterRouter.get("/", RosterController.apiGetRosterByGameId);

export { rosterRouter };
