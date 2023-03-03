import {eventMapper} from "../mapper";

export interface QueryWhere {
    slug?:string;
}

export class EventController {
    public static async apiGetEvents(req: any, res: any, next: any) {
     //   if (!eventMapper.checkAuthenication(req.headers.authorization)) {
       //     return res.status(500).json({error: 'Not Authorized to access the API'})
       // }


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
            console.log(events);
            if (typeof events === 'string') {
                return res.status(500).json({error: events})
            }
            console.log(req.query);
           const paginationResults = eventMapper.prepareListResults(events,req.query);

            return res.status(200).json(paginationResults)
        }
    }

    public static async apiCreateEvents(req: any, res: any, next: any) {
        try {
            if (req.body[eventMapper.PARAMS_NEW]) {

                const event = await eventMapper.apiCreateEvent();

                if (!event) {
                    return res.status(500).json({error: "Error creating Event"})
                }

                return res.status(200).json({result: "success", message: event});
            }

            return  res.status(500).json({result: "error", message: "Missing parameters to access this function"})

        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }

    public static async apiUpdateEvents(req: any, res: any, next: any) {
        try {
            if (req.body[eventMapper.PARAMS_EVENT][eventMapper.PARAMS_NAME] && req.body[eventMapper.PARAMS_EVENT][eventMapper.PARAMS_ABOUT] && req.body[eventMapper.PARAMS_EVENT][eventMapper.PARAMS_LINK] && req.body[eventMapper.PARAMS_EVENT][eventMapper.PARAMS_BANNER_IMAGE]) {


                const event = await eventMapper.apiUpdateEvent(req.body.identifier, req.body.event);

                if (!event) {
                    return res.status(500).json({error: "Error Event already exists"})
                }

                return res.status(200).json({result: "success", message: "Team has been created"});
            }

            return  res.status(500).json({result: "error", message: "Missing parameters to access this function"})

        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }

    public static async apiImportEvents(req: any, res: any, next: any) {
        try {
            console.log('importing body');
            console.log(req.body);
            if (req.body[eventMapper.PARAMS_NAME] && req.body[eventMapper.PARAMS_CONTENT] && req.body[eventMapper.PARAMS_DATE]) {

                const event = await eventMapper.apiImportEvents(req.body);

                if (!event) {
                    return res.status(500).json({error: "Event already exists"})
                }

                return res.status(200).json({result: "success", message: "Event has been imported"});
            }
        } catch (error) {

            return res.status(500).json({error: error.toString()})
        }
    }
}
