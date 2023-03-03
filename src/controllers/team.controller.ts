import {teamMapper} from "../mapper/";


export class TeamController {
    public static async apiPostCreateTeam(req:any, res:any, next:any) {
        try {
            let params = {};

            if (req.body[teamMapper.PARAMS_NAME] && req.body[teamMapper.PARAMS_DESCRIPTION]) {
                const team = await teamMapper.apiCreateTeam(req.body);

                if (!team) {
                    return  res.status(500).json({error: "Team already exists"})
                }

                return res.status(200).json({result: "success", message: "Team has been created"});
            }
        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }

    public static async apiGetTeams(req:any, res:any, next:any) {
        try {
       //     if (!teamMapper.checkAuthenication(req.headers.authorization)) {
         //       return res.status(500).json({error: 'Not Authorized to access the API'})
         //   }


            const teams = await teamMapper.apiGetTeams();

            if (typeof teams === 'string') {
                return res.status(500).json({error: teams})
            }

            const paginationResults = teamMapper.prepareListResults(teams, req.query)

            return res.status(200).json(paginationResults);
        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }
}
