import {mailMapper} from "../mapper/";

import {inspect} from "util";

const util = require('util');

export class MailController {
    static async apiPostSendMail(req: any, res: any, next: any) {

        let params = {
            "contact_us" :  [
                mailMapper.PARAMS_BODY, mailMapper.PARAMS_EMAIL_TYPE, mailMapper.PARAMS_PHONE, mailMapper.PARAMS_NAME, mailMapper.PARAMS_SUBJECT, mailMapper.PARAMS_EMAIL
            ],
            "tournament_registration" : [
                mailMapper.PARAMS_EMAIL_TYPE, mailMapper.PARAMS_NAME, mailMapper.PARAMS_TEAM_NAME, mailMapper.PARAMS_EMAIL
            ]
        }

        const missingParam = [];
        let valid = true;
        try {
            Object.values(params[req.body[mailMapper.PARAMS_EMAIL_TYPE]]).map(param   => {

                if (!req.body[param+'']) {
                    valid = false;
                    missingParam.push(param);
                }
            });

            if (valid) {
                await mailMapper.prepareEmail(req.body);
                const retVal = await mailMapper.apiSendMail();

                if (retVal['$metadata']['httpStatusCode'] === 200) {

                    return res.status(200).json({
                        result: "success",
                        message: `successfully got through with info ${inspect(retVal)}`
                    });
                } else {

                    return res.status(500).json({
                        result: "error",
                        message: `Email has not been sent ${inspect(retVal)}`
                    });
                }
            } else {
                return res.status(500).json({
                    result: "error",
                    message: `Email has not been sent. Missing parameters: ${inspect(missingParam)}`
                });
            }
        } catch (error) {

            return res.status(500).json({result: "error", message: `Failed the try ${util.inspect(error)}`});
        }

    }
}
