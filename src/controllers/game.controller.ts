import {gameMapper} from "../mapper/game.mapper";

export class GameController {

    static async apiPostUpdateGame(req:any, res:any, wwwnext:any) {
        try {
            if (req.body[gameMapper.PARAMS_ID] && req.body[gameMapper.PARAMS_GAME]) {
                const id = req.body[gameMapper.PARAMS_ID];
                const game = req.body[gameMapper.PARAMS_GAME];
                const gameObject = await gameMapper.apiUpdateGame(id, game);
                console.log('the game');
                console.log(gameObject)
                if (!gameObject) {
                    return res.status(500).json({error: "Game already exists"})
                }

                return res.status(200).json({result: "success", message: "Team has been created"});
            }
        } catch (error) {

            return res.status(500).json({error: "hello"})
        }
    }

    static async apiPostCreateGame(req:any, res:any, next:any) {
        try {
            console.log('create');
            console.log(req.body);
            let params = {};
            if (req.body[gameMapper.PARAMS_NAME]) {
                params = `{"${gameMapper.PARAMS_NAME}":"New Game Name"}`;
                const team = await gameMapper.apiCreateGame(params);

                return res.status(200).json(team);
            }
        } catch (error) {

            return res.status(500).json({error: "hello"})
        }
    }

    static async apiGetGames(req:any, res:any, next:any) {
        try {
            if (!gameMapper.checkAuthenication(req.headers.authorization)) {
                return res.status(500).json({error: 'Not Authorized to access the API'})
            }


            const games = await gameMapper.apiGetGames();

            if (typeof games === 'string') {
                return res.status(500).json({error: games})
            }

            const paginationResults = gameMapper.prepareListResults(games, req.query)

            return res.status(200).json(paginationResults)

        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }
}
