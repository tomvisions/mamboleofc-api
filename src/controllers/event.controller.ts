import {eventMapper} from "../mapper";

export interface QueryWhere {
    slug?:string;
}

export class EventController {
    public static async apiGetEvents(req: any, res: any, next: any) {
        if (!eventMapper.checkAuthenication(req.headers.authorization)) {
            return res.status(500).json({error: 'Not Authorized to access the API'})
        }


        const queryWhere: QueryWhere = {};

        if (req.query[eventMapper.PARAMS_SLUG]) {
                queryWhere.slug = req.query[eventMapper.PARAMS_SLUG];
                const event = await eventMapper.apiGetEvent(queryWhere);

                if (!event) {
                    return res.status(500).json({error: "Unable to retrieve event"})
                }

                return res.status(200).json({result: "success", event});
        } else {
            const events = await eventMapper.apiGetEvents();

            if (typeof events === 'string') {
                return res.status(500).json({error: events})
            }

           const paginationResults = eventMapper.prepareListResults(events,req.query);

            return res.status(200).json(paginationResults)
        }
    }

    public static async apiCreateEvents(req: any, res: any, next: any) {
        try {
            if (req.body[eventMapper.PARAMS_NAME] && req.body[eventMapper.PARAMS_CONTENT] && req.body[eventMapper.PARAMS_DATE]) {

                const team = await eventMapper.apiCreateEvent(req.body);

                if (!team) {
                    return res.status(500).json({error: "Team already exists"})
                }

                return res.status(200).json({result: "success", message: "Team has been created"});
            }
        } catch (error) {

            return res.status(500).json({error: "hello"})
        }
    }
}
