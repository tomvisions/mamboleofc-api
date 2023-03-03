import {rosterMapper} from "../mapper/roster.mapper";

export class RosterController {

    /**
     * Adding a user to the roster
     * @param req
     * @param res
     * @param next
     */
    static async apiAddUserToRoster(req:any, res:any, next:any) {
        try {
            if (req.body[rosterMapper.PARAMS_GAME] && req.body[rosterMapper.PARAMS_USER] && req.body[rosterMapper.PARAMS_ROSTER]) {
                console.log('yoot');
                const team = await rosterMapper.apiAddUserToRoster(req.body);

                return res.status(200).json(team);
            }
        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }

    /**
     * Getting all the users based on the roster
     * @param req
     * @param res
     * @param next
     */
    static async apiGetRosterByGameId(req:any, res:any, next:any) {
        try {
            if (!req.query[rosterMapper.PARAMS_GAME]) {
                return  res.status(500).json({error: "Game Id is missing"})
            }
            const games = await rosterMapper.apiGetRoster(req.params);

            if (typeof games === 'string') {
                return res.status(500).json({error: games})
            }

            const paginationResults = rosterMapper.prepareListResults(games, req.query)

            return res.status(200).json(paginationResults)
        } catch (error) {
            return res.status(500).json({error: error.toString()})
        }
    }
}
