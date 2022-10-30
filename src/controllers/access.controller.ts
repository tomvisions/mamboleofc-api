import {accessMapper} from "../mapper/access.mapper";

export class AccessController {
    static async apiCreateAccess(req:any, res:any, next:any) {
        try {
            if (req.body[accessMapper.PARAMS_NAME] && req.body[accessMapper.PARAMS_LEVEL]) {
                const access = await accessMapper.apiCreateAccess(req.body);

                if (!access) {

                    return  res.status(500).json({result: "error", "message": "Access already exists"})
                }

                return res.status(200).json({result: "success", message: "Access has been created"});
            }
        } catch (error) {

            return res.status(500).json({result: "error", "message": "Problem running code"})
        }
    }

    static async apiUpdateAccess(req:any, res:any, next:any) {
/*        try {
            let params = {};
            const PARAMS_NAME = 'name';//(new Team.Team()).name;
            const PARAMS_DESCRIPTION = 'description';//(new Team.Team()).description;

            if (req.body[PARAMS_NAME] && req.body[PARAMS_DESCRIPTION]) {
                params = `{"${PARAMS_NAME}":"${req.body[PARAMS_NAME]}","${PARAMS_DESCRIPTION}":"${req.body[PARAMS_DESCRIPTION]}"}`;

                const team = await TeamMapper.apiCreateTeam(params);

                if (!team) {
                    return  res.status(500).json({error: "Team already exists"})
                }

                return res.status(200).json({result: "success", message: "Team has been created"});
            }
        } catch (error) {

            return res.status(500).json({error: "hello"})
        } */
    }

    static async apiGetAccess(req:any, res:any, next:any) {

        try {
            const access = await accessMapper.apiGetAllAccess();

            if (typeof access === 'string') {
                return res.status(500).json({error: access})
            }

            const paginationResults = accessMapper.prepareListResults(access, req.query);

            return  res.status(200).json(paginationResults);

        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }
}
