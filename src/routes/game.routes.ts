import expressRouter from 'express';

const gameRouter = expressRouter.Router();
import {GameController} from "../controllers/game.controller";

gameRouter.post("/", GameController.apiPostCreateGame);
gameRouter.patch("/", GameController.apiPostUpdateGame);
gameRouter.get("/", GameController.apiGetGames);

export { gameRouter };
