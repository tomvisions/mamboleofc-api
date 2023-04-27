import {deployMapper} from "../mapper";

export interface QueryWhere {
    slug?:string;
}

export class DeployController {
    public static async apiDeploy(req: any, res: any, next: any) {
        //   if (!pageMapper.checkAuthenication(req.headers.authorization)) {
        //     return res.status(500).json({error: 'Not Authorized to access the API'})
        // }
        console.log('in controll3er');
        if (req.body[deployMapper.PARAMS_SECTION]) {
            console.log('in controller');
            const section = req.body[deployMapper.PARAMS_SECTION];

            const response = await deployMapper.apiDeployChanges(section);

            if (!response) {
                return res.status(500).json({error: "Unable to deploy"})
            }

            return res.status(200).json({result: "success", response});
        } else {

        }
    }
}
